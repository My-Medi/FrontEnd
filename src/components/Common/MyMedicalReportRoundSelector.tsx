import React, { useState } from 'react';
import FilterIcon from '/src/assets/MyMedicalReport/filter.svg';

interface RoundSelectorProps {
  rounds: number[];
  selectedRound: number;
  onRoundChange: (round: number) => void;
  onAddRound: () => void;
  onFilterClick: () => void;
}

const MyMedicalReportRoundSelector: React.FC<RoundSelectorProps> = ({
  rounds,
  selectedRound,
  onRoundChange,
  onAddRound,
  onFilterClick,
}) => {
  const shouldDisplayRoundSection = () => {
    return Array.isArray(rounds) && rounds.length > 0 && rounds.some((round) => round > 0);
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    onFilterClick();
  };

  if (!shouldDisplayRoundSection()) return null;

  // 항상 선택된 회차가 표시되도록 가시 목록 계산
  const visibleRounds = (() => {
    if (!Array.isArray(rounds) || rounds.length === 0) return [] as number[];
    if (rounds.length <= 2) return [...rounds].reverse();
    const selectedIndex = rounds.indexOf(selectedRound);
    if (selectedIndex !== -1) {
      const neighbor = selectedIndex > 0 ? rounds[selectedIndex - 1] : rounds[selectedIndex + 1];
      const pair = neighbor != null ? [selectedRound, neighbor] : [selectedRound];
      // 좌측이 더 최근(큰 숫자), 우측이 과거(작은 숫자)가 되도록 정렬
      return pair.sort((a, b) => b - a);
    }
    return [...rounds.slice(-2)].reverse();
  })();

  return (
    <div className='flex mt-[10px] items-center gap-2 relative'>
      <button
        onClick={onAddRound}
        className='flex h-10 px-[30px] justify-center items-center gap-[10px] text-[#25282B] bg-white text-[16px] font-medium leading-[36px] tracking-[-0.48px] border border-[#D9D9D9] rounded-full'
      >
        + NEW
      </button>

      {visibleRounds.map((round) => (
        <button
          key={round}
          onClick={() => onRoundChange(round)}
          className={`flex h-10 px-[30px] justify-center items-center gap-[10px] rounded-full border text-[16px] font-semibold leading-[22px] tracking-[-0.48px] ${
            selectedRound === round
              ? 'bg-[#82ABFD] border-[#82ABFD] text-white'
              : 'bg-white border-[#D9D9D9] text-[#25282B]'
          }`}
        >
          {round}회차
        </button>
      ))}

      <div className='relative'>
        <img
          src={FilterIcon}
          width={88}
          height={40}
          onClick={toggleFilter}
          className='cursor-pointer ml-2 mr-[-10px]'
          alt='필터'
        />
        {isFilterOpen && (
          <div className='absolute top-[45px] right-0 z-50 bg-white shadow-lg rounded-md py-2 px-4 max-h-[250px] overflow-y-auto border border-gray-200'>
            {rounds.map((round) => (
              <div
                key={round}
                onClick={() => {
                  onRoundChange(round);
                  setIsFilterOpen(false);
                }}
                className='text-[#121218] text-sm py-1 hover:bg-gray-100 cursor-pointer text-center'
              >
                {round}회차
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMedicalReportRoundSelector;


