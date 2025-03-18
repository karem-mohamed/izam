import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { IoBagRemoveSharp } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { MdNotificationsNone } from "react-icons/md";
import { LuMessageSquareDot } from "react-icons/lu";
import { RxAvatar } from "react-icons/rx";
import Link from "next/link";

const items = [
  {
    icon: IoHomeOutline,
    title: "Home",
    path: "/",
  },
  {
    icon: IoBagRemoveSharp,
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
  {
    icon: RxAvatar,
    title: "Profile ▼",
    path: "profile",
  },
];
export default function Header({
  isMobileProfileSideOpen,
  setIsMobileProfileSideOpen,
}: {
  isMobileProfileSideOpen: boolean;
  setIsMobileProfileSideOpen: (prev: boolean) => void;
}) {
  return (
    <div className="fixed top-0 left-0 bottom-0 w-full h-[80px] bg-[#161616] py-[5px] px-[40px] flex items-center z-10">
      <div className="w-full flex justify-between items-center">
        <div className="flex  gap-10 items-center ">
          <div>
            <Image src={"/logo.png"} width={80} height={80} alt={"logo"} />
          </div>
          <div className="relative rounded-full bg-white w-[400px] h-[45px] flex !overflow-hidden hidden min-[570px]:flex">
            <div className="w-[20%]">
              <div className="absolute left-3 top-[50%] -translate-y-1/2 bg-[#48A74C] p-3 rounded-full">
                <FaSearch size={18} className="text-white" />
              </div>
            </div>
            <div className="w-[75%]">
              <input
                type="text"
                placeholder="Search by name, job title, ..."
                className="w-full h-[100%] outline-none text-md	"
              />
            </div>
          </div>
        </div>

        <div className="hidden min-[1100px]:block">
          <div className="w-full flex">
            {items.map((item, index) =>
              item.path != "profile" ? (
                <Link key={index} href={item.path}>
                  <div
                    className={`flex flex-col px-6 gap-1 text-white items-center cursor-pointer	  ${index == 2 ? "border-r-2 border-gray-500" : ""}`}
                  >
                    <item.icon size={25} />
                    <span className="text-sm">{item.title}</span>
                  </div>
                </Link>
              ) : (
                <div
                  key={index}
                  onClick={() => setIsMobileProfileSideOpen(true)}
                  className={`flex flex-col px-6 gap-1 text-white items-center cursor-pointer	  ${index == 2 ? "border-r-2 border-gray-500" : ""}`}
                >
                  <item.icon size={25} />
                  <span className="text-sm">{item.title}</span>
                </div>
              )
            )}
          </div>
        </div>
        <div
          className="block min-[1100px]:hidden text-white flex flex-col px-6 gap-1 items-center cursor-pointer"
          onClick={() => setIsMobileProfileSideOpen(!isMobileProfileSideOpen)}
        >
          <RxAvatar size={25} />
          <span className="text-md">Profile▼</span>
        </div>
      </div>
    </div>
  );
}
