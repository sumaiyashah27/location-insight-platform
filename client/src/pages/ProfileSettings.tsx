import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../app/slices/authSlice'

const ProfileSettings: React.FC = () => {
  const { user } = useSelector((s: any) => s.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className="max-w-xl space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 flex items-center justify-center rounded-full bg-blue-600 text-white text-xl font-semibold">
          {user?.email?.[0]?.toUpperCase() || 'U'}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{user?.name || 'User Account'}</h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* Info */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Role</label>
          <div className="bg-gray-50 px-3 py-2 rounded-md text-gray-800 text-sm">
            {user?.role || 'Viewer'}
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Status</label>
          <div className="bg-gray-50 px-3 py-2 rounded-md text-green-600 font-medium text-sm">
            Active
          </div>
        </div>
      </div>

      {/* Logout */}
      <div>
        <button
          onClick={handleLogout}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors shadow-sm"
        >
          Log out
        </button>
      </div>
    </div>
  )
}

export default ProfileSettings
