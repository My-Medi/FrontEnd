import React from 'react';
import locationIcon from '../../assets/MyHome/location.png';
import timeIcon from '../../assets/MyHome/time.png';

export type ScheduleType = 'report' | 'birthday' | 'appointment';

interface ScheduleCardProps {
  type: ScheduleType;
  date: {
    month: number;
    day: number;
  };
  title: string;
  description: string;
  source: {
    // icon?: React.ReactNode; // 아이콘은 추후 SVG로 대체
    text: string;
  };
  time: {
    // icon?: React.ReactNode;
    text: string;
  };
}

const typeStyles = {
  report: {
    dateColor: 'text-[#A1F68E]',
  },
  birthday: {
    dateColor: 'text-[#FFCC00]',
  },
  appointment: {
    dateColor: 'text-[rgba(29,104,255,0.8)]',
  },
};

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  type,
  date,
  title,
  description,
  source,
  time,
}) => {
  const styles = typeStyles[type];

  return (
    <div className="flex items-center gap-8 p-4 md:p-6 lg:p-8 bg-white border-2 border-[#DBE6FF] rounded-2xl w-full">
      {/* Date Section */}
      <div className="flex-shrink-0 text-center">
        <div className={`font-semibold text-4xl leading-tight ${styles.dateColor}`}>
          {date.month}월
        </div>
        <div className={`font-semibold text-4xl leading-tight ${styles.dateColor}`}>
          {date.day}일
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-2 flex-grow">
        <h3 className="font-semibold text-xl md:text-2xl text-[#121218]">{title}</h3>
        <p className="font-medium text-sm md:text-base text-[#4D5053] leading-relaxed">
          {description}
        </p>
        
        {/* Footer Section */}
        <div className="flex items-center gap-4 mt-2 text-[#4D5053] text-sm">
          <div className="flex items-center gap-2">
            <img src={locationIcon} alt="location icon" className="w-5 h-5 object-contain" />
            <span>{source.text}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={timeIcon} alt="time icon" className="w-5 h-5 object-contain" />
            <span>{time.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard; 