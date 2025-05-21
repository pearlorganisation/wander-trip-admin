import {
  ChevronLeft,
  LayoutGrid,
  Users,
  Calendar,
  MapPin,
  CreditCard,
  FileText,
  Headphones,
  BarChart3,
  Settings,
} from "lucide-react";

export function WanderTripSidebar() {
  return (
    <div
      className={`flex flex-col h-screen w-64 bg-gradient-to-b from-[#0a1525] to-[#1c2a44] text-white shadow-lg`}
   
    >
      {/* Header */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide">WanderTrip</h1>
          <button className="text-white hover:text-gray-300 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        <SidebarLink Icon={LayoutGrid} label="Dashboard" active />
        <SidebarLink Icon={Users} label="Users" />
        {/* <SidebarLink Icon={Calendar} label="Bookings" /> */}
        <SidebarLink Icon={MapPin} label="Destinations" />
        {/* <SidebarLink Icon={CreditCard} label="Payments" />
        <SidebarLink Icon={FileText} label="Visa Assistance" />
        <SidebarLink Icon={Headphones} label="Support" />
        <SidebarLink Icon={BarChart3} label="Analytics" />
        <SidebarLink Icon={Settings} label="Settings" /> */}
      </div>

      {/* Footer */}
      <div className="mt-auto p-4 bg-white/5 text-xs text-gray-300 border-t border-white/10">
        <p>© 2023 WanderTrip</p>
        <p>Admin Panel v1.0</p>
      </div>
    </div>
  );
}

function SidebarLink({ Icon, label, active }) {
  return (
    <a
      href="#"
      className={`flex items-center gap-3 py-2 px-3 rounded-md transition-all group ${
        active
          ? "bg-white/10 text-white border-l-4 border-blue-500 font-semibold"
          : "text-gray-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      <Icon className="h-5 w-5 group-hover:text-blue-400 transition-colors" />
      <span>{label}</span>
    </a>
  );
}
