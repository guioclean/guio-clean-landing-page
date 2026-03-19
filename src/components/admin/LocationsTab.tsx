import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Save, X, Building, Home, Briefcase, Cross, MapPin, Store, Hotel, Warehouse } from "lucide-react";

const ICON_OPTIONS = [
  { name: "Building", icon: Building },
  { name: "Home", icon: Home },
  { name: "Briefcase", icon: Briefcase },
  { name: "Cross", icon: Cross },
  { name: "MapPin", icon: MapPin },
  { name: "Store", icon: Store },
  { name: "Hotel", icon: Hotel },
  { name: "Warehouse", icon: Warehouse },
];

interface Location {
  id: string;
  title: string;
  icon_name: string;
  sort_order: number;
  active: boolean;
}

const LocationsTab = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", icon_name: "Building", sort_order: 0, active: true });
  const [isNew, setIsNew] = useState(false);

  const fetchLocations = async () => {
    const { data } = await supabase.from("site_locations").select("*").order("sort_order");
    if (data) setLocations(data);
    setLoading(false);
  };

  useEffect(() => { fetchLocations(); }, []);

  const startEdit = (l: Location) => {
    setEditing(l.id);
    setForm({ title: l.title, icon_name: l.icon_name, sort_order: l.sort_order, active: l.active });
    setIsNew(false);
  };

  const startNew = () => {
    setEditing("new");
    setForm({ title: "", icon_name: "Building", sort_order: locations.length, active: true });
    setIsNew(true);
  };

  const cancel = () => { setEditing(null); setIsNew(false); };

  const save = async () => {
    if (isNew) {
      await supabase.from("site_locations").insert(form);
    } else if (editing) {
      await supabase.from("site_locations").update(form).eq("id", editing);
    }
    cancel();
    fetchLocations();
  };

  const remove = async (id: string) => {
    if (!confirm("Remover este local?")) return;
    await supabase.from("site_locations").delete().eq("id", id);
    fetchLocations();
  };

  const getIcon = (name: string) => {
    const found = ICON_OPTIONS.find(i => i.name === name);
    return found ? found.icon : Building;
  };

  if (loading) return <p className="text-muted-foreground">Carregando...</p>;

  const renderForm = () => (
    <div className="space-y-4">
      <input placeholder="Nome do local" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-body text-foreground text-sm" />
      <div>
        <p className="text-sm font-body text-muted-foreground mb-2">Ícone:</p>
        <div className="flex gap-2 flex-wrap">
          {ICON_OPTIONS.map(opt => {
            const Icon = opt.icon;
            return (
              <button key={opt.name} onClick={() => setForm({ ...form, icon_name: opt.name })} className={`p-3 rounded-lg border transition-colors ${form.icon_name === opt.name ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}>
                <Icon className="w-5 h-5 text-foreground" />
              </button>
            );
          })}
        </div>
      </div>
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
        <h2 className="font-heading font-bold text-xl text-foreground">Onde Atendemos</h2>
        <button onClick={startNew} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-heading font-bold text-sm hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Novo Local
        </button>
      </div>

      {editing === "new" && <div className="bg-card border border-border rounded-xl p-6">{renderForm()}</div>}

      <div className="space-y-3">
        {locations.map(l => {
          const Icon = getIcon(l.icon_name);
          return (
            <div key={l.id} className={`bg-card border border-border rounded-xl p-5 ${!l.active ? "opacity-50" : ""}`}>
              {editing === l.id ? renderForm() : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Icon className="w-6 h-6 text-primary" />
                    <p className="font-heading font-bold text-foreground">{l.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => startEdit(l)} className="p-2 text-muted-foreground hover:text-primary"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => remove(l.id)} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationsTab;
