"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";
import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LOCAL_STORAGE_AUTH } from "@/constants/name";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  const [isCheckingAuth, setIsCheckingAuth] = useState(
    localStorage.getItem(LOCAL_STORAGE_AUTH) === "true" ? false : true
  ); // Track loading state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem(LOCAL_STORAGE_AUTH) === "true" ? true : false
  );
  const router = useRouter();

  useEffect(() => {
    console.log("Checking authentication...");

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is authenticated:", user);
        setIsAuthenticated(true);
      } else {
        console.log("No user found, redirecting to /signin...");
        setIsAuthenticated(false);
        router.replace("/signin");
      }
      setIsCheckingAuth(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-900">
        <p className="text-white text-lg">Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-screen-2xl md:p-6">{children}</div>
      </div>
    </div>
  );
}
