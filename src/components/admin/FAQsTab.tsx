import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  active: boolean;
}

const FAQsTab = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ question: "", answer: "", sort_order: 0, active: true });
  const [isNew, setIsNew] = useState(false);

  const fetchFaqs = async () => {
    const { data } = await supabase.from("site_faqs").select("*").order("sort_order");
    if (data) setFaqs(data);
    setLoading(false);
  };

  useEffect(() => { fetchFaqs(); }, []);

  const startEdit = (f: FAQ) => {
    setEditing(f.id);
    setForm({ question: f.question, answer: f.answer, sort_order: f.sort_order, active: f.active });
    setIsNew(false);
  };

  const startNew = () => {
    setEditing("new");
    setForm({ question: "", answer: "", sort_order: faqs.length, active: true });
    setIsNew(true);
  };

  const cancel = () => { setEditing(null); setIsNew(false); };

  const save = async () => {
    if (isNew) {
      await supabase.from("site_faqs").insert(form);
    } else if (editing) {
      await supabase.from("site_faqs").update(form).eq("id", editing);
    }
    cancel();
    fetchFaqs();
  };

  const remove = async (id: string) => {
    if (!confirm("Remover esta pergunta?")) return;
    await supabase.from("site_faqs").delete().eq("id", id);
    fetchFaqs();
  };

  const toggleActive = async (f: FAQ) => {
    await supabase.from("site_faqs").update({ active: !f.active }).eq("id", f.id);
    fetchFaqs();
  };

  if (loading) return <p className="text-muted-foreground">Carregando...</p>;

  const renderForm = () => (
    <div className="space-y-4">
      <input placeholder="Pergunta" value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-body text-foreground text-sm" />
      <textarea placeholder="Resposta" value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })} rows={4} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-body text-foreground text-sm" />
      <input type="number" placeholder="Ordem" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: +e.target.value })} className="w-24 bg-secondary border border-border rounded-lg px-4 py-3 font-body text-foreground text-sm" />
      <div className="flex gap-3">
        <button onClick={save} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-sm"><Save className="w-4 h-4" /> Salvar</button>
        <button onClick={cancel} className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-4 py-2 text-sm"><X className="w-4 h-4" /> Cancelar</button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-xl text-foreground">Perguntas Frequentes</h2>
        <button onClick={startNew} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-heading font-bold text-sm hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Nova Pergunta
        </button>
      </div>

      {editing === "new" && <div className="bg-card border border-border rounded-xl p-6">{renderForm()}</div>}

      <div className="space-y-3">
        {faqs.map(f => (
          <div key={f.id} className={`bg-card border border-border rounded-xl p-5 ${!f.active ? "opacity-50" : ""}`}>
            {editing === f.id ? renderForm() : (
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <p className="font-heading font-bold text-foreground text-sm">{f.question}</p>
                  <p className="text-muted-foreground text-sm truncate max-w-lg">{f.answer}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleActive(f)} className={`text-xs px-3 py-1 rounded-full font-bold ${f.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {f.active ? "Ativo" : "Inativo"}
                  </button>
                  <button onClick={() => startEdit(f)} className="p-2 text-muted-foreground hover:text-primary"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => remove(f.id)} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQsTab;
