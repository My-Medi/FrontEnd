import React from "react";
import nextIcon from "../../assets/Expert/next.svg";
import downIcon from "../../assets/Expert/down.svg";
import next2Icon from "../../assets/Expert/next2.svg";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + 4);
  if (end - start < 4) {
    start = Math.max(1, end - 4);
  }
  const visiblePages = [];
  for (let i = start; i <= end; i++) {
    visiblePages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-9 pt-20">
      <button
        className="bg-transparent border-none p-0 transition disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        tabIndex={0}
      >
        <img src={downIcon} alt="이전" className="w-9 h-9" />
      </button>
      {visiblePages.map((num) => (
        <button
          key={num}
          className={`font-pretendard text-[1.5rem] leading-[1.125em] bg-transparent border-none p-0 transition text-center
            ${currentPage === num
              ? "font-pretendard font-normal text-[2.25rem] leading-[27px] tracking-normal text-center text-[#25282B]"
              : "font-pretendard font-light text-[1.5rem] leading-[27px] tracking-normal text-center text-[#75787B] hover:text-[#1D68FF]"}
          `}
          onClick={() => onPageChange(num)}
          tabIndex={0}
        >
          {num}
        </button>
      ))}
      <button
        className="bg-transparent border-none p-0 transition disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        tabIndex={0}
      >
        <img src={nextIcon} alt="다음" className="w-9 h-9" />
      </button>
      <button
        className="bg-transparent border-none p-0 transition disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(Math.min(currentPage + 5, totalPages))}
        disabled={currentPage === totalPages}
        tabIndex={0}
      >
        <img src={next2Icon} alt="마지막" className="w-9 h-9" />
      </button>
    </div>
  );
};

export default Pagination; 