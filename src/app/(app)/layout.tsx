"use client";
import Header from "@/components/header";
import MobileSidebar from "@/components/mobileSideBar";
import Sidebar from "@/components/sideBar";
import React, { ReactNode, Suspense, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
export default function Layout({ children }: { children: ReactNode }) {
  const [isMobileProfileSideOpen, setIsMobileProfileSideOpen] = useState(false);
  return (
    <Suspense>
      <div>
        <Header
          isMobileProfileSideOpen={isMobileProfileSideOpen}
          setIsMobileProfileSideOpen={setIsMobileProfileSideOpen}
        />
        <MobileSidebar
          isOpen={isMobileProfileSideOpen}
          setIsOpen={setIsMobileProfileSideOpen}
        />
        <div className="pt-[80px] flex">
          <DndProvider backend={HTML5Backend}>
            <Sidebar />
          </DndProvider>

          <div className="ps-10 pe-5 pb-10 flex-1">{children}</div>
        </div>
      </div>
    </Suspense>
  );
}
