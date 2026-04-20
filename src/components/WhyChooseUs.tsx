import { ShieldCheck, CalendarCheck, Sparkles, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Comodidade Total",
    description: "Cuidamos de tudo. Dos produtos ao treinamento, você não se preocupa com nada."
  },
  {
    icon: CalendarCheck,
    title: "Agendamento Rápido",
    description: "Escolha a data e horário que melhor atendem à sua rotina, em poucos cliques."
  },
  {
    icon: ShieldCheck,
    title: "Segurança Garantida",
    description: "Profissionais rigorosamente selecionados com checagem completa de antecedentes."
  },
  {
    icon: HeartHandshake,
    title: "Atendimento Humanizado",
    description: "Equipe dedicada a entender suas necessidades e superar suas expectativas."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-gradient-soft">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image + CTA */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=75&w=600&h=500"
              width={600}
              height={500}
              loading="lazy"
              decoding="async"
              alt="Profissional de limpeza profissional da agência de diaristas Guio Clean"
              className="w-full h-[480px] object-cover rounded-3xl shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl hidden md:block">
              <p className="font-heading font-extrabold text-3xl">98%</p>
              <p className="font-body text-sm opacity-90">Satisfação dos clientes</p>
            </div>
          </div>

          {/* Right: Text + Feature cards */}
          <div className="space-y-8">
            <div>
              <span className="text-primary font-heading font-bold tracking-wider text-sm uppercase mb-3 block">Por que nos escolher</span>
              <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-foreground mb-4 leading-tight">
                Sua agência de diaristas cuida da limpeza,{" "}
                <span className="text-primary">você foca no que importa.</span>
              </h2>
              <p className="font-body text-muted-foreground text-lg">
                Entregamos muito mais do que limpeza: entregamos qualidade de vida e tranquilidade para o seu dia a dia.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="bg-secondary rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
