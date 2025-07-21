import React, { useState } from 'react';

interface RoundSelectorProps {
  rounds: number[];
  currentRound: number;
  onAddRound: () => void;
  onSelectRound: (round: number) => void;
}

const RoundSelector: React.FC<RoundSelectorProps> = ({ rounds, currentRound, onAddRound, onSelectRound }) => {
  const [showList, setShowList] = useState(false);
  const prevRound = rounds.includes(currentRound - 1) ? currentRound - 1 : null;

  return (
    <div className="flex items-center gap-2">
      {/* + 버튼 (맨 앞) */}
      <button
        type="button"
        className="px-4 py-1 rounded-full text-sm font-medium border transition-all duration-150 bg-white text-gray-500 border-[#DBE6FF] hover:border-[#82ABFD] hover:shadow"
        onClick={onAddRound}
        aria-label="회차 추가"
      >
        + NEW
      </button>
      {/* 3개 이상이면 이전회차/현재회차/햄버거, 2개 이하면 모든 회차 */}
      {rounds.length > 2 ? (
        <>
          {prevRound && (
            <button
              type="button"
              className={`px-4 py-1 rounded-full text-sm font-medium border transition-all duration-150 bg-white text-gray-500 border-[#DBE6FF] hover:border-[#82ABFD] hover:shadow`}
              onClick={() => onSelectRound(prevRound)}
            >
              {prevRound}회차
            </button>
          )}
          <button
            type="button"
            className={`px-4 py-1 rounded-full text-sm font-medium border transition-all duration-150 bg-[#82ABFD] text-white border-blue-500 shadow`}
            disabled
          >
            {currentRound}회차
          </button>
          <div className="relative inline-block">
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 border border-gray-200 ml-2"
              onClick={() => setShowList((v) => !v)}
              aria-label="이전 회차 보기"
            >
              <span className="text-xl">≡</span>
            </button>
            {showList && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white border rounded shadow z-20 min-w-[100px]">
                {rounds.map((r) => (
                  <button
                    key={r}
                    type="button"
                    className={`block w-full text-left px-4 py-2 hover:bg-blue-50 ${currentRound === r ? 'font-bold text-blue-600' : ''}`}
                    onClick={() => { onSelectRound(r); setShowList(false); }}
                  >
                    {r}회차
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex gap-2">
          {rounds.map((r) => (
            <button
              key={r}
              type="button"
              className={`px-4 py-1 rounded-full text-sm font-medium border transition-all duration-150 ${currentRound === r ? 'bg-[#82ABFD] text-white border-blue-500 shadow' : 'bg-white text-gray-500 border-blue-200 hover:border-blue-400 hover:shadow'}`}
              onClick={() => onSelectRound(r)}
            >
              {r}회차
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoundSelector; 