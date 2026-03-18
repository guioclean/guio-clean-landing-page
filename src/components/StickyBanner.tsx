import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useCoupon } from "@/contexts/CouponContext";

const StickyBanner = () => {
  const [copied, setCopied] = useState(false);
  const { setActiveCoupon } = useCoupon();
  const code = "GUIO5";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setActiveCoupon(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-center gap-3 text-sm font-heading font-bold">
        <span>🎁 Primeira limpeza? Use o cupom</span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 bg-foreground/10 hover:bg-foreground/20 px-3 py-1 rounded-full transition-colors font-extrabold tracking-wider"
        >
          {code}
          {copied ? (
            <Check className="w-4 h-4 text-green-700" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
        <span>e ganhe 5% OFF!</span>
        {copied && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-green-600 text-white text-xs px-3 py-1 rounded-full animate-in fade-in slide-in-from-right-4">
            ✓ Código copiado! Use no WhatsApp
          </span>
        )}
      </div>
    </div>
  );
};

export default StickyBanner;
