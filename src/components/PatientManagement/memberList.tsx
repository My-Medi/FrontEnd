import React, { useState } from 'react';
import { PatientManagementData } from '../../data/patientManagement';
import MemberCard from './memberCard';
import Pagination from '../Expert/Intro/Pagination';

const MEMBERS_PER_PAGE = 6;

const PatientManagementList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지별로 잘라서 보여줄 멤버 데이터 계산
  const startIndex = (currentPage - 1) * MEMBERS_PER_PAGE;
  const currentMembers = PatientManagementData.slice(startIndex, startIndex + MEMBERS_PER_PAGE);
  const totalPages = Math.ceil(PatientManagementData.length / MEMBERS_PER_PAGE);

  return (
    <div
      className='flex flex-col items-center gap-[40px] max-w-[1188px] px-0 py-[50px] rounded-[20px]'
      style={{
        border: '0.5px solid #FFF',
        background: '#F6F9FF',
        boxShadow:
          '0 0 20px 0 rgba(29, 104, 255, 0.00), 0 0 18px 20px rgba(29, 104, 255, 0.01), 0 0 15px 20px rgba(29, 104, 255, 0.03), 0 0 11px 30px rgba(29, 104, 255, 0.06), 0 0 6px 10px rgba(29, 104, 255, 0.10)',
      }}
    >
      {/* 제목 */}
      <h2 className="text-[24px] font-semibold leading-[36px] tracking-[-0.72px] text-[#121218] font-['Pretendard']">
        회원 관리
      </h2>

      {/* 회원 리스트 */}
      <div className='flex flex-col max-w-[1188px] items-start gap-[24px]'>
        {currentMembers.map((member, index) => (
          <MemberCard key={index} member={member} />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className='mt-[40px]'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default PatientManagementList;
