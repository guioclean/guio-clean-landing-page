import { CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-cleaning.jpg"; // Default fallback if needed

const HeroSection = () => {
  const whatsappUrl = "https://wa.me/5511994699815?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento!";

  const benefits = [
    "Profissionais Verificadas",
    "Agendamento Prático",
    "Satisfação Garantida"
  ];

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-slate-50 flex items-center">
      {/* Decorative background blurs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content Block */}
          <div className="space-y-8 max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 font-body text-sm text-slate-600">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Agendamentos abertos para esta semana
            </div>
            
            <h1 className="font-heading font-extrabold text-5xl md:text-6xl text-slate-900 leading-[1.1]">
              A limpeza <span className="text-primary relative whitespace-nowrap">
                impecável
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-yellow-400 opacity-60" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 10 Q50 20 100 10" fill="transparent" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span> que seu espaço merece
            </h1>
            
            <p className="font-body text-lg md:text-xl text-slate-600 leading-relaxed">
              Conectamos você às melhores profissionais de limpeza de São Paulo. Experiência de agência premium, segurança e praticidade em um só lugar.
            </p>

            <ul className="space-y-3 font-body text-slate-700">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-primary text-white font-heading font-bold text-lg px-8 py-4 rounded-xl shadow-xl shadow-primary/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                Agendar Limpeza
              </a>
              <a
                href="#servicos"
                className="inline-flex items-center justify-center bg-white text-slate-700 font-heading font-bold text-lg px-8 py-4 rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50 hover:shadow-md transition-all duration-300"
              >
                Ver Serviços
              </a>
            </div>
          </div>

          {/* Image Block */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            {/* Soft background shadow for depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-[2.5rem] transform translate-x-4 translate-y-4" />
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80"
                alt="Profissional realizando limpeza em uma sala iluminada"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="eager"
              />
              {/* Floating Badge */}
              <div className="absolute bottom-8 -left-8 md:left-8 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-fade-in">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <div>
                  <p className="font-heading font-bold text-slate-900">+5.000</p>
                  <p className="font-body text-sm text-slate-600">Terços limpos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
