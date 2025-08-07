import React, { useState } from 'react';
import ExpertCard from './ExpertCard';
import ExpertDetailModal from '../../Expert/Modal/ExpertDetailModal';
import { addExpertCard, type MatchedExpert } from '../../../data/matchedExperts';
import { useMatchedExpertsQuery } from '../../../hooks/experts/queries/useMatchedExpertsQuery';
import { useCancelConsultationMutation } from '../../../hooks/experts/mutations/useCancelConsultationMutation';

import LoadingSpinner from '../../Common/LoadingSpinner';

const MatchedExperts: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'connected' | 'requested' | 'rejected'>('connected');
  const [selectedExpert, setSelectedExpert] = useState<MatchedExpert | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  // API 데이터 조회
  const { data: apiData, isLoading, error } = useMatchedExpertsQuery();
  
  // API 데이터를 직접 사용 (변환 불필요)
  const experts: MatchedExpert[] = apiData?.result?.map(item => ({
    ...item,
    career: undefined // API에서 경력사항 데이터가 오지 않으므로 undefined
  })) || [];
  console.log('API 응답 구조:', {
    isSuccess: apiData?.isSuccess,
    code: apiData?.code,
    message: apiData?.message,
    resultLength: apiData?.result?.length,
    firstItem: apiData?.result?.[0]
  });
  console.log('변환된 전문가 데이터:', experts);
  

  
  // 모달용 상태 변환 함수
  const getStatusForModal = (status: string): 'request' | 'matched' | 'rejected' | undefined => {
    const statusMap = {
      'REQUESTED': 'request',
      'ACCEPTED': 'matched',
      'REJECTED': 'rejected'
    };
    return (statusMap[status as keyof typeof statusMap] as 'request' | 'matched' | 'rejected' | undefined) || undefined;
  };
  
  // 상담요청 취소 뮤테이션
  const cancelConsultationMutation = useCancelConsultationMutation({
    onSuccess: () => {
      console.log('상담요청이 취소되었습니다.');
    },
    onError: (error) => {
      console.error('상담요청 취소 실패:', error);
      alert('상담요청 취소에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const FilterButton: React.FC<{ 
    type: 'connected' | 'requested' | 'rejected'; 
    label: string; 
    isSelected: boolean;
    onClick: () => void;
  }> = ({ label, isSelected, onClick }) => (
    <div className="flex flex-col items-center gap-0">
      <button
        onClick={onClick}
        className={`flex items-center justify-center px-6 pt-3 pb-0 transition-all m-0 cursor-pointer ${
          isSelected 
            ? 'text-[#121218]' 
            : 'text-[#121218] hover:text-[#1D68FF]'
        }`}
      >
        <span className={`leading-[36px] tracking-[-3%] text-center ${
          isSelected 
            ? 'text-[18px] font-medium' 
            : 'text-[16px] font-normal leading-[22px] tracking-[-1%]'
        }`}>
          {label}
        </span>
      </button>
      {isSelected && (
        <div className="w-3 h-3 bg-[#1D68FF] rounded-full" />
      )}
    </div>
  );

  const handleUnmatch = (expertId: string) => {
    // 매칭 끊기 로직 구현
    console.log('매칭 끊기:', expertId);
    // TODO: API 호출로 매칭 끊기 구현
  };

  const handleCancelRequest = (expertId: string) => {
    // 요청 취소 로직 구현
    console.log('요청 취소:', expertId);
    
    // 해당 전문가의 consultationId 찾기
    const expert = experts.find(e => e.expertId.toString() === expertId);
    if (!expert || !expert.consultationId) {
      alert('상담요청 정보를 찾을 수 없습니다.');
      return;
    }
    
    // 상담요청 취소 API 호출
    cancelConsultationMutation.mutate(expert.consultationId);
  };

  const handleExpertCardClick = (expert: MatchedExpert) => {
    setSelectedExpert(expert);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedExpert(null);
  };

  // 필터에 따른 전문가 목록 필터링
  const getFilteredExperts = () => {
    switch (selectedFilter) {
      case 'connected':
        return experts.filter(expert => expert.status === 'ACCEPTED');
      case 'requested':
        return experts.filter(expert => expert.status === 'REQUESTED');
      case 'rejected':
        return experts.filter(expert => expert.status === 'REJECTED');
      default:
        return experts;
    }
  };

  const filteredExperts = getFilteredExperts();

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="w-full mx-auto rounded-[20px] py-[50px] px-4 flex flex-col items-center gap-8 bg-[#F6F9FF]">
        <LoadingSpinner />
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="w-full mx-auto rounded-[20px] py-[50px] px-4 flex flex-col items-center gap-8 bg-[#F6F9FF]">
        <p className="text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</p>
        <p className="text-gray-500 text-sm">오류: {error.message}</p>
      </div>
    );
  }

  // API 응답이 실패한 경우
  if (apiData && !apiData.isSuccess) {
    return (
      <div className="w-full mx-auto rounded-[20px] py-[50px] px-4 flex flex-col items-center gap-8 bg-[#F6F9FF]">
        <p className="text-red-500">API 응답 오류</p>
        <p className="text-gray-500 text-sm">코드: {apiData.code}, 메시지: {apiData.message}</p>
      </div>
    );
  }

  return (
    <div className={`w-full mx-auto rounded-[20px] py-[50px] px-4 flex flex-col items-center gap-8 ${
      selectedFilter === 'rejected' 
        ? 'bg-[#EDF0F3]' 
        : 'bg-[#F6F9FF]'
    }`}
         style={{
           boxShadow: '0px 0px 6px 10px rgba(29, 104, 255, 0.1), 0px 0px 11px 30px rgba(29, 104, 255, 0.06), 0px 0px 15px 20px rgba(29, 104, 255, 0.03), 0px 0px 18px 20px rgba(29, 104, 255, 0.01), 0px 0px 20px 0px rgba(29, 104, 255, 0)'
         }}>
      
      {/* 제목 */}
      <h1 className="text-lg md:text-xl lg:text-[24px] font-semibold text-black leading-[1.4] md:leading-[1.5] lg:leading-[36px] tracking-[-3%] text-center">
        매칭 전문가
      </h1>

      {/* 필터 버튼들 */}
      <div className="flex gap-0">
        <FilterButton
          type="connected"
          label="연결된 전문가"
          isSelected={selectedFilter === 'connected'}
          onClick={() => setSelectedFilter('connected')}
        />
        <FilterButton
          type="requested"
          label="요청"
          isSelected={selectedFilter === 'requested'}
          onClick={() => setSelectedFilter('requested')}
        />
        <FilterButton
          type="rejected"
          label="거절"
          isSelected={selectedFilter === 'rejected'}
          onClick={() => setSelectedFilter('rejected')}
        />
      </div>

      {/* 전문가 목록 */}
      <div className="flex flex-wrap justify-start gap-8 max-w-[1021px] w-full">
        {filteredExperts.map((expert) => (
          <ExpertCard 
            key={expert.expertId} 
            expert={expert} 
            onUnmatch={handleUnmatch}
            onCancelRequest={handleCancelRequest}
            onClick={() => handleExpertCardClick(expert)}
          />
        ))}
        {/* 마지막 카드 (플러스 아이콘) - 연결된 전문가 필터에서만 표시 */}
        {selectedFilter === 'connected' && (
          <ExpertCard 
            key={addExpertCard.expertId} 
            expert={addExpertCard} 
            onUnmatch={handleUnmatch}
            onCancelRequest={handleCancelRequest}
            onClick={() => handleExpertCardClick(addExpertCard)}
          />
        )}
      </div>

      {/* 전문가 상세 모달 */}
      {showDetailModal && selectedExpert && (
        <ExpertDetailModal
          expertId={selectedExpert.expertId}
          expertStatus={getStatusForModal(selectedExpert.status)}
          requestDate={selectedExpert.status === 'REQUESTED' ? selectedExpert.requestDate : undefined}
          onClose={handleCloseDetailModal}
        />
      )}
    </div>
  );
};

export default MatchedExperts; 