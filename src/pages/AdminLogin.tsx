import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setError("Credenciais inválidas. Tente novamente.");
      setLoading(false);
      return;
    }

    // Check if user has admin role
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("Erro ao verificar permissões.");
      setLoading(false);
      return;
    }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin");

    if (!roles || roles.length === 0) {
      setError("Acesso restrito. Você não tem permissão de administrador.");
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-foreground flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl p-10 shadow-2xl border border-border">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-foreground text-center mb-2">
            Área Administrativa
          </h1>
          <p className="font-body text-muted-foreground text-center mb-8">
            Guio Clean — Acesso restrito
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="E-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl px-5 py-4 font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
            />
            <input
              type="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl px-5 py-4 font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
            />

            {error && (
              <p className="text-destructive text-sm font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-heading font-bold text-lg py-4 rounded-xl hover:brightness-110 transition-all disabled:opacity-60"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <a href="/" className="block text-center mt-6 text-muted-foreground hover:text-primary text-sm transition-colors">
            ← Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
