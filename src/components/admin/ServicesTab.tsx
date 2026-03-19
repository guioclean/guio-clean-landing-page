import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Save, X, GripVertical } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string;
  whatsapp_context: string;
  sort_order: number;
  active: boolean;
}

const emptyService: Omit<Service, "id"> = {
  title: "",
  description: "",
  image_url: "",
  whatsapp_context: "",
  sort_order: 0,
  active: true,
};

const ServicesTab = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Service, "id">>(emptyService);
  const [isNew, setIsNew] = useState(false);

  const fetchServices = async () => {
    const { data } = await supabase
      .from("site_services")
      .select("*")
      .order("sort_order");
    if (data) setServices(data);
    setLoading(false);
  };

  useEffect(() => { fetchServices(); }, []);

  const startEdit = (s: Service) => {
    setEditing(s.id);
    setForm({ title: s.title, description: s.description, image_url: s.image_url, whatsapp_context: s.whatsapp_context, sort_order: s.sort_order, active: s.active });
    setIsNew(false);
  };

  const startNew = () => {
    setEditing("new");
    setForm({ ...emptyService, sort_order: services.length });
    setIsNew(true);
  };

  const cancel = () => { setEditing(null); setIsNew(false); };

  const save = async () => {
    if (isNew) {
      await supabase.from("site_services").insert(form);
    } else if (editing) {
      await supabase.from("site_services").update(form).eq("id", editing);
    }
    setEditing(null);
    setIsNew(false);
    fetchServices();
  };

  const remove = async (id: string) => {
    if (!confirm("Remover este serviço?")) return;
    await supabase.from("site_services").delete().eq("id", id);
    fetchServices();
  };

  const toggleActive = async (s: Service) => {
    await supabase.from("site_services").update({ active: !s.active }).eq("id", s.id);
    fetchServices();
  };

  if (loading) return <p className="text-muted-foreground">Carregando...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-xl text-foreground">Serviços</h2>
        <button onClick={startNew} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-heading font-bold text-sm hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Novo Serviço
        </button>
      </div>

      {(editing === "new") && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-heading font-bold text-foreground">Novo Serviço</h3>
          <input placeholder="Título" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-body text-foreground text-sm" />
          <textarea placeholder="Descrição" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-body text-foreground text-sm" />
          <input placeholder="URL da Imagem" value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-body text-foreground text-sm" />
          <input placeholder="Mensagem WhatsApp" value={form.whatsapp_context} onChange={e => setForm({ ...form, whatsapp_context: e.target.value })} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-body text-foreground text-sm" />
          <input placeholder="Ordem" type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: +e.target.value })} className="w-32 bg-secondary border border-border rounded-lg px-4 py-3 font-body text-foreground text-sm" />
          <div className="flex gap-3">
            <button onClick={save} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-sm"><Save className="w-4 h-4" /> Salvar</button>
            <button onClick={cancel} className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-4 py-2 text-sm"><X className="w-4 h-4" /> Cancelar</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {services.map(s => (
          <div key={s.id} className={`bg-card border border-border rounded-xl p-5 ${!s.active ? "opacity-50" : ""}`}>
            {editing === s.id ? (
              <div className="space-y-4">
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-body text-foreground text-sm" />
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-body text-foreground text-sm" />
                <input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-body text-foreground text-sm" />
                <input value={form.whatsapp_context} onChange={e => setForm({ ...form, whatsapp_context: e.target.value })} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-body text-foreground text-sm" />
                <input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: +e.target.value })} className="w-32 bg-secondary border border-border rounded-lg px-4 py-3 font-body text-foreground text-sm" />
                <div className="flex gap-3">
                  <button onClick={save} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-sm"><Save className="w-4 h-4" /> Salvar</button>
                  <button onClick={cancel} className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-4 py-2 text-sm"><X className="w-4 h-4" /> Cancelar</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                  {s.image_url && <img src={s.image_url} alt={s.title} className="w-12 h-12 rounded-lg object-cover" />}
                  <div>
                    <p className="font-heading font-bold text-foreground">{s.title}</p>
                    <p className="text-muted-foreground text-sm truncate max-w-md">{s.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleActive(s)} className={`text-xs px-3 py-1 rounded-full font-bold ${s.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {s.active ? "Ativo" : "Inativo"}
                  </button>
                  <button onClick={() => startEdit(s)} className="p-2 text-muted-foreground hover:text-primary"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => remove(s.id)} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesTab;
