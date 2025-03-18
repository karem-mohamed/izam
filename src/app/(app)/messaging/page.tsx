"use client";

import { usePathname } from "next/navigation";

export default function Page() {
  const pathName = usePathname();
  return (
    <div className="py-10">
      <h1 className="text-center text-green-500 text-[36px] text-bold">
        {pathName.split("/")[1].toLocaleUpperCase()}
      </h1>
    </div>
  );
}
