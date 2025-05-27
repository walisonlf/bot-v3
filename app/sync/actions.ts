"use server"

export async function syncFixtures() {
  try {
    // Usar URL absoluta para desenvolvimento local e produção
    // Problema: A URL não está sendo construída corretamente

    // Solução: Usar window.location.origin para obter a URL base correta
    // Como estamos em um Server Component, precisamos usar uma abordagem diferente

    // Abordagem corrigida: Usar URL relativa em vez de absoluta
    const response = await fetch(`/api/sync`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Adicionar cache: 'no-store' para evitar problemas de cache
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error in syncFixtures:", error)
    return { success: false, message: String(error) }
  }
}

export async function analyzeMatches() {
  try {
    // Usar a mesma abordagem corrigida aqui também
    const response = await fetch(`/api/analyze`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Adicionar cache: 'no-store' para evitar problemas de cache
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error in analyzeMatches:", error)
    return { success: false, message: String(error) }
  }
}
