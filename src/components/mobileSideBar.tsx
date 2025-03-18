"use client";
import { twMerge } from "tailwind-merge";
import { IoHomeOutline } from "react-icons/io5";
import { PiBag } from "react-icons/pi";
import { IoIosPeople } from "react-icons/io";
import { MdNotificationsNone } from "react-icons/md";
import { LuMessageSquareDot } from "react-icons/lu";
import { IoChevronForward } from "react-icons/io5";

import Link from "next/link";
import Image from "next/image";

const items = [
  {
    icon: IoHomeOutline,
    title: "Home",
    path: "/",
  },
  {
    icon: PiBag,
    title: "Jobs",
    path: "jobs",
  },
  {
    icon: IoIosPeople,
    title: "Employers",
    path: "employers",
  },
  {
    icon: MdNotificationsNone,
    title: "Notifications",
    path: "notifications",
  },
  {
    icon: LuMessageSquareDot,
    title: "Messaging",
    path: "messaging",
  },
];

export default function MobileSidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (prev: false) => void;
}) {
  return (
    isOpen && (
      <div
        onClick={() => setIsOpen(false)}
        className="fixed h-[100vh] top-0 left-0 w-full bg-transparent z-10"
      >
        <div
          className={twMerge(
            "fixed right-0 top-0 flex flex-col h-[100vh] bg-white text-gray-600 transition-all duration-300 z-10 !shadow-custom",
            isOpen ? "w-60" : "hidden"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <Link href={"/profile"}>
            <div className="flex gap-2 justify-between items-center p-5 px-2">
              <Image
                width={40}
                height={40}
                className="rounded-full"
                src="/avatar.jpeg"
                alt="avatar"
              />
              <div>
                <p>Karem Mohamed</p>
                <span className="text-sm">Frontend Developer</span>
              </div>
              <div className="cursor-pointer" onClick={() => setIsOpen(false)}>
                <IoChevronForward size={15} />
              </div>
            </div>
          </Link>
          <div className="block min-[1100px]:hidden">
            <div className="border-b-2 border-gray-200 w-full"></div>
            <div className="flex flex-col justify-between">
              <nav className="mt-4">
                <ul className="space-y-2">
                  {items.map((item) => (
                    <SidebarItem
                      key={item.path}
                      icon={<item.icon size={20} />}
                      text={item.title}
                      path={item.path}
                    />
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div className="border-b-2 border-gray-200 w-full my-4"></div>
          <nav className="">
            <ul className="space-y-2">
              {["Setting and privacy", "Language", "Help"].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md transition-all"
                >
                  {item}
                </span>
              ))}
            </ul>
          </nav>

          <div className="border-b-2 border-gray-200 w-full"></div>
          <button className="p-4 text-left text-red-500 focus:outline-none">
            logout
          </button>
        </div>
      </div>
    )
  );
}

function SidebarItem({
  icon,
  text,
  path,
}: {
  icon: React.ReactNode;
  text: string;
  path: string;
}) {
  return (
    <li>
      <Link
        href={path}
        className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md transition-all"
      >
        {icon}
        <span className="whitespace-nowrap">{text}</span>
      </Link>
    </li>
  );
}
