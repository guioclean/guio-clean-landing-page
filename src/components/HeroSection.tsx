import { CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-cleaning.jpg"; // Default fallback if needed

const HeroSection = () => {
  const whatsappUrl = "https://wa.me/5511994699815?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento!";

  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 overflow-hidden bg-[#5a38b5] flex items-center rounded-b-[2rem]">
      {/* Decorative background blurs and patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] text-pink-300/80 text-2xl rotate-45">+</div>
        <div className="absolute top-[60%] right-[35%] text-pink-300/80 text-xl rotate-45">+</div>
        <div className="absolute top-[35%] left-[55%] w-3 h-3 rounded-full border-[3px] border-yellow-400/80" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content Block */}
          <div className="space-y-8 max-w-xl">
            <div className="font-heading font-medium tracking-widest text-sm text-purple-200 uppercase">
              Bem-vindo à Guio Clean
            </div>
            
            <h1 className="font-heading font-extrabold text-5xl md:text-6xl lg:text-[4rem] text-white leading-[1.1]">
              Resolvemos seus problemas de limpeza.
            </h1>
            
            <p className="font-body text-lg md:text-xl text-purple-100/90 leading-relaxed font-light">
              Nossa performance é o seu sucesso. Nossa paixão é a inovação no cuidado com o seu ambiente. Entregamos muito mais valor para você.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-yellow-400 text-slate-900 font-heading font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:bg-yellow-300 hover:scale-105 transition-all duration-300"
              >
                Agendar Limpeza
              </a>
              <a
                href="#servicos"
                className="inline-flex items-center justify-center bg-transparent text-white font-heading font-medium text-lg px-8 py-4 rounded-lg outline outline-[1.5px] outline-purple-300/60 hover:bg-white/10 transition-all duration-300"
              >
                Ver Serviços
              </a>
            </div>
          </div>

          {/* Image Block */}
          <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[480px] lg:ml-auto mt-12 lg:mt-0 p-4 sm:p-8 flex justify-center items-center">
            
            {/* Background Pills (Reference Style) */}
            <div className="absolute z-0 transform -rotate-[35deg] w-[150%] h-[150%] flex flex-col gap-6 items-center justify-center opacity-70 pointer-events-none">
              <div className="w-[85%] h-24 bg-purple-400/30 rounded-[3rem] translate-x-8" />
              <div className="w-[100%] h-24 bg-purple-300/30 rounded-[3rem] -translate-x-4" />
              
              {/* A circle/dot attached to the top right of the pills */}
              <div className="absolute right-[5%] top-[45%] w-24 h-24 bg-purple-300/40 rounded-full blur-sm" />
            </div>
            
            {/* Image  */}
            <div className="relative z-10 w-full hover:-translate-y-2 transition-transform duration-700 mt-4 sm:mt-0">
               {/* Usando uma silhueta de recorte/transparente ou imagem de alta qualidade com bordas mais integradas */}
              <div className="w-full h-auto aspect-[4/5] sm:aspect-square overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-white/10 relative">
                  <img
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
                    alt="Profissional de limpeza uniformizada sorrindo"
                    className="w-full h-full object-cover"
                  />
                  {/* Gradiente leve embaixo da imagem para não cortar tao seco */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#5a38b5]/40 to-transparent mix-blend-multiply pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
