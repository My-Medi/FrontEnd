import React, { useState } from 'react';
import RequestHealthCareCard from './HealthCareCard';
import RequsetHealthHeader from './Header';
import Pagination from '../Expert/Intro/Pagination';
import { useExpertRequestedConsultations } from '../../hooks/consultation/expert/queries/useExpertRequestedConsultations';
import { useApproveConsultation } from '../../hooks/consultation/expert/mutation/useApproveConsultation';
import { useRejectConsultation } from '../../hooks/consultation/expert/mutation/useRejectConsultation';

const PAGE_SIZE = 10; // 필요 시 조정

const RequestHealthCare: React.FC = () => {
  // UI는 1-based, API는 0-based
  const [currentPage, setCurrentPage] = useState(1);

  const listQuery = useExpertRequestedConsultations(currentPage - 1, PAGE_SIZE, true);

  const approveMut = useApproveConsultation();
  const rejectMut = useRejectConsultation();

  const totalPages = listQuery.data?.totalPages ?? 0;

  return (
    <div className='p-8 xl:p-16'>
      <div className='flex justify-center'>
        <RequsetHealthHeader expertNickname='튼튼핏' expertName='이수형' />
      </div>

      {/* 로딩 */}
      {listQuery.isLoading && (
        <div className='p-10 max-w-[900px] mx-auto'>
          {/* 필요하면 스켈레톤 넣기 */}
          <p className='text-center text-[#75787B]'>불러오는 중…</p>
        </div>
      )}

      {/* 에러 */}
      {listQuery.isError && (
        <div className='p-10 max-w-[900px] mx-auto'>
          <p className='text-center text-red-600'>목록을 불러오지 못했습니다.</p>
        </div>
      )}

      {/* 데이터 */}
      {listQuery.isSuccess && (
        <div className='p-10 max-w-[900px] mx-auto'>
          {(listQuery.data.content ?? []).map((c) => (
            <RequestHealthCareCard
              key={c.consultationId}
              // API 매핑
              nickName={c.nickname}
              gender={c.gender} // 'MALE' | 'FEMALE' 그대로 표기 중이면 그대로 전달
              age={Number(c.age)} // UI가 숫자 기대 → 숫자 변환
              height={c.height}
              weight={c.weight}
              requestMessage={c.comment}
              // receivedDate는 스펙에 없어서 표시 생략(카드에서 optional 처리)
              // 카드 액션
              onAccept={() => approveMut.mutate(c.consultationId)}
              onReject={() => rejectMut.mutate(c.consultationId)}
            />
          ))}
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
