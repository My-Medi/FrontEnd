import React from "react";
import categoryIcon from "../../assets/Expert/category.svg";

const allCategories = ["웰니스 코치", "건강관리사", "영양사", "운동처방사"];

const CategoryChip = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
  <div
    className="flex items-center bg-white border border-[#C5C8CB] rounded-full h-[30px] px-[22.5px] pl-[30px] py-[9px] mr-[7.5px] text-[16px] font-light leading-[22px] tracking-[-0.03em] text-[#4D5053]"
    style={{ borderWidth: '1.5px' }}
  >
    {label}
    <button
      onClick={onRemove}
      className="ml-2 text-[18px] font-bold leading-none text-[#9DA0A3] flex items-center"
      type="button"
    >
      ×
    </button>
  </div>
);

interface ExpertCategoryPopoverProps {
  selectedCategories: string[];
  setSelectedCategories: (cats: string[]) => void;
}

const ExpertCategoryPopover: React.FC<ExpertCategoryPopoverProps> = ({ selectedCategories, setSelectedCategories }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(
      selectedCategories.includes(cat)
        ? selectedCategories.filter((c) => c !== cat)
        : [...selectedCategories, cat]
    );
  };
  const removeCategory = (cat: string) => setSelectedCategories(selectedCategories.filter((c) => c !== cat));
  const closePopover = () => setIsOpen(false);

  return (
    <div className="relative flex items-center min-h-[38px]">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex justify-center items-center bg-white border border-[#C5C8CB] rounded-full h-[30px] px-[28px] py-[9px] mr-[7.5px] gap-[7.5px]"
        style={{ borderWidth: '1.5px' }}
        type="button"
      >
        <img src={categoryIcon} alt="카테고리 필터" className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      {selectedCategories.map((cat) => (
        <CategoryChip key={cat} label={cat} onRemove={() => removeCategory(cat)} />
      ))}
      {isOpen && (
        <div className="absolute left-0 top-12 z-10 bg-white border border-gray-300 rounded-xl shadow-lg min-w-[280px] p-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedCategories.map((cat) => (
              <CategoryChip key={cat} label={cat} onRemove={() => removeCategory(cat)} />
            ))}
            <button
              onClick={closePopover}
              className="ml-auto text-[22px] text-gray-400 hover:text-blue-500 transition-colors font-bold leading-none"
              type="button"
            >
              ×
            </button>
          </div>
          <hr className="border-gray-200 my-2" />
          <div className="flex flex-col gap-2 items-start">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`inline-flex items-center border border-[#C5C8CB] rounded-full px-[15px] py-1 gap-2 text-[16px] font-light leading-[22px] tracking-[-0.03em] text-[#4D5053] ${selectedCategories.includes(cat) ? 'bg-gray-100' : 'bg-white'}`}
                style={{ borderWidth: '1.5px' }}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertCategoryPopover; 