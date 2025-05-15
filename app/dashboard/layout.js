import { WanderTripSidebar } from "@/component/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <WanderTripSidebar />
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">{children}</main>
    </div>
  );
}
