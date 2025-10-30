import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../app/slices/authSlice";

const ProfileSettings: React.FC = () => {
  const { user } = useSelector((s: any) => s.auth);
  const dispatch = useDispatch();

  return (
    <div className="bg-white shadow p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
      <div className="space-y-2">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>

      <button
        onClick={() => dispatch(logout())}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Log out
      </button>
    </div>
  );
};

export default ProfileSettings;
