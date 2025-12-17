-- Create table for storing data corrections awaiting review
CREATE TABLE public.data_corrections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    
    -- Source information
    source_name TEXT NOT NULL,
    source_url TEXT NOT NULL,
    local_file TEXT NOT NULL,
    
    -- Data details
    state_code TEXT NOT NULL,
    field_name TEXT NOT NULL,
    category TEXT NOT NULL,
    
    -- Values
    current_value TEXT NOT NULL,
    suggested_value TEXT NOT NULL,
    
    -- Review status
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'applied')),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewer_notes TEXT,
    
    -- Prevent duplicates
    UNIQUE (local_file, state_code, field_name)
);

-- Enable RLS
ALTER TABLE public.data_corrections ENABLE ROW LEVEL SECURITY;

-- Allow public read/write for admin tool (no auth required for this internal tool)
CREATE POLICY "Allow public access to data_corrections"
ON public.data_corrections
FOR ALL
USING (true)
WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_data_corrections_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_data_corrections_updated_at
BEFORE UPDATE ON public.data_corrections
FOR EACH ROW
EXECUTE FUNCTION public.update_data_corrections_updated_at();