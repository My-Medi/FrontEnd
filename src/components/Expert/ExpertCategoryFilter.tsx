import React from "react";

interface ExpertCategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

const categories = [
  { label: "전체", value: "전체" },
  { label: "웰니스 코치(정신건강)", value: "웰니스 코치" },
  { label: "건강관리사", value: "건강관리사" },
  { label: "영양사", value: "영양사" },
  { label: "운동처방사", value: "운동처방사" },
];

const ExpertCategoryFilter: React.FC<ExpertCategoryFilterProps> = ({ selected, onSelect }) => (
  <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-3 lg:gap-[18px] w-full">
    {categories.map((cat) => (
      <button
        key={cat.value}
        className={
          selected === cat.value
            ? "bg-[#1D68FF] text-white rounded-full px-[4.5rem] py-[0.7rem] border border-[#1D68FF] shadow transition whitespace-nowrap text-lg"
            : "bg-white text-[#25282B] rounded-full px-[4.5rem] py-[0.7rem] border border-[#DBE6FF] shadow transition whitespace-nowrap text-lg"
        }
        style={{
          fontFamily: "Pretendard, sans-serif",
          fontWeight: 400,
          fontStyle: "normal",
          textAlign: "center",
        }}
        onClick={() => onSelect(cat.value)}
        type="button"
      >
        {cat.label}
      </button>
    ))}
  </div>
);

export default ExpertCategoryFilter; 