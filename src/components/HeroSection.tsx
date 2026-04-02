import { useCoupon } from "@/contexts/CouponContext";

const HeroSection = () => {
  const { getWhatsAppUrl } = useCoupon();

  return (
    <section className="relative min-h-[95vh] pt-32 pb-32 overflow-hidden bg-gradient-to-br from-[#4c1d95] via-[#6d28d9] to-[#7c3aed] flex items-center">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[15%] left-[5%] w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-[40%] right-[20%] text-white text-4xl rotate-45 font-thin">+</div>
        <div className="absolute top-[60%] left-[15%] text-white text-2xl rotate-12 font-thin">+</div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Text Content */}
          <div className="space-y-8 max-w-2xl text-center lg:text-left animate-fade-in">
            <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <span className="font-heading font-semibold tracking-wider text-xs text-white uppercase">
                ✨ Especialistas em Limpeza Profissional
              </span>
            </div>
            
            <h1 className="font-heading font-extrabold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] drop-shadow-sm">
              Sua casa brilhando como nunca.
            </h1>
            
            <p className="font-body text-lg md:text-xl text-white/90 leading-relaxed font-light max-w-xl mx-auto lg:mx-0">
              Transformamos seu ambiente com tecnologia alemã e paixão pelo cuidado. Agende sua limpeza em menos de 1 minuto.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row justify-center lg:justify-start gap-5">
              <a
                href={getWhatsAppUrl("Olá! Vim pelo site da Guio Clean e quero agendar uma limpeza.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-accent text-accent-foreground font-heading font-bold text-lg px-10 py-5 rounded-full shadow-[0_10px_30px_rgba(255,193,7,0.3)] hover:brightness-110 hover:-translate-y-1 transition-all duration-300"
              >
                Agendar Agora
              </a>
              <div className="flex items-center gap-4 px-6 py-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Rating" />
                    </div>
                  ))}
                </div>
                <div className="text-white text-sm">
                  <p className="font-bold">+5k Clientes</p>
                  <div className="flex text-accent text-[10px]">{"★★★★★"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Phone Mockups */}
          <div className="relative hidden lg:block h-[600px] animate-fade-in delay-200">
            {/* Phone 1 (Back) */}
            <div className="absolute top-[10%] right-[0%] w-[260px] h-[520px] bg-black rounded-[2.5rem] border-[6px] border-black shadow-2xl overflow-hidden transform rotate-6 z-10 transition-transform hover:scale-105 duration-500">
              <img 
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover" 
                alt="Cleaning App 1" 
              />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
            </div>

            {/* Phone 2 (Middle) */}
            <div className="absolute top-[15%] right-[15%] w-[260px] h-[520px] bg-black rounded-[2.5rem] border-[6px] border-black shadow-2xl overflow-hidden transform -rotate-3 z-20 transition-transform hover:scale-105 duration-500">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover" 
                alt="Cleaning App 2" 
              />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
            </div>

            {/* Phone 3 (Front) */}
            <div className="absolute top-[5%] right-[30%] w-[260px] h-[520px] bg-black rounded-[2.5rem] border-[6px] border-black shadow-2xl overflow-hidden transform -rotate-12 z-30 transition-transform hover:scale-110 duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover" 
                alt="Cleaning App 3" 
              />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
              <div className="absolute bottom-10 left-6 right-6 z-20 text-white">
                <p className="text-xs uppercase tracking-widest font-bold opacity-80">Guio Clean App</p>
                <h3 className="text-xl font-bold mt-1">Limpeza à distância de um clique.</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] fill-white pointer-events-none">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(110%+1.3px)] h-[80px]"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.83C51.17,70.77,143.43,89,224.45,84.94c45.47-2.31,8.34-21,96.94-28.5Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
