import { useState } from "react";
import { Check, Copy, Tag } from "lucide-react";
import { useCoupon } from "@/contexts/CouponContext";

const coupons = [
  {
    title: "Vim pelo Site",
    code: "SITE5",
    discount: "5% OFF",
    description: "Na primeira limpeza agendada pelo site.",
  },
  {
    title: "Plano Recorrente",
    code: "RECORRENTE10",
    discount: "10% OFF",
    description: "Na primeira limpeza do plano quinzenal ou mensal.",
  },
];

const CouponsSection = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { setActiveCoupon } = useCoupon();

  const handleCopy = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setActiveCoupon(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section className="py-20 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <span className="text-accent font-bold tracking-wider text-sm uppercase mb-3 block flex items-center justify-center gap-2">
            <Tag className="w-4 h-4" /> Exclusivo
          </span>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground mb-4">
            Ofertas Exclusivas
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
            Benefícios especiais para quem nos encontrou aqui. Copie o código e informe no WhatsApp.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {coupons.map((coupon) => (
            <div
              key={coupon.code}
              className="bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="bg-primary/10 text-primary font-heading font-extrabold text-2xl px-5 py-2 rounded-xl mb-4">
                {coupon.discount}
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                {coupon.title}
              </h3>
              <p className="font-body text-muted-foreground text-sm mb-6">
                {coupon.description}
              </p>

              <button
                onClick={() => handleCopy(coupon.code)}
                className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary font-heading font-bold px-6 py-3 rounded-full transition-all duration-300 border-2 border-dashed border-primary/30 hover:border-transparent tracking-widest"
              >
                {coupon.code}
                {copiedCode === coupon.code ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>

              {copiedCode === coupon.code && (
                <p className="mt-3 text-green-600 text-sm font-medium animate-in fade-in">
                  ✓ Código copiado! Use no WhatsApp
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CouponsSection;
