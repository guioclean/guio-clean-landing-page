import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Carolina Mendes",
    profession: "Arquiteta",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    rating: 5,
    text: "Minha rotina no escritório sempre foi cheia, mas ter a Guio Clean mudou tudo. Chego em casa e o cheiro de limpeza traz uma paz absurda.",
  },
  {
    name: "Dr. Roberto Freitas",
    profession: "Médico Oftalmologista",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    rating: 5,
    text: "O nível de higienização na nossa clínica subiu exponencialmente. Cuidam dos consultórios com os produtos certos e nunca tivemos um atraso.",
  },
  {
    name: "Mariana Souza",
    profession: "Mãe e Empreendedora",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    rating: 5,
    text: "A limpeza pós-obra foi um investimento perfeito. Parecia mágica ver tudo brilhando no mesmo dia. Recomendo de olhos fechados!",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: rating }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
    ))}
  </div>
);

const TestimonialsSection = () => {
  return (
    <section id="depoimentos" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-primary font-heading font-bold tracking-wider text-sm uppercase mb-3 block">Depoimentos</span>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-foreground mb-4">
            O que dizem nossos clientes
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            A satisfação de quem confiou em nosso trabalho é o combustível para buscarmos sempre a perfeição.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative"
            >
              <Quote className="w-8 h-8 text-primary/15 absolute top-6 right-6" />
              <div className="mb-4">
                <StarRating rating={t.rating} />
              </div>
              <p className="font-body text-foreground leading-relaxed flex-1 mb-8">
                "{t.text}"
              </p>
              
              <div className="flex items-center gap-3 mt-auto pt-6 border-t border-border">
                <img 
                  src={t.avatar} 
                  alt={`Foto de ${t.name}`}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <h4 className="font-heading font-bold text-sm text-foreground">{t.name}</h4>
                  <p className="font-body text-xs text-primary font-medium">{t.profession}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
