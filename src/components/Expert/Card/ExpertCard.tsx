import React from "react";
import unionSvg from '../../../assets/Expert/Union.svg';

interface ExpertCardProps {
  expertId: number;
  specialty: 'NUTRITIONIST' | 'DOCTOR' | 'NURSE' | 'PHARMACIST' | 'THERAPIST';
  name: string;
  nickname: string | null;
  introduction: string;
  organizationName: string;
  onClick?: () => void;
}

const ExpertCard: React.FC<ExpertCardProps> = ({
  // expertId,
  specialty,
  name,
  nickname,
  introduction,
  organizationName,
  onClick,
}) => {
  // 전문분야 한글 변환
  const getSpecialtyKorean = (specialty: string) => {
    const specialtyMap = {
      'NUTRITIONIST': '영양사',
      'DOCTOR': '의사',
      'NURSE': '간호사',
      'PHARMACIST': '약사',
      'THERAPIST': '치료사'
    };
    return specialtyMap[specialty as keyof typeof specialtyMap] || specialty;
  };

  return (
    <div
      className="w-full max-w-[25rem] h-[31.25rem] bg-[rgba(255,255,255,0.8)] rounded-[15px] border border-[#DBE6FF] border-[0.5px] flex flex-col items-center justify-center gap-4 px-6 py-10 cursor-pointer transition pl-[31px]"
      style={{ boxShadow: 'none' }}
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="text-[18px] font-medium text-[#25282B] text-center leading-[2em]">{getSpecialtyKorean(specialty)}</div>
        <div className="text-[20px] font-medium text-[#121218] text-left leading-[1.19em]">전문가 슬로건</div>
        <div className="w-[171px] h-[171px] bg-[#EDF0F3] rounded-full border-[4.5px] border-[#1D68FF] flex items-center justify-center overflow-hidden">
          <img src={unionSvg} alt="기본 프로필" className="w-[92px] h-[92px]" />
        </div>
      </div>
      <div className="flex flex-col items-start gap-1 pt-2 w-full">
        <div className="w-full truncate">
          <span className="text-[20px] font-medium text-[#1D68FF] pr-2 leading-[1.19em]">{nickname || name}</span>
          <span className="text-[20px] font-medium text-[#1D68FF] leading-[1.19em]">/</span>
          <span className="text-[20px] font-medium text-[#121218] pl-2 leading-[1.19em]">{name}</span>
        </div>
        <div className="text-[18px] font-medium text-[#25282B] text-left leading-[1.71em] w-full truncate whitespace-nowrap overflow-hidden">{introduction.split('.')[0]}</div>
        <ul className="pt-1 text-[14px] font-medium text-[#75787B] list-none whitespace-pre-line w-full break-words gap-1 leading-[1.71em]">
          <li>{organizationName}</li>
          <li>전문가 경력 정보</li>
        </ul>
      </div>
    </div>
  );
};

export default ExpertCard;