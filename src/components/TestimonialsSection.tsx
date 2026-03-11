import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ana Paula Silva",
    location: "Moradia em Pinheiros, SP",
    rating: 5,
    text: "Contratei a Guio Clean para uma limpeza quinzenal e fiquei impressionada com o resultado! Meu apartamento ficou impecável, com atenção a cada detalhe. As profissionais são pontuais, educadas e muito cuidadosas com os móveis.",
    initials: "AP",
  },
  {
    name: "Roberto Fernandes",
    location: "Escritório em Itaim Bibi, SP",
    rating: 5,
    text: "Precisávamos de uma solução para manter nosso escritório sempre apresentável para clientes. A Guio Clean superou todas as expectativas — ambiente sempre limpo, sem precisar me preocupar com nada. Recomendo demais!",
    initials: "RF",
  },
  {
    name: "Fernanda Costa",
    location: "Casa em Moema, SP",
    rating: 5,
    text: "Contratei para limpeza pós-obra na minha casa nova e o serviço foi excelente! Aquela sujeira de construção que parecia impossível de tirar desapareceu completamente. Profissionalismo e dedicação de verdade.",
    initials: "FC",
  },
  {
    name: "Marcos Oliveira",
    location: "Clínica Médica em Santo André, SP",
    rating: 5,
    text: "A Guio Clean cuida da higienização da nossa clínica há 8 meses. A seriedade, pontualidade e qualidade do serviço nos dão total confiança. É essencial para a saúde dos nossos pacientes e da equipe.",
    initials: "MO",
  },
  {
    name: "Juliana Mendes",
    location: "Apartamento em Vila Mariana, SP",
    rating: 5,
    text: "Finalmente encontrei um serviço de limpeza confiável! As profissionais tratam minha casa como se fosse delas. Minha gata e meus vasos de planta sempre ficam seguros. Renovei o contrato sem pensar duas vezes.",
    initials: "JM",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: rating }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
            A satisfação de quem confiou em nosso trabalho é a nossa maior recompensa.
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((t, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="bg-white border border-border rounded-2xl p-6 h-full flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <StarRating rating={t.rating} />
                  <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-sm flex-shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-sm text-foreground">
                        {t.name}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        {t.location}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="relative static translate-y-0" />
            <CarouselNext className="relative static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
