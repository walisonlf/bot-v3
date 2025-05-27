import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

// Cria um cliente Supabase com as variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  console.error("NEXT_PUBLIC_SUPABASE_URL não está configurada nas variáveis de ambiente")
}

if (!supabaseKey) {
  console.error("SUPABASE_SERVICE_ROLE_KEY não está configurada nas variáveis de ambiente")
}

// Função para criar um cliente Supabase com retry
export function createSupabaseClient() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Variáveis de ambiente do Supabase não estão configuradas")
  }

  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

// Cliente Supabase singleton
export const supabase = createSupabaseClient()

// Função para testar a conexão com o Supabase
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from("strategies").select("count").single()

    if (error) {
      throw error
    }

    return { success: true, message: "Conexão com o Supabase estabelecida com sucesso" }
  } catch (error) {
    console.error("Erro ao testar conexão com o Supabase:", error)
    return {
      success: false,
      message: "Falha ao conectar com o Supabase",
      error: String(error),
    }
  }
}
