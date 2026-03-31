import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCoupon } from "@/contexts/CouponContext";

interface Plan {
  id: string;
  title: string;
  subtitle: string;
  features: string[];
  recommended: boolean;
  whatsapp_context: string;
}

const PlansSection = () => {
  const { getWhatsAppUrl } = useCoupon();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("site_plans").select("*").eq("active", true).order("sort_order").then(({ data }) => {
      if (data) setPlans(data);
      setLoading(false);
    });
  }, []);

  if (loading || plans.length === 0) return null;

  return (
    <section id="planos" className="relative">
      {/* Wave on top */}
      <div className="w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full"
          preserveAspectRatio="none"
          style={{ height: "80px" }}
        >
          <path
            d="M0,0 C360,80 1080,80 1440,0 L1440,0 L0,0 Z"
            fill="#f3f0ff"
          />
          <path
            d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z"
            fill="url(#planGradient)"
          />
          <defs>
            <linearGradient id="planGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c4b5fd" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main content */}
      <div
        className="py-20 pb-28"
        style={{
          background: "linear-gradient(135deg, #c4b5fd 0%, #a78bfa 40%, #7c3aed 100%)",
        }}
      >
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-white/70 text-sm font-heading font-semibold uppercase tracking-widest mb-2">
              Nossos Planos
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white">
              Escolha o Plano{" "}
              <span className="bg-[#5b21b6] text-white px-3 py-1 rounded-md inline-block">
                Ideal
              </span>{" "}
              para Você
            </h2>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                className={`rounded-2xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  plan.recommended
                    ? "bg-[#5b21b6] text-white border-2 border-white/30"
                    : "bg-white/10 text-white border border-white/20 backdrop-blur-sm"
                }`}
              >
                {plan.recommended && (
                  <span className="self-start font-heading font-bold text-xs tracking-widest uppercase bg-white text-[#7c3aed] px-3 py-1 rounded-full mb-4">
                    Recomendado
                  </span>
                )}

                {/* Icon placeholder */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                    plan.recommended ? "bg-white/20" : "bg-white/20"
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <h3 className="font-heading font-bold text-xl text-white mb-1">{plan.title}</h3>
                <p className="text-white/70 text-sm font-body mb-6">{plan.subtitle}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 font-body text-sm text-white/90">
                      <svg width="16" height="16" viewBox="0 0 16 16" className="text-white flex-shrink-0 mt-0.5">
                        <path
                          d="M3 8L6.5 11.5L13 4.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={getWhatsAppUrl(plan.whatsapp_context)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full font-heading font-bold text-sm py-3 rounded-xl text-center block transition-all duration-200 hover:scale-[1.02] ${
                    plan.recommended
                      ? "bg-white text-[#7c3aed] hover:bg-white/90"
                      : "bg-white/20 text-white border border-white/30 hover:bg-white/30"
                  }`}
                >
                  Solicitar Orçamento
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave on bottom */}
      <div className="w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full"
          preserveAspectRatio="none"
          style={{ height: "80px" }}
        >
          <path
            d="M0,80 C360,0 1080,0 1440,80 L1440,0 L0,0 Z"
            fill="url(#planGradientBottom)"
          />
          <path
            d="M0,80 C360,0 1080,0 1440,80 L1440,80 L0,80 Z"
            fill="white"
          />
          <defs>
            <linearGradient id="planGradientBottom" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c4b5fd" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default PlansSection;
