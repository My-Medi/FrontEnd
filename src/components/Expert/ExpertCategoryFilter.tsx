import React from "react";

interface ExpertCategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

const categories = [
  "전체",
  "웰니스 코치",
  "건강관리사",
  "영양사",
  "운동처방사",
];

const ExpertCategoryFilter: React.FC<ExpertCategoryFilterProps> = ({ selected, onSelect }) => (
  <div className="flex gap-4 w-full justify-center mb-10">
    {categories.map((cat) => (
      <button
        key={cat}
        className={
          selected === cat
            ? "bg-[#82ABFD] text-white font-semibold rounded-full px-8 py-3 shadow transition hover:bg-[#5d8eea]"
            : "bg-white text-[#1D68FF] font-semibold rounded-full px-8 py-3 border border-[#DBE6FF] shadow transition hover:bg-[#e6f0ff]"
        }
        onClick={() => onSelect(cat)}
        type="button"
      >
        {cat}
      </button>
    ))}
  </div>
);

export default ExpertCategoryFilter; 