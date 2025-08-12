
import React from 'react';

interface ExpertDetailSkeletonProps {
  onClose?: () => void;
}

const ExpertDetailSkeleton: React.FC<ExpertDetailSkeletonProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121218]/40" onClick={onClose}>
      <div
        className="relative bg-white/96 rounded-[40px] w-[744px] min-h-[500px] max-h-[90vh] flex flex-col overflow-hidden p-6 animate-pulse"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow:
            '0px 2px 20px rgba(144, 181, 255, 0.5), inset 0px -4px 6px rgba(255, 255, 255, 0.25), inset 0px 4px 8px #FFFFFF',
        }}
      >
        {/* 상단 스켈레톤: 타이틀/부제 */}
        <div className="w-full flex flex-col items-center gap-2 mb-6">
          <div className="h-4 w-32 bg-[#EDF0F3] rounded" />
          <div className="h-6 w-64 bg-[#EDF0F3] rounded" />
        </div>

        {/* 아바타 스켈레톤 */}
        <div className="w-full flex justify-center mb-6">
          <div className="w-[203px] h-[203px] rounded-full bg-[#EDF0F3] border-[6px] border-[#DBE6FF]" />
        </div>

        <div className="w-full flex flex-col gap-6 px-6">
          {/* 슬로건 스켈레톤 */}
          <div className="w-full flex justify-center">
            <div className="h-5 w-3/4 bg-[#EDF0F3] rounded" />
          </div>

          {/* 전화번호/요청문구 영역 스켈레톤 */}
          <div className="w-full flex justify-center">
            <div className="h-5 w-1/3 bg-[#EDF0F3] rounded" />
          </div>

          {/* "전문가 소개" 섹션 타이틀 + 본문 스켈레톤 */}
          <div className="w-full">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-5 h-5 bg-[#DBE6FF] rounded-md" />
              <div className="h-5 w-28 bg-[#EDF0F3] rounded" />
            </div>
            <div className="space-y-2 pl-9">
              <div className="h-4 w-full bg-[#EDF0F3] rounded" />
              <div className="h-4 w-11/12 bg-[#EDF0F3] rounded" />
              <div className="h-4 w-10/12 bg-[#EDF0F3] rounded" />
            </div>
          </div>

          {/* 소속/전문분야 두 칼럼 스켈레톤 */}
          <div className="w-full grid grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-5 h-5 bg-[#DBE6FF] rounded-md" />
                <div className="h-5 w-14 bg-[#EDF0F3] rounded" />
              </div>
              <div className="h-4 w-10/12 bg-[#EDF0F3] rounded ml-9" />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-5 h-5 bg-[#DBE6FF] rounded-md" />
                <div className="h-5 w-20 bg-[#EDF0F3] rounded" />
              </div>
              <div className="h-4 w-8/12 bg-[#EDF0F3] rounded ml-9" />
            </div>
          </div>

          {/* 경력사항 리스트 스켈레톤 */}
          <div className="w-full">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-5 h-5 bg-[#DBE6FF] rounded-md" />
              <div className="h-5 w-20 bg-[#EDF0F3] rounded" />
            </div>
            <div className="space-y-2 pl-9">
              <div className="h-4 w-9/12 bg-[#EDF0F3] rounded" />
              <div className="h-4 w-7/12 bg-[#EDF0F3] rounded" />
              <div className="h-4 w-5/12 bg-[#EDF0F3] rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetailSkeleton;


