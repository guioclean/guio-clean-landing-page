import heroImage from "@/assets/hero-cleaning.jpg";

const HeroSection = () => {
  const whatsappUrl = "https://wa.me/5511994699815?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento!";

  return (
    <section className="min-h-screen flex items-center bg-background pt-20 relative overflow-hidden">
      {/* Decorative bubble */}
      <div className="absolute top-32 right-20 w-64 h-64 rounded-full bg-primary/5 bubble-float pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-primary/5 bubble-float pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
              Precisando de uma faxina?{" "}
              <span className="text-primary">A Guio Clean pode te ajudar.</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-lg leading-relaxed">
              Diaristas experientes e profissionais prontas para transformar seu ambiente.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-primary-foreground font-heading font-bold text-lg px-10 py-4 rounded-lg hover:opacity-90 transition-opacity"
            >
              Solicitar Orçamento
            </a>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img
                src={heroImage}
                alt="Profissional de limpeza com luvas amarelas limpando superfície de vidro"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
