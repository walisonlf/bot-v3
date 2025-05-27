"use server"

import { fetchFromAPI } from "@/lib/api-football"

export async function testApiFootball(endpoint: string, params: Record<string, string> = {}) {
  try {
    const data = await fetchFromAPI(`/${endpoint}`, params)
    return data
  } catch (error) {
    console.error("Error in testApiFootball:", error)
    return { error: String(error) }
  }
}
