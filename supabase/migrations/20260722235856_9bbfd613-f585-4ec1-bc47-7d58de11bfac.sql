
-- Storage: service-images write access restricted to admins
DROP POLICY IF EXISTS "Authenticated users can delete service images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update service images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload service images" ON storage.objects;
DROP POLICY IF EXISTS "Public read access for service images" ON storage.objects;

CREATE POLICY "Admins can upload service images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'service-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update service images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'service-images' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'service-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete service images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'service-images' AND public.has_role(auth.uid(), 'admin'));

-- Leads: replace WITH CHECK (true) with input validation
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;

CREATE POLICY "Anyone can insert validated leads"
ON public.leads FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(trim(name)) BETWEEN 2 AND 100
  AND (email IS NULL OR (char_length(email) BETWEEN 5 AND 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'))
  AND (phone IS NULL OR char_length(phone) BETWEEN 8 AND 30)
  AND (message IS NULL OR char_length(message) <= 2000)
  AND (region IS NULL OR char_length(region) <= 100)
  AND (source IS NULL OR char_length(source) <= 50)
);
