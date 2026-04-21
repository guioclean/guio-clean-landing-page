import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save } from "lucide-react";

const KEYS = [
  // Hero stats
  { key: "hero_stat_1_value", label: "Hero — Estatística 1 (número)", placeholder: "5k+", group: "Hero" },
  { key: "hero_stat_1_label", label: "Hero — Estatística 1 (rótulo)", placeholder: "Clientes atendidos", group: "Hero" },
  { key: "hero_stat_2_value", label: "Hero — Estatística 2 (número)", placeholder: "4.9", group: "Hero" },
  { key: "hero_stat_2_label", label: "Hero — Estatística 2 (rótulo)", placeholder: "Avaliação média", group: "Hero" },
  { key: "hero_stat_3_value", label: "Hero — Estatística 3 (número)", placeholder: "98%", group: "Hero" },
  { key: "hero_stat_3_label", label: "Hero — Estatística 3 (rótulo)", placeholder: "Satisfação", group: "Hero" },
  // Testimonials header
  { key: "testimonials_eyebrow", label: "Depoimentos — Etiqueta superior", placeholder: "Depoimentos", group: "Depoimentos" },
  { key: "testimonials_title", label: "Depoimentos — Título principal", placeholder: "Avaliações reais no Google", group: "Depoimentos" },
  { key: "testimonials_rating", label: "Depoimentos — Nota exibida", placeholder: "4,9", group: "Depoimentos" },
  { key: "testimonials_rating_caption", label: "Depoimentos — Legenda da nota", placeholder: "baseado em +5.000 clientes", group: "Depoimentos" },
  { key: "testimonials_subtitle", label: "Depoimentos — Subtítulo", placeholder: "Veja o que dizem nossos clientes...", group: "Depoimentos", textarea: true },
];

const ContentTab = () => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("quote_settings")
        .select("key, text_value")
        .in("key", KEYS.map((k) => k.key));
      const map: Record<string, string> = {};
      KEYS.forEach((k) => { map[k.key] = ""; });
      data?.forEach((row) => { map[row.key] = row.text_value || ""; });
      setValues(map);
      setLoading(false);
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const k of KEYS) {
        const { data: existing } = await supabase
          .from("quote_settings")
          .select("id")
          .eq("key", k.key)
          .maybeSingle();

        if (existing) {
          await supabase
            .from("quote_settings")
            .update({ text_value: values[k.key] ?? "" })
            .eq("id", existing.id);
        } else {
          await supabase
            .from("quote_settings")
            .insert({ key: k.key, value: 0, text_value: values[k.key] ?? "" });
        }
      }
      toast.success("Conteúdo atualizado! Recarregue o site para ver.");
    } catch (e) {
      toast.error("Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-muted-foreground font-body">Carregando...</p>;

  const groups = Array.from(new Set(KEYS.map((k) => k.group)));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-foreground">Conteúdo do Site</h2>
          <p className="font-body text-muted-foreground text-sm">Edite os textos exibidos no Hero e na seção de Depoimentos.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold px-5 py-2.5 rounded-lg hover:brightness-110 transition disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Salvando..." : "Salvar alterações"}
        </button>
      </div>

      {groups.map((group) => (
        <section key={group} className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h3 className="font-heading font-bold text-lg text-foreground">{group}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {KEYS.filter((k) => k.group === group).map((k) => (
              <div key={k.key} className={k.textarea ? "sm:col-span-2" : ""}>
                <label htmlFor={k.key} className="block font-body text-sm font-medium text-foreground mb-1.5">
                  {k.label}
                </label>
                {k.textarea ? (
                  <textarea
                    id={k.key}
                    value={values[k.key] ?? ""}
                    onChange={(e) => setValues({ ...values, [k.key]: e.target.value })}
                    placeholder={k.placeholder}
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                ) : (
                  <input
                    id={k.key}
                    type="text"
                    value={values[k.key] ?? ""}
                    onChange={(e) => setValues({ ...values, [k.key]: e.target.value })}
                    placeholder={k.placeholder}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ContentTab;
