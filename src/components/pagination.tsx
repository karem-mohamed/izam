"use client";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoChevronForward } from "react-icons/io5";

export default function Pagination({
  totalPages = 10,
  setPage,
}: {
  totalPages: number;
  setPage: (page: number) => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      console.log("sssssssssssssss");
      setCurrentPage(page);
      setPage(page);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-4 justify-center">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border-2 border-gray-400 rounded-md w-[40px] h-[40px] bg-transparent hover:bg-gray-300 disabled:opacity-50"
      >
        <IoIosArrowBack size={20} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`px-3 py-1 border-2 border-gray-400 rounded-md w-[40px] h-[40px] ${
            currentPage === page
              ? "bg-green-500 text-white"
              : "bg-transparent hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border-2 border-gray-400 rounded-md w-[40px] h-[40px] bg-transparent hover:bg-gray-300 disabled:opacity-50"
      >
        <IoChevronForward size={20} />
      </button>
    </div>
  );
}
