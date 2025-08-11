import { useState, useMemo } from 'react';
import MemberCard from './memberCard';
import Pagination from '../Expert/Intro/Pagination';
import { useAcceptedMembersQuery } from '../../hooks/experts/queries/useAcceptedConsultations';
import type { AcceptedMember } from '../../types/expert/consultation';

const MEMBERS_PER_PAGE = 3; // 스펙: 3개씩

const PatientManagementList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error, refetch } = useAcceptedMembersQuery({
    page: currentPage,
    size: MEMBERS_PER_PAGE,
    enabled: true,
  });

  const content = useMemo(() => data?.content ?? [], [data?.content]);
  const totalPages = useMemo(() => data?.totalPages ?? 0, [data?.totalPages]);

  if (isLoading) {
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
        <h2 className="text-[24px] font-semibold leading-[36px] tracking-[-0.72px] text-[#121218] font-['Pretendard']">
          회원 관리
        </h2>
        <div className='flex flex-col max-w-[1188px] items-start gap-[24px] w-full'>
          {/* 간단 스켈레톤 */}
          {Array.from({ length: MEMBERS_PER_PAGE }).map((_, i) => (
            <div key={i} className='w-full h-[120px] rounded-[16px] bg-[#E9F0FF] animate-pulse' />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
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
        <h2 className="text-[24px] font-semibold leading-[36px] tracking-[-0.72px] text-[#121218] font-['Pretendard']">
          회원 관리
        </h2>
        <button onClick={() => refetch()} className='px-4 py-2 rounded-lg bg-[#1D68FF] text-white'>
          다시 시도
        </button>
      </div>
    );
  }

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
      <div className='flex flex-col max-w-[1188px] items-center gap-[24px] w-full'>
        {content.map((m: AcceptedMember) => (
          <MemberCard
            key={m.consultationId}
            member={{
              // MemberCard가 쓰는 필드명에 맞춰 매핑 필요 시 이 자리에서 어댑팅
              userId: m.userId,
              nickname: m.nickname,
              gender: m.gender,
              weight: m.weight,
              height: m.height,
              age: m.age,
              profileImageUrl: m.profileImage,
              healthInterest: Array.isArray(m.interestAreas) ? m.interestAreas : [],
              testDate: m.recentCheckupDate,
              healthStatus: '위험',
              signupDate: '-', //임시값
              consultationId: m.consultationId,
            }}
          />
        ))}

        {content.length === 0 && (
          <div className='w-full text-center text-[#75787B] py-[40px]'>매칭된 회원이 없습니다.</div>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className='mt-[40px]'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(p) => setCurrentPage(p)}
        />
      </div>
    </div>
  );
};

export default PatientManagementList;
