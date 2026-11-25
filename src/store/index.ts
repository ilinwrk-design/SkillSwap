import { configureStore } from '@reduxjs/toolkit'
import { citiesReducer } from '@/entities/city'
import { categoriesReducer } from '@/entities/skill'
import { usersReducer } from '@/entities/user'
// Импортируй свои slice'ы здесь по мере их создания:
// import authReducer from '@/features/auth/model/authSlice'

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    categories: categoriesReducer,
    users: usersReducer,
    // skills: skillsReducer,
    // auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
