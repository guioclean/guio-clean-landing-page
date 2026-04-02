import { useCoupon } from "@/contexts/CouponContext";

const HeroSection = () => {
  const { getWhatsAppUrl } = useCoupon();

  return (
    <section className="relative min-h-[95vh] pt-32 pb-48 overflow-hidden bg-gradient-to-br from-[#8B5CF6] via-[#9061F9] to-[#60A5FA] flex items-center">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[40%] h-[60%] bg-white/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-[-10%] w-[50%] h-[50%] bg-blue-400/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Text Content */}
          <div className="space-y-8 max-w-2xl text-center lg:text-left animate-fade-in">
            <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-lg rounded-full border border-white/30">
              <span className="font-heading font-semibold tracking-wider text-xs text-white uppercase">
                ✨ Limpeza que Transforma Ambientas
              </span>
            </div>
            
            <h1 className="font-heading font-extrabold text-5xl md:text-6xl lg:text-[4.5rem] text-white leading-[1.05] drop-shadow-md">
              Sua casa brilhando como nunca.
            </h1>
            
            <p className="font-body text-lg md:text-xl text-white/95 leading-relaxed font-light max-w-xl mx-auto lg:mx-0">
              Profissionais treinados e técnicas de ponta para cuidar do seu lar. Agende sua limpeza em segundos de forma simples e rápida.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row justify-center lg:justify-start gap-6">
              <a
                href={getWhatsAppUrl("Olá! Vim pelo site da Guio Clean e quero agendar uma limpeza.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-accent text-accent-foreground font-heading font-bold text-lg px-10 py-5 rounded-full shadow-[0_15px_35px_rgba(255,193,7,0.4)] hover:brightness-110 hover:-translate-y-1.5 transition-all duration-300"
              >
                Agendar Agora
              </a>
              <div className="flex items-center gap-4 px-6 py-4 bg-white/20 backdrop-blur-lg rounded-full border border-white/30">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-100 shadow-md">
                      <img src={`https://i.pravatar.cc/120?img=${i+15}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div className="text-white">
                  <p className="font-bold text-sm tracking-tight">+5k Clientes</p>
                  <p className="text-[10px] opacity-90 leading-none">Avaliação 4.9/5</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Refined Phone Mockups */}
          <div className="relative hidden lg:flex items-center justify-center h-[700px] animate-fade-in delay-200">
            {/* Background Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full border border-white/20 blur-sm" />
            
            {/* Phone 1 (Left Back) */}
            <div className="absolute top-[15%] left-[0%] w-[250px] h-[500px] bg-black rounded-[3rem] border-[8px] border-[#0a0a0a] shadow-2xl overflow-hidden transform rotate-[-8deg] translate-x-4 z-10 transition-transform hover:scale-105 duration-700">
              <img 
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover" 
                alt="Limpeza Profissional" 
              />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#0a0a0a] rounded-b-2xl z-20" />
            </div>

            {/* Phone 2 (Center Front) */}
            <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[280px] h-[560px] bg-black rounded-[3.5rem] border-[10px] border-[#0a0a0a] shadow-2xl overflow-hidden z-30 transition-transform hover:scale-110 duration-700">
              <div className="absolute inset-0 bg-gradient-to-t from-[#8B5CF6]/90 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover" 
                alt="APP Limpeza" 
              />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#0a0a0a] rounded-b-2xl z-20" />
              <div className="absolute bottom-12 left-8 right-8 z-20 text-white animate-fade-in">
                <p className="text-xs uppercase tracking-[0.2em] font-extrabold opacity-90">APP GUIO CLEAN</p>
                <h3 className="text-2xl font-extrabold mt-2 leading-tight">Agende agora em um toque.</h3>
              </div>
            </div>

            {/* Phone 3 (Right Back) */}
            <div className="absolute top-[15%] right-[0%] w-[250px] h-[500px] bg-black rounded-[3rem] border-[8px] border-[#0a0a0a] shadow-2xl overflow-hidden transform rotate-[8deg] -translate-x-4 z-10 transition-transform hover:scale-105 duration-700">
              <img 
                src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover" 
                alt="Produtos Limpeza" 
              />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#0a0a0a] rounded-b-2xl z-20" />
            </div>
          </div>
        </div>
      </div>

      {/* Single Large Organic Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] fill-white pointer-events-none">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(140%+1.3px)] h-[120px] md:h-[180px]"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
