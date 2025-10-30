import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS, ADD_USER, UPDATE_USER, DELETE_USER } from "../api/graphql/users";

const SystemSettings: React.FC = () => {
  const { data, refetch } = useQuery(GET_USERS);
  const [addUser] = useMutation(ADD_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    role: "VIEWER",
  });

  const handleAddUser = async () => {
    if (!form.email || !form.password) {
      alert("Email and password required");
      return;
    }
    await addUser({ variables: { ...form } });
    setForm({ email: "", name: "", password: "", role: "VIEWER" });
    refetch();
  };

   const handleRoleChange = async (id: string, newRole: string) => {
    await updateUser({ variables: { id, role: newRole } });
    refetch();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await deleteUser({ variables: { id } });
    refetch();
  };

  return (
    <div className="bg-white shadow p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">System Settings (Admin Only)</h2>

      <div className="flex flex-wrap gap-2 mb-6">
        <input
          type="text"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 rounded-md"
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border p-2 rounded-md"
        >
          <option value="ADMIN">Admin</option>
          <option value="ANALYST">Analyst</option>
          <option value="VIEWER">Viewer</option>
        </select>
        <button
          onClick={handleAddUser}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add User
        </button>
      </div>

      {data?.users && (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Role</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((u: any) => (
              <tr key={u.id}>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="ANALYST">Analyst</option>
                    <option value="VIEWER">Viewer</option>
                  </select>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SystemSettings;