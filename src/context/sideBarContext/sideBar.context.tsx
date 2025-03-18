"use client";
import { createContext } from "react";
type SideBarContextType = {
  openSideBar: (status: boolean) => void;
  isOpen: boolean;
};

export const SideBarContext = createContext<SideBarContextType | undefined>(
  undefined
);
