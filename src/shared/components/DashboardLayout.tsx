
import type { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export const DashboardLayout = ({
  children,
  title = "Dashboard",
}: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Left navigation menu */}
      <Sidebar />

      {/* Right side content */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Top header */}
        <Header title={title} />

        {/* Current page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>
    </div>
  );
};
