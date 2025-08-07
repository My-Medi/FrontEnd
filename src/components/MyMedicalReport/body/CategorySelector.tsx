import React from 'react';
import clsx from 'clsx';
import { CATEGORY_LIST } from '../../../constants/medicalCategory';
import type { Category } from '../../../constants/medicalCategory';
interface CategorySelectorProps {
  selected: string;
  onSelect: (category: Category) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selected, onSelect }) => {
  return (
    <div>
      <div className='inline-flex items-center gap-4' style={{ width: '951px', height: '60px' }}>
        {CATEGORY_LIST.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={clsx(
              'flex justify-center items-center px-[19.2px] py-[12px] gap-[6px] h-[46px] rounded-full text-[20px] leading-[36px] tracking-[-0.6px] font-pretendard',
              category === selected
                ? 'bg-[#1D68FF] border border-[#82ABFD] text-[#FFF] font-semibold'
                : 'text-[#121218] font-normal',
            )}
          >
            {category}
          </button>
        ))}
      </div>
      <div
        className='mt-4'
        style={{
          width: '1026px',
          height: '0px',
          borderBottom: '1px solid #DBE6FF',
        }}
      />
    </div>
  );
};

export default CategorySelector;
