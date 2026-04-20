import { useState } from "react";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/guioclean-logo.png";
import { useCoupon } from "@/contexts/CouponContext";

type FormState = "idle" | "sending" | "success" | "error";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", region: "", message: "" });
  const [status, setStatus] = useState<FormState>("idle");
  const { getWhatsAppUrl } = useCoupon();

  const regions = [
    "Centro", "Zona Sul", "Zona Leste", "Zona Norte", "Zona Oeste", "Grande SP (Outro)"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const FORMSPREE_ID = "YOUR_FORM_ID";

    if (FORMSPREE_ID === "YOUR_FORM_ID") {
      const text = `Olá! Meu nome é ${form.name}. Sou da região: ${form.region}. ${form.message}`;
      window.open(getWhatsAppUrl(text), "_blank");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-foreground/5 border border-foreground/10 rounded-xl px-5 py-4 font-body text-base text-primary-foreground placeholder:text-primary-foreground/40 outline-none focus:border-primary focus:bg-foreground/10 transition-colors";

  return (
    <footer id="contato" className="bg-foreground text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none translate-x-[30%] -translate-y-[20%]" />

      <div className="container mx-auto px-6 py-24 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Form */}
          <div className="bg-primary-foreground/5 p-10 rounded-3xl backdrop-blur-sm border border-primary-foreground/10 shadow-2xl">
            <h3 className="font-heading font-extrabold text-3xl mb-2">Fale Conosco</h3>
            <p className="font-body text-primary-foreground/60 mb-8">
              Pronto para transformar seu espaço? Preencha os dados abaixo.
            </p>

            {status === "success" ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✅</span>
                </div>
                <h4 className="font-heading font-bold text-xl mb-2">Contato Enviado!</h4>
                <p className="font-body text-primary-foreground/60 mb-6">Em breve retornaremos sua mensagem.</p>
                <button
                  onClick={() => { setStatus("idle"); setForm({name:"", email:"", region:"", message:""}); }}
                  className="text-primary hover:text-primary-foreground transition-colors underline"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" aria-label="Formulário de contato Guio Clean">
                <div>
                  <label htmlFor="contact-name" className="sr-only">Nome completo</label>
                  <input id="contact-name" name="name" type="text" placeholder="Seu nome completo" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} autoComplete="name" />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-email" className="sr-only">E-mail</label>
                    <input id="contact-email" name="email" type="email" placeholder="Seu e-mail" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} autoComplete="email" />
                  </div>
                  <div>
                    <label htmlFor="contact-region" className="sr-only">Região</label>
                    <select id="contact-region" name="region" required value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} className={`${inputClass} appearance-none cursor-pointer ${form.region === "" ? "text-primary-foreground/40" : ""}`}>
                      <option value="" disabled>Selecione a Região</option>
                      {regions.map(r => <option key={r} value={r} className="text-foreground">{r}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="sr-only">Mensagem</label>
                  <textarea id="contact-message" name="message" placeholder="Como podemos te ajudar?" required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} resize-none`} />
                </div>
                
                {status === "error" && (
                  <p role="alert" className="text-destructive text-sm">Erro ao enviar. Tente novamente ou chame no WhatsApp.</p>
                )}

                <button type="submit" disabled={status === "sending"} className="w-full bg-primary text-primary-foreground font-heading font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 hover:brightness-110 transition-all duration-300 disabled:opacity-60">
                  {status === "sending" ? "Enviando..." : "Enviar Solicitação"}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center space-y-12">
            <div>
              <img src={logo} alt="Logo Guio Clean — Agência de diaristas em São Paulo" width={200} height={56} loading="lazy" decoding="async" className="h-14 w-auto brightness-0 invert mb-6" />
              <p className="font-body text-primary-foreground/60 text-lg leading-relaxed max-w-md">
                Experiência Guio Clean na limpeza do seu dia a dia. Compromisso com a segurança, praticidade e tranquilidade que você merece.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h4 className="font-heading font-bold text-accent uppercase tracking-widest text-sm mb-4">Central de Atendimento</h4>
                <div className="space-y-3 font-body">
                  <a href="https://wa.me/5511994699815" className="group flex flex-col hover:text-primary transition-colors">
                    <span className="text-primary-foreground/50 text-sm mb-1">São Paulo e Grande SP</span>
                    <span className="font-bold text-xl">(11) 99469-9815</span>
                  </a>
                  <div className="pt-2">
                    <p className="text-primary-foreground/50 text-sm">E-mail</p>
                    <p className="font-bold">contato@guioclean.com.br</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-heading font-bold text-primary-foreground uppercase tracking-widest text-sm mb-4">Acesso Rápido</h4>
                <ul className="space-y-3 font-body text-primary-foreground/60">
                  <li><a href="#servicos" className="hover:text-accent transition-colors">Nossos Serviços</a></li>
                  <li><a href="#depoimentos" className="hover:text-accent transition-colors">Avaliações</a></li>
                  <li><a href="#planos" className="hover:text-accent transition-colors">Planos Assinatura</a></li>
                </ul>
              </div>
            </div>

            {/* Social & Legal */}
            <div className="pt-10 border-t border-primary-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex gap-4">
                <a href="#" aria-label="Siga a Guio Clean no Instagram" className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:-translate-y-1">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="#" aria-label="Siga a Guio Clean no Facebook" className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:-translate-y-1">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-body text-primary-foreground/40 text-sm text-center sm:text-right">
                  © {new Date().getFullYear()} Guio Clean | CNPJ 32.500.521/0001-02
                </p>
                <a href="/admin" target="_blank" rel="noopener noreferrer" aria-label="Acessar área administrativa" className="text-primary-foreground/30 hover:text-primary-foreground/70 transition-colors" title="Área administrativa">
                  <Settings className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactSection;
