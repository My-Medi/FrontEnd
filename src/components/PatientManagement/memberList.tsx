import { useState, useMemo } from 'react';
import MemberCard from './memberCard';
import Pagination from '../Expert/Intro/Pagination';
import { useAcceptedMembersQuery } from '../../hooks/experts/queries/useAcceptedConsultations';
import type { AcceptedMember } from '../../types/expert/consultation';

const MEMBERS_PER_PAGE = 6; // 스펙: 6개씩

const PatientManagementList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error, refetch } = useAcceptedMembersQuery({
    page: currentPage,
    size: MEMBERS_PER_PAGE,
    enabled: true,
  });

  const content = data?.content ?? [];
  const totalPages = data?.totalPages ?? 0;

  if (isLoading) {
    return (
      <div
        className='flex flex-col items-center gap-[40px] max-w-[1188px] px-0 py-[50px] rounded-[20px] min-h-[60vh]'
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
        <div className='flex flex-col max-w-[1188px] items-center gap-[24px] w-full'>
          {/* 카드 크기에 맞춘 스켈레톤 */}
          {Array.from({ length: MEMBERS_PER_PAGE }).map((_, i) => (
            <div
              key={i}
              className='flex sm:w-[1046px] w-full h-[168px] px-14 items-center gap-[40px] rounded-[20px] bg-white/80'
              style={{ boxShadow: '0 0 18px 6px rgba(29, 104, 255, 0.05)' }}
            >
              {/* 프로필 원형 */}
              <div className='w-[124px] h-[124px] rounded-full bg-[#E9F0FF] animate-pulse' />
              {/* 텍스트 영역 */}
              <div className='flex flex-col justify-center w-[540px] gap-2'>
                <div className='w-24 h-5 bg-[#E9F0FF] rounded animate-pulse' />
                <div className='w-40 h-4 bg-[#E9F0FF] rounded animate-pulse' />
                <div className='w-36 h-4 bg-[#E9F0FF] rounded animate-pulse' />
                <div className='w-60 h-4 bg-[#E9F0FF] rounded animate-pulse' />
                <div className='w-72 h-4 bg-[#E9F0FF] rounded animate-pulse' />
              </div>
              {/* 화살표 자리 */}
              <div className='ml-auto mr-[-40px] w-[160px] h-[160px] rounded-full bg-[#E9F0FF] animate-pulse' />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className='flex flex-col items-center gap-[40px] max-w-[1188px] px-0 py-[50px] rounded-[20px] min-h-[60vh]'
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
      className='flex flex-col items-center gap-[40px] max-w-[1188px] px-0 py-[50px] rounded-[20px] min-h-[60vh]'
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
              healthStatus: (m as any).totalHealthStatusKor ?? '정상',
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
          totalPages={Math.max(totalPages, 1)}
          onPageChange={(p) => setCurrentPage(p)}
        />
      </div>
    </div>
  );
};

export default PatientManagementList;
