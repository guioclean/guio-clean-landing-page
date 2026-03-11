import logo from "@/assets/guioclean-logo.png";
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
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 transition-transform hover:scale-105">
          <img src={logo} alt="Guio Clean" className="h-10 md:h-12 object-contain" />
        </a>
        <div className="hidden md:flex items-center gap-8 font-heading font-medium text-sm text-slate-700">
          <a href="#onde-atendemos" className="hover:text-primary transition-colors hover:-translate-y-0.5 duration-200">Onde Atendemos</a>
          <a href="#servicos" className="hover:text-primary transition-colors hover:-translate-y-0.5 duration-200">Serviços</a>
          <a href="#depoimentos" className="hover:text-primary transition-colors hover:-translate-y-0.5 duration-200">Depoimentos</a>
          <a href="#contato" className="hover:text-primary transition-colors hover:-translate-y-0.5 duration-200">Contato</a>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground font-heading font-bold text-sm px-7 py-3 rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 hover:brightness-110 transition-all duration-300"
        >
          Solicitar Orçamento
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
