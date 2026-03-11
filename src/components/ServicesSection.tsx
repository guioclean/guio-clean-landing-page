const services = [
  {
    title: "Limpeza Residencial",
    description: "Para casas e apartamentos. Uma faxina detalhada que deixa cada cantinho impecável, para você focar no que realmente importa.",
    bgImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80",
  },
  {
    title: "Limpeza Comercial",
    description: "Ambientes de trabalho limpos e organizados aumentam a produtividade da equipe e passam credibilidade para clientes.",
    bgImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
  },
  {
    title: "Limpeza Pós-Obra",
    description: "Soluções especializadas para remover poeira, respingos de tinta e resíduos de construção, revelando a beleza do seu novo espaço.",
    bgImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80",
  },
  {
    title: "Limpeza de Vidros",
    description: "Técnicas e produtos específicos para vidros e espelhos sem manchas, garantindo a máxima transparência e entrada de luz.",
    bgImage: "https://images.unsplash.com/photo-1620023412581-22442cfcc334?auto=format&fit=crop&q=80",
  },
];

const ServicesSection = () => {
  const whatsappUrl = "https://wa.me/5511994699815?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os!";

  return (
    <section id="servicos" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-yellow-500 font-bold tracking-wider text-sm uppercase mb-3 block">Excelência</span>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-slate-900 mb-6 relative inline-block">
            Nossos Serviços
          </h2>
          <p className="font-body text-slate-600 text-lg max-w-2xl mx-auto">
            Soluções personalizadas desenhadas para atender as necessidades específicas do seu espaço.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service, idx) => (
            <div 
              key={idx}
              className="group relative h-[420px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${service.bgImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end">
                <h3 className="font-heading font-bold text-3xl text-white mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {service.title}
                </h3>
                <p className="font-body text-white/80 leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {service.description}
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit bg-primary text-white font-heading font-bold px-8 py-3 rounded-xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-150 shadow-lg shadow-primary/30 hover:brightness-110"
                >
                  Saiba Mais
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
