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
}

const ExpertCard: React.FC<ExpertCardProps> = ({
  nickname,
  realname,
  role,
  slogan,
  description,
  profile,
  careers,
}) => (
  <div className="w-[400px] h-[500px] bg-white/80 rounded-2xl border border-[#DBE6FF] flex flex-col items-center justify-center gap-4 p-6 shadow">
    <div className="flex flex-col items-center gap-4">
      <div className="text-lg font-medium text-[#25282B] text-center">{role}</div>
      <div className="text-xl font-medium text-[#121218] text-center">{slogan}</div>
      <div className="w-[171px] h-[171px] bg-[#EDF0F3] rounded-full border-4 border-[#1D68FF] flex items-center justify-center">
        {(!profile || profile === "") ? (
          <img src={unionSvg} alt="기본 프로필" className="w-24 h-24" />
        ) : (
          typeof profile === "string" ? (
            <img src={profile} alt="프로필" className="w-24 h-24 rounded-full" />
          ) : (
            profile
          )
        )}
      </div>
    </div>
    <div className="flex flex-col items-start gap-1 mt-2 w-[337.5px]">
      <div>
        <span className="text-xl font-medium text-[#1D68FF] pr-2">{nickname}</span>
        <span className="text-xl font-medium text-[#1D68FF]">/</span>
        <span className="text-xl font-medium text-[#121218] pl-2">{realname}</span>
      </div>
      <div className="text-lg font-medium text-[#25282B] text-left">{description}</div>
      <ul className="mt-2 text-base font-medium text-[#75787B] list-none whitespace-pre-line">
        {careers.map((career, idx) => (
          <li key={idx}>{career}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default ExpertCard;