import { ReduxProvider } from "@/lib/redux/provider";
import "./globals.css";
import { WanderTripSidebar } from "@/component/sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
           <div className="flex h-screen">
             <WanderTripSidebar />

            {/* Main content grows to fill remaining space and scrolls */}
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
