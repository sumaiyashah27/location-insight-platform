import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../api/graphql/queries'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../app/slices/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('Password123')
  const [login, { loading, error }] = useMutation(LOGIN)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data } = await login({ variables: { email, password } })
    dispatch(setCredentials(data.login))
    navigate('/')
  }

  return (
    <div className="card" role="region" aria-label="Login form">
      <h2>Sign in</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required aria-required="true" />
        <div style={{ height: 8 }} />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required aria-required="true" />
        <div style={{ height: 12 }} />
        <button disabled={loading} aria-busy={loading}>Sign in</button>
        {error && <p role="alert" style={{ color: '#fda4af' }}>{error.message}</p>}
      </form>
    </div>
  )
}
