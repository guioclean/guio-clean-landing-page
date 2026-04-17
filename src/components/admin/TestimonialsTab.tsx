import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, Plus, Save, Star, Link as LinkIcon } from "lucide-react";

type Testimonial = {
  id: string;
  author_name: string;
  author_role: string;
  text: string;
  rating: number;
  review_date: string;
  avatar_url: string;
  review_link: string;
  sort_order: number;
  active: boolean;
};

const empty = {
  author_name: "",
  author_role: "",
  text: "",
  rating: 5,
  review_date: new Date().toISOString().slice(0, 10),
  avatar_url: "",
  review_link: "",
  sort_order: 0,
  active: true,
};

const TestimonialsTab = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [form, setForm] = useState(empty);
  const [googleUrl, setGoogleUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [{ data: list }, { data: setting }] = await Promise.all([
      supabase.from("site_testimonials").select("*").order("sort_order").order("review_date", { ascending: false }),
      supabase.from("quote_settings").select("text_value").eq("key", "google_reviews_url").maybeSingle(),
    ]);
    setItems((list as Testimonial[]) || []);
    setGoogleUrl(setting?.text_value || "");
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSaveGoogleUrl = async () => {
    const { error } = await supabase
      .from("quote_settings")
      .update({ text_value: googleUrl })
      .eq("key", "google_reviews_url");
    if (error) return toast.error("Erro ao salvar link");
    toast.success("Link do Google salvo!");
  };

  const handleAdd = async () => {
    if (!form.author_name.trim() || !form.text.trim()) {
      return toast.error("Preencha nome e texto da avaliação");
    }
    const { error } = await supabase.from("site_testimonials").insert([form]);
    if (error) return toast.error("Erro ao adicionar: " + error.message);
    toast.success("Avaliação adicionada!");
    setForm(empty);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir esta avaliação?")) return;
    const { error } = await supabase.from("site_testimonials").delete().eq("id", id);
    if (error) return toast.error("Erro ao excluir");
    toast.success("Excluída!");
    load();
  };

  const handleToggle = async (id: string, active: boolean) => {
    await supabase.from("site_testimonials").update({ active: !active }).eq("id", id);
    load();
  };

  if (loading) return <p className="text-muted-foreground font-body">Carregando...</p>;

  return (
    <div className="space-y-8">
      {/* Link do Google */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <LinkIcon className="w-5 h-5 text-primary" />
          <h2 className="font-heading font-bold text-lg text-foreground">Link público do Google Reviews</h2>
        </div>
        <p className="font-body text-sm text-muted-foreground mb-3">
          URL para onde o botão "Ver todas as avaliações no Google" do site irá apontar.
        </p>
        <div className="flex gap-2">
          <input
            value={googleUrl}
            onChange={(e) => setGoogleUrl(e.target.value)}
            placeholder="https://g.page/r/..."
            className="flex-1 border border-border rounded-lg px-4 py-2 font-body text-sm bg-background"
          />
          <button onClick={handleSaveGoogleUrl} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-heading font-bold text-sm flex items-center gap-2 hover:brightness-110">
            <Save className="w-4 h-4" /> Salvar
          </button>
        </div>
      </div>

      {/* Adicionar nova */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="font-heading font-bold text-lg text-foreground mb-4">Adicionar nova avaliação real</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input value={form.author_name} onChange={(e) => setForm({ ...form, author_name: e.target.value })} placeholder="Nome do cliente" className="border border-border rounded-lg px-4 py-2 font-body text-sm bg-background" />
          <input value={form.author_role} onChange={(e) => setForm({ ...form, author_role: e.target.value })} placeholder="Profissão / Bairro (ex: Médica — Itaim)" className="border border-border rounded-lg px-4 py-2 font-body text-sm bg-background" />
          <input value={form.avatar_url} onChange={(e) => setForm({ ...form, avatar_url: e.target.value })} placeholder="URL da foto (opcional)" className="border border-border rounded-lg px-4 py-2 font-body text-sm bg-background" />
          <input value={form.review_link} onChange={(e) => setForm({ ...form, review_link: e.target.value })} placeholder="Link da avaliação no Google (opcional)" className="border border-border rounded-lg px-4 py-2 font-body text-sm bg-background" />
          <input type="date" value={form.review_date} onChange={(e) => setForm({ ...form, review_date: e.target.value })} className="border border-border rounded-lg px-4 py-2 font-body text-sm bg-background" />
          <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="border border-border rounded-lg px-4 py-2 font-body text-sm bg-background">
            {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} estrelas</option>)}
          </select>
        </div>
        <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="Texto da avaliação" rows={3} className="w-full mt-4 border border-border rounded-lg px-4 py-2 font-body text-sm bg-background" />
        <button onClick={handleAdd} className="mt-4 bg-primary text-primary-foreground px-5 py-2 rounded-lg font-heading font-bold text-sm flex items-center gap-2 hover:brightness-110">
          <Plus className="w-4 h-4" /> Adicionar avaliação
        </button>
      </div>

      {/* Lista */}
      <div className="space-y-3">
        <h2 className="font-heading font-bold text-lg text-foreground">Avaliações cadastradas ({items.length})</h2>
        {items.length === 0 && (
          <div className="bg-card border border-dashed border-border rounded-2xl p-8 text-center">
            <p className="font-body text-muted-foreground">Nenhuma avaliação cadastrada. As avaliações fictícias do site só desaparecem quando você cadastrar pelo menos uma real.</p>
          </div>
        )}
        {items.map((t) => (
          <div key={t.id} className="bg-card border border-border rounded-xl p-5 flex gap-4 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-heading font-bold text-foreground">{t.author_name}</span>
                <span className="font-body text-xs text-muted-foreground">— {t.author_role}</span>
                <div className="flex gap-0.5 ml-2">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                  ))}
                </div>
              </div>
              <p className="font-body text-sm text-foreground mb-2">"{t.text}"</p>
              <p className="font-body text-xs text-muted-foreground">{new Date(t.review_date).toLocaleDateString("pt-BR")}</p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <button onClick={() => handleToggle(t.id, t.active)} className={`text-xs px-3 py-1 rounded-full font-bold ${t.active ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
                {t.active ? "Ativa" : "Inativa"}
              </button>
              <button onClick={() => handleDelete(t.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsTab;
