-- Add missing columns to contact_messages table
ALTER TABLE public.contact_messages 
ADD COLUMN IF NOT EXISTS subject text,
ADD COLUMN IF NOT EXISTS read boolean DEFAULT false;

-- Add missing column to testimonials table
ALTER TABLE public.testimonials 
ADD COLUMN IF NOT EXISTS relationship_status text;

-- Create website_settings table
CREATE TABLE IF NOT EXISTS public.website_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key text NOT NULL UNIQUE,
  setting_value jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view website settings"
ON public.website_settings
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage website settings"
ON public.website_settings
FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Create inquiries table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  property_id uuid REFERENCES public.properties(id) ON DELETE SET NULL,
  status text DEFAULT 'unread',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all inquiries"
ON public.inquiries
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update inquiries"
ON public.inquiries
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete inquiries"
ON public.inquiries
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can insert inquiries"
ON public.inquiries
FOR INSERT
WITH CHECK (true);

-- Add trigger for website_settings updated_at
CREATE TRIGGER update_website_settings_updated_at
BEFORE UPDATE ON public.website_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();