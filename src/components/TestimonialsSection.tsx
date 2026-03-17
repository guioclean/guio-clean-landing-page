import { Star } from "lucide-react";

// Mock das avaliações do Google Meu Negócio/Clientes Reais
const testimonials = [
  {
    name: "Carolina Mendes",
    profession: "Arquiteta",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    rating: 5,
    text: "Minha rotina no escritório sempre foi cheia, mas ter a Guio Clean mudou tudo. Chego em casa e o cheiro de limpeza traz uma paz absurda. Equipe discreta e de total confiança.",
  },
  {
    name: "Dr. Roberto Freitas",
    profession: "Médico Oftalmologista",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    rating: 5,
    text: "O nível de higienização na nossa clínica subiu exponencialmente. Cuidam dos consultórios com os produtos certos e nunca tivemos um atraso. Recomendo de olhos fechados.",
  },
  {
    name: "Mariana Souza",
    profession: "Mãe e Empreendedora",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    rating: 5,
    text: "Depois da reforma do apartamento novo, a poeira não saía de jeito nenhum. A limpeza pós-obra foi um investimento perfeito. Parecia mágica ver tudo brilhando no mesmo dia.",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: rating }).map((_, i) => (
      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

const TestimonialsSection = () => {
  return (
    <section id="depoimentos" className="py-24 bg-white relative overflow-hidden">
      {/* Decoração sutil de fundo */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-wider text-sm uppercase mb-3 block">Comunidade</span>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-slate-900 mb-6">
            O que dizem nossos clientes
          </h2>
          <p className="font-body text-slate-600 text-lg max-w-2xl mx-auto">
            A satisfação de quem confiou em nosso trabalho é o combustível para buscarmos sempre a perfeição.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="bg-slate-50 border border-slate-100 rounded-3xl p-8 shadow-sm transition-all duration-300 flex flex-col h-full"
            >
               <div className="mb-6">
                <StarRating rating={t.rating} />
              </div>
              <p className="font-body text-lg text-slate-700 leading-relaxed italic flex-1 mb-8">
                "{t.text}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={t.avatar} 
                  alt={`Foto de ${t.name}`}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-primary/20"
                />
                <div>
                  <h4 className="font-heading font-bold text-slate-900">{t.name}</h4>
                  <p className="font-body text-sm text-primary font-medium">{t.profession}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://g.page/r/guioclean-reviews" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-slate-900 text-white font-heading font-bold px-10 py-4 rounded-full shadow-xl hover:bg-slate-800 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >
            Ver Avaliações
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
