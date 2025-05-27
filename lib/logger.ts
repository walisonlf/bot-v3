// Níveis de log
type LogLevel = "debug" | "info" | "warn" | "error"

// Função para log com timestamp e nível
export function log(level: LogLevel, message: string, data?: any) {
  const timestamp = new Date().toISOString()
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`

  if (data) {
    console[level](`${prefix} ${message}`, data)
  } else {
    console[level](`${prefix} ${message}`)
  }
}

// Funções específicas para cada nível de log
export const logger = {
  debug: (message: string, data?: any) => log("debug", message, data),
  info: (message: string, data?: any) => log("info", message, data),
  warn: (message: string, data?: any) => log("warn", message, data),
  error: (message: string, data?: any) => log("error", message, data),
}
