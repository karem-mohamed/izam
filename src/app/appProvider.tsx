"use client";
import { SideBarProvider } from "@/context/sideBarContext/sideBar.provider";
import { ToastProvider } from "@/context/toastContext/toast.provider";
import { ReactNode } from "react";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <SideBarProvider>{children}</SideBarProvider>
    </ToastProvider>
  );
}
