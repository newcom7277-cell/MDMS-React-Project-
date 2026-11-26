
import { useEffect, useState } from "react";
import { useUser } from "../../../shared/context/UserContext";
import { getUserProfile } from "../services/profileService";
import type { UserProfile } from "../../enterprise/types/profileTypes";

export const MyProfile = () => {
  const { user } = useUser();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Fetch profile when the logged-in user's ID is available
  const fetchProfile = async () => {
    if (!user?.id) {
      setError("User information is not available.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getUserProfile(user.id);
      setProfile(data);
    } catch (err) {
      setError("Unable to load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user?.id]);

  // Convert the joined date into a readable format
  const formatDate = (date: string) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Parse notification preferences from the API JSON string
  const getNotifications = () => {
    if (!profile?.notificationPrefs) return null;

    try {
      return JSON.parse(profile.notificationPrefs);
    } catch {
      return null;
    }
  };

  const notifications = getNotifications();

  // Loading screen
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-sm text-slate-500">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  // Error screen
  if (error || !profile) {
    return (
      <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
        <p className="mb-4 text-red-600">
          {error || "Profile not found."}
        </p>

        <button
          onClick={fetchProfile}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">

      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your personal information and account details.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          {isEditing ? "Cancel Editing" : "Edit Profile"}
        </button>
      </div>

      {/* Profile header card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-28 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500" />

        <div className="-mt-12 flex flex-col gap-4 px-6 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="h-24 w-24 rounded-2xl border-4 border-white bg-white object-cover shadow-md"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-blue-100 text-3xl font-bold text-blue-700 shadow-md">
                {profile.name.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="pb-1">
              <h2 className="text-xl font-bold text-slate-800">
                {profile.name}
              </h2>

              <p className="text-sm text-slate-500">
                {profile.email}
              </p>

              <span className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                {profile.status}
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 px-4 py-3">
            <p className="text-xs text-slate-500">User ID</p>
            <p className="mt-1 font-semibold text-slate-700">
              {profile.id}
            </p>
          </div>
        </div>
      </div>

      {/* Personal information */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-bold text-slate-800">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-500">
              Full Name
            </label>

            <input
              value={profile.name}
              disabled={!isEditing}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-default"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-500">
              Email Address
            </label>

            <input
              value={profile.email}
              disabled
              className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-500">
              Phone Number
            </label>

            <input
              value={profile.phone}
              disabled={!isEditing}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-default"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-500">
              Address
            </label>

            <input
              value={profile.address}
              disabled={!isEditing}
              onChange={(e) =>
                setProfile({ ...profile, address: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-default"
            />
          </div>
        </div>

        {isEditing && (
          <div className="mt-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
            You can edit these fields in the current page. Saving changes
            permanently requires an update-profile API from your backend.
          </div>
        )}
      </div>

      {/* Electricity connection */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-bold text-slate-800">
          Electricity Connection
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-blue-50 p-4">
            <p className="text-sm text-slate-500">Zone</p>
            <p className="mt-2 text-lg font-bold text-blue-800">
              {profile.zoneName}
            </p>
          </div>

          <div className="rounded-xl bg-cyan-50 p-4">
            <p className="text-sm text-slate-500">Zone ID</p>
            <p className="mt-2 text-lg font-bold text-cyan-800">
              {profile.zoneId}
            </p>
          </div>

          <div className="rounded-xl bg-violet-50 p-4">
            <p className="text-sm text-slate-500">My Meters</p>
            <p className="mt-2 text-lg font-bold text-violet-800">
              {profile.meterCount}
            </p>
          </div>
        </div>

        {profile.zone && (
          <div className="mt-5 border-t border-slate-100 pt-5">
            <h3 className="mb-3 font-semibold text-slate-700">
              Zone Details
            </h3>

            <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              <p>
                <span className="text-slate-500">Zone Admin: </span>
                <span className="font-medium text-slate-800">
                  {profile.zone.adminName}
                </span>
              </p>

              <p>
                <span className="text-slate-500">Location: </span>
                <span className="font-medium text-slate-800">
                  {profile.zone.location}
                </span>
              </p>

              <p>
                <span className="text-slate-500">Pincode: </span>
                <span className="font-medium text-slate-800">
                  {profile.zone.pincode}
                </span>
              </p>

              <p>
                <span className="text-slate-500">Zone Status: </span>
                <span className="font-medium text-green-700">
                  {profile.zone.status}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Account and notifications */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-slate-800">
            Account Information
          </h2>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Account Role</span>
              <span className="font-medium text-slate-800">
                End User
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Joined On</span>
              <span className="font-medium text-slate-800">
                {formatDate(profile.joinedOn)}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Account Status</span>
              <span className="font-medium text-green-700">
                {profile.status}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-slate-800">
            Notification Preferences
          </h2>

          <div className="space-y-4">
            {[
              { label: "Email Notifications", key: "email" },
              { label: "SMS Notifications", key: "sms" },
              { label: "In-App Notifications", key: "inApp" },
            ].map((item) => {
              const enabled = notifications?.[item.key];

              return (
                <div
                  key={item.key}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-slate-600">
                    {item.label}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      enabled
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {enabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Local edit actions */}
      {isEditing && (
        <div className="flex justify-end gap-3">
          <button
            onClick={fetchProfile}
            className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Discard Changes
          </button>

          <button
            onClick={() => setIsEditing(false)}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Done Editing
          </button>
        </div>
      )}
    </div>
  );
};
