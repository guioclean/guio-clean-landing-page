import logo from "@/assets/guioclean-logo.png";

const Navbar = () => {
  const whatsappUrl = "https://wa.me/5511994699815?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento!";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <img src={logo} alt="Guio Clean" className="h-10" />
        <div className="hidden md:flex items-center gap-8 font-body text-sm text-foreground">
          <a href="#onde-atendemos" className="hover:text-primary transition-colors">Onde Atendemos</a>
          <a href="#servicos" className="hover:text-primary transition-colors">Serviços</a>
          <a href="#planos" className="hover:text-primary transition-colors">Planos</a>
          <a href="#contato" className="hover:text-primary transition-colors">Contato</a>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground font-heading font-bold text-sm px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
        >
          Solicitar Orçamento
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
