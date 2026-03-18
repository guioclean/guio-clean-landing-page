import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Users, Tag, Calculator } from "lucide-react";

// Tabs
import LeadsTab from "@/components/admin/LeadsTab";
import CouponsTab from "@/components/admin/CouponsTab";
import QuoteCalculator from "@/components/admin/QuoteCalculator";

type Tab = "leads" | "coupons" | "quotes";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("leads");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/admin");
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin");

      if (!roles || roles.length === 0) {
        await supabase.auth.signOut();
        navigate("/admin");
        return;
      }
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <p className="text-muted-foreground font-body">Carregando...</p>
      </div>
    );
  }

  const tabs = [
    { id: "leads" as Tab, label: "Leads", icon: Users },
    { id: "coupons" as Tab, label: "Cupons", icon: Tag },
    { id: "quotes" as Tab, label: "Orçamentos", icon: Calculator },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="font-heading font-extrabold text-xl text-foreground">
            Painel Guio Clean
          </h1>
          <div className="flex items-center gap-4">
            <a href="/" className="text-muted-foreground hover:text-primary text-sm font-body transition-colors">
              Ver site
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-muted-foreground hover:text-destructive text-sm font-body transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sair
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 font-heading font-bold text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "leads" && <LeadsTab />}
        {activeTab === "coupons" && <CouponsTab />}
        {activeTab === "quotes" && <QuoteCalculator />}
      </main>
    </div>
  );
};

export default AdminDashboard;
