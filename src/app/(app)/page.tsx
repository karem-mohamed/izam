"use client";
import JobItem from "@/components/jobItem";
import Pagination from "@/components/pagination";
import SwitchBtn from "@/components/switchBtn";
import { useFetchJobs } from "@/endpoints/home/getJobs";
import { Job } from "@/endpoints/home/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import useSideBarContext from "@/context/sideBarContext/useSideBarContext";

export default function Home() {
  const [activeJob, setActiveJob] = useState();
  const { openSideBar, isOpen } = useSideBarContext();
  const limit = 6;
  const { data, mutateAsync } = useFetchJobs();
  useFetchJobs;
  const getJobs = async () => {
    await mutateAsync({ limit, page: 1 });
  };
  useEffect(() => {
    getJobs();
  }, []);

  const handlePagination = async (page: number) => {
    await mutateAsync({ limit, page });
  };

  return (
    <>
      <div>
        <div className="w-full p-5 flex gap-2 justify-end">
          <span>Sorting: </span>
          <span className="text-green-600">Top match ▼ </span>
        </div>
        <div className="flex items-center mb-5">
          <div className="bg-green-700 p-5 w-full text-white flex flex-wrap gap-4 justify-between items-center ">
            <div>
              <h1 className="text-xl">UI Designer in Egypt</h1>
              <span className="text-sm text-normal">
                {data?.count} job positions
              </span>
            </div>
          </div>
          <div className="block min-[590px]:hidden">
            <button
              className="w-[90px] h-[90px] border-0 bg-white border-2 shrink flex justify-center items-center"
              onClick={() => openSideBar(!isOpen)}
            >
              <Image src={"/vector.png"} alt="toggle" width={30} height={30} />
            </button>
          </div>
        </div>

        {data?.jobs.map((job: Job, index: number) => (
          <JobItem
            key={index}
            {...job}
            logo={`/logo${(index % 3) + 2}.png`}
            setActiveJob={setActiveJob}
            index={index}
            activeJob={activeJob}
          />
        ))}
        <Pagination
          totalPages={data?.count ? Math.ceil(data?.count / limit) : 0}
          setPage={(page) => handlePagination(page)}
        />
      </div>
    </>
  );
}
