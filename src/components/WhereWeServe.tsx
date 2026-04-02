import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Building, Home, Briefcase, Cross, MapPin, Store, Hotel, Warehouse } from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Building, Home, Briefcase, Cross, MapPin, Store, Hotel, Warehouse,
};

interface Location {
  id: string;
  title: string;
  icon_name: string;
}

const WhereWeServe = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("site_locations").select("*").eq("active", true).order("sort_order").then(({ data }) => {
      if (data) setLocations(data);
      setLoading(false);
    });
  }, []);

  if (loading || locations.length === 0) return null;

  return (
    <section id="onde-atendemos" className="relative py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <p className="font-heading font-bold text-primary tracking-[0.2em] uppercase text-sm">Nossa Cobertura</p>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-foreground">Onde Atendemos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-light lg:text-lg">
            Estamos prontos para levar excelência em limpeza para diversos tipos de ambientes, garantindo qualidade e satisfação.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {locations.map((loc, index) => {
            const Icon = ICON_MAP[loc.icon_name] || Building;
            const isHighlighted = index === 0;
            
            return (
              <div 
                key={loc.id} 
                className={`group flex flex-col p-10 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 cursor-pointer border ${
                  isHighlighted 
                    ? "bg-primary text-white border-transparent shadow-2xl scale-105 z-10" 
                    : "bg-secondary/50 border-border hover:bg-white hover:border-primary/30"
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 ${
                  isHighlighted ? "bg-white/20" : "bg-primary/10"
                }`}>
                  <Icon className={`w-8 h-8 ${isHighlighted ? "text-white" : "text-primary"}`} />
                </div>
                
                <h3 className={`font-heading font-bold text-2xl mb-4 ${isHighlighted ? "text-white" : "text-foreground"}`}>
                  {loc.title}
                </h3>
                
                <p className={`font-light text-sm leading-relaxed mb-6 ${isHighlighted ? "text-white/80" : "text-muted-foreground"}`}>
                  Atendimento especializado com protocolos de higiene rigorosos e profissionais altamente treinados.
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhereWeServe;
