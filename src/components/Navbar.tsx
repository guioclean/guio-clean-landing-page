import logoBranca from "@/assets/logo-branca.png";
import logoColorida from "@/assets/logo-colorida.png";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const whatsappUrl = "https://wa.me/5511994699815?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento!";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 transition-transform hover:scale-105">
           {/* Usando as duas imagens nativamente em vez de filtros */}
          <img src={!scrolled ? logoBranca : logoColorida} alt="Guio Clean" className="h-[4.5rem] md:h-[5.5rem] lg:h-24 object-contain transition-all duration-300 drop-shadow-sm" />
        </a>
        <div className={`hidden md:flex items-center gap-8 font-heading font-medium text-sm transition-colors duration-300 ${scrolled ? "text-slate-700" : "text-purple-100"}`}>
          <a href="#onde-atendemos" className={`transition-colors hover:-translate-y-0.5 duration-200 ${scrolled ? "hover:text-primary" : "hover:text-white"}`}>Onde Atendemos</a>
          <a href="#servicos" className={`transition-colors hover:-translate-y-0.5 duration-200 ${scrolled ? "hover:text-primary" : "hover:text-white"}`}>Serviços</a>
          <a href="#depoimentos" className={`transition-colors hover:-translate-y-0.5 duration-200 ${scrolled ? "hover:text-primary" : "hover:text-white"}`}>Depoimentos</a>
          <a href="#contato" className={`transition-colors hover:-translate-y-0.5 duration-200 ${scrolled ? "hover:text-primary" : "hover:text-white"}`}>Contato</a>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`font-heading font-bold text-sm px-7 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 ${
            scrolled ? "bg-primary text-primary-foreground shadow-primary/30" : "bg-white text-[#5a38b5] hover:bg-slate-100"
          }`}
        >
          {scrolled ? "Solicitar Orçamento" : "Orçamento Rápido"}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
