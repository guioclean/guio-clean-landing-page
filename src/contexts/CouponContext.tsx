import { createContext, useContext, useState, ReactNode } from "react";

type CouponContextType = {
  activeCoupon: string | null;
  setActiveCoupon: (coupon: string | null) => void;
  getWhatsAppUrl: (context?: string) => string;
};

const CouponContext = createContext<CouponContextType | undefined>(undefined);

const PHONE = "5511994699815";

export const CouponProvider = ({ children }: { children: ReactNode }) => {
  const [activeCoupon, setActiveCoupon] = useState<string | null>(null);

  const getWhatsAppUrl = (context?: string) => {
    let message = context || "Olá! Vim pelo site da Guio Clean e quero solicitar um orçamento.";
    if (activeCoupon) {
      message += ` Gostaria de aplicar o cupom ${activeCoupon}.`;
    }
    return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CouponContext.Provider value={{ activeCoupon, setActiveCoupon, getWhatsAppUrl }}>
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupon = () => {
  const ctx = useContext(CouponContext);
  if (!ctx) throw new Error("useCoupon must be used within CouponProvider");
  return ctx;
};
