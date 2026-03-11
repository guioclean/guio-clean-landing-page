import { ShieldCheck, CalendarCheck, Sparkles } from "lucide-react";

const pillars = [
  {
    icon: Sparkles,
    title: "Comodidade",
    description: "Nós cuidamos de tudo. Dos produtos de limpeza ao treinamento, você não precisa se preocupar com nenhum detalhe."
  },
  {
    icon: CalendarCheck,
    title: "Praticidade",
    description: "Agendamento rápido e fácil. Escolha a data, o horário e o serviço que melhor atende à sua rotina."
  },
  {
    icon: ShieldCheck,
    title: "Segurança",
    description: "Profissionais rigorosamente selecionadas, com checagem de antecedentes e referências confirmadas."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-yellow-500 font-bold tracking-wider text-sm uppercase mb-3 block">Nossos Pilares</span>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-slate-900 mb-6 relative inline-block">
            Por que escolher a Guio Clean?
          </h2>
          <p className="font-body text-slate-600 text-lg max-w-2xl mx-auto">
            Garantimos uma experiência livre de estresse. Entregamos muito mais do que limpeza: entregamos qualidade de vida.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx} 
                className="bg-slate-50 border border-slate-100 rounded-3xl p-10 flex flex-col items-center text-center group hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-20 h-20 rounded-2xl bg-slate-900 flex items-center justify-center mb-8 relative group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute -inset-2 bg-yellow-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300" />
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900 mb-4">{pillar.title}</h3>
                <p className="font-body text-slate-600 leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
