
-- Create storage bucket for service images
INSERT INTO storage.buckets (id, name, public) VALUES ('service-images', 'service-images', true);

-- Allow public read access
CREATE POLICY "Public read access for service images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'service-images');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload service images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'service-images');

-- Allow authenticated users to update
CREATE POLICY "Authenticated users can update service images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'service-images');

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete service images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'service-images');
