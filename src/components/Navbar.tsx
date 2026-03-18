import logoBranca from "@/assets/logo-branca.png";
import logoColorida from "@/assets/logo-colorida.png";
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
      className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 transition-transform hover:scale-105">
          <img src={!scrolled ? logoBranca : logoColorida} alt="Guio Clean" className="h-24 md:h-28 lg:h-32 object-contain transition-all duration-300 drop-shadow-sm" />
        </a>
        <div className={`hidden md:flex items-center gap-8 font-heading font-medium text-sm transition-colors duration-300 ${scrolled ? "text-foreground" : "text-purple-100"}`}>
          <a href="#onde-atendemos" className={`transition-colors hover:-translate-y-0.5 duration-200 ${scrolled ? "hover:text-primary" : "hover:text-white"}`}>Onde Atendemos</a>
          <a href="#servicos" className={`transition-colors hover:-translate-y-0.5 duration-200 ${scrolled ? "hover:text-primary" : "hover:text-white"}`}>Serviços</a>
          <a href="#depoimentos" className={`transition-colors hover:-translate-y-0.5 duration-200 ${scrolled ? "hover:text-primary" : "hover:text-white"}`}>Depoimentos</a>
          <a href="#contato" className={`transition-colors hover:-translate-y-0.5 duration-200 ${scrolled ? "hover:text-primary" : "hover:text-white"}`}>Contato</a>
        </div>
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className={`font-heading font-bold text-sm px-7 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 ${
            scrolled ? "bg-primary text-primary-foreground shadow-primary/30" : "bg-white text-primary hover:bg-secondary"
          }`}
        >
          {scrolled ? "Solicitar Orçamento" : "Orçamento Rápido"}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
