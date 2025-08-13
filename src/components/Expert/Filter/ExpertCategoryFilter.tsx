import React from "react";
import { getSpecialtyKoreanName } from '../../../types/expert/common';

interface ExpertCategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

const categories = [
  { label: "전체", value: "전체" },
  { label: `${getSpecialtyKoreanName('WELLNESS_COACH')}(정신건강)`, value: getSpecialtyKoreanName('WELLNESS_COACH') },
  { label: getSpecialtyKoreanName('HEALTH_MANAGER'), value: getSpecialtyKoreanName('HEALTH_MANAGER') },
  { label: getSpecialtyKoreanName('NUTRITIONIST'), value: getSpecialtyKoreanName('NUTRITIONIST') },
  { label: getSpecialtyKoreanName('EXERCISE_THERAPIST'), value: getSpecialtyKoreanName('EXERCISE_THERAPIST') },
];

const ExpertCategoryFilter: React.FC<ExpertCategoryFilterProps> = ({ selected, onSelect }) => (
  <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-3 lg:gap-[18px] w-full">
    {categories.map((cat) => (
      <button
        key={cat.value}
        className={
          selected === cat.value
            ? "bg-[#1D68FF] text-white rounded-full px-[4.5rem] py-[0.7rem] border border-[#1D68FF] shadow transition whitespace-nowrap text-lg font-medium font-pretendard leading-9 tracking-[-0.03em] text-center"
            : "bg-white text-[#25282B] rounded-full px-[4.5rem] py-[0.7rem] border border-[#DBE6FF] shadow transition whitespace-nowrap text-lg font-medium font-pretendard leading-9 tracking-[-0.03em] text-center"
        }
        onClick={() => onSelect(cat.value)}
        type="button"
      >
        {cat.label}
      </button>
    ))}
  </div>
);

export default ExpertCategoryFilter; 