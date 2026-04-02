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
    <section id="onde-atendemos" className="relative py-32 bg-[#6d28d9] overflow-hidden">
      {/* Top Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] fill-white rotate-180 pointer-events-none">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(110%+1.3px)] h-[60px]"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.83C51.17,70.77,143.43,89,224.45,84.94c45.47-2.31,8.34-21,96.94-28.5Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <p className="font-heading font-bold text-accent tracking-[0.2em] uppercase text-sm">Nossa Cobertura</p>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-white">Onde Atendemos</h2>
          <p className="text-white/70 max-w-2xl mx-auto font-light lg:text-lg">
            Estamos prontos para levar excelência em limpeza para diversos tipos de ambientes, garantindo qualidade e satisfação.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {locations.map((loc, index) => {
            const Icon = ICON_MAP[loc.icon_name] || Building;
            const isHighlighted = index === 0; // Highlight the first one like in the reference image
            
            return (
              <div 
                key={loc.id} 
                className={`group flex flex-col p-10 rounded-[2rem] transition-all duration-500 hover:-translate-y-2 cursor-pointer border ${
                  isHighlighted 
                    ? "bg-[#5b21b6] border-transparent shadow-2xl scale-105 z-10" 
                    : "bg-[#7c3aed]/10 border-white/20 hover:bg-[#7c3aed]/20 hover:border-white/40"
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 ${
                  isHighlighted ? "bg-accent/20" : "bg-white/10"
                }`}>
                  <Icon className={`w-8 h-8 ${isHighlighted ? "text-accent" : "text-white"}`} />
                </div>
                
                <h3 className="font-heading font-bold text-2xl text-white mb-4">{loc.title}</h3>
                
                <p className="text-white/60 font-light text-sm leading-relaxed mb-6">
                  Atendimento especializado com protocolos de higiene rigorosos e profissionais altamente treinados.
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] fill-white pointer-events-none">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(110%+1.3px)] h-[80px]"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.83C51.17,70.77,143.43,89,224.45,84.94c45.47-2.31,8.34-21,96.94-28.5Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default WhereWeServe;
