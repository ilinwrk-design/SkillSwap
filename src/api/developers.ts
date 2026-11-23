import type { Developer } from '@/entities/developers/model/types'

const BASE_URL = '/db'

export async function fetchDevelopers(): Promise<Developer[]> {
  const response = await fetch(`${BASE_URL}/developers.json`)
  if (!response.ok) throw new Error('Failed to fetch developers')
  return response.json()
}

export async function fetchDeveloperById(id: string): Promise<Developer | undefined> {
  const developers = await fetchDevelopers()
  return developers.find((developer) => developer.id === id)
}
