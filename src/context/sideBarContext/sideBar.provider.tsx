"use client";
import { ReactNode, useState } from "react";
import { SideBarContext } from "./sideBar.context";
export const SideBarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openSideBar = (status: boolean) => {
    setIsOpen(status);
  };

  return (
    <SideBarContext.Provider value={{ openSideBar, isOpen }}>
      {children}
    </SideBarContext.Provider>
  );
};
