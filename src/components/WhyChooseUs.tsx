import { ShieldCheck, Clock, Award, ThumbsUp } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Profissionais Verificadas",
    description:
      "Todas as nossas diaristas passam por rigoroso processo de seleção, com verificação de antecedentes e referências.",
  },
  {
    icon: Clock,
    title: "Pontualidade Garantida",
    description:
      "Respeitamos o seu tempo. Nossas profissionais chegam sempre no horário combinado, sem atrasos.",
  },
  {
    icon: Award,
    title: "Serviço de Alta Qualidade",
    description:
      "Utilizamos produtos de primeira linha e técnicas eficientes para garantir o mais alto padrão de limpeza.",
  },
  {
    icon: ThumbsUp,
    title: "Satisfação 100% Garantida",
    description:
      "Ficou insatisfeito? Retornamos para refazer o serviço sem custo adicional. Sua satisfação é nossa prioridade.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            Por que escolher a Guio Clean?
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
            Mais do que limpeza — entregamos confiança, qualidade e tranquilidade para a sua rotina.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 flex flex-col items-start gap-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground">
                  {reason.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
