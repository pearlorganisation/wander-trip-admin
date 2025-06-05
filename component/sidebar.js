"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, LayoutGrid, Users, MapPin } from "lucide-react";

export function WanderTripSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen w-64 bg-gradient-to-b from-[#0a1525] to-[#1c2a44] text-white shadow-lg">
      {/* Header */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide">WanderTrip</h1>
          <button className="text-white hover:text-gray-300 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Sidebar Links */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        <SidebarLink
          Icon={LayoutGrid}
          label="Dashboard"
          to="/admin/dashboard"
          currentPath={pathname}
        />
        <SidebarLink
          Icon={Users}
          label="Users"
          to="/admin/users"
          currentPath={pathname}
        />
        <SidebarLink
          Icon={MapPin}
          label="Destinations"
          to="/admin/destination"
          currentPath={pathname}
        />
      </div>
    </div>
  );
}

function SidebarLink({ Icon, label, to, currentPath }) {
  const isActive = currentPath === to;

  return (
    <Link
      href={to}
      className={`flex items-center gap-3 py-2 px-3 rounded-md transition-all group ${
        isActive
          ? "bg-white/10 text-white border-l-4 border-blue-500 font-semibold"
          : "text-gray-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      <Icon
        className={`h-5 w-5 transition-colors ${
          isActive ? "text-blue-400" : "group-hover:text-blue-400"
        }`}
      />
      <span>{label}</span>
    </Link>
  );
}
  