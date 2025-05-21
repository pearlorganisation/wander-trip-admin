import { ReduxProvider } from "@/lib/redux/provider";
import "./globals.css";
import { WanderTripSidebar } from "@/component/sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
        <WanderTripSidebar />
         {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
