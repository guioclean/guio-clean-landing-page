import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Coupon = {
  id: string;
  code: string;
  description: string | null;
  discount_percent: number;
  active: boolean;
};

const CouponsTab = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCoupons = async () => {
    const { data } = await supabase.from("coupons").select("*").order("created_at");
    setCoupons(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchCoupons(); }, []);

  const toggleCoupon = async (id: string, active: boolean) => {
    await supabase.from("coupons").update({ active: !active }).eq("id", id);
    fetchCoupons();
  };

  if (loading) return <p className="text-muted-foreground">Carregando cupons...</p>;

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary">
              <th className="text-left px-4 py-3 font-heading font-bold text-foreground">Código</th>
              <th className="text-left px-4 py-3 font-heading font-bold text-foreground">Descrição</th>
              <th className="text-left px-4 py-3 font-heading font-bold text-foreground">Desconto</th>
              <th className="text-left px-4 py-3 font-heading font-bold text-foreground">Status</th>
              <th className="text-left px-4 py-3 font-heading font-bold text-foreground">Ação</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="border-b border-border/50">
                <td className="px-4 py-3 font-mono font-bold text-foreground tracking-wider">{coupon.code}</td>
                <td className="px-4 py-3 text-muted-foreground">{coupon.description || "—"}</td>
                <td className="px-4 py-3 font-bold text-primary">{coupon.discount_percent}%</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    coupon.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                  }`}>
                    {coupon.active ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleCoupon(coupon.id, coupon.active)}
                    className={`text-xs font-heading font-bold px-4 py-2 rounded-lg transition-colors ${
                      coupon.active
                        ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                  >
                    {coupon.active ? "Desativar" : "Ativar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponsTab;
