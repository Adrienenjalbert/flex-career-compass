-- Create table for storing persona research results
CREATE TABLE public.persona_research_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  persona_slug TEXT NOT NULL UNIQUE,
  seo_keywords JSONB DEFAULT '[]'::jsonb,
  statistics JSONB DEFAULT '{}'::jsonb,
  external_resources JSONB DEFAULT '[]'::jsonb,
  perplexity_response TEXT,
  firecrawl_data JSONB DEFAULT '{}'::jsonb,
  citations TEXT[] DEFAULT '{}',
  content_gaps JSONB DEFAULT '[]'::jsonb,
  researched_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.persona_research_results ENABLE ROW LEVEL SECURITY;

-- Anyone can view persona research results (public content)
CREATE POLICY "Anyone can view persona research results"
ON public.persona_research_results
FOR SELECT
USING (true);

-- Only admins can manage persona research results
CREATE POLICY "Admins can manage persona research results"
ON public.persona_research_results
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster lookups
CREATE INDEX idx_persona_research_slug ON public.persona_research_results(persona_slug);

-- Create trigger for updated_at
CREATE TRIGGER update_persona_research_updated_at
BEFORE UPDATE ON public.persona_research_results
FOR EACH ROW
EXECUTE FUNCTION public.update_data_corrections_updated_at();