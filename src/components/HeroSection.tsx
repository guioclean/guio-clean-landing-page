import { useCoupon } from "@/contexts/CouponContext";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => {
  const { getWhatsAppUrl } = useCoupon();

  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 overflow-hidden bg-background flex items-center">
      {/* Decorative blobs */}
      <div className="absolute top-[5%] right-[10%] w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-[20%] right-[25%] w-24 h-24 bg-primary/15 rounded-full pointer-events-none" />
      <div className="absolute bottom-[30%] right-[15%] w-16 h-16 bg-primary/10 rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Content */}
          <div className="space-y-8 max-w-xl text-center lg:text-left animate-fade-in">
            <h1 className="font-heading font-extrabold text-5xl md:text-6xl lg:text-[4.2rem] text-foreground leading-[1.08]">
              Agência de Diaristas{" "}
              <span className="text-primary">em São Paulo</span>
            </h1>
            
            <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
              Diaristas profissionais treinadas e verificadas para cuidar do seu lar, escritório ou clínica. Agende sua limpeza profissional em segundos, de forma simples e rápida.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a
                href={getWhatsAppUrl("Olá! Vim pelo site da Guio Clean e quero agendar uma limpeza.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-primary/25 hover:brightness-110 hover:-translate-y-1 transition-all duration-300"
              >
                Agendar Agora
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#servicos"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-foreground font-heading font-semibold text-base px-8 py-4 rounded-xl border border-border hover:bg-muted transition-all duration-300"
              >
                <Play className="w-4 h-4 text-primary" />
                Ver Serviços
              </a>
            </div>

            {/* Stats row */}
            <div className="pt-6 flex flex-wrap justify-center lg:justify-start gap-8">
              <div>
                <p className="font-heading font-extrabold text-3xl text-foreground">5k+</p>
                <p className="font-body text-sm text-muted-foreground">Clientes atendidos</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="font-heading font-extrabold text-3xl text-foreground">4.9</p>
                <p className="font-body text-sm text-muted-foreground">Avaliação média</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="font-heading font-extrabold text-3xl text-foreground">98%</p>
                <p className="font-body text-sm text-muted-foreground">Satisfação</p>
              </div>
            </div>
          </div>

          {/* Right Column: Person photo */}
          <div className="relative hidden lg:flex items-center justify-center animate-fade-in">
            {/* Background decorative shape */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[420px] h-[420px] bg-primary/10 rounded-full" />
            </div>
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=75&w=600&h=700"
                width={480}
                height={560}
                fetchPriority="high"
                decoding="async"
                className="w-[480px] h-[560px] object-cover rounded-3xl shadow-2xl" 
                alt="Diarista profissional da agência Guio Clean realizando limpeza residencial em São Paulo" 
              />
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-8 bg-card rounded-2xl shadow-xl p-5 border border-border animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                    <span className="text-lg font-bold">⭐</span>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-foreground text-sm">+5.000 Clientes</p>
                    <p className="font-body text-xs text-muted-foreground">Avaliação 4.9/5</p>
                  </div>
                </div>
              </div>
              {/* Floating accent card top right */}
              <div className="absolute -top-4 -right-6 bg-primary rounded-2xl shadow-xl p-4 text-primary-foreground animate-fade-in">
                <p className="font-heading font-bold text-sm">Agende em</p>
                <p className="font-heading font-extrabold text-2xl">30 seg</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
