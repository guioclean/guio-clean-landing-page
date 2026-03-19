import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCoupon } from "@/contexts/CouponContext";

interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string;
  whatsapp_context: string;
}

const ServicesSection = () => {
  const { getWhatsAppUrl } = useCoupon();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("site_services").select("*").eq("active", true).order("sort_order").then(({ data }) => {
      if (data) setServices(data);
      setLoading(false);
    });
  }, []);

  if (loading || services.length === 0) return null;

  return (
    <section id="servicos" className="py-24 bg-secondary">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-accent font-bold tracking-wider text-sm uppercase mb-3 block">Excelência</span>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-foreground mb-6 relative inline-block">
            Nossos Serviços
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Soluções personalizadas desenhadas para atender as necessidades específicas do seu espaço.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mt-12">
          {services.map((service, idx) => (
            <div key={service.id}
              className="group bg-card rounded-[2.5rem] p-6 lg:p-8 shadow-xl hover:shadow-[0_20px_40px_rgba(90,56,181,0.15)] hover:-translate-y-3 transition-all duration-500 cursor-pointer flex flex-col items-center text-center border-b-4 border-transparent hover:border-primary/40">
              <div className="relative w-48 h-48 mx-auto mb-8 mt-4">
                <div className={`absolute inset-0 bg-secondary rounded-[2.5rem] transform ${idx % 2 === 0 ? 'rotate-12' : '-rotate-12'} scale-105 group-hover:rotate-0 transition-transform duration-500 shadow-inner`} />
                <div className={`absolute inset-0 bg-primary/10 rounded-[2.5rem] transform ${idx % 2 === 0 ? '-rotate-6' : 'rotate-6'} scale-100 group-hover:rotate-0 transition-transform duration-700`} />
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-card transform transition-transform duration-500 group-hover:scale-105">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${service.image_url})` }} />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-foreground mb-4 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
              <p className="font-body text-muted-foreground leading-relaxed text-[15px] mb-8 flex-grow">{service.description}</p>
              <a href={getWhatsAppUrl(service.whatsapp_context)} target="_blank" rel="noopener noreferrer"
                className="w-full text-center bg-secondary text-primary font-heading font-bold px-6 py-4 rounded-xl border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-transparent transition-all duration-300">
                Orçamento Rápido
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
