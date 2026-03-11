import { useState } from "react";
import logo from "@/assets/guioclean-logo.png";

// Para ativar o formulário de e-mail:
// 1. Crie uma conta gratuita em https://formspree.io
// 2. Crie um novo formulário com o e-mail guioclean@gmail.com
// 3. Substitua "YOUR_FORM_ID" abaixo pelo ID gerado (ex: "xpwzjkqb")
const FORMSPREE_ID = "YOUR_FORM_ID";

type FormState = "idle" | "sending" | "success" | "error";

const Footer = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If Formspree not yet configured, fallback to WhatsApp
    if (FORMSPREE_ID === "YOUR_FORM_ID") {
      const text = `Olá! Meu nome é ${encodeURIComponent(form.name)}. ${encodeURIComponent(form.message)}`;
      window.open(`https://wa.me/5511994699815?text=${text}`, "_blank");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _replyto: form.email,
          _subject: `Nova mensagem de ${form.name} - Guio Clean`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg px-4 py-3 font-body text-sm text-primary-foreground placeholder:text-primary-foreground/50 outline-none focus:border-primary-foreground/40 transition-colors";

  return (
    <footer id="contato" className="bg-foreground text-primary-foreground py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Info */}
          <div className="space-y-6">
            <img src={logo} alt="Guio Clean" className="h-12 brightness-0 invert" />
            <p className="font-body text-sm opacity-80 max-w-sm leading-relaxed">
              Limpeza ao seu estilo. Profissionais dedicadas para transformar seu ambiente com qualidade e cuidado.
            </p>
            <div className="space-y-2 font-body text-sm opacity-80">
              <p>
                <a
                  href="https://wa.me/5511994699815"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 transition-opacity"
                >
                  WhatsApp: (11) 99469-9815
                </a>
              </p>
              <p>CNPJ: 32.500.521/0001-02</p>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              {["✓ Profissionais Verificadas", "✓ CNPJ Ativo", "✓ Satisfação Garantida"].map((badge) => (
                <span
                  key={badge}
                  className="text-xs font-body border border-primary-foreground/30 rounded-full px-3 py-1 opacity-80"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-4 pt-2">
              <a href="https://instagram.com/guioclean" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="opacity-70 hover:opacity-100 transition-opacity">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="https://facebook.com/guioclean" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="opacity-70 hover:opacity-100 transition-opacity">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h3 className="font-heading font-bold text-xl mb-6">Entre em Contato</h3>

            {status === "success" ? (
              <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl p-8 text-center space-y-2">
                <p className="text-2xl">✅</p>
                <p className="font-heading font-bold text-lg">Mensagem enviada!</p>
                <p className="font-body text-sm opacity-80">
                  Obrigado por entrar em contato. Retornaremos em breve.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-xs underline opacity-60 hover:opacity-100"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Seu nome"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  required
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
                <textarea
                  placeholder="Sua mensagem"
                  required
                  maxLength={1000}
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
                {status === "error" && (
                  <p className="font-body text-xs text-red-400">
                    Ocorreu um erro. Tente novamente ou nos chame no WhatsApp.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="bg-primary text-primary-foreground font-heading font-bold text-sm px-8 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {status === "sending" ? "Enviando..." : "Enviar Mensagem"}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-3 font-body text-xs opacity-60">
          <p>© 2025 Guio Clean — Limpeza ao seu estilo. Todos os direitos reservados.</p>
          <p>São Paulo, SP</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
