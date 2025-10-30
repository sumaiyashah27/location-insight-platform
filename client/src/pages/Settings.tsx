import React from "react";
import { useSelector } from "react-redux";
import ProfileSettings from "./ProfileSettings";
import SystemSettings from "./SystemSettings";

const Settings: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  console.log("User role:", user?.role);


  return (
    <div className="p-6 space-y-8">
      <ProfileSettings />
      {user?.role === "ADMIN" && (
        <>
          <hr />
          <SystemSettings />
        </>
      )}
    </div>
  );
};

export default Settings;
