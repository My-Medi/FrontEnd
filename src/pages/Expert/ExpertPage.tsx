import React, { useState, useMemo } from 'react';
import ExpertIntroSection from '../../components/Expert/Intro/ExpertIntroSection';
import ExpertCategoryFilter from '../../components/Expert/Filter/ExpertCategoryFilter';
import ExpertCard from '../../components/Expert/Card/ExpertCard';
import ExpertCategoryPopover from '../../components/Expert/Filter/ExpertCategoryPopover';
import ExpertDetailModal from '../../components/Expert/Modal/ExpertDetailModal';
import Pagination from '../../components/Expert/Intro/Pagination';
import { useExpertListQuery } from '../../hooks/experts/useExpertListQuery';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import type { ExpertSummaryProfile } from '../../types/expert';

// ExpertDetailModal에 넘길 타입
interface ExpertDetail {
  name: string;
  position: string;
  realName: string;
  profileImage?: string;
  slogan: string;
  introduction: string;
  affiliation: string;
  specialty: string;
  career: string;
}

// ExpertSummaryProfile -> ExpertDetail 변환 함수
const mapExpertToDetail = (expert: ExpertSummaryProfile): ExpertDetail => ({
  name: expert.nickname || expert.name,
  position: expert.specialty,
  realName: expert.name,
  profileImage: '',
  slogan: '전문가 슬로건',
  introduction: expert.introduction,
  affiliation: expert.organizationName,
  specialty: expert.specialty,
  career: '전문가 경력 정보',
});

const CARDS_PER_PAGE = 15;

const ExpertPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isChecked, setIsChecked] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedExpert, setSelectedExpert] = useState<ExpertDetail | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // API로 전문가 목록 조회
  const { data: expertListData, isLoading, error } = useExpertListQuery({
    currentPage: currentPage,
    pageSize: CARDS_PER_PAGE
  });

  // API 데이터가 없을 때 기본값
  const expertList = expertListData?.expertSummaryProfileDtoList || [];
  const totalPages = expertListData?.totalPages || 1;

  // API 데이터 로깅 (디버깅용)
  console.log('ExpertPage - 전문가 목록 데이터:', expertListData);
  console.log('ExpertPage - 전문가 리스트:', expertList);
  console.log('ExpertPage - 총 페이지 수:', totalPages);
  console.log('ExpertPage - 현재 페이지:', currentPage);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 페이지 변경 시 스크롤 상단으로 이동
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  // 에러 발생 시
  if (error) {
    return (
      <div className="text-red-500 text-center">
        전문가 목록을 불러오는데 실패했습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-8 xl:py-12">
      <ExpertIntroSection />
      <div className="pb-6 xl:pb-[3.1rem]" />
      <div className="w-full flex flex-col items-center px-4 sm:px-6 xl:px-8 xl:px-12 max-w-[87.5rem] mx-auto">
        <div className="w-full">
          <ExpertCategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
          <div className="h-[0.1rem] bg-[#DBE6FF] w-full mx-auto mt-4 mb-4" />
          <div className="pb-6 xl:pb-8">
            <ExpertCategoryPopover 
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          {/* 카드리스트: 더 안정적인 반응형 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6 xl:gap-8 w-full">
            {expertList.map((expert: ExpertSummaryProfile, idx: number) => (
              <ExpertCard key={expert.expertId} {...expert} onClick={() => setSelectedExpert(mapExpertToDetail(expert))} />
            ))}
          </div>
          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="mt-8 xl:mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
      {selectedExpert && (
        <ExpertDetailModal
          expert={selectedExpert}
          expertStatus="rejected" // 기본값으로 rejected 설정 (요청 가능한 상태)
          onClose={() => setSelectedExpert(null)}
        />
      )}
    </div>
  );
};

export default ExpertPage;
