import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const CLEANING_TYPES = [
  { value: "residencial", label: "Limpeza Residencial", pricePerSqm: 3.5 },
  { value: "comercial", label: "Limpeza Comercial", pricePerSqm: 4.0 },
  { value: "pos-obra", label: "Pós-Obra", pricePerSqm: 5.5 },
  { value: "vidros", label: "Limpeza de Vidros", pricePerSqm: 6.0 },
];

const QuoteCalculator = () => {
  const [clientName, setClientName] = useState("");
  const [areaSqm, setAreaSqm] = useState("");
  const [cleaningType, setCleaningType] = useState("residencial");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const selectedType = CLEANING_TYPES.find((t) => t.value === cleaningType)!;
  const area = parseFloat(areaSqm) || 0;
  const suggestedPrice = Math.max(area * selectedType.pricePerSqm, 150);

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("quotes").insert({
      client_name: clientName || null,
      area_sqm: area,
      cleaning_type: selectedType.label,
      suggested_price: suggestedPrice,
      notes: notes || null,
      created_by: user?.id,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl">
      <div className="bg-card rounded-xl border border-border p-8">
        <h2 className="font-heading font-extrabold text-xl text-foreground mb-6">
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
              <label className="font-heading font-bold text-sm text-foreground block mb-2">
                Metros quadrados
              </label>
              <input
                type="number"
                placeholder="Ex: 70"
                value={areaSqm}
                onChange={(e) => setAreaSqm(e.target.value)}
                className="w-full bg-secondary border border-border rounded-xl px-5 py-3 font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="font-heading font-bold text-sm text-foreground block mb-2">
                Tipo de limpeza
              </label>
              <select
                value={cleaningType}
                onChange={(e) => setCleaningType(e.target.value)}
                className="w-full bg-secondary border border-border rounded-xl px-5 py-3 font-body text-foreground outline-none focus:border-primary transition-colors cursor-pointer"
              >
                {CLEANING_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          <textarea
            placeholder="Observações (opcional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full bg-secondary border border-border rounded-xl px-5 py-3 font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors resize-none"
          />

          {/* Result */}
          {area > 0 && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
              <p className="font-body text-muted-foreground text-sm mb-1">Valor sugerido</p>
              <p className="font-heading font-extrabold text-4xl text-primary">
                R$ {suggestedPrice.toFixed(2).replace(".", ",")}
              </p>
              <p className="font-body text-muted-foreground text-xs mt-2">
                {area}m² × R$ {selectedType.pricePerSqm.toFixed(2).replace(".", ",")}/m² (mín. R$ 150)
              </p>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={area <= 0}
            className="w-full bg-primary text-primary-foreground font-heading font-bold py-3 rounded-xl hover:brightness-110 transition-all disabled:opacity-40"
          >
            {saved ? "✓ Orçamento salvo!" : "Salvar Orçamento"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteCalculator;
