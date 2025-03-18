import { Job } from "@/endpoints/home/types";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";
import { CiCalendar } from "react-icons/ci";

export default function JobItem({
  job_title,
  company,
  location,
  last,
  tags,
  exp_needed,
  work_type,
  type,
  logo,
  activeJob,
  setActiveJob,
  index,
}: Job & {
  logo: string;
  index: number;
  activeJob: number | undefined;
  setActiveJob: (prev: number) => void;
}) {
  return (
    <div
      className={`${index == activeJob ? "bg-green-50" : "bg-white"} mb-5 cursor-pointer`}
      onClick={() => setActiveJob(index)}
    >
      <div className="flex justify-between  p-5 flex-col-reverse  sm:flex-row gap-4 sm:gap-0 ">
        <div>
          <div className="flex gap-2 mb-1">
            <Image src={logo} width={60} height={60} alt="logo" />
            <div>
              <h2 className="text-xl">{job_title}</h2>
              <p className="text-light text-xs text-green-600">{company}</p>
            </div>
          </div>
          <div className="text-gray-400 flex items-center flex-wrap gap-2 2 mb-2">
            <GrLocationPin size={15} /> {location} <CiCalendar size={15} />{" "}
            {last}
          </div>
          <div className="flex gap-2 flex-wrap text-gray-400 mb-6">
            <div className="rounded p-1 px-2 bg-gray-100">
              <span>{exp_needed}</span>
            </div>

            <div className="rounded p-1 px-2 bg-gray-100">
              <span>{type}</span>
            </div>

            <div className="rounded p-1 px-2 bg-gray-100">
              <span>{work_type}</span>
            </div>
          </div>
        </div>
        <div>
          <button className="rounded-full outline-0 p-3 bg-white border-2">
            <FaHeart className="text-gray-400" size={22} />
          </button>
        </div>
      </div>

      <div className="w-full border-b-2"></div>

      <div className="text-gray-400 p-5">
        {tags.map((tag, index) => (
          <span key={index}>
            {tag} {index < tags.length - 1 ? " - " : null}
          </span>
        ))}
      </div>
    </div>
  );
}
