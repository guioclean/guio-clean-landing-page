import { CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-cleaning.jpg";
import { useCoupon } from "@/contexts/CouponContext";

const HeroSection = () => {
  const { getWhatsAppUrl } = useCoupon();

  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 overflow-hidden bg-primary flex items-center rounded-b-[2rem]">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] text-pink-300/80 text-2xl rotate-45">+</div>
        <div className="absolute top-[60%] right-[35%] text-pink-300/80 text-xl rotate-45">+</div>
        <div className="absolute top-[35%] left-[55%] w-3 h-3 rounded-full border-[3px] border-accent/80" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="space-y-8 max-w-xl">
            <div className="font-heading font-medium tracking-widest text-sm text-primary-foreground/70 uppercase">
              Bem-vindo à Guio Clean
            </div>
            
            <h1 className="font-heading font-extrabold text-5xl md:text-6xl lg:text-[4rem] text-primary-foreground leading-[1.1]">
              Resolvemos seus problemas de limpeza.
            </h1>
            
            <p className="font-body text-lg md:text-xl text-primary-foreground/80 leading-relaxed font-light">
              Nossa performance é o seu sucesso. Nossa paixão é a inovação no cuidado com o seu ambiente. Entregamos muito mais valor para você.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a
                href={getWhatsAppUrl("Olá! Vim pelo site da Guio Clean e quero agendar uma limpeza.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-accent text-accent-foreground font-heading font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-300"
              >
                Agendar Limpeza
              </a>
              <a
                href="#servicos"
                className="inline-flex items-center justify-center bg-transparent text-primary-foreground font-heading font-medium text-lg px-8 py-4 rounded-lg outline outline-[1.5px] outline-primary-foreground/40 hover:bg-primary-foreground/10 transition-all duration-300"
              >
                Ver Serviços
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[460px] lg:ml-auto mt-12 lg:mt-0 p-8">
            <div className="absolute inset-0 bg-card rounded-[4rem] transform rotate-12 scale-100 shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-transform duration-700 hover:rotate-[15deg]" />
            
            <div className="relative aspect-square lg:aspect-[4/5] rounded-[4rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] transform -rotate-3 transition-transform duration-700 hover:-rotate-1 border-[6px] border-primary/20">
              <div className="absolute inset-0 bg-muted animate-pulse" />
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80"
                alt="Profissional de limpeza"
                className="relative w-full h-full object-cover transition-transform duration-1000 origin-center hover:scale-110 z-10"
                loading="eager"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-2 md:-left-8 bg-card p-5 rounded-3xl shadow-xl flex items-center gap-4 animate-fade-in z-20 border border-border">
              <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <div>
                <p className="font-heading font-extrabold text-primary text-xl">+5.000</p>
                <p className="font-body text-sm text-muted-foreground leading-tight">Serviços <br/>realizados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
