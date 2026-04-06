
-- Tabela de prefixos de CEP para cálculo de deslocamento
CREATE TABLE public.shipping_prefixes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prefix text NOT NULL UNIQUE,
  region_name text NOT NULL DEFAULT '',
  displacement_fee numeric NOT NULL DEFAULT 45,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.shipping_prefixes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage shipping prefixes"
ON public.shipping_prefixes FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view shipping prefixes"
ON public.shipping_prefixes FOR SELECT TO anon, authenticated
USING (true);

-- Tabela de configurações de orçamento
CREATE TABLE public.quote_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key text NOT NULL UNIQUE,
  value numeric NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.quote_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage quote settings"
ON public.quote_settings FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view quote settings"
ON public.quote_settings FOR SELECT TO anon, authenticated
USING (true);

-- Inserir prefixos iniciais
INSERT INTO public.shipping_prefixes (prefix, region_name, displacement_fee) VALUES
  ('045', 'VIP (Itaim/Moema)', 20),
  ('040', 'VIP (Vila Mariana)', 20),
  ('041', 'VIP (Saúde)', 20),
  ('010', 'Expandida (Centro)', 35),
  ('011', 'Expandida (Centro)', 35),
  ('012', 'Expandida (Centro)', 35),
  ('013', 'Expandida (Centro)', 35),
  ('014', 'Expandida (Centro)', 35),
  ('015', 'Expandida (Centro)', 35),
  ('054', 'Expandida (Pinheiros)', 35),
  ('046', 'Expandida (Brooklin/Campo Belo)', 35),
  ('020', 'Longa (Zona Norte)', 55),
  ('030', 'Longa (Zona Leste)', 55),
  ('080', 'Longa (Extremo Leste)', 55);

-- Inserir configurações padrão
INSERT INTO public.quote_settings (key, value) VALUES
  ('hourly_rate', 35),
  ('default_displacement_fee', 45);
