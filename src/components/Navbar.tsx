import logoBranca from "@/assets/logo-branca.webp";
import logoColorida from "@/assets/logo-colorida.webp";
import { useEffect, useState } from "react";
import { useCoupon } from "@/contexts/CouponContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { getWhatsAppUrl } = useCoupon();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-card/95 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <a href="#" className="relative flex items-center transition-transform hover:scale-105 shrink-0" aria-label="Guio Clean — página inicial">
          <div className={`relative transition-all duration-300 ${scrolled ? "h-12 md:h-14 lg:h-16 w-32 md:w-40 lg:w-44" : "h-16 md:h-20 lg:h-24 w-44 md:w-52 lg:w-60"}`}>
            <img 
              src={scrolled ? logoColorida : logoBranca} 
              alt="Guio Clean — Agência de diaristas em São Paulo (página inicial)"
              width={400}
              height={160}
              fetchPriority="high"
              decoding="async"
              className={`absolute left-0 top-1/2 -translate-y-1/2 object-contain object-left w-auto drop-shadow-sm transition-all duration-300 ${
                scrolled ? "h-16 md:h-20 lg:h-24" : "h-24 md:h-28 lg:h-32"
              }`}
            />
          </div>
        </a>
        <div className={`hidden md:flex items-center gap-8 font-heading font-medium text-sm transition-colors duration-300 ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
          <a href="#onde-atendemos" className={`transition-colors hover:-translate-y-0.5 duration-200 ${scrolled ? "hover:text-primary" : "hover:text-white"}`}>Onde Atendemos</a>
          <a href="#servicos" className={`transition-colors hover:-translate-y-0.5 duration-200 ${scrolled ? "hover:text-primary" : "hover:text-white"}`}>Serviços</a>
          <a href="#depoimentos" className={`transition-colors hover:-translate-y-0.5 duration-200 ${scrolled ? "hover:text-primary" : "hover:text-white"}`}>Depoimentos</a>
          <a href="#contato" className={`transition-colors hover:-translate-y-0.5 duration-200 ${scrolled ? "hover:text-primary" : "hover:text-white"}`}>Contato</a>
        </div>
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="font-heading font-bold text-sm px-7 py-3 rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 shrink-0 bg-primary text-primary-foreground hover:brightness-110"
        >
          Solicitar Orçamento
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
