import { NextResponse } from "next/server"
import { supabase, testSupabaseConnection } from "@/lib/supabase"
import { logger } from "@/lib/logger"

export async function GET() {
  try {
    // Verificar variáveis de ambiente
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        success: false,
        message: "Variáveis de ambiente do Supabase não estão configuradas",
        details: {
          NEXT_PUBLIC_SUPABASE_URL: supabaseUrl ? "Configurado" : "Não configurado",
          SUPABASE_SERVICE_ROLE_KEY: supabaseKey ? "Configurado" : "Não configurado",
        },
      })
    }

    // Testar conexão
    const connectionTest = await testSupabaseConnection()
    if (!connectionTest.success) {
      return NextResponse.json({
        success: false,
        message: "Falha na conexão com o Supabase",
        error: connectionTest.error,
      })
    }

    // Verificar tabelas
    const tables = ["matches", "odds", "team_stats", "signals", "strategies"]
    const tableResults: Record<string, boolean> = {}

    for (const table of tables) {
      try {
        const { count, error } = await supabase.from(table).select("*", { count: "exact", head: true })
        tableResults[table] = !error
      } catch (error) {
        tableResults[table] = false
        logger.error(`Erro ao verificar tabela ${table}:`, error)
      }
    }

    // Verificar se todas as tabelas existem
    const allTablesExist = Object.values(tableResults).every((result) => result)

    return NextResponse.json({
      success: allTablesExist,
      message: allTablesExist
        ? "Conexão com o Supabase estabelecida com sucesso e todas as tabelas estão disponíveis"
        : "Conexão estabelecida, mas algumas tabelas não estão disponíveis",
      details: {
        connection: "Estabelecida",
        tables: tableResults,
      },
    })
  } catch (error) {
    logger.error("Erro ao testar Supabase:", error)
    return NextResponse.json({
      success: false,
      message: "Erro ao testar conexão com o Supabase",
      error: String(error),
    })
  }
}
