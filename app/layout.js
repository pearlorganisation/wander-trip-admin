import { ReduxProvider } from "@/lib/redux/provider";
import "./globals.css";
import AppLayout from "@/component/Applayout";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AppLayout>{children}</AppLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
