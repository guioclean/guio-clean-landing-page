import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Clock, Calculator, Send, Sparkles } from "lucide-react";

const QuoteSimulator = () => {
  const [cep, setCep] = useState("");
  const [hours, setHours] = useState("");

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

  const whatsappMessage = `Olá William! Simulei no site e para ${hoursNum}h no CEP ${cep} o valor ficou em R$ ${totalPrice.toFixed(2).replace(".", ",")}. Gostaria de agendar!`;
  const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section id="simulador" className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-heading font-bold text-sm mb-4">
            <Sparkles className="w-4 h-4" /> Rápido e fácil
          </div>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground mb-3">
            Simule seu Orçamento
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto">
            Descubra o valor da sua limpeza em segundos. Sem compromisso!
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="bg-card rounded-2xl border border-border shadow-xl p-6 md:p-8 space-y-6">
            {/* Horas */}
            <div>
              <label className="font-heading font-bold text-sm text-foreground mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" /> Quantas horas de limpeza você precisa?
              </label>
              <input
                type="number"
                min="1"
                max="24"
                placeholder="Ex: 4"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full bg-secondary border border-border rounded-xl px-5 py-3.5 font-body text-lg text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            {/* CEP */}
            <div>
              <label className="font-heading font-bold text-sm text-foreground mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" /> Informe seu CEP
              </label>
              <input
                type="text"
                placeholder="Ex: 04523-000"
                value={cep}
                onChange={(e) => setCep(formatCep(e.target.value))}
                className="w-full bg-secondary border border-border rounded-xl px-5 py-3.5 font-body text-lg text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Região identificada */}
            {prefix.length === 3 && (
              <div className={`rounded-xl p-4 border flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${matchedPrefix ? "bg-primary/10 border-primary/30" : "bg-accent/50 border-border"}`}>
                <MapPin className={`w-5 h-5 shrink-0 ${matchedPrefix ? "text-primary" : "text-muted-foreground"}`} />
                <div>
                  <p className="font-heading font-bold text-sm text-foreground">
                    Região identificada: {regionName}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">
                    Taxa de deslocamento: R$ {displacementFee.toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </div>
            )}

            {/* Resultado */}
            {totalPrice > 0 && (
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="font-body text-sm text-muted-foreground mb-1">Valor Estimado</p>
                <p className="font-heading font-extrabold text-4xl md:text-5xl text-primary">
                  R$ {totalPrice.toFixed(2).replace(".", ",")}
                </p>
                <div className="flex justify-center gap-6 mt-3 text-xs font-body text-muted-foreground">
                  <span>Mão de obra: R$ {laborCost.toFixed(2).replace(".", ",")}</span>
                  <span>Desloc.: R$ {displacementFee.toFixed(2).replace(".", ",")}</span>
                </div>
              </div>
            )}

            {/* CTA WhatsApp */}
            <a
              href={totalPrice > 0 ? whatsappUrl : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full flex items-center justify-center gap-2.5 font-heading font-bold text-lg py-4 rounded-xl transition-all ${
                totalPrice > 0
                  ? "bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl cursor-pointer"
                  : "bg-muted text-muted-foreground pointer-events-none opacity-40"
              }`}
            >
              <Send className="w-5 h-5" /> Agendar esta Limpeza via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSimulator;
