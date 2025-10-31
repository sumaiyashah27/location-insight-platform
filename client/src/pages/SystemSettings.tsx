import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USERS, ADD_USER, UPDATE_USER, DELETE_USER } from '../api/graphql/users'

const SystemSettings: React.FC = () => {
  const { data, refetch } = useQuery(GET_USERS)
  const [addUser] = useMutation(ADD_USER)
  const [updateUser] = useMutation(UPDATE_USER)
  const [deleteUser] = useMutation(DELETE_USER)

  const [form, setForm] = useState({ email: '', password: '', role: 'VIEWER' })

  const handleAddUser = async () => {
    if (!form.email || !form.password) {
      alert('Please provide both email and password.')
      return
    }
    await addUser({ variables: { ...form } })
    setForm({ email: '', password: '', role: 'VIEWER' })
    refetch()
  }

  const handleRoleChange = async (id: string, newRole: string) => {
    await updateUser({ variables: { id, role: newRole } })
    refetch()
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    await deleteUser({ variables: { id } })
    refetch()
  }

  return (
    <div className="space-y-10">
      {/* --- Add User Form --- */}
      <div className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-blue-900">Add New User</h3>
            <p className="text-sm text-gray-500 mt-1">Create and assign roles to new team members.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-4 gap-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
          />
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="ADMIN">Admin</option>
            <option value="ANALYST">Analyst</option>
            <option value="VIEWER">Viewer</option>
          </select>
          <button
            onClick={handleAddUser}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all"
          >
            Add User
          </button>
        </div>
      </div>

      {/* --- Users Table --- */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
        {data?.users?.length ? (
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Email</th>
                <th className="px-6 py-3 text-left font-medium">Role</th>
                <th className="px-6 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {data.users.map((u: any) => (
                <tr key={u.id} className="hover:bg-blue-50/50 transition-colors duration-200">
                  <td className="px-6 py-3 font-medium">{u.email}</td>
                  <td className="px-6 py-3">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="ADMIN">Admin</option>
                      <option value="ANALYST">Analyst</option>
                      <option value="VIEWER">Viewer</option>
                    </select>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center py-8 text-sm">No users found.</p>
        )}
      </div>
    </div>
  )
}

export default SystemSettings
