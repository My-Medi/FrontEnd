import React, { useState } from 'react';
import ExpertCard from './ExpertCard';
import ExpertDetailModal from '../../Expert/Modal/ExpertDetailModal';
import { matchedExpertsData, addExpertCard, type MatchedExpert } from '../../../data/matchedExperts';

const MatchedExperts: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'connected' | 'requested' | 'rejected'>('connected');
  const [experts, setExperts] = useState<MatchedExpert[]>(matchedExpertsData);
  const [selectedExpert, setSelectedExpert] = useState<MatchedExpert | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

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
    // 카드 삭제
    setExperts(prevExperts => prevExperts.filter(expert => expert.id !== expertId));
  };

  const handleCancelRequest = (expertId: string) => {
    // 요청 취소 로직 구현
    console.log('요청 취소:', expertId);
    // 카드 삭제
    setExperts(prevExperts => prevExperts.filter(expert => expert.id !== expertId));
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
        return experts.filter(expert => expert.status === 'matched');
      case 'requested':
        return experts.filter(expert => expert.status === 'request');
      case 'rejected':
        return experts.filter(expert => expert.status === 'rejected');
      default:
        return experts;
    }
  };

  const filteredExperts = getFilteredExperts();

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
            key={expert.id} 
            expert={expert} 
            onUnmatch={handleUnmatch}
            onCancelRequest={handleCancelRequest}
            onClick={() => handleExpertCardClick(expert)}
          />
        ))}
        {/* 마지막 카드 (플러스 아이콘) - 연결된 전문가 필터에서만 표시 */}
        {selectedFilter === 'connected' && (
          <ExpertCard 
            key={addExpertCard.id} 
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
          expert={{
            name: selectedExpert.name,
            position: selectedExpert.position,
            realName: selectedExpert.realName,
            profileImage: selectedExpert.profileImage,
            slogan: selectedExpert.description,
            introduction: selectedExpert.description,
            affiliation: selectedExpert.position,
            specialty: selectedExpert.position,
            career: selectedExpert.description
          }}
          expertStatus={selectedExpert.status}
          onClose={handleCloseDetailModal}
        />
      )}
    </div>
  );
};

export default MatchedExperts; 