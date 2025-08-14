import React from "react";
import RoundAvatar from '../../Common/RoundAvatar';

interface ExpertCardProps {
  nickname: string;
  realname: string;
  role: string;
  slogan: string;
  description: string;
  profile?: React.ReactNode | string;
  careers: string[];
  organizationName?: string;
  careerResponseDtoList?: Array<{
    id: number;
    companyName: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
  }>;
  career?: string[]; // 서버 요약 문자열 배열
  onClick?: () => void;
}

const ExpertCard: React.FC<ExpertCardProps> = ({
  nickname,
  realname,
  role,
  slogan,
  description,
  profile,
  careerResponseDtoList,
  career,
  onClick,
}) => (
  <div
    className="w-full max-w-[25rem] h-[31.25rem] bg-[rgba(255,255,255,0.8)] rounded-[15px] border border-[#DBE6FF] border-[0.5px] flex flex-col items-center justify-center gap-4 px-6 pt-9 pb-10 cursor-pointer transition pl-[31px]"
    style={{ boxShadow: 'none' }}
    onClick={onClick}
  >
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="text-[18px] font-medium text-[#25282B] text-center leading-[2em]">{role}</div>
      {/* introSentence 를 프로필 위에 구성 */}
      <div className="text-[20px] font-medium text-[#121218] text-center leading-[1.3] px-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
        {slogan}
      </div>
      <RoundAvatar src={typeof profile === 'string' ? profile : undefined} containerClass="w-[171px] h-[171px] border-[4.5px] border-[#1D68FF]" />
    </div>
    <div className="flex flex-col items-start gap-1 pt-2 w-full">
      <div className="w-full truncate">
            <span className="text-[20px] font-medium text-[#1D68FF] pr-2 leading-[1.19em]">{nickname}</span>
            <span className="text-[20px] font-medium text-[#1D68FF] leading-[1.19em]">/</span>
            <span className="text-[20px] font-medium text-[#121218] pl-2 leading-[1.19em]">{realname}</span>
         
      </div>
      {/* introduction 을 닉네임/이름 아래에 한 줄 말줄임표 처리 */}
      <div className="text-[18px] font-medium text-[#25282B] text-left leading-[1.71em] w-full whitespace-nowrap overflow-hidden text-ellipsis">
        {description}
      </div>
      {(() => {
        const parseIsoDate = (d?: string) => {
          if (!d) return null;
          const m = d.match(/^(\d{4})-(\d{2})-(\d{2})/);
          if (!m) return null;
          return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
        };
        const diffMonths = (start?: string, end?: string): number | null => {
          const s = parseIsoDate(start);
          const e = parseIsoDate(end);
          if (!s || !e) return null;
          return (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
        };
        const formatDuration = (months: number | null): string => {
          if (months === null) return '';
          const safe = Math.max(months, 0);
          if (safe < 12) return `${safe}개월`;
          const years = Math.floor(safe / 12);
          const remain = safe % 12;
          return remain > 0 ? `${years}년 ${remain}개월` : `${years}년`;
        };
        if (Array.isArray(careerResponseDtoList) && careerResponseDtoList.length > 0) {
          const c = careerResponseDtoList[0];
          const duration = formatDuration(diffMonths(c.startDate, c.endDate));
          const text = `- ${c.companyName}${duration ? ` ${duration}` : ''}`;
          return <div className="pt-1 text-[14px] font-medium text-[#75787B] leading-[1.71em]">{text}</div>;
        }
        if (Array.isArray(career) && career.length > 0) {
          const raw = career[0];
          const m = raw.match(/^(.*?)(\d+)\s*개월$/);
          if (m) {
            const title = m[1].trim();
            const monthsNum = Number(m[2]);
            const safe = Math.max(monthsNum, 0);
            if (safe >= 12) {
              const years = Math.floor(safe / 12);
              const remain = safe % 12;
              const duration = remain > 0 ? `${years}년 ${remain}개월` : `${years}년`;
              return <div className="pt-1 text-[14px] font-medium text-[#75787B] leading-[1.71em]">- {title} {duration}</div>;
            }
          }
          return <div className="pt-1 text-[14px] font-medium text-[#75787B] leading-[1.71em]">- {raw}</div>;
        }
        return null;
      })()}
    </div>
  </div>
);

export default ExpertCard;