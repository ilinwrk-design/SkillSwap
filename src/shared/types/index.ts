// ─── City ────────────────────────────────────────────────
export interface City {
  id: string
  name: string
}

// ─── Category ────────────────────────────────────────────
export interface Subcategory {
  id: string
  name: string
}

export interface Category {
  id: string
  name: string
  color: string
  subcategories: Subcategory[]
}

// ─── Skill ───────────────────────────────────────────────
export type SkillType = 'teach' | 'learn'

export interface Skill {
  id: string
  title: string
  description: string
  type: SkillType
  categoryId: string
  subcategoryId: string
  tags: string[]
  images: string[]
  authorId: string
  createdAt: string
}

// ─── User ────────────────────────────────────────────────
export interface User {
  id: string
  name: string
  email: string
  password: string
  birthDate: string // YYYY-MM-DD
  gender: 'мужской' | 'женский' | 'не указан'
  cityId: string
  about?: string
  avatarUrl: string | null
  wantsToLearn: string[]
  likesCount: number
  createdAt: string
}

// ─── Request ─────────────────────────────────────────────
export type RequestStatus = 'pending' | 'accepted' | 'rejected' | 'inProgress' | 'done'

export interface SwapRequest {
  id: string
  skillId: string
  fromUserId: string
  toUserId: string
  status: RequestStatus
  createdAt: string
  updatedAt: string
}

// ─── Auth ────────────────────────────────────────────────
export interface AuthUser {
  id: string
  name: string
  email: string
  token: string
}

// ─── Developer ──────────────────────────────────────────
export interface Developer {
  id: string
  name: string
  role: string
  avatarUrl: string | null
  aboutMe: string
  connectWithMe: string
}
