import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchCategories } from '@/api/categories'
import type { Category, Subcategory } from './types'

export type CategoriesStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface CategoriesState {
  items: Category[]
  status: CategoriesStatus
  error: string | null
}

export interface CategoriesSliceState {
  categories: CategoriesState
}

export interface SubcategoryWithColor extends Subcategory {
  categoryId: string
  color: string
}

export const initialCategoriesState: CategoriesState = {
  items: [],
  status: 'idle',
  error: null,
}

export const loadCategories = createAsyncThunk<Category[], void, { rejectValue: string }>(
  'categories/loadCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCategories()
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Не удалось загрузить категории',
      )
    }
  },
)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialCategoriesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCategories.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.status = 'failed'
        state.error =
          action.payload ?? action.error.message ?? 'Не удалось загрузить категории'
      })
  },
})

export const selectCategories = (state: CategoriesSliceState): Category[] =>
  state.categories.items

export const selectCategoriesStatus = (state: CategoriesSliceState): CategoriesStatus =>
  state.categories.status

export const selectCategoriesError = (state: CategoriesSliceState): string | null =>
  state.categories.error

export const selectCategoryById = (
  state: CategoriesSliceState,
  categoryId: string,
): Category | undefined =>
  state.categories.items.find((category) => category.id === categoryId)

export const selectSubcategoryById = (
  state: CategoriesSliceState,
  subcategoryId: string,
): SubcategoryWithColor | undefined => {
  for (const category of state.categories.items) {
    const subcategory = category.subcategories.find((item) => item.id === subcategoryId)
    if (subcategory) {
      return {
        ...subcategory,
        categoryId: category.id,
        color: category.color,
      }
    }
  }
  return undefined
}

export default categoriesSlice.reducer
