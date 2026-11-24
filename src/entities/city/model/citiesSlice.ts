import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchCities } from '@/api/cities'
import type { City } from './types'

export type CitiesStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface CitiesState {
  items: City[]
  status: CitiesStatus
  error: string | null
}

export interface CitiesSliceState {
  cities: CitiesState
}

export const initialCitiesState: CitiesState = {
  items: [],
  status: 'idle',
  error: null,
}

export const loadCities = createAsyncThunk<City[], void, { rejectValue: string }>(
  'cities/loadCities',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCities()
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Не удалось загрузить города',
      )
    }
  },
)

const citiesSlice = createSlice({
  name: 'cities',
  initialState: initialCitiesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCities.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadCities.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(loadCities.rejected, (state, action) => {
        state.status = 'failed'
        state.error =
          action.payload ?? action.error.message ?? 'Не удалось загрузить города'
      })
  },
})

export const selectCities = (state: CitiesSliceState): City[] => state.cities.items

export const selectCitiesStatus = (state: CitiesSliceState): CitiesStatus =>
  state.cities.status

export const selectCitiesError = (state: CitiesSliceState): string | null =>
  state.cities.error

export const selectCityById = (
  state: CitiesSliceState,
  cityId: string,
): City | undefined => state.cities.items.find((city) => city.id === cityId)

export default citiesSlice.reducer
