import React from "react";
import { useEffect } from "react";
import unionSvg from '../../assets/Expert/Union.svg';
import backSvg from '../../assets/Expert/back.svg';

interface ExpertDetailModalProps {
  expert: {
    name: string;
    position: string;
    profileImage?: string;
    slogan: string;
    introduction: string;
    affiliation: string;
    specialty: string;
    career: string;
  };
  onClose: () => void;
}

const ExpertDetailModal: React.FC<ExpertDetailModalProps> = ({ expert, onClose }) => {

  // 모달 오픈 시 body 스크롤 방지
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 모달 배경 */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white rounded-[32px] sm:rounded-[40px] lg:rounded-[60px] w-full max-w-[98vw] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[984px] mx-2 sm:mx-4 p-0 shadow-2xl flex flex-col items-center overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* 상단: 닫기버튼 + 타이틀/이름/직함 한 줄 배치 */}
        <div className="w-full flex flex-row items-center px-12 pt-12 pb-6">
          <button
            className="w-[17px] h-[35px] flex rounded-full transition"
            onClick={onClose}
            aria-label="닫기"
          >
            <img src={backSvg} alt="닫기" className="w-full h-full object-contain" />
          </button>
          <div className="flex-1 flex flex-col items-center">
            <div className="text-[#4D5053] text-[14px] font-medium leading-[24px] mb-1">전문가 상세</div>
            <div className="text-[#121218] text-[24px] font-semibold leading-[36px]">{expert.name} / {expert.position}</div>
          </div>
          <div className="w-9 h-9" />
        </div>
        <div className="w-full flex flex-col items-center px-12 pb-0">
          {/* 프로필 */}
          <div className="flex justify-center mb-6">
            <div className="w-[235px] h-[235px] rounded-full border-[6px] border-[#1D68FF] flex items-center justify-center bg-[#EDF0F3] overflow-hidden shadow-lg">
              {expert.profileImage && expert.profileImage.trim() !== "" ? (
                <img
                  src={expert.profileImage}
                  alt={expert.name}
                  className="w-[210px] h-[210px] rounded-full object-cover"
                />
              ) : (
                <img src={unionSvg} alt="기본 프로필" className="w-24 h-24" />
              )}
            </div>
          </div>
          <div className="w-full flex flex-col px-3">
            {/* 슬로건 */}
            <div className="w-full flex mb-4">
              <div className="text-center text-base sm:text-lg lg:text-[20px] font-medium text-[#121218] leading-[24px]">{expert.slogan}</div>
            </div>
            {/* 전문가 소개 */}
            <div className="w-full flex flex-col mb-4 sm:mb-6">
              <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
                <div className="w-[19px] h-[19px] bg-[#1D68FF] rounded-[6px]" />
                <div className="text-[20px] font-medium text-[#121218]">전문가 소개</div>
              </div>
              <div className="text-sm sm:text-base lg:text-[16px] text-[#25282B] whitespace-pre-line leading-[22px] ml-4 sm:ml-8 lg:ml-[43px]">{expert.introduction}</div>
            </div>
            {/* 소속/전문분야 */}
            <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 lg:gap-8 mb-4 sm:mb-6">
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
                  <div className="w-[19px] h-[19px] bg-[#1D68FF] rounded-[6px]" />
                  <div className="text-[20px] font-medium text-[#121218]">소속</div>
                </div>
                <div className="text-sm sm:text-base lg:text-[16px] text-[#25282B] whitespace-pre-line leading-[22px] ml-4 sm:ml-8 lg:ml-[43px]">{expert.affiliation}</div>
              </div>
              <div className="flex-1 ">
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
                  <div className="w-[19px] h-[19px] bg-[#1D68FF] rounded-[6px]" />
                  <div className="text-[20px] font-medium text-[#121218]">전문분야</div>
                </div>
                <div className="text-sm sm:text-base lg:text-[16px] text-[#25282B] whitespace-pre-line leading-[22px] ml-4 sm:ml-8 lg:ml-[43px]">{expert.specialty}</div>
              </div>
            </div>
            {/* 경력사항 */}
            <div className="w-full flex flex-col mb-4 sm:mb-6">
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
                  <div className="w-[19px] h-[19px] bg-[#1D68FF] rounded-[6px]" />
                  <div className="text-[20px] font-medium text-[#121218]">경력사항</div>
                </div>
                <div className="text-sm sm:text-base lg:text-[16px] text-[#25282B] whitespace-pre-line leading-[22px] ml-4 sm:ml-8 lg:ml-[43px]">{expert.career}</div>
            </div>
          </div>
        </div>
        {/* 하단 버튼 */}
        <div className="w-full flex justify-center gap-[144px] px-12 pb-12 mt-6">
          <button
            onClick={onClose}
            className="w-[300px] h-[56px] rounded-[60px] border border-[#FFFFFF] text-[#25282B] hover:bg-[#EDF0F3] text-[20px] font-medium transition cursor-pointer"
            style={{ boxShadow: '0px 0px 2px 3px #1D68FF08, 0px 0px 4px 8px #1D68FF04, 0px 0px 6px 8px #1D68FF02, 0px 0px 8px 8px #1D68FF01, 0px 0px 10px 0px #1D68FF00' }}
          >
            목록으로
          </button>
          <button className="w-[300px] h-[56px] rounded-[60px] bg-[#1D68FF] text-white text-[20px] font-semibold transition cursor-pointer"
            style={{ boxShadow: '0px 0px 3px 5px #1D68FF14, 0px 0px 6px 8px #1D68FF0A, 0px 0px 8px 8px #1D68FF05, 0px 0px 10px 8px #1D68FF02, 0px 0px 12px 0px #1D68FF00' }}
          >
            건강관리요청서 보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetailModal;