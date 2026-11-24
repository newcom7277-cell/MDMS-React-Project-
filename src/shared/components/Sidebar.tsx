
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";

// Sidebar menu item structure
interface MenuItem {
  name: string;
  path: string;
  icon: string;
}

export const Sidebar = () => {

  // Get logged-in user's role from UserContext
  const { user } = useUser();

  // Navigation links for End User
  const endUserMenu: MenuItem[] = [
    { name: "Dashboard", path: "/end-user", icon: "▦" },
    { name: "My Meters", path: "/end-user/meters", icon: "⚡" },
    { name: "Consumption", path: "/end-user/consumption", icon: "◷" },
    { name: "My Bills", path: "/end-user/bills", icon: "▤" },
    { name: "Payments", path: "/end-user/payments", icon: "₹" },
    { name: "Alerts", path: "/end-user/alerts", icon: "⚠" },
    { name: "Notifications", path: "/end-user/notifications", icon: "♢" },
    { name: "My Profile", path: "/end-user/profile", icon: "◎" },
  ];

  // Navigation links for Zone Admin
  const zoneAdminMenu: MenuItem[] = [
    { name: "Dashboard", path: "/zone", icon: "▦" },
    { name: "Zones", path: "/zone/zones", icon: "⌖" },
    { name: "Meters", path: "/zone/meters", icon: "⚡" },
    { name: "Consumption", path: "/zone/consumption", icon: "◷" },
    { name: "Bills", path: "/zone/bills", icon: "▤" },
    { name: "Alerts", path: "/zone/alerts", icon: "⚠" },
    { name: "Users", path: "/zone/users", icon: "♙" },
    { name: "Audit Logs", path: "/zone/audit-logs", icon: "☷" },
  ];

  // Navigation links for Enterprise Admin
  const enterpriseMenu: MenuItem[] = [
    { name: "Dashboard", path: "/enterprise", icon: "▦" },
    { name: "Zones", path: "/enterprise/zones", icon: "⌖" },
    { name: "Meters", path: "/enterprise/meters", icon: "⚡" },
    { name: "Users", path: "/enterprise/users", icon: "♙" },
    { name: "Tariffs", path: "/enterprise/tariffs", icon: "₹" },
    { name: "Bills", path: "/enterprise/bills", icon: "▤" },
    { name: "Alerts", path: "/enterprise/alerts", icon: "⚠" },
    { name: "Audit Logs", path: "/enterprise/audit-logs", icon: "☷" },
    { name: "Settings", path: "/enterprise/settings", icon: "⚙" },
  ];

  // Select menu according to logged-in user's role
  let menuItems: MenuItem[] = [];

  if (user?.role === "end_user") {
    menuItems = endUserMenu;
  } else if (user?.role === "zone_admin") {
    menuItems = zoneAdminMenu;
  } else if (user?.role === "enterprise") {
    menuItems = enterpriseMenu;
  }

  return (
    <aside className="w-64 min-h-screen bg-[#102A43] text-white flex flex-col">

      {/* SIDEBAR BRANDING */}
      <div className="h-20 px-6 flex items-center border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold tracking-wider">
            MDMS
          </h1>

          <p className="text-xs text-blue-200 mt-1">
            Meter Data Management
          </p>
        </div>
      </div>

      {/* NAVIGATION MENU */}
      <nav className="flex-1 px-4 py-6 space-y-2">

        <p className="text-xs uppercase tracking-wider text-blue-300 px-3 mb-4">
          Main Menu
        </p>

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.name === "Dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-blue-100 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <span className="text-lg w-6 text-center">
              {item.icon}
            </span>

            <span>{item.name}</span>
          </NavLink>
        ))}

      </nav>

      {/* SIDEBAR FOOTER */}
      <div className="px-6 py-5 border-t border-white/10">
        <p className="text-xs text-blue-300">
          MDMS Portal © 2026
        </p>
      </div>

    </aside>
  );
};
