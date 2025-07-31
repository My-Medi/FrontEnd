import React from 'react';
import locationIcon from '../../assets/MyHome/location.png';
import timeIcon from '../../assets/MyHome/time.png';
import { getEventColor, getTextColorClass } from '../../constants/colors';

export type ScheduleType = 'report' | 'birthday' | 'appointment' | 'consultation' | 'meeting';

interface ScheduleCardProps {
  type: ScheduleType;
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

const ScheduleCard: React.FC<ScheduleCardProps> = ({
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
    <div className="flex items-center gap-[30px] p-[10px_39px] bg-white border-2 border-[#DBE6FF] rounded-[20px] w-[1101px] mx-auto">
      <div className="flex-shrink-0 text-center w-[67px] h-[72px]">
        <div className={`font-semibold text-[32px] leading-[1.125] text-center whitespace-nowrap ${getTextColorClass(eventColor)}`}>
          {date.month}월
        </div>
        <div className={`font-semibold text-[32px] leading-[1.125] text-center whitespace-nowrap ${getTextColorClass(eventColor)}`}>
          {date.day}일
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <h3 className="font-semibold text-[22px] leading-[1.636] text-[#121218]">{title}</h3>
        <p className="font-semibold text-[15px] leading-[2.4] text-[#4D5053]">
          {description}
        </p>
        
        {/* Footer Section */}
        <div className="flex items-center gap-[20px] text-[#4D5053]">
          <div className="flex items-center gap-[10px]">
            <img src={locationIcon} alt="location icon" className="w-[16.51px] h-[20.17px] object-contain" />
            <span className="font-medium text-[14px] leading-[2.571]">{source.text}</span>
          </div>
          <div className="flex items-center gap-[10px]">
            <img src={timeIcon} alt="time icon" className="w-5 h-5 object-contain" />
            <span className="font-medium text-[14px] leading-[2.571]">{time.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard; 