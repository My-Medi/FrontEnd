import React from "react";
import categoryIcon from '../../../assets/Expert/category.svg';
import closeIcon from '../../../assets/Expert/close.svg';
import { getSpecialtyKoreanName } from '../../../types/expert/common';

const allCategories = [
  getSpecialtyKoreanName('WELLNESS_COACH'),
  getSpecialtyKoreanName('HEALTH_MANAGER'),
  getSpecialtyKoreanName('NUTRITIONIST'),
  getSpecialtyKoreanName('EXERCISE_THERAPIST')
];

const CategoryChip = ({ label, onRemove, isOutside = false }: { label: string; onRemove: () => void; isOutside?: boolean }) => (
  <div
    className={`font-light flex items-center rounded-full mr-[7.5px] leading-[22px] tracking-[-0.03em] text-center ${
      isOutside ? 'border-[1.5px] border-[#C5C8CB] h-[30px] px-[30px] py-3 text-[16px]' : 'border border-[#C5C8CB] px-[15px] text-[12px]'
    }`}
  >
    {label}
    <button
      onClick={onRemove}
      className="pl-2 flex items-center"
      type="button"
    >
      <img src={closeIcon} alt="닫기" className={isOutside ? "w-3 h-3" : "w-2 h-2"} />
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
        className="flex justify-center items-center bg-white border border-[#C5C8CB] rounded-full h-[30px] px-[30px] py-3 mr-[7.5px] gap-[7.5px]"
        style={{ borderWidth: '1.5px' }}
        type="button"
      >
        <img src={categoryIcon} alt="카테고리 필터" className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      {selectedCategories.map((cat) => (
        <CategoryChip key={cat} label={cat} onRemove={() => removeCategory(cat)} isOutside={true} />
      ))}
      {isOpen && (
        <div className="absolute left-0 top-12 z-10 bg-white border border-gray-300 rounded-xl shadow-lg min-w-[280px] p-4">
          {/* 상단 영역 - 닫기 버튼과 선택된 카테고리들 */}
          <div className="flex justify-between items-start mb-2">
            {/* 선택된 카테고리 칩들 */}
            <div className="flex flex-wrap flex-1 mt-6">
              {selectedCategories.map((cat) => (
                <CategoryChip key={cat} label={cat} onRemove={() => removeCategory(cat)} isOutside={false} />
              ))}
            </div>
            {/* 닫기 버튼 */}
            <button
              onClick={closePopover}
              className="ml-2 text-[22px] text-gray-400 hover:text-blue-500 transition-colors font-bold leading-none flex-shrink-0"
              type="button"
            >
              <img src={closeIcon} alt="닫기" className="w-5 h-5" />
            </button>
          </div>
          <hr className="border-gray-200 my-2" />
          <div className="flex flex-col gap-2 items-start">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`inline-flex items-center border border-[#C5C8CB] rounded-full px-[15px] gap-2 text-[12px] font-light leading-[22px] tracking-[-0.03em] text-[#4D5053] text-center ${selectedCategories.includes(cat) ? 'bg-gray-100' : 'bg-white'}`}
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