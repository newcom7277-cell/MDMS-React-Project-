
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";
import { useUser } from "../../../shared/context/UserContext";

export const Login = () => {
  const navigate = useNavigate();

  // Get setUser function from UserContext
  const { setUser } = useUser();

  // Store email and selected role
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // This function runs when the user submits the login form
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // 1. Send email and role to the backend Login API
      const user = await loginUser({
        email: email.trim(),
        role: role,
      });

      // 2. Store user details in Context and LocalStorage
      setUser(user);

      // 3. Redirect according to role returned by backend
      if (user.role === "zone_admin") {
        navigate("/zone");
      } 
     else if (user.role === "end_user") {
  navigate("/end-user/meters");
}
      else if (user.role === "enterprise") {
        navigate("/enterprise");
      } 
      else {
        setUser(null);
        setError("Unknown role received from server.");
      }

    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Login failed. Please check your email and role."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT SIDE - BRANDING */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-800 text-white p-10">

          <div>
            <h1 className="text-3xl font-bold tracking-wide">
              MDMS
            </h1>

            <p className="text-blue-200 mt-2 text-sm">
              Meter Data Management System
            </p>
          </div>

          <div>
            <div className="w-16 h-1 bg-blue-300 rounded-full mb-6"></div>

            <h2 className="text-4xl font-bold leading-tight">
              Manage your energy data with confidence.
            </h2>

            <p className="text-blue-200 mt-5 leading-relaxed">
              Access your dashboard, monitor information
              and manage your operations from one place.
            </p>
          </div>

          <p className="text-blue-300 text-xs">
            MDMS Portal © 2026
          </p>

        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="p-6 sm:p-10 md:p-12 flex flex-col justify-center">

          {/* Mobile branding */}
          <div className="md:hidden mb-8">
            <h1 className="text-2xl font-bold text-blue-950">
              MDMS
            </h1>

            <p className="text-slate-500 text-sm">
              Meter Data Management System
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Welcome Back!
            </h2>

            <p className="text-slate-500 mt-2">
              Enter your email and select your role to continue.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">

            {/* EMAIL FIELD */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3.5 border border-slate-300 rounded-xl outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* ROLE DROPDOWN */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Select Your Role
              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full px-4 py-3.5 border border-slate-300 rounded-xl bg-white outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Choose your role
                </option>

                <option value="zone_admin">Zone Admin</option>
                <option value="end_user">End User</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3">
                {error}
              </div>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold py-3.5 rounded-xl transition duration-200 shadow-md hover:shadow-lg"
            >
              {loading ? "Checking..." : "Login"}
            </button>

          </form>

          <p className="text-center text-xs text-slate-400 mt-8">
            Secure access to your MDMS account
          </p>

        </div>

      </div>
    </div>
  );
};
