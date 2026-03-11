import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Com quanto tempo de antecedência devo agendar o serviço?",
    answer:
      "Recomendamos agendar com pelo menos 48 horas de antecedência para garantir disponibilidade. Para serviços urgentes, entre em contato via WhatsApp e verificaremos nossa agenda.",
  },
  {
    question: "Os produtos de limpeza são fornecidos pelas profissionais?",
    answer:
      "Sim! Nossas profissionais chegam equipadas com todos os produtos e materiais necessários. Utilizamos produtos de qualidade profissional, eficazes e seguros para sua família e pets.",
  },
  {
    question: "E se eu não ficar satisfeito com o serviço?",
    answer:
      "A sua satisfação é nossa prioridade. Caso não esteja satisfeito com algum item, basta nos comunicar em até 24 horas após o serviço e retornaremos para corrigir sem custo adicional.",
  },
  {
    question: "As diaristas são de confiança? Como é feita a seleção?",
    answer:
      "Todas as nossas profissionais passam por um rigoroso processo de seleção que inclui entrevista, verificação de antecedentes criminais e checagem de referências. Trabalhamos apenas com profissionais qualificadas e de confiança.",
  },
  {
    question: "Vocês atendem finais de semana e feriados?",
    answer:
      "Sim! Temos disponibilidade em finais de semana e alguns feriados, sujeito à disponibilidade da agenda. Entre em contato para verificar horários específicos.",
  },
  {
    question: "Como é feito o pagamento?",
    answer:
      "Aceitamos pagamento via PIX, cartão de débito, crédito e dinheiro. O pagamento é realizado após a conclusão do serviço, garantindo sua satisfação antes da cobrança.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-14">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            Perguntas Frequentes
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            Tudo o que você precisa saber antes de contratar nosso serviço.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white border border-border rounded-xl px-6 data-[state=open]:shadow-sm"
            >
              <AccordionTrigger className="font-heading font-semibold text-foreground text-left hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-body text-muted-foreground leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
