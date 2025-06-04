import "./globals.css";
import { WanderTripSidebar } from "@/component/sidebar";
import LayoutWrapper from "@/component/LayoutWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>
          <div className="flex h-screen">
            <WanderTripSidebar />
            {/* Main content grows to fill remaining space and scrolls */}
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </LayoutWrapper>
      </body>
    </html>
  );
}
