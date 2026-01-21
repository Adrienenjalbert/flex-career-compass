export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      article_research_results: {
        Row: {
          article_slug: string
          citations: Json | null
          created_at: string
          id: string
          key_statistics: Json | null
          research_query: string
          research_response: string | null
          researched_at: string
          updated_at: string
        }
        Insert: {
          article_slug: string
          citations?: Json | null
          created_at?: string
          id?: string
          key_statistics?: Json | null
          research_query: string
          research_response?: string | null
          researched_at?: string
          updated_at?: string
        }
        Update: {
          article_slug?: string
          citations?: Json | null
          created_at?: string
          id?: string
          key_statistics?: Json | null
          research_query?: string
          research_response?: string | null
          researched_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      city_employers: {
        Row: {
          apply_url: string | null
          city_slug: string
          created_at: string
          employer_name: string
          employer_type: string
          estimated_seasonal_hires: number | null
          facility_address: string | null
          facility_name: string | null
          hiring_end_date: string | null
          hiring_start_date: string | null
          id: string
          is_verified: boolean
          pay_range_max: number | null
          pay_range_min: number | null
          season_type: string
          source_citation: string | null
          updated_at: string
          verified_at: string | null
        }
        Insert: {
          apply_url?: string | null
          city_slug: string
          created_at?: string
          employer_name: string
          employer_type: string
          estimated_seasonal_hires?: number | null
          facility_address?: string | null
          facility_name?: string | null
          hiring_end_date?: string | null
          hiring_start_date?: string | null
          id?: string
          is_verified?: boolean
          pay_range_max?: number | null
          pay_range_min?: number | null
          season_type: string
          source_citation?: string | null
          updated_at?: string
          verified_at?: string | null
        }
        Update: {
          apply_url?: string | null
          city_slug?: string
          created_at?: string
          employer_name?: string
          employer_type?: string
          estimated_seasonal_hires?: number | null
          facility_address?: string | null
          facility_name?: string | null
          hiring_end_date?: string | null
          hiring_start_date?: string | null
          id?: string
          is_verified?: boolean
          pay_range_max?: number | null
          pay_range_min?: number | null
          season_type?: string
          source_citation?: string | null
          updated_at?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      city_events: {
        Row: {
          application_deadline: string | null
          apply_url: string | null
          city_slug: string
          created_at: string
          estimated_staffing_needs: number | null
          event_end_date: string | null
          event_name: string
          event_start_date: string | null
          event_type: string
          id: string
          is_verified: boolean
          pay_range_max: number | null
          pay_range_min: number | null
          roles_needed: string[] | null
          source_citation: string | null
          updated_at: string
          venue_address: string | null
          venue_name: string | null
          verified_at: string | null
        }
        Insert: {
          application_deadline?: string | null
          apply_url?: string | null
          city_slug: string
          created_at?: string
          estimated_staffing_needs?: number | null
          event_end_date?: string | null
          event_name: string
          event_start_date?: string | null
          event_type: string
          id?: string
          is_verified?: boolean
          pay_range_max?: number | null
          pay_range_min?: number | null
          roles_needed?: string[] | null
          source_citation?: string | null
          updated_at?: string
          venue_address?: string | null
          venue_name?: string | null
          verified_at?: string | null
        }
        Update: {
          application_deadline?: string | null
          apply_url?: string | null
          city_slug?: string
          created_at?: string
          estimated_staffing_needs?: number | null
          event_end_date?: string | null
          event_name?: string
          event_start_date?: string | null
          event_type?: string
          id?: string
          is_verified?: boolean
          pay_range_max?: number | null
          pay_range_min?: number | null
          roles_needed?: string[] | null
          source_citation?: string | null
          updated_at?: string
          venue_address?: string | null
          venue_name?: string | null
          verified_at?: string | null
        }
        Relationships: []
      }
      city_transport_info: {
        Row: {
          city_slug: string
          commute_tips: string[] | null
          created_at: string
          id: string
          is_verified: boolean
          major_transit_lines: string[] | null
          parking_notes: string | null
          rideshare_notes: string | null
          source_citation: string | null
          transit_to_hospitality_areas: string | null
          transit_to_warehouse_districts: string | null
          updated_at: string
          verified_at: string | null
        }
        Insert: {
          city_slug: string
          commute_tips?: string[] | null
          created_at?: string
          id?: string
          is_verified?: boolean
          major_transit_lines?: string[] | null
          parking_notes?: string | null
          rideshare_notes?: string | null
          source_citation?: string | null
          transit_to_hospitality_areas?: string | null
          transit_to_warehouse_districts?: string | null
          updated_at?: string
          verified_at?: string | null
        }
        Update: {
          city_slug?: string
          commute_tips?: string[] | null
          created_at?: string
          id?: string
          is_verified?: boolean
          major_transit_lines?: string[] | null
          parking_notes?: string | null
          rideshare_notes?: string | null
          source_citation?: string | null
          transit_to_hospitality_areas?: string | null
          transit_to_warehouse_districts?: string | null
          updated_at?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      city_wage_data: {
        Row: {
          city_slug: string
          created_at: string
          data_source: string
          effective_date: string
          id: string
          industry: string
          is_verified: boolean
          max_wage: number
          median_wage: number | null
          min_wage: number
          national_average: number | null
          role_type: string | null
          state_average: number | null
          updated_at: string
          verified_at: string | null
          wage_context: string | null
        }
        Insert: {
          city_slug: string
          created_at?: string
          data_source: string
          effective_date: string
          id?: string
          industry: string
          is_verified?: boolean
          max_wage: number
          median_wage?: number | null
          min_wage: number
          national_average?: number | null
          role_type?: string | null
          state_average?: number | null
          updated_at?: string
          verified_at?: string | null
          wage_context?: string | null
        }
        Update: {
          city_slug?: string
          created_at?: string
          data_source?: string
          effective_date?: string
          id?: string
          industry?: string
          is_verified?: boolean
          max_wage?: number
          median_wage?: number | null
          min_wage?: number
          national_average?: number | null
          role_type?: string | null
          state_average?: number | null
          updated_at?: string
          verified_at?: string | null
          wage_context?: string | null
        }
        Relationships: []
      }
      data_corrections: {
        Row: {
          category: string
          created_at: string
          current_value: string
          field_name: string
          id: string
          local_file: string
          reviewed_at: string | null
          reviewer_notes: string | null
          source_name: string
          source_url: string
          state_code: string
          status: string
          suggested_value: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          current_value: string
          field_name: string
          id?: string
          local_file: string
          reviewed_at?: string | null
          reviewer_notes?: string | null
          source_name: string
          source_url: string
          state_code: string
          status?: string
          suggested_value: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          current_value?: string
          field_name?: string
          id?: string
          local_file?: string
          reviewed_at?: string | null
          reviewer_notes?: string | null
          source_name?: string
          source_url?: string
          state_code?: string
          status?: string
          suggested_value?: string
          updated_at?: string
        }
        Relationships: []
      }
      persona_research_results: {
        Row: {
          citations: string[] | null
          content_gaps: Json | null
          created_at: string | null
          external_resources: Json | null
          firecrawl_data: Json | null
          id: string
          perplexity_response: string | null
          persona_slug: string
          researched_at: string | null
          seo_keywords: Json | null
          statistics: Json | null
          updated_at: string | null
        }
        Insert: {
          citations?: string[] | null
          content_gaps?: Json | null
          created_at?: string | null
          external_resources?: Json | null
          firecrawl_data?: Json | null
          id?: string
          perplexity_response?: string | null
          persona_slug: string
          researched_at?: string | null
          seo_keywords?: Json | null
          statistics?: Json | null
          updated_at?: string | null
        }
        Update: {
          citations?: string[] | null
          content_gaps?: Json | null
          created_at?: string | null
          external_resources?: Json | null
          firecrawl_data?: Json | null
          id?: string
          perplexity_response?: string | null
          persona_slug?: string
          researched_at?: string | null
          seo_keywords?: Json | null
          statistics?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
