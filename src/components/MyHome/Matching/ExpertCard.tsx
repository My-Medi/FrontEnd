import React from 'react';
import { useNavigate } from 'react-router-dom';
import { type MatchedExpert } from '../../../data/matchedExperts';
import { getSpecialtyKoreanName } from '../../../types/expert/common';
import { formatPhoneNumber } from '../../../utils/phoneUtils';
import plusIcon from '../../../assets/MyHome/plus.svg';
import unionSvg from '../../../assets/Expert/Union.svg';

interface ExpertCardProps {
  expert: MatchedExpert;
  onUnmatch?: (expertId: string) => void;
  onCancelRequest?: (expertId: string) => void;
  onClick?: () => void;
}

const ExpertCard: React.FC<ExpertCardProps> = ({ expert, onUnmatch, onCancelRequest, onClick }) => {
  const navigate = useNavigate();
  
  const handleUnmatch = () => {
    onUnmatch?.(expert.expertId.toString());
  };

  const handleCancelRequest = () => {
    onCancelRequest?.(expert.expertId.toString());
  };

  const handleAddExpert = () => {
    navigate('/expert');
  };

  // 버튼 텍스트와 핸들러 결정
  const getButtonConfig = () => {
    switch (expert.status) {
      case 'REQUESTED':
        return {
          text: '요청 취소',
          handler: handleCancelRequest,
          show: true
        };
      case 'ACCEPTED':
        return {
          text: '매칭 끊기',
          handler: handleUnmatch,
          show: true
        };
      case 'REJECTED':
        return {
          text: '',
          handler: () => {},
          show: false
        };
      default:
        return {
          text: '매칭 끊기',
          handler: handleUnmatch,
          show: true
        };
    }
  };

  const buttonConfig = getButtonConfig();

  // 마지막 카드 (플러스 아이콘)인 경우
  if (expert.isAddCard) {
    return (
      <div className="relative">
        {/* 매칭 끊기 버튼과 동일한 높이의 빈 공간 */}
        <div className="flex justify-end mb-2">
          <div className="text-[12px] font-medium text-transparent leading-[14px] tracking-[-3%] px-1 py-0">
            &nbsp;
          </div>
        </div>
        
        {/* 플러스 카드 */}
        <div 
          className="w-[319px] h-[384px] bg-white border border-[#DBE6FF] rounded-[15px] p-6 flex flex-col items-center justify-center gap-6 cursor-pointer"
          onClick={handleAddExpert}
        >
          {/* 플러스 아이콘 */}
          <img 
            src={plusIcon} 
            alt="플러스 아이콘"
            className="w-[66px] h-[66px]"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* 상태별 버튼 */}
      {buttonConfig.show && (
        <div className="flex justify-end mb-2">
          <button 
            onClick={buttonConfig.handler}
            className="text-[12px] font-medium text-[#9DA0A3] leading-[14px] tracking-[-3%] px-1 py-0 transition-colors cursor-pointer"
          >
            {buttonConfig.text}
          </button>
        </div>
      )}
      
      {/* 전문가 카드 */}
      <div 
        className="w-[319px] h-[384px] bg-white border border-[#DBE6FF] rounded-[15px] p-6 flex flex-col items-center cursor-pointer"
        onClick={onClick}
      >
        {/* 상단 정보 */}
        <div className="flex flex-col items-center gap-2 mb-2">
          <div className="text-[14px] font-medium text-[#9DA0A3] leading-[24px] tracking-[-3%] text-center">
            &nbsp;
          </div>
          <div className="text-[18px] font-medium text-[#25282B] leading-[36px] tracking-[-3%] text-center">
            {getSpecialtyKoreanName(expert.specialty)}
          </div>
        </div>

        {/* 프로필 이미지 */}
        <div className="w-[145px] h-[145px] bg-[#EDF0F3] border-[4.5px] border-[#1D68FF] rounded-full flex items-center justify-center mb-6">
          {expert.profileImgUrl ? (
            <img 
              src={expert.profileImgUrl} 
              alt={`${expert.nickname} 프로필`}
              className="w-[78px] h-[80px] rounded-full object-cover"
            />
          ) : (
            <img 
              src={unionSvg} 
              alt="기본 프로필" 
              className="w-[78px] h-[80px]" 
            />
          )}
        </div>

        {/* 하단 정보 */}
        <div className="flex flex-col gap-1.5">
          <div className="text-[20px] font-medium leading-[24px] tracking-[-3%]">
            <span className="text-[#1D68FF]">{expert.nickname}</span>
            <span className="text-[#1D68FF]"> / </span>
            <span className="text-[#121218]">{expert.name}</span>
          </div>
          <div className="text-[16px] font-medium text-[#25282B] leading-[36px] tracking-[-3%] w-[269px] truncate">
            {expert.introSentence}
          </div>
          {/* 매칭된 전문가일 때만 전화번호 표시 */}
          {expert.status === 'ACCEPTED' && expert.phoneNumber && (
            <div className="text-[16px] font-light text-[#25282B] leading-[22px] tracking-[-3%]">
              {formatPhoneNumber(expert.phoneNumber)}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ExpertCard; 