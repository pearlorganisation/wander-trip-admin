import { ReduxProvider } from "@/lib/redux/provider";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
         {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
