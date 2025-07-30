-- Create storage policies for blog_images bucket to allow admins to upload images

-- Allow authenticated users to view blog images (public bucket)
CREATE POLICY "Blog images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'blog_images');

-- Allow admins to upload blog images
CREATE POLICY "Admins can upload blog images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'blog_images' AND has_role('admin'::app_role));

-- Allow admins to update blog images
CREATE POLICY "Admins can update blog images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'blog_images' AND has_role('admin'::app_role));

-- Allow admins to delete blog images
CREATE POLICY "Admins can delete blog images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'blog_images' AND has_role('admin'::app_role));