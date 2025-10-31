import { ReactNode, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../app/store'
import { loadFromStorage } from '../app/slices/authSlice'
import { useNavigate } from 'react-router-dom'

type Props = { children: ReactNode, roles?: Array<'ADMIN'|'ANALYST'|'VIEWER'> }

export default function ProtectedRoute({ children, roles }: Props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, token } = useSelector((s: RootState) => s.auth)

  useEffect(() => { dispatch(loadFromStorage()) }, [dispatch])

  useEffect(() => {
    if (!token) navigate('/login')
    if (roles && user && !roles.includes(user.role)) navigate('/dashboard')
  }, [token, user, roles, navigate])

  if (!token) return null
  if (roles && user && !roles.includes(user.role)) return null

  return <>{children}</>
}
