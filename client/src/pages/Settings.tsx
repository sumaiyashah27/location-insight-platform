import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ProfileSettings from './ProfileSettings'
import SystemSettings from './SystemSettings'

const Settings: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth)
  const [activeTab, setActiveTab] = useState<'profile' | 'system'>('profile')

  const tabs = [
    { id: 'profile', label: 'Profile Settings' },
    ...(user?.role === 'ADMIN'
      ? [{ id: 'system', label: 'System Settings' }]
      : []),
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50 p-4 sm:p-8 md:p-12 font-sans">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your profile and system preferences.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-3 bg-gray-100/70 border border-gray-200 rounded-xl p-1 shadow-sm mb-8 w-full sm:w-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'profile' | 'system')}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
              activeTab === tab.id
                ? 'bg-white text-blue-700 shadow-sm border border-blue-100'
                : 'text-gray-600 hover:text-blue-700 hover:bg-white/70'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Panel */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 hover:shadow-2xl transition-all duration-300">
        {activeTab === 'profile' && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5">
              <h3 className="text-2xl font-semibold text-blue-900">Profile Settings</h3>
              <span className="text-sm text-gray-500 italic">Personal account</span>
            </div>
            <ProfileSettings />
          </>
        )}

        {activeTab === 'system' && user?.role === 'ADMIN' && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5">
              <h3 className="text-2xl font-semibold text-blue-900">System Settings</h3>
              <span className="text-sm text-gray-500 italic">Admin tools</span>
            </div>
            <SystemSettings />
          </>
        )}
      </div>
    </div>
  )
}

export default Settings
