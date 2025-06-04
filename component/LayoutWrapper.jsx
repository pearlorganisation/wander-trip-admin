"use client";

import { ReduxProvider } from "@/lib/redux/provider";

export default function LayoutWrapper({ children }) {
  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  );
}
