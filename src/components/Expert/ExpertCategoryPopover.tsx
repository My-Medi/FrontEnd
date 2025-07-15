import React from "react";
import categoryIcon from "../../assets/Expert/category.svg";

const allCategories = ["웰니스 코치", "건강관리사", "영양사", "운동처방사"];

const CategoryChip = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
  <div
    className="flex items-center bg-white border"
    style={{
      borderColor: "#C5C8CB",
      borderRadius: "45px",
      borderWidth: "1.5px",
      gap: "7.5px",
      padding: "9px 22.5px 9px 30px",
      height: "30px",
      fontFamily: "Pretendard, sans-serif",
      fontWeight: 300,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "22px",
      letterSpacing: "-0.03em",
      textAlign: "center",
      color: "#4D5053",
      marginRight: "7.5px",
      marginBottom: 0,
    }}
  >
    {label}
    <button
      onClick={onRemove}
      className="ml-2 flex items-center"
      style={{
        color: "#9DA0A3",
        fontWeight: 700,
        fontSize: "18px",
        lineHeight: 1,
      }}
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
    <div className="relative flex items-center" style={{ minHeight: "38px" }}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center justify-center bg-white border border-[#C5C8CB] mr-2"
        style={{
          gap: "7.5px",
          borderRadius: "45px",
          borderWidth: "1.5px",
          padding: "3px 25px",
          opacity: 1,
        }}
      >
        {/* 필터 아이콘 */}
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
              className="ml-auto text-2xl text-gray-400 hover:text-blue-500 transition-colors"
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
                className={`inline-flex items-center border border-gray-300 rounded-full px-[15px] py-1 gap-2 font-pretendard font-light text-xs leading-[22px] tracking-[-0.03em] text-center ${selectedCategories.includes(cat) ? 'bg-gray-100' : 'bg-white'}`}
                style={{ color: '#4D5053', width: 'auto', minWidth: 0 }}
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