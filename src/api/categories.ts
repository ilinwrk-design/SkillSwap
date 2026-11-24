import type { Category } from '@/shared/types'

const BASE_URL = '/db'

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/categories.json`)
  if (!response.ok) throw new Error('Failed to fetch categories')
  return response.json()
}
