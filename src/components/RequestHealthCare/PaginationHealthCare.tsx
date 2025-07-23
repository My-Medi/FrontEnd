import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const RequestHealthPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className='flex justify-center items-center mt-10 gap-[60px]'>
      {/* 이전 */}
      <div
        onClick={() => goToPage(currentPage - 1)}
        className='flex px-[1px] cursor-pointer justify-center items-center'
      >
        <FiChevronLeft size={40} color={currentPage === 1 ? '#D1D1D1' : '#25282B'} />
      </div>

      {/* 페이지 번호 (1,2,3) */}
      <div className='flex items-end gap-[36px]'>
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`${
              currentPage === page
                ? 'w-[14px] h-[32px] text-[#25282B] text-[32px] font-normal leading-[36px] tracking-[-0.96px]'
                : 'text-[#75787B] text-[20px] font-light leading-[30px] tracking-[-0.6px]'
            } font-[Pretendard]`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* ... */}
      <span className='text-[#9DA0A3] text-[24px] font-medium leading-[27px] tracking-[-0.5px] font-[Pretendard]'>
        ...
      </span>

      {/* 다음 */}
      <div
        onClick={() => goToPage(currentPage + 1)}
        className='flex px-[2px] cursor-pointer justify-center items-center'
      >
        <FiChevronRight size={40} color='#25282B' />
      </div>

      {/*맨 끝 */}
      <div
        onClick={() => goToPage(totalPages)}
        className='flex cursor-pointer justify-center items-center'
      >
        <FiChevronRight size={40} color='#25282B' />
        <FiChevronRight size={40} color='#25282B' style={{ marginLeft: '-6px' }} />
      </div>
    </div>
  );
};

export default RequestHealthPagination;
