import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCoupon } from "@/contexts/CouponContext";
import { ArrowRight } from "lucide-react";

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
          <span className="text-primary font-heading font-bold tracking-wider text-sm uppercase mb-3 block">Excelência</span>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-foreground mb-4">
            Serviços de Limpeza Profissional
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Nossa agência de diaristas oferece soluções personalizadas para atender as necessidades específicas do seu espaço.
          </p>
        </div>

        {/* Cards in horizontal row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col"
            >
              {/* Top colored strip */}
              <div className="h-1.5 bg-primary w-full group-hover:bg-accent transition-colors duration-300" />
              
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image_url}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                  {service.description}
                </p>
                <a
                  href={getWhatsAppUrl(service.whatsapp_context)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-heading font-bold text-sm hover:gap-3 transition-all duration-200"
                >
                  Saiba Mais
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
