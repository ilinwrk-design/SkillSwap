import { configureStore } from '@reduxjs/toolkit'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchCategories } from '@/api/categories'
import type { Category } from './types'
import categoriesReducer, {
  loadCategories,
  selectCategories,
  selectCategoriesError,
  selectCategoriesStatus,
  selectCategoryById,
  selectSubcategoryById,
} from './categoriesSlice'

vi.mock('@/api/categories', () => ({
  fetchCategories: vi.fn(),
}))

const mockedFetchCategories = vi.mocked(fetchCategories)

const categories: Category[] = [
  {
    id: 'category_business',
    name: 'Бизнес и карьера',
    color: '#EEE7F7',
    icon: 'briefcase',
    subcategories: [
      { id: 'subcategory_time-management', name: 'Тайм-менеджмент' },
    ],
  },
  {
    id: 'category_creativity',
    name: 'Творчество и искусство',
    color: '#F7E7F2',
    icon: 'palette',
    subcategories: [
      { id: 'subcategory_photography', name: 'Фотография' },
    ],
  },
]

function createStore() {
  return configureStore({ reducer: { categories: categoriesReducer } })
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

describe('categoriesSlice', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('начальное состояние: пустой список и статус idle', () => {
    const store = createStore()

    expect(selectCategories(store.getState())).toEqual([])
    expect(selectCategoriesStatus(store.getState())).toBe('idle')
    expect(selectCategoriesError(store.getState())).toBeNull()
  })

  it('переводит статус в loading во время загрузки', async () => {
    const deferred = createDeferred<Category[]>()
    mockedFetchCategories.mockReturnValue(deferred.promise)

    const store = createStore()
    const request = store.dispatch(loadCategories())

    expect(selectCategoriesStatus(store.getState())).toBe('loading')

    deferred.resolve(categories)
    await request
  })

  it('сохраняет список и статус succeeded после успешной загрузки', async () => {
    mockedFetchCategories.mockResolvedValue(categories)

    const store = createStore()
    await store.dispatch(loadCategories())

    expect(selectCategories(store.getState())).toEqual(categories)
    expect(selectCategoriesStatus(store.getState())).toBe('succeeded')
    expect(selectCategoriesError(store.getState())).toBeNull()
  })

  it('сохраняет ошибку и статус failed при неудачной загрузке', async () => {
    mockedFetchCategories.mockRejectedValue(new Error('Failed to fetch categories'))

    const store = createStore()
    const result = await store.dispatch(loadCategories())

    expect(result.type).toBe('categories/loadCategories/rejected')
    expect(selectCategories(store.getState())).toEqual([])
    expect(selectCategoriesStatus(store.getState())).toBe('failed')
    expect(selectCategoriesError(store.getState())).toBe('Failed to fetch categories')
  })

  it('selectCategoryById возвращает undefined для неизвестного id', () => {
    expect(
      selectCategoryById(
        {
          categories: {
            items: categories,
            status: 'succeeded',
            error: null,
          },
        },
        'missing',
      ),
    ).toBeUndefined()
  })

  it('selectCategoryById находит категорию по id', () => {
    expect(
      selectCategoryById(
        {
          categories: {
            items: categories,
            status: 'succeeded',
            error: null,
          },
        },
        'category_business',
      ),
    ).toEqual(categories[0])
  })

  it('selectSubcategoryById возвращает undefined для неизвестного id', () => {
    expect(
      selectSubcategoryById(
        {
          categories: {
            items: categories,
            status: 'succeeded',
            error: null,
          },
        },
        'missing',
      ),
    ).toBeUndefined()
  })

  it('selectSubcategoryById возвращает подкатегорию вместе с цветом категории', () => {
    const subcategory = selectSubcategoryById(
      {
        categories: {
          items: categories,
          status: 'succeeded',
          error: null,
        },
      },
      'subcategory_photography',
    )

    expect(subcategory).toEqual({
      id: 'subcategory_photography',
      name: 'Фотография',
      categoryId: 'category_creativity',
      color: '#F7E7F2',
    })
  })
})
