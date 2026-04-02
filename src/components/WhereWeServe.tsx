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
    <section id="onde-atendemos" className="py-24 bg-secondary">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <span className="text-primary font-heading font-bold tracking-wider text-sm uppercase">Nossa Cobertura</span>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-foreground">Onde Atendemos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body text-lg">
            Levamos excelência em limpeza para diversos tipos de ambientes.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {locations.map((loc, index) => {
            const Icon = ICON_MAP[loc.icon_name] || Building;
            
            return (
              <div 
                key={loc.id} 
                className={`group flex flex-col items-center text-center p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border ${
                  index === 0 
                    ? "bg-primary text-primary-foreground border-transparent shadow-lg shadow-primary/20" 
                    : "bg-card border-border hover:border-primary/30 hover:shadow-lg"
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                  index === 0 ? "bg-primary-foreground/20" : "bg-primary/10"
                }`}>
                  <Icon className={`w-7 h-7 ${index === 0 ? "text-primary-foreground" : "text-primary"}`} />
                </div>
                
                <h3 className={`font-heading font-bold text-lg ${index === 0 ? "text-primary-foreground" : "text-foreground"}`}>
                  {loc.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhereWeServe;
