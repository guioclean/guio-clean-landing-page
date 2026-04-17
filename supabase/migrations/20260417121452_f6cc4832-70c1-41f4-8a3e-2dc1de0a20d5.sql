
CREATE TABLE public.site_testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  author_role text NOT NULL DEFAULT '',
  text text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  review_date date NOT NULL DEFAULT CURRENT_DATE,
  avatar_url text NOT NULL DEFAULT '',
  review_link text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active testimonials"
  ON public.site_testimonials FOR SELECT
  USING (active = true);

CREATE POLICY "Admins can manage testimonials"
  ON public.site_testimonials FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

INSERT INTO public.quote_settings (key, value, text_value)
VALUES ('google_reviews_url', 0, 'https://www.google.com/search?q=Guio+Clean+S%C3%A3o+Paulo')
ON CONFLICT DO NOTHING;
