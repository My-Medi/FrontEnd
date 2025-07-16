import React from "react";
import unionSvg from '../../assets/Expert/Union.svg';

interface ExpertCardProps {
  nickname: string;
  realname: string;
  role: string;
  slogan: string;
  description: string;
  profile?: React.ReactNode | string;
  careers: string[];
  onClick?: () => void;
}

const ExpertCard: React.FC<ExpertCardProps> = ({
  nickname,
  realname,
  role,
  slogan,
  description,
  profile,
  careers,
  onClick,
}) => (
  <div
    className="w-full max-w-[25rem] h-[31.25rem] bg-[rgba(255,255,255,0.8)] rounded-[15px] border border-[#DBE6FF] border-[0.5px] flex flex-col items-center justify-center gap-4 px-6 py-10 cursor-pointer transition"
    style={{ boxShadow: 'none' }}
    onClick={onClick}
  >
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="text-[18px] font-medium text-[#25282B] text-center leading-[2em]">{role}</div>
      <div className="text-[20px] font-medium text-[#121218] text-left leading-[1.19em]">{slogan}</div>
      <div className="w-[171px] h-[171px] bg-[#EDF0F3] rounded-full border-[4.5px] border-[#1D68FF] flex items-center justify-center overflow-hidden">
        {(!profile || profile === "") ? (
          <img src={unionSvg} alt="기본 프로필" className="w-[92px] h-[92px]" />
        ) : (
          typeof profile === "string" ? (
            <img src={profile} alt="프로필" className="w-[92px] h-[92px] rounded-full" />
          ) : (
            profile
          )
        )}
      </div>
    </div>
    <div className="flex flex-col items-start gap-1 mt-2 w-full">
      <div className="w-full truncate">
        <span className="text-[20px] font-medium text-[#1D68FF] pr-2 leading-[1.19em]">{nickname}</span>
        <span className="text-[20px] font-medium text-[#1D68FF] leading-[1.19em]">/</span>
        <span className="text-[20px] font-medium text-[#121218] pl-2 leading-[1.19em]">{realname}</span>
      </div>
      <div className="text-[18px] font-medium text-[#25282B] text-left leading-[1.71em]">{description.split('.')[0]}</div>
      <ul className="pt-1 text-[14px] font-medium text-[#75787B] list-none whitespace-pre-line w-full break-words gap-1 leading-[1.71em]">
        {careers.map((career, idx) => (
          <li key={idx}>{career}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default ExpertCard;