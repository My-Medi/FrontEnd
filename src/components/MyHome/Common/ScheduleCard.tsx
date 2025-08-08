import React from 'react';
import locationIcon from '../../../assets/MyHome/location.svg';
import timeIcon from '../../../assets/MyHome/time.svg';
import { getDeterministicColor, getTextColorClass, eventColors } from '../../../constants/colors';
type ScheduleType = 'consultation' | 'examination' | 'treatment' | 'appointment' | 'report' | 'birthday';

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
  colorIndex?: number;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  // type,
  date,
  title,
  description,
  source,
  time,
  colorIndex,
}) => {
  // 공통 색상 팔레트에서 색상 가져오기
  // 카드도 캘린더와 동일 색상 순환을 보장하기 위해 이벤트 텍스트 기반 색상 사용
  let eventColor = typeof colorIndex === 'number'
    ? eventColors[colorIndex % eventColors.length]
    : getDeterministicColor(title);
  // 달력의 연두색(#E3FDDE)은 카드에서는 #A1F68E로 표시
  if (eventColor === '#E3FDDE') {
    eventColor = '#A1F68E';
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 lg:gap-[30px] p-4 sm:p-6 lg:px-[39px] lg:py-[10px] border border-[#DBE6FF] rounded-[20px] w-full max-w-[1101px] mx-auto xl:mx-0">
      <div className="flex-shrink-0 text-center w-full sm:w-[67px] h-auto sm:h-[72px] flex sm:block justify-center">
        <div className={`font-semibold text-2xl sm:text-3xl lg:text-[32px] leading-[32px] sm:leading-[34px] lg:leading-[36px] tracking-[0%] text-center whitespace-nowrap ${getTextColorClass(eventColor)}`}>
          {date.month}월
        </div>
        <div className={`font-semibold text-2xl sm:text-3xl lg:text-[32px] leading-[32px] sm:leading-[34px] lg:leading-[36px] tracking-[0%] text-center whitespace-nowrap ${getTextColorClass(eventColor)}`}>
          {date.day}일
        </div>
      </div>

      <div className="flex flex-col flex-grow w-full sm:w-auto">
        <h3 className="font-semibold text-base sm:text-lg lg:text-[18px] leading-[22px] sm:leading-[24px] lg:leading-[27px] tracking-[-3%] text-[#121218]">{title}</h3>
        <p className="font-medium text-sm sm:text-base lg:text-[16px] leading-[26px] sm:leading-[30px] lg:leading-[36px] tracking-[-3%] text-[#75787B]">
          {description}
        </p>
        
        {/* Footer Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 lg:gap-[20px] text-[#4D5053] mt-2 sm:mt-0">
        <div className="flex items-center gap-2 sm:gap-[10px]">
            <img src={locationIcon} alt="location icon" className="w-4 h-5 sm:w-[16.51px] sm:h-[20.17px] object-contain" />
          <span className="font-medium text-xs sm:text-sm lg:text-[14px] leading-[20px] sm:leading-[24px] lg:leading-[36px]">{source.text}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-[10px]">
            <img src={timeIcon} alt="time icon" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
          <span className="font-medium text-xs sm:text-sm lg:text-[14px] leading-[20px] sm:leading-[24px] lg:leading-[36px]">{time.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard; 