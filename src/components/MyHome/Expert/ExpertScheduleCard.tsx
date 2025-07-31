import React from 'react';
import locationIcon from '../../../assets/MyHome/location.png';
import timeIcon from '../../../assets/MyHome/time.png';
import { getEventColor, getTextColorClass } from '../../../constants/colors';

export type ExpertScheduleType = 'report' | 'birthday' | 'appointment' | 'consultation' | 'meeting';

interface ExpertScheduleCardProps {
  type: ExpertScheduleType;
  date: {
    month: number;
    day: number;
    year: number;
  };
  title: string;
  description: string;
  source: {
    text: string;
  };
  time: {
    text: string;
  };
}

const ExpertScheduleCard: React.FC<ExpertScheduleCardProps> = ({
  type,
  date,
  title,
  description,
  source,
  time,
}) => {
  // 공통 색상 팔레트에서 색상 가져오기
  const eventColor = getEventColor(title);

  return (
    <div className="flex items-center gap-[30px] p-[10px_40px] bg-white border-2 border-[#DBE6FF] rounded-[20px] w-[876px] lg:w-[876px] md:w-full sm:w-full lg:gap-[30px] md:gap-6 sm:gap-4 lg:p-[10px_40px] md:p-4 sm:p-3">
      <div className="flex-shrink-0 text-center w-[67px] h-[72px] lg:w-[67px] lg:h-[72px] md:w-16 md:h-16 sm:w-12 sm:h-12">
        <div className={`font-semibold text-[32px] leading-[1.125] text-center whitespace-nowrap lg:text-[32px] md:text-2xl sm:text-xl ${getTextColorClass(eventColor)}`}>
          {date.month}월
        </div>
        <div className={`font-semibold text-[32px] leading-[1.125] text-center whitespace-nowrap lg:text-[32px] md:text-2xl sm:text-xl ${getTextColorClass(eventColor)}`}>
          {date.day}일
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <h3 className="font-semibold text-[22px] leading-[1.636] text-[#121218] lg:text-[22px] md:text-lg sm:text-base">{title}</h3>
        <p className="font-semibold text-[15px] leading-[2.4] text-[#4D5053] lg:text-[15px] md:text-sm sm:text-xs">
          {description}
        </p>
        
        {/* Footer Section */}
        <div className="flex items-center gap-[20px] text-[#4D5053] lg:gap-[20px] md:gap-4 sm:gap-2 lg:flex-row md:flex-row sm:flex-col sm:items-start">
          <div className="flex items-center gap-[10px] lg:gap-[10px] md:gap-2 sm:gap-1">
            <img src={locationIcon} alt="location icon" className="w-[16.51px] h-[20.17px] object-contain lg:w-[16.51px] lg:h-[20.17px] md:w-4 md:h-5 sm:w-3 sm:h-4" />
            <span className="font-medium text-[14px] leading-[2.571] lg:text-[14px] md:text-sm sm:text-xs">{source.text}</span>
          </div>
          <div className="flex items-center gap-[10px] lg:gap-[10px] md:gap-2 sm:gap-1">
            <img src={timeIcon} alt="time icon" className="w-5 h-5 object-contain lg:w-5 lg:h-5 md:w-4 md:h-4 sm:w-3 sm:h-3" />
            <span className="font-medium text-[14px] leading-[2.571] lg:text-[14px] md:text-sm sm:text-xs">{time.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertScheduleCard; 