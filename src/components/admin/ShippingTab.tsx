import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Save, DollarSign } from "lucide-react";
import { toast } from "sonner";

type Prefix = {
  id: string;
  prefix: string;
  region_name: string;
  displacement_fee: number;
};

const ShippingTab = () => {
  const [prefixes, setPrefixes] = useState<Prefix[]>([]);
  const [hourlyRate, setHourlyRate] = useState("35");
  const [defaultFee, setDefaultFee] = useState("45");
  const [newPrefix, setNewPrefix] = useState("");
  const [newRegion, setNewRegion] = useState("");
  const [newFee, setNewFee] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data: pData } = await supabase.from("shipping_prefixes").select("*").order("prefix");
    if (pData) setPrefixes(pData.map(p => ({ ...p, displacement_fee: Number(p.displacement_fee) })));

    const { data: sData } = await supabase.from("quote_settings").select("key, value");
    if (sData) {
      const hr = sData.find(s => s.key === "hourly_rate");
      const df = sData.find(s => s.key === "default_displacement_fee");
      if (hr) setHourlyRate(String(hr.value));
      if (df) setDefaultFee(String(df.value));
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleAddPrefix = async () => {
    const p = newPrefix.replace(/\D/g, "").substring(0, 3);
    if (p.length !== 3) { toast.error("Prefixo deve ter 3 dígitos"); return; }
    const fee = parseFloat(newFee);
    if (isNaN(fee) || fee < 0) { toast.error("Valor inválido"); return; }

    const { error } = await supabase.from("shipping_prefixes").insert({
      prefix: p,
      region_name: newRegion || "Sem nome",
      displacement_fee: fee,
    });
    if (error) { toast.error(error.message.includes("duplicate") ? "Prefixo já existe" : error.message); return; }
    toast.success("Prefixo adicionado!");
    setNewPrefix(""); setNewRegion(""); setNewFee("");
    load();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("shipping_prefixes").delete().eq("id", id);
    toast.success("Prefixo removido!");
    load();
  };

  const handleSaveSettings = async () => {
    const hr = parseFloat(hourlyRate);
    const df = parseFloat(defaultFee);
    if (isNaN(hr) || isNaN(df)) { toast.error("Valores inválidos"); return; }

    await supabase.from("quote_settings").update({ value: hr } as any).eq("key", "hourly_rate");
    await supabase.from("quote_settings").update({ value: df } as any).eq("key", "default_displacement_fee");
    toast.success("Configurações salvas!");
  };

  if (loading) return <p className="text-muted-foreground font-body">Carregando...</p>;

  return (
    <div className="space-y-8">
      {/* Configurações gerais */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-heading font-extrabold text-lg text-foreground mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" /> Configurações Gerais
        </h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="font-heading font-bold text-sm text-foreground block mb-2">Valor da Hora (R$)</label>
            <input
              type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 font-body text-foreground outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="font-heading font-bold text-sm text-foreground block mb-2">Taxa Padrão de Deslocamento (R$)</label>
            <input
              type="number" value={defaultFee} onChange={(e) => setDefaultFee(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 font-body text-foreground outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
        <button onClick={handleSaveSettings} className="flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold px-5 py-2.5 rounded-xl hover:brightness-110 transition-all">
          <Save className="w-4 h-4" /> Salvar Configurações
        </button>
      </div>

      {/* Adicionar prefixo */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-heading font-extrabold text-lg text-foreground mb-4">Adicionar Prefixo de CEP</h3>
        <div className="grid sm:grid-cols-4 gap-3 items-end">
          <div>
            <label className="font-heading font-bold text-xs text-foreground block mb-1">Prefixo (3 dígitos)</label>
            <input type="text" placeholder="Ex: 054" value={newPrefix} maxLength={3}
              onChange={(e) => setNewPrefix(e.target.value.replace(/\D/g, "").substring(0, 3))}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 font-body text-foreground outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="font-heading font-bold text-xs text-foreground block mb-1">Nome da Região</label>
            <input type="text" placeholder="Ex: Pinheiros" value={newRegion}
              onChange={(e) => setNewRegion(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 font-body text-foreground outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="font-heading font-bold text-xs text-foreground block mb-1">Valor (R$)</label>
            <input type="number" placeholder="Ex: 35" value={newFee}
              onChange={(e) => setNewFee(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 font-body text-foreground outline-none focus:border-primary transition-colors"
            />
          </div>
          <button onClick={handleAddPrefix} className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-bold px-4 py-2.5 rounded-xl hover:brightness-110 transition-all">
            <Plus className="w-4 h-4" /> Adicionar
          </button>
        </div>
      </div>

      {/* Lista de prefixos */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-5 py-3 font-heading font-bold text-sm text-foreground">Prefixo</th>
              <th className="px-5 py-3 font-heading font-bold text-sm text-foreground">Região</th>
              <th className="px-5 py-3 font-heading font-bold text-sm text-foreground">Valor (R$)</th>
              <th className="px-5 py-3 font-heading font-bold text-sm text-foreground w-16"></th>
            </tr>
          </thead>
          <tbody>
            {prefixes.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="px-5 py-3 font-body font-bold text-foreground">{p.prefix}</td>
                <td className="px-5 py-3 font-body text-foreground">{p.region_name}</td>
                <td className="px-5 py-3 font-body text-foreground">R$ {p.displacement_fee.toFixed(2).replace(".", ",")}</td>
                <td className="px-5 py-3">
                  <button onClick={() => handleDelete(p.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {prefixes.length === 0 && (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-muted-foreground font-body">Nenhum prefixo cadastrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShippingTab;
