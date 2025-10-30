import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Role = 'ADMIN' | 'ANALYST' | 'VIEWER'
export interface User { id: string; email: string; name: string; role: Role }
interface AuthState {
  token: string | null
  user: User | null
}
const initialState: AuthState = { token: null, user: null }

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ token: string, user: User }>) {
      state.token = action.payload.token
      state.user = action.payload.user
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    },
    loadFromStorage(state) {
      const t = localStorage.getItem('token')
      const u = localStorage.getItem('user')
      state.token = t
      state.user = u ? JSON.parse(u) : null
    },
    logout(state) {
      state.token = null
      state.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})

export const { setCredentials, loadFromStorage, logout } = slice.actions
export default slice.reducer
