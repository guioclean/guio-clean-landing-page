import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Clock, Calculator, Send } from "lucide-react";

const QuoteCalculator = () => {
  const [clientName, setClientName] = useState("");
  const [cep, setCep] = useState("");
  const [hours, setHours] = useState("");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const [prefixes, setPrefixes] = useState<{ prefix: string; region_name: string; displacement_fee: number }[]>([]);
  const [hourlyRate, setHourlyRate] = useState(35);
  const [defaultFee, setDefaultFee] = useState(45);

  useEffect(() => {
    const load = async () => {
      const { data: pData } = await supabase.from("shipping_prefixes").select("prefix, region_name, displacement_fee");
      if (pData) setPrefixes(pData.map(p => ({ ...p, displacement_fee: Number(p.displacement_fee) })));

      const { data: sData } = await supabase.from("quote_settings").select("key, value");
      if (sData) {
        const hr = sData.find(s => s.key === "hourly_rate");
        const df = sData.find(s => s.key === "default_displacement_fee");
        if (hr) setHourlyRate(Number(hr.value));
        if (df) setDefaultFee(Number(df.value));
      }
    };
    load();
  }, []);

  const cleanCep = cep.replace(/\D/g, "");
  const prefix = cleanCep.length >= 3 ? cleanCep.substring(0, 3) : "";
  const matchedPrefix = prefix ? prefixes.find(p => p.prefix === prefix) : null;
  const regionName = matchedPrefix ? matchedPrefix.region_name : prefix.length === 3 ? "Região Padrão" : "";
  const displacementFee = matchedPrefix ? matchedPrefix.displacement_fee : prefix.length === 3 ? defaultFee : 0;

  const hoursNum = parseFloat(hours) || 0;
  const laborCost = hoursNum * hourlyRate;
  const totalPrice = hoursNum > 0 && prefix.length === 3 ? laborCost + displacementFee : 0;

  const formatCep = (value: string) => {
    const digits = value.replace(/\D/g, "").substring(0, 8);
    if (digits.length > 5) return digits.substring(0, 5) + "-" + digits.substring(5);
    return digits;
  };

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    await (supabase.from("quotes") as any).insert({
      client_name: clientName || null,
      area_sqm: hoursNum,
      cleaning_type: `CEP: ${cep} | Região: ${regionName}`,
      suggested_price: totalPrice,
      notes: notes || null,
      created_by: user?.id,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const whatsappMessage = `Olá! Gostaria de agendar um serviço:\n\n` +
    `👤 Cliente: ${clientName || "Não informado"}\n` +
    `📍 CEP: ${cep}\n` +
    `🗺️ Região: ${regionName}\n` +
    `⏱️ Horas: ${hoursNum}h\n` +
    `💰 Mão de obra: R$ ${laborCost.toFixed(2).replace(".", ",")}\n` +
    `🚗 Deslocamento: R$ ${displacementFee.toFixed(2).replace(".", ",")}\n` +
    `✅ *Total: R$ ${totalPrice.toFixed(2).replace(".", ",")}*`;

  const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="max-w-2xl">
      <div className="bg-card rounded-xl border border-border p-8">
        <h2 className="font-heading font-extrabold text-xl text-foreground mb-6 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          Calculadora de Orçamento
        </h2>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Nome do cliente (opcional)"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full bg-secondary border border-border rounded-xl px-5 py-3 font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
          />

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="font-heading font-bold text-sm text-foreground block mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" /> CEP do cliente
              </label>
              <input
                type="text"
                placeholder="Ex: 04523-000"
                value={cep}
                onChange={(e) => setCep(formatCep(e.target.value))}
                className="w-full bg-secondary border border-border rounded-xl px-5 py-3 font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="font-heading font-bold text-sm text-foreground block mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" /> Horas de serviço
              </label>
              <input
                type="number"
                placeholder="Ex: 4"
                min="1"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full bg-secondary border border-border rounded-xl px-5 py-3 font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Região identificada */}
          {prefix.length === 3 && (
            <div className={`rounded-xl p-4 border flex items-start gap-3 ${matchedPrefix ? "bg-primary/5 border-primary/20" : "bg-accent/50 border-border"}`}>
              <MapPin className={`w-5 h-5 mt-0.5 shrink-0 ${matchedPrefix ? "text-primary" : "text-muted-foreground"}`} />
              <div>
                <p className="font-heading font-bold text-sm text-foreground">
                  Identificamos sua região: {regionName}
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  Taxa de deslocamento: <span className="font-bold text-foreground">R$ {displacementFee.toFixed(2).replace(".", ",")}</span>
                </p>
              </div>
            </div>
          )}

          <textarea
            placeholder="Observações (opcional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full bg-secondary border border-border rounded-xl px-5 py-3 font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors resize-none"
          />

          {/* Resultado */}
          {totalPrice > 0 && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div>
                  <p className="font-body text-muted-foreground text-xs">Mão de obra</p>
                  <p className="font-heading font-bold text-lg text-foreground">
                    R$ {laborCost.toFixed(2).replace(".", ",")}
                  </p>
                  <p className="font-body text-muted-foreground text-xs">{hoursNum}h × R$ {hourlyRate.toFixed(2).replace(".", ",")}</p>
                </div>
                <div>
                  <p className="font-body text-muted-foreground text-xs">Deslocamento</p>
                  <p className="font-heading font-bold text-lg text-foreground">
                    R$ {displacementFee.toFixed(2).replace(".", ",")}
                  </p>
                  <p className="font-body text-muted-foreground text-xs">{regionName}</p>
                </div>
                <div>
                  <p className="font-body text-muted-foreground text-xs">Total</p>
                  <p className="font-heading font-extrabold text-2xl text-primary">
                    R$ {totalPrice.toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-3">
            <button
              onClick={handleSave}
              disabled={totalPrice <= 0}
              className="w-full bg-primary text-primary-foreground font-heading font-bold py-3 rounded-xl hover:brightness-110 transition-all disabled:opacity-40"
            >
              {saved ? "✓ Orçamento salvo!" : "Salvar Orçamento"}
            </button>
            <a
              href={totalPrice > 0 ? whatsappUrl : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full flex items-center justify-center gap-2 font-heading font-bold py-3 rounded-xl transition-all ${totalPrice > 0 ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer" : "bg-muted text-muted-foreground pointer-events-none opacity-40"}`}
            >
              <Send className="w-4 h-4" /> Agendar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCalculator;
