import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from '@/api/users'
import type { User } from '@/shared/types'

export type UsersStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface UsersState {
  items: User[]
  status: UsersStatus
  error: string | null
}

const initialState: UsersState = {
  items: [],
  status: 'idle',
  error: null,
}

const LOAD_USERS_ERROR = 'Не удалось загрузить пользователей'

function getErrorMessage(error: unknown): string {
  return error instanceof Error && error.message ? error.message : LOAD_USERS_ERROR
}

export const loadUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'users/loadUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchUsers()
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  },
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? LOAD_USERS_ERROR
      })
  },
})

interface StateWithUsers {
  users: UsersState
}

export const selectUsers = (state: StateWithUsers): User[] => state.users.items

export const selectUsersStatus = (state: StateWithUsers): UsersStatus => state.users.status

export const selectUsersError = (state: StateWithUsers): string | null => state.users.error

export const selectUserById = (state: StateWithUsers, userId: string): User | undefined =>
  state.users.items.find((user) => user.id === userId)

export const usersReducer = usersSlice.reducer
