-- Drop all existing policies on storage.objects for product-context bucket
DROP POLICY IF EXISTS "Allow read from product-context bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow upload to product-context bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow delete from product-context bucket" ON storage.objects;
DROP POLICY IF EXISTS "Admins can read product-context" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload to product-context" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete from product-context" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update product-context" ON storage.objects;

-- Create admin-only storage policies
CREATE POLICY "Admins can read product-context"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'product-context' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can upload to product-context"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'product-context' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete from product-context"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'product-context' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update product-context"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'product-context' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'product-context' AND public.has_role(auth.uid(), 'admin'));