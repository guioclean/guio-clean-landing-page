import { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "Limpeza Residencial e Comercial",
    description: "Ambientes impecáveis, do chão ao teto. Cuidamos de cada detalhe para que você aproveite seu espaço com tranquilidade.",
  },
  {
    title: "Passadoria",
    description: "Roupas sempre alinhadas e prontas para uso. Nosso serviço de passadoria cuida do seu guarda-roupa com esmero.",
  },
  {
    title: "Personal Organizer",
    description: "Organização inteligente para cada cômodo. Transformamos o caos em funcionalidade e harmonia.",
  },
  {
    title: "Pós Obras",
    description: "Limpeza pesada após reformas e construções. Removemos resíduos, poeira e entulho com eficiência total.",
  },
];

const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = itemRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0.5 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicos" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground text-center mb-16">
          Nossos Serviços
        </h2>

        <div className="max-w-2xl mx-auto space-y-12">
          {services.map((service, i) => (
            <div
              key={service.title}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="relative py-6 px-4 transition-colors duration-500"
            >
              {/* Signature moment: bubble behind active item */}
              {activeIndex === i && (
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-primary/8 bubble-float pointer-events-none" />
              )}

              <h3
                className={`font-heading font-bold text-xl md:text-2xl mb-3 transition-colors duration-500 relative z-10 ${
                  activeIndex === i ? "text-primary" : "text-foreground"
                }`}
              >
                {service.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed relative z-10">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
