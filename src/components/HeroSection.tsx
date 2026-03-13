import { CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-cleaning.jpg"; // Default fallback if needed

const HeroSection = () => {
  const whatsappUrl = "https://wa.me/5511994699815?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento!";

  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 overflow-hidden bg-[#2b248a] flex items-center rounded-b-[3rem]">
      {/* Decorative background blurs and patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] text-pink-400/80 text-2xl rotate-45">+</div>
        <div className="absolute top-[60%] right-[35%] text-pink-400/80 text-xl rotate-45">+</div>
        <div className="absolute top-[35%] left-[55%] w-3 h-3 rounded-full border-[3px] border-yellow-500/80" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content Block */}
          <div className="space-y-8 max-w-xl">
            <div className="font-heading font-medium tracking-widest text-sm text-indigo-300 uppercase">
              Bem-vindo à Guio Clean
            </div>
            
            <h1 className="font-heading font-extrabold text-5xl md:text-6xl lg:text-[4rem] text-white leading-[1.1]">
              Resolvemos seus problemas de limpeza.
            </h1>
            
            <p className="font-body text-lg md:text-xl text-indigo-100/90 leading-relaxed font-light">
              Nossa performance é o seu sucesso. Nossa paixão é a inovação no cuidado com o seu ambiente. Entregamos muito mais valor para você.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#2acfef] text-slate-900 font-heading font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:brightness-110 transition-all duration-300"
              >
                Agendar Limpeza
              </a>
              <a
                href="#servicos"
                className="inline-flex items-center justify-center bg-transparent text-white font-heading font-medium text-lg px-8 py-4 rounded-lg outline outline-[1.5px] outline-indigo-400/60 hover:bg-white/5 hover:outline-white/80 transition-all duration-300"
              >
                Ver Serviços
              </a>
            </div>
          </div>

          {/* Image Block */}
          <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[500px] lg:ml-auto mt-12 lg:mt-0 p-8 flex justify-center items-center">
            
            {/* Background Pills (Reference Style) */}
            <div className="absolute z-0 transform -rotate-[35deg] w-[140%] h-[140%] flex flex-col gap-6 items-center justify-center opacity-80 pointer-events-none">
              <div className="w-[85%] h-24 bg-indigo-500/40 rounded-[3rem] translate-x-8" />
              <div className="w-[100%] h-24 bg-indigo-400/40 rounded-[3rem] -translate-x-4" />
              
              {/* A circle/dot attached to the top right of the pills */}
              <div className="absolute right-[10%] top-[45%] w-20 h-20 bg-indigo-400/40 rounded-full" />
            </div>
            
            {/* Image (cutout style works best here, but using placeholder with transparent background if available, otherwise regular rounded image) */}
            <div className="relative z-10 w-full hover:-translate-y-2 transition-transform duration-700">
              <img
                src="https://images.unsplash.com/photo-1527515637462-cff94eb20f54?auto=format&fit=crop&q=80"
                alt="Profissional de limpeza com equipamentos"
                className="w-full object-cover rounded-[3rem] shadow-2xl ring-4 ring-white/10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
