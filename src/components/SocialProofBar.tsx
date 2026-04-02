const SocialProofBar = () => {
  return (
    <section className="py-12 bg-secondary border-y border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-8">
          <p className="font-heading font-semibold text-foreground text-lg">
            Mais de <span className="text-primary font-extrabold">5.000</span> clientes satisfeitos confiam na Guio Clean
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-40">
          {["Residencial", "Comercial", "Condomínios", "Clínicas", "Escritórios"].map((item) => (
            <span key={item} className="font-heading font-bold text-lg md:text-xl text-foreground tracking-wide uppercase">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofBar;
