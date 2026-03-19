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
      <div className="container mx-auto px-6">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground text-center mb-4">Onde Atendemos</h2>
        <div className="w-16 h-1 bg-accent mx-auto mb-16 rounded-full" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {locations.map((loc) => {
            const Icon = ICON_MAP[loc.icon_name] || Building;
            return (
              <div key={loc.id} className="flex flex-col items-center gap-4 icon-pulse cursor-default">
                <Icon className="w-12 h-12 text-foreground" />
                <span className="font-heading font-bold text-lg text-foreground">{loc.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhereWeServe;
