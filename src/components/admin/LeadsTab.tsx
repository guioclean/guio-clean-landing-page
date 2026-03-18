import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Lead = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  region: string | null;
  message: string | null;
  source: string | null;
  created_at: string;
};

const LeadsTab = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      const { data } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      setLeads(data || []);
      setLoading(false);
    };
    fetchLeads();
  }, []);

  if (loading) return <p className="text-muted-foreground">Carregando leads...</p>;

  if (leads.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-12 text-center">
        <p className="text-muted-foreground font-body text-lg">Nenhum lead registrado ainda.</p>
        <p className="text-muted-foreground/60 font-body text-sm mt-2">
          Os leads aparecerão aqui quando os clientes preencherem o formulário do site.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary">
              <th className="text-left px-4 py-3 font-heading font-bold text-foreground">Nome</th>
              <th className="text-left px-4 py-3 font-heading font-bold text-foreground">E-mail</th>
              <th className="text-left px-4 py-3 font-heading font-bold text-foreground">Região</th>
              <th className="text-left px-4 py-3 font-heading font-bold text-foreground">Mensagem</th>
              <th className="text-left px-4 py-3 font-heading font-bold text-foreground">Origem</th>
              <th className="text-left px-4 py-3 font-heading font-bold text-foreground">Data</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground">{lead.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{lead.email || "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">{lead.region || "—"}</td>
                <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">{lead.message || "—"}</td>
                <td className="px-4 py-3">
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">
                    {lead.source || "site"}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs">
                  {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsTab;
