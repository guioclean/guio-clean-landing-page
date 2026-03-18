import { useCoupon } from "@/contexts/CouponContext";

const services = [
  {
    title: "Limpeza Residencial",
    description: "Para casas e apartamentos. Uma faxina detalhada que deixa cada cantinho impecável, para você focar no que realmente importa.",
    bgImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80",
    whatsappContext: "Olá! Tenho interesse no serviço de Limpeza Residencial da Guio Clean.",
  },
  {
    title: "Limpeza Comercial",
    description: "Ambientes de trabalho limpos e organizados aumentam a produtividade da equipe e passam credibilidade para clientes.",
    bgImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
    whatsappContext: "Olá! Tenho interesse no serviço de Limpeza Comercial da Guio Clean.",
  },
  {
    title: "Limpeza Pós-Obra",
    description: "Soluções especializadas para remover poeira, respingos de tinta e resíduos de construção, revelando a beleza do seu novo espaço.",
    bgImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80",
    whatsappContext: "Olá! Preciso de uma Limpeza Pós-Obra com a Guio Clean.",
  },
  {
    title: "Limpeza de Vidros",
    description: "Técnicas e produtos específicos para vidros e espelhos sem manchas, garantindo a máxima transparência e entrada de luz.",
    bgImage: "https://images.unsplash.com/photo-1620023412581-22442cfcc334?auto=format&fit=crop&q=80",
    whatsappContext: "Olá! Tenho interesse no serviço de Limpeza de Vidros da Guio Clean.",
  },
];

const ServicesSection = () => {
  const { getWhatsAppUrl } = useCoupon();

  return (
    <section id="servicos" className="py-24 bg-secondary">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-accent font-bold tracking-wider text-sm uppercase mb-3 block">Excelência</span>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-foreground mb-6 relative inline-block">
            Nossos Serviços
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Soluções personalizadas desenhadas para atender as necessidades específicas do seu espaço.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mt-12">
          {services.map((service, idx) => (
            <div 
              key={idx}
              className="group bg-card rounded-[2.5rem] p-6 lg:p-8 shadow-xl hover:shadow-[0_20px_40px_rgba(90,56,181,0.15)] hover:-translate-y-3 transition-all duration-500 cursor-pointer flex flex-col items-center text-center border-b-4 border-transparent hover:border-primary/40"
            >
              <div className="relative w-48 h-48 mx-auto mb-8 mt-4">
                <div className={`absolute inset-0 bg-secondary rounded-[2.5rem] transform ${idx % 2 === 0 ? 'rotate-12' : '-rotate-12'} scale-105 group-hover:rotate-0 transition-transform duration-500 shadow-inner`} />
                <div className={`absolute inset-0 bg-primary/10 rounded-[2.5rem] transform ${idx % 2 === 0 ? '-rotate-6' : 'rotate-6'} scale-100 group-hover:rotate-0 transition-transform duration-700`} />
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-card transform transition-transform duration-500 group-hover:scale-105">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                    style={{ backgroundImage: `url(${service.bgImage})` }}
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>
              
              <h3 className="font-heading font-extrabold text-2xl text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed text-[15px] mb-8 flex-grow">
                {service.description}
              </p>
              
              <a
                href={getWhatsAppUrl(service.whatsappContext)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-secondary text-primary font-heading font-bold px-6 py-4 rounded-xl border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-transparent transition-all duration-300"
              >
                Orçamento Rápido
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
