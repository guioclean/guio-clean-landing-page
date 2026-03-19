import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

interface Plan {
  id: string;
  title: string;
  subtitle: string;
  features: string[];
  recommended: boolean;
  whatsapp_context: string;
  sort_order: number;
  active: boolean;
}

const PlansTab = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", subtitle: "", featuresText: "", recommended: false, whatsapp_context: "", sort_order: 0, active: true });
  const [isNew, setIsNew] = useState(false);

  const fetchPlans = async () => {
    const { data } = await supabase.from("site_plans").select("*").order("sort_order");
    if (data) setPlans(data);
    setLoading(false);
  };

  useEffect(() => { fetchPlans(); }, []);

  const startEdit = (p: Plan) => {
    setEditing(p.id);
    setForm({ title: p.title, subtitle: p.subtitle, featuresText: p.features.join("\n"), recommended: p.recommended, whatsapp_context: p.whatsapp_context, sort_order: p.sort_order, active: p.active });
    setIsNew(false);
  };

  const startNew = () => {
    setEditing("new");
    setForm({ title: "", subtitle: "", featuresText: "", recommended: false, whatsapp_context: "", sort_order: plans.length, active: true });
    setIsNew(true);
  };

  const cancel = () => { setEditing(null); setIsNew(false); };

  const save = async () => {
    const payload = {
      title: form.title,
      subtitle: form.subtitle,
      features: form.featuresText.split("\n").filter(f => f.trim()),
      recommended: form.recommended,
      whatsapp_context: form.whatsapp_context,
      sort_order: form.sort_order,
      active: form.active,
    };
    if (isNew) {
      await supabase.from("site_plans").insert(payload);
    } else if (editing) {
      await supabase.from("site_plans").update(payload).eq("id", editing);
    }
    cancel();
    fetchPlans();
  };

  const remove = async (id: string) => {
    if (!confirm("Remover este plano?")) return;
    await supabase.from("site_plans").delete().eq("id", id);
    fetchPlans();
  };

  if (loading) return <p className="text-muted-foreground">Carregando...</p>;

  const renderForm = () => (
    <div className="space-y-4">
      <input placeholder="Título" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-body text-foreground text-sm" />
      <input placeholder="Subtítulo" value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-body text-foreground text-sm" />
      <textarea placeholder="Benefícios (um por linha)" value={form.featuresText} onChange={e => setForm({ ...form, featuresText: e.target.value })} rows={4} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-body text-foreground text-sm" />
      <input placeholder="Mensagem WhatsApp" value={form.whatsapp_context} onChange={e => setForm({ ...form, whatsapp_context: e.target.value })} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-body text-foreground text-sm" />
      <div className="flex items-center gap-4">
        <input type="number" placeholder="Ordem" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: +e.target.value })} className="w-24 bg-secondary border border-border rounded-lg px-4 py-3 font-body text-foreground text-sm" />
        <label className="flex items-center gap-2 font-body text-sm text-foreground cursor-pointer">
          <input type="checkbox" checked={form.recommended} onChange={e => setForm({ ...form, recommended: e.target.checked })} className="rounded" />
          Recomendado
        </label>
      </div>
      <div className="flex gap-3">
        <button onClick={save} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-sm"><Save className="w-4 h-4" /> Salvar</button>
        <button onClick={cancel} className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-4 py-2 text-sm"><X className="w-4 h-4" /> Cancelar</button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-xl text-foreground">Planos</h2>
        <button onClick={startNew} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-heading font-bold text-sm hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Novo Plano
        </button>
      </div>

      {editing === "new" && <div className="bg-card border border-border rounded-xl p-6">{renderForm()}</div>}

      <div className="space-y-3">
        {plans.map(p => (
          <div key={p.id} className={`bg-card border border-border rounded-xl p-5 ${!p.active ? "opacity-50" : ""}`}>
            {editing === p.id ? renderForm() : (
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-heading font-bold text-foreground">{p.title}</p>
                    {p.recommended && <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-bold">Recomendado</span>}
                  </div>
                  <p className="text-muted-foreground text-sm">{p.subtitle} · {p.features.length} benefícios</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => startEdit(p)} className="p-2 text-muted-foreground hover:text-primary"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => remove(p.id)} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlansTab;
