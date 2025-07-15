import React from "react";
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

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[120px]">
      <div className="absolute inset-0 bg-[#1212184D]" onClick={onClose} />
      <div className="relative bg-white rounded-[32px] w-[1082px] h-auto mx-4 p-12 md:p-16 shadow-xl" onClick={(e) => e.stopPropagation()}>
        {/* 상단: 닫기버튼 + 타이틀 + 이름/직함 */}
        <div className="flex items-center justify-between w-full mb-[24px]">
          <button
            className="text-[24px] text-gray-400 hover:text-gray-600"
            onClick={onClose}
            aria-label="닫기"
          >
            <img src={backSvg} alt="뒤로가기" className="w-[27px] h-[57px]" />
          </button>
          <div className="flex-1 flex flex-col items-center">
            <div className="text-[#121218] text-[18px] font-medium pb-[16px]">전문가 상세</div>
            <div className="text-[22px] font-semibold text-[#121218]">
              {expert.name} / {expert.position}
            </div>
          </div>
          {/* 오른쪽 여백 맞추기용 빈 div */}
          <div className="w-6 h-6" />
        </div>

        {/* 프로필 이미지 */}
        <div className="flex justify-center mb-[64px]">
          <div className="w-[329px] h-[329px] rounded-full border-[6px] border-[#1D68FF] flex items-center justify-center bg-[#EDF0F3] overflow-hidden">
            {expert.profileImage && expert.profileImage.trim() !== "" ? (
              <img
                src={expert.profileImage}
                alt={expert.name}
                className="w-[310px] h-[310px] rounded-full object-cover"
              />
            ) : (
              <img src={unionSvg} alt="기본 프로필" className="w-[120px] h-[120px]" />
            )}
          </div>
        </div>

        {/* 슬로건~경력사항 전체 래퍼 */}
        <div>
          {/* 슬로건 */}
          <div className="text-left text-[24px] font-medium text-[#121218] mb-[16px]">{expert.slogan}</div>

          {/* 전문가 소개 */}
          <div className="mb-[16px] flex flex-col">
            <div className="flex items-center mb-0">
              <div className="w-[19px] h-[19px] bg-[#1D68FF] rounded-[6px] mr-[24px]" />
              <div className="text-[20px] font-medium text-[#121218]">전문가 소개</div>
            </div>
            <div className="text-[16px] text-[#25282B] whitespace-pre-line ml-[43px] mt-[8px]">{expert.introduction}</div>
          </div>

          {/* 소속/전문분야 */}
          <div className="flex gap-[65px] mb-[16px]">
            <div className="flex flex-col">
              <div className="flex items-center mb-0">
                <div className="w-[19px] h-[19px] bg-[#1D68FF] rounded-[6px] mr-[24px]" />
                <div className="text-[20px] font-medium text-[#121218]">소속</div>
              </div>
              <div className="text-[16px] text-[#25282B] whitespace-pre-line ml-[43px] mt-[8px]">{expert.affiliation}</div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center mb-0">
                <div className="w-[19px] h-[19px] bg-[#1D68FF] rounded-[6px] mr-[24px]" />
                <div className="text-[20px] font-medium text-[#121218]">전문분야</div>
              </div>
              <div className="text-[16px] text-[#25282B] whitespace-pre-line ml-[43px] mt-[8px]">{expert.specialty}</div>
            </div>
          </div>

          {/* 경력사항 */}
          <div className="mb-[64px] flex flex-col">
            <div className="flex items-center mb-0">
              <div className="w-[19px] h-[19px] bg-[#1D68FF] rounded-[6px] mr-[24px]" />
              <div className="text-[20px] font-medium text-[#121218]">경력사항</div>
            </div>
            <div className="text-[16px] text-[#25282B] whitespace-pre-line ml-[43px] mt-[8px]">{expert.career}</div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-center gap-[144px]">
          <button
            onClick={onClose}
            className="pt-[20px] pr-[80px] pb-[20px] pl-[80px] rounded-full border border-[#1D68FF] text-[#1D68FF] bg-white hover:bg-gray-100 text-[20px] font-semibold"
          >
            목록으로
          </button>
          <button className="pt-[20px] pr-[80px] pb-[20px] pl-[80px] rounded-full bg-[#1D68FF] text-white hover:bg-[#1551b8] text-[20px] font-semibold">
            건강관리요청서 보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetailModal;