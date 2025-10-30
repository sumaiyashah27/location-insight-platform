import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import ProtectedRoute from './routes/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <header className="header">
          <h1>Location Insight Platform</h1>
          <nav aria-label="primary">
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/analytics">Analytics</NavLink>
            <NavLink to="/settings">Settings</NavLink>
          </nav>
        </header>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          {/* <Route path="/settings" element={<ProtectedRoute roles={['ADMIN']}><Settings /></ProtectedRoute>} /> */}
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
