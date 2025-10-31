import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from './app/store'
import Landing from "./pages/Landing";
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import ProtectedRoute from './routes/ProtectedRoute'

export default function App() {
  const { token } = useSelector((state: RootState) => state.auth)

  return (
    <BrowserRouter>
      <div className="container">
        <header className="header">
          {/* Show navbar only if logged in */}
          {/* {token && (
            <nav aria-label="primary">
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/analytics">Analytics</NavLink>
              <NavLink to="/settings">Settings</NavLink>
            </nav>
          )} */}
          {token && (
            <nav
              aria-label="primary"
              className="flex justify-center items-center gap-8 py-2 text-sm font-medium text-gray-700"
            >
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `pb-1 border-b-2 transition-all duration-200 ${
                    isActive
                      ? 'border-blue-600 text-blue-700 font-semibold'
                      : 'border-transparent hover:text-blue-700 hover:border-blue-400'
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/analytics"
                className={({ isActive }) =>
                  `pb-1 border-b-2 transition-all duration-200 ${
                    isActive
                      ? 'border-blue-600 text-blue-700 font-semibold'
                      : 'border-transparent hover:text-blue-700 hover:border-blue-400'
                  }`
                }
              >
                Analytics
              </NavLink>

              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `pb-1 border-b-2 transition-all duration-200 ${
                    isActive
                      ? 'border-blue-600 text-blue-700 font-semibold'
                      : 'border-transparent hover:text-blue-700 hover:border-blue-400'
                  }`
                }
              >
                Settings
              </NavLink>
            </nav>
          )}

        </header>

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}