import { configureStore } from '@reduxjs/toolkit'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchCities } from '@/api/cities'
import type { City } from './types'
import citiesReducer, {
  loadCities,
  selectCities,
  selectCitiesError,
  selectCitiesStatus,
  selectCityById,
} from './citiesSlice'

vi.mock('@/api/cities', () => ({
  fetchCities: vi.fn(),
}))

const mockedFetchCities = vi.mocked(fetchCities)

const cities: City[] = [
  { id: 'city_1', name: 'Москва' },
  { id: 'city_2', name: 'Санкт-Петербург' },
]

function createStore() {
  return configureStore({ reducer: { cities: citiesReducer } })
}

function createDeferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (reason?: unknown) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

describe('citiesSlice', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('начальное состояние: пустой список и статус idle', () => {
    const store = createStore()

    expect(selectCities(store.getState())).toEqual([])
    expect(selectCitiesStatus(store.getState())).toBe('idle')
    expect(selectCitiesError(store.getState())).toBeNull()
  })

  it('переводит статус в loading во время загрузки', async () => {
    const deferred = createDeferred<City[]>()
    mockedFetchCities.mockReturnValue(deferred.promise)

    const store = createStore()
    const request = store.dispatch(loadCities())

    expect(selectCitiesStatus(store.getState())).toBe('loading')

    deferred.resolve(cities)
    await request
  })

  it('сохраняет список и статус succeeded после успешной загрузки', async () => {
    mockedFetchCities.mockResolvedValue(cities)

    const store = createStore()
    await store.dispatch(loadCities())

    expect(selectCities(store.getState())).toEqual(cities)
    expect(selectCitiesStatus(store.getState())).toBe('succeeded')
    expect(selectCitiesError(store.getState())).toBeNull()
  })

  it('сохраняет ошибку и статус failed при неудачной загрузке', async () => {
    mockedFetchCities.mockRejectedValue(new Error('Failed to fetch cities'))

    const store = createStore()
    const result = await store.dispatch(loadCities())

    expect(result.type).toBe('cities/loadCities/rejected')
    expect(selectCities(store.getState())).toEqual([])
    expect(selectCitiesStatus(store.getState())).toBe('failed')
    expect(selectCitiesError(store.getState())).toBe('Failed to fetch cities')
  })

  it('selectCityById возвращает undefined для неизвестного id', () => {
    expect(
      selectCityById(
        {
          cities: {
            items: cities,
            status: 'succeeded',
            error: null,
          },
        },
        'missing',
      ),
    ).toBeUndefined()
  })

  it('selectCityById находит город по id', () => {
    expect(
      selectCityById(
        {
          cities: {
            items: cities,
            status: 'succeeded',
            error: null,
          },
        },
        'city_2',
      ),
    ).toEqual(cities[1])
  })
})
