const plans = [
  {
    title: "Semanal",
    subtitle: "Ideal para rotinas intensas",
    features: ["Limpeza completa semanal", "Profissional fixa dedicada", "Produtos inclusos", "Agendamento flexível"],
    recommended: false,
  },
  {
    title: "Quinzenal",
    subtitle: "O equilíbrio perfeito",
    features: ["Limpeza completa quinzenal", "Profissional fixa dedicada", "Produtos inclusos", "Melhor custo-benefício"],
    recommended: true,
  },
  {
    title: "Mensal",
    subtitle: "Manutenção essencial",
    features: ["Limpeza completa mensal", "Profissional fixa dedicada", "Produtos inclusos", "Ideal para manutenção"],
    recommended: false,
  },
];

const PlansSection = () => {
  const whatsappUrl = "https://wa.me/5511994699815?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20planos!";

  return (
    <section id="planos" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground text-center mb-16">
          Nossos Planos
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`bg-background rounded-xl p-8 flex flex-col items-center text-center transition-all ${
                plan.recommended ? "border-2 border-accent ring-1 ring-accent/30" : "border border-border"
              }`}
            >
              {plan.recommended && (
                <span className="font-heading font-bold text-xs tracking-widest uppercase text-accent-foreground bg-accent px-4 py-1 rounded-full mb-4">
                  Recomendado
                </span>
              )}
              <h3 className="font-heading font-bold text-2xl text-primary mb-2">{plan.title}</h3>
              <p className="font-body text-muted-foreground text-sm mb-8">{plan.subtitle}</p>

              <ul className="space-y-3 mb-8 w-full text-left">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 font-body text-sm text-foreground">
                    <svg width="16" height="16" viewBox="0 0 16 16" className="text-primary flex-shrink-0">
                      <path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto w-full bg-primary text-primary-foreground font-heading font-bold text-sm py-3 rounded-lg text-center block hover:opacity-90 transition-opacity"
              >
                Solicitar Orçamento
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
