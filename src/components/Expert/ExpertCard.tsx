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
    className="w-full max-w-sm bg-white/80 rounded-xl border border-[#DBE6FF] flex flex-col items-center justify-center gap-4 px-6 py-8 shadow cursor-pointer hover:shadow-lg transition"
    onClick={onClick}
  >
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="text-lg font-medium text-[#25282B] text-center leading-9">{role}</div>
      <div className="text-xl font-medium text-[#121218] text-center leading-6">{slogan}</div>
      <div className="w-36 h-36 bg-[#EDF0F3] rounded-full border-4 border-[#1D68FF] flex items-center justify-center overflow-hidden">
        {(!profile || profile === "") ? (
          <img src={unionSvg} alt="기본 프로필" className="w-20 h-20" />
        ) : (
          typeof profile === "string" ? (
            <img src={profile} alt="프로필" className="w-20 h-20 rounded-full" />
          ) : (
            profile
          )
        )}
      </div>
    </div>
    <div className="flex flex-col items-start gap-1 mt-2 w-full">
      <div className="w-full truncate">
        <span className="text-xl font-medium text-[#1D68FF] pr-2 leading-6">{nickname}</span>
        <span className="text-xl font-medium text-[#1D68FF] leading-6">/</span>
        <span className="text-xl font-medium text-[#121218] pl-2 leading-6">{realname}</span>
      </div>
      <div className="text-lg font-medium text-[#25282B] text-left leading-9">{description}</div>
      <ul className="mt-2 text-sm font-medium text-[#75787B] list-none whitespace-pre-line w-full break-words gap-1 leading-6">
        {careers.map((career, idx) => (
          <li key={idx}>{career}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default ExpertCard;