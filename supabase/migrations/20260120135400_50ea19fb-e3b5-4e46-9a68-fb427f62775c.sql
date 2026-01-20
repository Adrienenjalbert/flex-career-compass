-- Create table for storing article research results
CREATE TABLE public.article_research_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_slug TEXT NOT NULL,
  research_query TEXT NOT NULL,
  research_response TEXT,
  citations JSONB DEFAULT '[]'::jsonb,
  key_statistics JSONB DEFAULT '[]'::jsonb,
  researched_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(article_slug)
);

-- Enable RLS
ALTER TABLE public.article_research_results ENABLE ROW LEVEL SECURITY;

-- Anyone can view research results (public content)
CREATE POLICY "Anyone can view article research results"
ON public.article_research_results
FOR SELECT
USING (true);

-- Only admins can manage research results
CREATE POLICY "Admins can manage article research results"
ON public.article_research_results
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster lookups
CREATE INDEX idx_article_research_slug ON public.article_research_results(article_slug);

-- Add updated_at trigger
CREATE TRIGGER update_article_research_updated_at
BEFORE UPDATE ON public.article_research_results
FOR EACH ROW
EXECUTE FUNCTION public.update_data_corrections_updated_at();