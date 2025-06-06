// // AppLayout.jsx
// "use client";

// import { usePathname, useRouter } from "next/navigation";
// import { useSelector } from "react-redux";
// import { ToastContainer } from "react-toastify";
// import { WanderTripSidebar } from "./sidebar";
// import { useEffect } from "react";

// export default function AppLayout({ children }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);

//   const authPages = ["/admin/login", "/admin/forgot-password"];

//   if (authPages.includes(pathname)) {
//     if (isUserLoggedIn && typeof window !== "undefined") {
//       router.push("/admin/dashboard");
//     }
//     return <>{children}</>;
//   }

//   useEffect(() => {
//     console.log("inmist usefeevt");
//     if (!isUserLoggedIn) {
//       router.push("/admin/login");
//     }
//   }, [isUserLoggedIn]);

//   return (
//     <div className="flex h-screen">
//       <ToastContainer position="top-right" />
//       <WanderTripSidebar />
//       <main className="flex-1 overflow-auto">{children}</main>
//     </div>
//   );
// }

"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { WanderTripSidebar } from "./sidebar";
import { useEffect } from "react";

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);

  const authPages = ["/admin/login", "/admin/forgot-password"];
  const isAuthPage = authPages.includes(pathname);

  useEffect(() => {
    if (isAuthPage && isUserLoggedIn) {
      router.push("/admin/dashboard");
    } else if (!isAuthPage && !isUserLoggedIn) {
      router.push("/admin/login");
    }
  }, [isAuthPage, isUserLoggedIn]);

  if (isAuthPage) {
    return (
      <>
        <ToastContainer position="top-right" />
        {children}
      </>
    );
  }

  return (
    <div className="flex h-screen">
      <ToastContainer position="top-right" />
      <WanderTripSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
