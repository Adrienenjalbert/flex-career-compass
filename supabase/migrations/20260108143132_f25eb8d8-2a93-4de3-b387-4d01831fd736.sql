-- Drop the public SELECT policy that exposes internal workflow
DROP POLICY IF EXISTS "Anyone can view data corrections" ON public.data_corrections;

-- Create restricted SELECT policy - only admins can view
CREATE POLICY "Admins can view data corrections"
ON public.data_corrections
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));