import { configureStore } from '@reduxjs/toolkit'
import { citiesReducer } from '@/entities/city'
import { categoriesReducer } from '@/entities/skill'
// Импортируй свои slice'ы здесь по мере их создания:
// import authReducer from '@/features/auth/model/authSlice'

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    categories: categoriesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
