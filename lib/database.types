export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      matches: {
        Row: {
          id: number
          fixture_id: number
          league_id: number
          league_name: string
          home_team: string
          away_team: string
          home_team_id: number
          away_team_id: number
          date: string
          time: string
          status: string
          home_score: number | null
          away_score: number | null
          ht_home_score: number | null
          ht_away_score: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          fixture_id: number
          league_id: number
          league_name: string
          home_team: string
          away_team: string
          home_team_id: number
          away_team_id: number
          date: string
          time: string
          status: string
          home_score?: number | null
          away_score?: number | null
          ht_home_score?: number | null
          ht_away_score?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          fixture_id?: number
          league_id?: number
          league_name?: string
          home_team?: string
          away_team?: string
          home_team_id?: number
          away_team_id?: number
          date?: string
          time?: string
          status?: string
          home_score?: number | null
          away_score?: number | null
          ht_home_score?: number | null
          ht_away_score?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      odds: {
        Row: {
          id: number
          match_id: number
          bookmaker: string
          market: string
          odd_name: string
          odd_value: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          match_id: number
          bookmaker: string
          market: string
          odd_name: string
          odd_value: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          match_id?: number
          bookmaker?: string
          market?: string
          odd_name?: string
          odd_value?: number
          created_at?: string
          updated_at?: string
        }
      }
      signals: {
        Row: {
          id: number
          match_id: number
          market: string
          prediction: string
          odd: number
          strategy_id: number
          status: string
          result: string | null
          created_at: string
          updated_at: string
          sent_at: string | null
          analysis: string | null
        }
        Insert: {
          id?: number
          match_id: number
          market: string
          prediction: string
          odd: number
          strategy_id: number
          status: string
          result?: string | null
          created_at?: string
          updated_at?: string
          sent_at?: string | null
          analysis?: string | null
        }
        Update: {
          id?: number
          match_id?: number
          market?: string
          prediction?: string
          odd?: number
          strategy_id?: number
          status?: string
          result?: string | null
          created_at?: string
          updated_at?: string
          sent_at?: string | null
          analysis?: string | null
        }
      }
      strategies: {
        Row: {
          id: number
          name: string
          market: string
          description: string
          parameters: Json
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          market: string
          description: string
          parameters: Json
          active: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          market?: string
          description?: string
          parameters?: Json
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      team_stats: {
        Row: {
          id: number
          team_id: number
          team_name: string
          league_id: number
          form: string | null
          avg_goals_scored: number
          avg_goals_conceded: number
          clean_sheets_percent: number
          btts_percent: number
          over_25_percent: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          team_id: number
          team_name: string
          league_id: number
          form?: string | null
          avg_goals_scored: number
          avg_goals_conceded: number
          clean_sheets_percent: number
          btts_percent: number
          over_25_percent: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          team_id?: number
          team_name?: string
          league_id?: number
          form?: string | null
          avg_goals_scored?: number
          avg_goals_conceded?: number
          clean_sheets_percent?: number
          btts_percent?: number
          over_25_percent?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
