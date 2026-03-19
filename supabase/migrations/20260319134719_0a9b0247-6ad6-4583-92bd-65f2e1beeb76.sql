-- Services table
CREATE TABLE public.site_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  whatsapp_context text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active services" ON public.site_services FOR SELECT TO public USING (active = true);
CREATE POLICY "Admins can manage services" ON public.site_services FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Plans table
CREATE TABLE public.site_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text NOT NULL DEFAULT '',
  features text[] NOT NULL DEFAULT '{}',
  recommended boolean NOT NULL DEFAULT false,
  whatsapp_context text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active plans" ON public.site_plans FOR SELECT TO public USING (active = true);
CREATE POLICY "Admins can manage plans" ON public.site_plans FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- FAQ table
CREATE TABLE public.site_faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active faqs" ON public.site_faqs FOR SELECT TO public USING (active = true);
CREATE POLICY "Admins can manage faqs" ON public.site_faqs FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Locations table
CREATE TABLE public.site_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  icon_name text NOT NULL DEFAULT 'Building',
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active locations" ON public.site_locations FOR SELECT TO public USING (active = true);
CREATE POLICY "Admins can manage locations" ON public.site_locations FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));