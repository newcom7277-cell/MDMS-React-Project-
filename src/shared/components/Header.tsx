
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

interface HeaderProps {
  title?: string;
}

export const Header = ({ title = "Dashboard" }: HeaderProps) => {
  // Get logged-in user details and setUser function
  const { user, setUser } = useUser();

  // Used to open and close the profile dropdown
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();

  // Convert role values into readable names
  const getRoleName = (role: string) => {
    switch (role) {
      case "zone_admin":
        return "Zone Admin";

      case "end_user":
        return "End User";

      case "enterprise":
        return "Enterprise Admin";

      default:
        return role;
    }
  };

  // Logout: clear Context and LocalStorage
  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  // Get first letter of user's name for fallback avatar
  const userInitial = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-sm">

      {/* LEFT SIDE - PAGE TITLE */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
          {title}
        </h1>

        <p className="hidden sm:block text-sm text-slate-500 mt-1">
          Meter Data Management System
        </p>
      </div>

      {/* RIGHT SIDE - USER PROFILE */}
      <div className="relative">

        <button
          type="button"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-3 rounded-xl px-2 sm:px-3 py-2 hover:bg-slate-100 transition"
        >

          {/* USER AVATAR */}
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="User profile"
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              {userInitial}
            </div>
          )}

          {/* USER NAME, ID AND ROLE */}
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-slate-800">
              {user?.name || "User"}
            </p>

            {/* NEW: Show User ID beside name */}
            <p className="text-xs text-slate-500">
              ID: {user?.id || "N/A"}
            </p>

            <p className="text-xs text-slate-500">
              {user?.role ? getRoleName(user.role) : "Guest"}
            </p>
          </div>

          {/* DROPDOWN ARROW */}
          <span className="text-slate-500 text-sm">
            {isProfileOpen ? "▲" : "▼"}
          </span>

        </button>

        {/* PROFILE DROPDOWN */}
        {isProfileOpen && (
          <div className="absolute right-0 top-14 w-64 bg-white border border-slate-200 rounded-xl shadow-lg p-4 z-50">

            <div className="border-b border-slate-100 pb-3 mb-3">
              <p className="font-semibold text-slate-800">
                {user?.name || "User"}
              </p>

              <p className="text-sm text-slate-500 break-all mt-1">
                {user?.email}
              </p>

              {/* NEW: Show User ID in dropdown */}
              <p className="text-sm text-slate-500 mt-1">
                User ID: {user?.id || "N/A"}
              </p>

              <p className="text-xs text-blue-700 font-medium mt-2">
                {user?.role ? getRoleName(user.role) : "Guest"}
              </p>
            </div>

            {/* LOGOUT BUTTON */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg px-3 py-2 transition"
            >
              <span>↪</span>
              Logout
            </button>

          </div>
        )}

      </div>

    </header>
  );
};
