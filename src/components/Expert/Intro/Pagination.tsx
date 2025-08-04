import React from "react";
import nextIcon from '../../../assets/Expert/next.svg';
import downIcon from '../../../assets/Expert/down.svg';
import next2Icon from '../../../assets/Expert/next2.svg';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // 현재 페이지에 따라 최대 5개 표시
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // 현재 페이지 주변으로 최대 5개 표시
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    
    // 끝에 가까우면 시작점을 조정
    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };
  
  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center gap-15 xl:gap-15 pt-12 xl:pt-12">
      <button
        className="bg-transparent border-none p-0 transition disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        tabIndex={0}
      >
        <img src={downIcon} alt="이전" className="w-8 h-8 xl:w-8 xl:h-8" />
      </button>
      <div className="flex items-center gap-9 xl:gap-9">
        {visiblePages.map((num) => (
          <button
            key={num}
            className={`bg-transparent border-none p-0 transition text-center
              ${currentPage === num
                ? " font-normal text-[2rem] xl:text-[2rem] leading-[2.25rem] xl:leading-[2.25rem] tracking-[-3%] text-center text-[#25282B]"
                : " font-light text-[1.25rem] xl:text-[1.25rem] leading-[1.875rem] xl:leading-[1.875rem] tracking-[-3%] text-center text-[#75787B] hover:text-[#1D68FF] capitalize"}
            `}
            onClick={() => onPageChange(num)}
            tabIndex={0}
          >
            {num}
          </button>
        ))}

      </div>
      <button
        className="bg-transparent border-none p-0 transition disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        tabIndex={0}
      >
        <img src={nextIcon} alt="다음" className="w-8 h-8 xl:w-8 xl:h-8" />
      </button>
      <button
        className="bg-transparent border-none p-0 transition disabled:opacity-50 disabled:cursor-not-allowed -ml-8 xl:-ml-8"
        onClick={() => onPageChange(Math.min(currentPage + 5, totalPages))}
        disabled={currentPage === totalPages}
        tabIndex={0}
      >
        <img src={next2Icon} alt="마지막" className="w-8 h-8 xl:w-8 xl:h-8" />
      </button>
    </div>
  );
};

export default Pagination; 