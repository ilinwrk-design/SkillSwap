import { configureStore } from '@reduxjs/toolkit'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchUsers } from '@/api/users'
import type { User } from '@/shared/types'
import {
  loadUsers,
  selectUserById,
  selectUsers,
  selectUsersError,
  selectUsersStatus,
  usersReducer,
} from './usersSlice'

vi.mock('@/api/users')

const mockedFetchUsers = vi.mocked(fetchUsers)

const users: User[] = [
  {
    id: 'user_1',
    name: 'Анна',
    email: 'anna@example.com',
    password: 'password123',
    birthDate: '1995-04-12',
    gender: 'женский',
    cityId: 'city_1',
    about: 'Учу английский и делюсь дизайном.',
    avatarUrl: '/images/avatars/user_1.jpg',
    wantsToLearn: ['subcategory_english'],
    likesCount: 3,
    createdAt: '2026-01-10T10:00:00.000Z',
  },
  {
    id: 'user_2',
    name: 'Иван',
    email: 'ivan@example.com',
    password: 'password123',
    birthDate: '1988-11-03',
    gender: 'мужской',
    cityId: 'city_2',
    avatarUrl: null,
    wantsToLearn: ['subcategory_guitar'],
    likesCount: 0,
    createdAt: '2026-02-01T09:30:00.000Z',
  },
]

function createTestStore() {
  return configureStore({ reducer: { users: usersReducer } })
}

function createDeferred<T>() {
  let resolve: (value: T) => void = () => {}
  const promise = new Promise<T>((res) => {
    resolve = res
  })
  return { promise, resolve }
}

describe('usersSlice', () => {
  beforeEach(() => {
    mockedFetchUsers.mockReset()
  })

  it('создаёт начальное состояние', () => {
    const store = createTestStore()
    const state = store.getState()

    expect(state.users).toEqual({ items: [], status: 'idle', error: null })
    expect(selectUsers(state)).toEqual([])
    expect(selectUsersStatus(state)).toBe('idle')
  })

  it('переходит в loading, пока запрос выполняется', async () => {
    const deferred = createDeferred<User[]>()
    mockedFetchUsers.mockReturnValue(deferred.promise)

    const store = createTestStore()
    const request = store.dispatch(loadUsers())

    expect(selectUsersStatus(store.getState())).toBe('loading')
    expect(selectUsersError(store.getState())).toBeNull()

    deferred.resolve(users)
    await request
  })

  it('сохраняет список и статус succeeded после успешной загрузки', async () => {
    mockedFetchUsers.mockResolvedValue(users)

    const store = createTestStore()
    await store.dispatch(loadUsers())
    const state = store.getState()

    expect(selectUsers(state)).toEqual(users)
    expect(selectUsersStatus(state)).toBe('succeeded')
    expect(selectUsersError(state)).toBeNull()
  })

  it('сохраняет ошибку и статус failed, если запрос упал', async () => {
    mockedFetchUsers.mockRejectedValue(new Error('Network error'))

    const store = createTestStore()
    await store.dispatch(loadUsers())
    const state = store.getState()

    expect(selectUsersStatus(state)).toBe('failed')
    expect(selectUsers(state)).toEqual([])
    expect(selectUsersError(state)).toBe('Network error')
  })

  it('подставляет понятный текст для неизвестной ошибки', async () => {
    mockedFetchUsers.mockRejectedValue('unexpected')

    const store = createTestStore()
    await store.dispatch(loadUsers())
    const state = store.getState()

    expect(selectUsersStatus(state)).toBe('failed')
    expect(selectUsersError(state)).toBe('Не удалось загрузить пользователей')
  })

  it('находит пользователя по id и возвращает undefined для неизвестного id', async () => {
    mockedFetchUsers.mockResolvedValue(users)

    const store = createTestStore()
    await store.dispatch(loadUsers())
    const state = store.getState()

    expect(selectUserById(state, 'user_2')).toEqual(users[1])
    expect(selectUserById(state, 'user_404')).toBeUndefined()
  })
})
