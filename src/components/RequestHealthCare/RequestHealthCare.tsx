import React, { useState } from 'react';
import RequestHealthCareCard from './HealthCareCard';
import RequsetHealthHeader from './Header';
import Pagination from '../Expert/Intro/Pagination';
import { useExpertRequestedConsultations } from '../../hooks/consultation/expert/queries/useExpertRequestedConsultations';
import { useApproveConsultation } from '../../hooks/consultation/expert/mutation/useApproveConsultation';
import { useRejectConsultation } from '../../hooks/consultation/expert/mutation/useRejectConsultation';
import HealthCareCardSkeleton from './HealthCareCardSkeleton';

const PAGE_SIZE = 10;

const RequestHealthCare: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1); // UI 1-based
  const listQuery = useExpertRequestedConsultations(currentPage - 1, PAGE_SIZE, true);
  const approveMut = useApproveConsultation();
  const rejectMut = useRejectConsultation();
  const totalPages = listQuery.data?.totalPages ?? 0;
  const content = listQuery.data?.content ?? [];
  const expertNickname = listQuery.data?.nickname ?? '';
  const expertName = listQuery.data?.name ?? '';

  return (
    <div className='p-8 xl:p-16 min-h-[60vh]'>
      <div className='flex justify-center'>
        <RequsetHealthHeader expertNickname={expertNickname} expertName={expertName} />
      </div>
      {/* 로딩 */}
      {listQuery.isLoading && (
        <div className='p-10 max-w-[900px] mx-auto min-h-[40vh]'>
          <HealthCareCardSkeleton />
          <HealthCareCardSkeleton />
          <HealthCareCardSkeleton />
        </div>
      )}

      {/* 에러 */}
      {listQuery.isError && (
        <div className='p-10 max-w-[900px] mx-auto min-h-[40vh]'>
          <p className='text-center text-red-600'>목록을 불러오지 못했습니다.</p>
        </div>
      )}

      {/* 데이터 */}
      {listQuery.isSuccess && (
        <div className='p-10 max-w-[900px] mx-auto min-h-[40vh]'>
          {content.map((c) => (
            <RequestHealthCareCard
              key={c.consultationId}
              nickname={c.nickname}
              gender={c.gender}
              age={c.age}
              height={c.height}
              weight={c.weight}
              requestMessage={c.comment}
              userId={c.userId}
              onAccept={() => approveMut.mutate(c.consultationId)}
              onReject={() => rejectMut.mutate(c.consultationId)}
            />
          ))}
          {content.length === 0 && (
            <div className='flex items-center justify-center h-[30vh] text-[#9DA0A3] text-[16px] font-medium'>
              받은 건강관리요청서가 없습니다.
            </div>
          )}
        </div>
      )}
      <div className='justify-center'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default RequestHealthCare;
