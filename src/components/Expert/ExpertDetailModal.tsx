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
      <div className="relative bg-white rounded-2xl sm:rounded-3xl lg:rounded-[3.75rem] w-full max-w-[98vw] sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-2 sm:mx-4 p-0 shadow-2xl flex flex-col items-center overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* 상단: 닫기버튼 + 타이틀/이름/직함 한 줄 배치 */}
        <div className="w-full flex flex-row items-center px-6 sm:px-8 pt-8 sm:pt-10 pb-4 sm:pb-6">
          <button
            className="w-5 h-9 flex rounded-full transition"
            onClick={onClose}
            aria-label="닫기"
          >
            <img src={backSvg} alt="닫기" className="w-full h-full object-contain" />
          </button>
          <div className="flex-1 flex flex-col items-center">
            <div className="text-[#4D5053] text-sm font-medium leading-6 mb-1">전문가 상세</div>
            <div className="text-[#121218] text-xl font-semibold leading-9">{expert.name} / {expert.position}</div>
          </div>
          <div className="w-9 h-9" />
        </div>
        <div className="w-full flex flex-col items-center px-6 sm:px-8 pb-0">
          {/* 프로필 */}
          <div className="flex justify-center mb-6">
            <div className="w-56 h-56 rounded-full border-4 border-[#1D68FF] flex items-center justify-center bg-[#EDF0F3] overflow-hidden shadow-lg">
              {expert.profileImage && expert.profileImage.trim() !== "" ? (
                <img
                  src={expert.profileImage}
                  alt={expert.name}
                  className="w-52 h-52 rounded-full object-cover"
                />
              ) : (
                <img src={unionSvg} alt="기본 프로필" className="w-24 h-24" />
              )}
            </div>
          </div>
          <div className="w-full flex flex-col px-1 sm:px-2 lg:px-6">
            {/* 슬로건 */}
            <div className="w-full flex mb-4">
              <div className="text-center text-base sm:text-lg lg:text-xl font-medium text-[#121218] leading-6">{expert.slogan}</div>
            </div>
            {/* 전문가 소개 */}
            <div className="w-full flex flex-col mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-6">
                <div className="w-5 h-5 bg-[#1D68FF] rounded-md" />
                <div className="text-lg font-medium text-[#121218]">전문가 소개</div>
              </div>
              <div className="text-sm sm:text-base lg:text-base text-[#25282B] whitespace-pre-line leading-6 ml-3 sm:ml-6 lg:ml-10">{expert.introduction}</div>
            </div>
            {/* 소속/전문분야 */}
            <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 lg:gap-8 mb-4 sm:mb-6">
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-6">
                  <div className="w-5 h-5 bg-[#1D68FF] rounded-md" />
                  <div className="text-lg font-medium text-[#121218]">소속</div>
                </div>
                <div className="text-sm sm:text-base lg:text-base text-[#25282B] whitespace-pre-line leading-6 ml-3 sm:ml-6 lg:ml-10">{expert.affiliation}</div>
              </div>
              <div className="flex-1 ">
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-6">
                  <div className="w-5 h-5 bg-[#1D68FF] rounded-md" />
                  <div className="text-lg font-medium text-[#121218]">전문분야</div>
                </div>
                <div className="text-sm sm:text-base lg:text-base text-[#25282B] whitespace-pre-line leading-6 ml-3 sm:ml-6 lg:ml-10">{expert.specialty}</div>
              </div>
            </div>
            {/* 경력사항 */}
            <div className="w-full flex flex-col mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-6">
                  <div className="w-5 h-5 bg-[#1D68FF] rounded-md" />
                  <div className="text-lg font-medium text-[#121218]">경력사항</div>
                </div>
                <div className="text-sm sm:text-base lg:text-base text-[#25282B] whitespace-pre-line leading-6 ml-3 sm:ml-6 lg:ml-10">{expert.career}</div>
            </div>
          </div>
        </div>
        {/* 하단 버튼 */}
        <div className="w-full flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 lg:gap-36 px-6 sm:px-8 pb-8 sm:pb-12 mt-6">
          <button
            onClick={onClose}
            className="w-full sm:w-60 h-12 rounded-full border border-[#FFFFFF] text-[#25282B] hover:bg-[#EDF0F3] text-base sm:text-lg font-medium transition cursor-pointer"
            style={{ boxShadow: '0px 0px 2px 3px #1D68FF08, 0px 0px 4px 8px #1D68FF04, 0px 0px 6px 8px #1D68FF02, 0px 0px 8px 8px #1D68FF01, 0px 0px 10px 0px #1D68FF00' }}
          >
            목록으로
          </button>
          <button className="w-full sm:w-60 h-12 rounded-full bg-[#1D68FF] text-white text-base sm:text-lg font-semibold transition cursor-pointer"
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