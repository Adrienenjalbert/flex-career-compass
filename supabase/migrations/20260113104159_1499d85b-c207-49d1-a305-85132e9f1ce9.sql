-- Create city_employers table for verified local employer data
CREATE TABLE public.city_employers (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    city_slug TEXT NOT NULL,
    season_type TEXT NOT NULL CHECK (season_type IN ('holiday', 'summer', 'tax-season', 'spring', 'back-to-school', 'event')),
    employer_name TEXT NOT NULL,
    employer_type TEXT NOT NULL CHECK (employer_type IN ('warehouse', 'retail', 'hospitality', 'logistics', 'convention', 'stadium', 'restaurant', 'hotel', 'cleaning', 'other')),
    facility_name TEXT,
    facility_address TEXT,
    estimated_seasonal_hires INTEGER,
    pay_range_min DECIMAL(10,2),
    pay_range_max DECIMAL(10,2),
    apply_url TEXT,
    hiring_start_date DATE,
    hiring_end_date DATE,
    verified_at TIMESTAMP WITH TIME ZONE,
    source_citation TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create city_events table for local event staffing data
CREATE TABLE public.city_events (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    city_slug TEXT NOT NULL,
    event_name TEXT NOT NULL,
    event_type TEXT NOT NULL CHECK (event_type IN ('sports', 'festival', 'convention', 'concert', 'holiday', 'corporate', 'other')),
    venue_name TEXT,
    venue_address TEXT,
    event_start_date DATE,
    event_end_date DATE,
    estimated_staffing_needs INTEGER,
    roles_needed TEXT[],
    pay_range_min DECIMAL(10,2),
    pay_range_max DECIMAL(10,2),
    application_deadline DATE,
    apply_url TEXT,
    verified_at TIMESTAMP WITH TIME ZONE,
    source_citation TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create city_wage_data table for local wage context
CREATE TABLE public.city_wage_data (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    city_slug TEXT NOT NULL,
    industry TEXT NOT NULL,
    role_type TEXT,
    min_wage DECIMAL(10,2) NOT NULL,
    max_wage DECIMAL(10,2) NOT NULL,
    median_wage DECIMAL(10,2),
    state_average DECIMAL(10,2),
    national_average DECIMAL(10,2),
    wage_context TEXT,
    data_source TEXT NOT NULL,
    effective_date DATE NOT NULL,
    verified_at TIMESTAMP WITH TIME ZONE,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(city_slug, industry, role_type)
);

-- Create city_transport_info table for commute guides
CREATE TABLE public.city_transport_info (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    city_slug TEXT NOT NULL UNIQUE,
    major_transit_lines TEXT[],
    transit_to_warehouse_districts TEXT,
    transit_to_hospitality_areas TEXT,
    parking_notes TEXT,
    commute_tips TEXT[],
    rideshare_notes TEXT,
    verified_at TIMESTAMP WITH TIME ZONE,
    source_citation TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.city_employers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.city_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.city_wage_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.city_transport_info ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables (content is public)
CREATE POLICY "Anyone can view city employers" ON public.city_employers FOR SELECT USING (true);
CREATE POLICY "Anyone can view city events" ON public.city_events FOR SELECT USING (true);
CREATE POLICY "Anyone can view city wage data" ON public.city_wage_data FOR SELECT USING (true);
CREATE POLICY "Anyone can view city transport info" ON public.city_transport_info FOR SELECT USING (true);

-- Admin write access
CREATE POLICY "Admins can manage city employers" ON public.city_employers FOR ALL USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage city events" ON public.city_events FOR ALL USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage city wage data" ON public.city_wage_data FOR ALL USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage city transport info" ON public.city_transport_info FOR ALL USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create indexes for performance
CREATE INDEX idx_city_employers_city_season ON public.city_employers(city_slug, season_type);
CREATE INDEX idx_city_events_city ON public.city_events(city_slug);
CREATE INDEX idx_city_wage_data_city ON public.city_wage_data(city_slug);

-- Create updated_at triggers
CREATE TRIGGER update_city_employers_updated_at BEFORE UPDATE ON public.city_employers FOR EACH ROW EXECUTE FUNCTION public.update_data_corrections_updated_at();
CREATE TRIGGER update_city_events_updated_at BEFORE UPDATE ON public.city_events FOR EACH ROW EXECUTE FUNCTION public.update_data_corrections_updated_at();
CREATE TRIGGER update_city_wage_data_updated_at BEFORE UPDATE ON public.city_wage_data FOR EACH ROW EXECUTE FUNCTION public.update_data_corrections_updated_at();
CREATE TRIGGER update_city_transport_info_updated_at BEFORE UPDATE ON public.city_transport_info FOR EACH ROW EXECUTE FUNCTION public.update_data_corrections_updated_at();