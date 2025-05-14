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

export function WanderTripSidebar({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex flex-col h-screen w-64 bg-[#0a1525] text-white ${
        className || ""
      }`}
      {...props}
    >
      {/* Header */}
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">Wander Trip</h1>
          <button className="text-white hover:text-gray-300">
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-2">
        <nav className="space-y-1">
          <div>
            <a
              href="#"
              className="flex items-center gap-3 py-2.5 px-3 bg-blue-900/40 text-white rounded-lg"
            >
              <LayoutGrid className="h-5 w-5" />
              <span>Dashboard</span>
            </a>
          </div>
          <div>
            <a
              href="#"
              className="flex items-center gap-3 py-2.5 px-3 text-white hover:bg-blue-900/40 rounded-lg"
            >
              <Users className="h-5 w-5" />
              <span>Users</span>
            </a>
          </div>
          <div>
            <a
              href="#"
              className="flex items-center gap-3 py-2.5 px-3 text-white hover:bg-blue-900/40 rounded-lg"
            >
              <Calendar className="h-5 w-5" />
              <span>Bookings</span>
            </a>
          </div>
          <div>
            <a
              href="#"
              className="flex items-center gap-3 py-2.5 px-3 text-white hover:bg-blue-900/40 rounded-lg"
            >
              <MapPin className="h-5 w-5" />
              <span>Destinations</span>
            </a>
          </div>
          <div>
            <a
              href="#"
              className="flex items-center gap-3 py-2.5 px-3 text-white hover:bg-blue-900/40 rounded-lg"
            >
              <CreditCard className="h-5 w-5" />
              <span>Payments</span>
            </a>
          </div>
          <div>
            <a
              href="#"
              className="flex items-center gap-3 py-2.5 px-3 text-white hover:bg-blue-900/40 rounded-lg"
            >
              <FileText className="h-5 w-5" />
              <span>Visa Assistance</span>
            </a>
          </div>
          <div>
            <a
              href="#"
              className="flex items-center gap-3 py-2.5 px-3 text-white hover:bg-blue-900/40 rounded-lg"
            >
              <Headphones className="h-5 w-5" />
              <span>Support</span>
            </a>
          </div>
          <div>
            <a
              href="#"
              className="flex items-center gap-3 py-2.5 px-3 text-white hover:bg-blue-900/40 rounded-lg"
            >
              <BarChart3 className="h-5 w-5" />
              <span>Analytics</span>
            </a>
          </div>
          <div>
            <a
              href="#"
              className="flex items-center gap-3 py-2.5 px-3 text-white hover:bg-blue-900/40 rounded-lg"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </a>
          </div>
        </nav>
      </div>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-blue-900/50">
        <div className="text-xs text-gray-400">
          <p>© 2023 Wander Trip</p>
          <p>Admin Panel v1.0</p>
        </div>
      </div>
    </div>
  );
}
