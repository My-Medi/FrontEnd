import { useState } from 'react';
import ExpertIntroSection from '../../components/Expert/Intro/ExpertIntroSection';
import ExpertCategoryFilter from '../../components/Expert/Filter/ExpertCategoryFilter';
import ExpertCard from '../../components/Expert/Card/ExpertCard';
import ExpertCategoryPopover from '../../components/Expert/Filter/ExpertCategoryPopover';
import ExpertDetailModal from '../../components/Expert/Modal/ExpertDetailModal';
import Pagination from '../../components/Expert/Intro/Pagination';
import { useExpertListQuery } from '../../hooks/experts/useExpertListQuery';
import type { Expert } from "../../types/expert/list";
import { getSpecialtyKoreanName } from "../../types/expert/common";

// ExpertDetailModal에 넘길 타입
interface ExpertDetail {
  expertId: number;
  name: string;
  position: string;
  nickname: string;
  profileImage?: string;
  slogan: string;
  introduction: string;
  affiliation: string;
  specialty: string;
  career: string;
}

// Expert -> ExpertDetail 변환 함수
const mapExpertToDetail = (expert: Expert): ExpertDetail => ({
  expertId: expert.expertId,
  name: expert.name,
  position: getSpecialtyKoreanName(expert.specialty),
  nickname: expert.nickname || expert.name, // nickname이 null이면 name 사용
  profileImage: expert.profile || '', // profile이 null이면 빈 문자열
  slogan: expert.introduction, // introduction을 slogan으로 사용
  introduction: expert.introduction,
  affiliation: expert.organizationName,
  specialty: getSpecialtyKoreanName(expert.specialty),
  career: '', // API에는 careers 정보가 없으므로 빈 문자열
});

const CARDS_PER_PAGE = 15;

const ExpertPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedExpert, setSelectedExpert] = useState<ExpertDetail | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // API 호출 - 전체 데이터 가져오기
  const { data: expertListData, isLoading, error } = useExpertListQuery({
    currentPage,
    pageSize: CARDS_PER_PAGE,
  });

  // 카테고리 선택 시 필터 및 페이지 초기화
  const handleCategorySelect = (category: string) => {
    console.log('카테고리 선택:', category);
    setSelectedCategory(category);
    setSelectedCategories([]); // 팝오버 필터 초기화
    setCurrentPage(1); // 페이지도 1페이지로 초기화
  };

  // 프론트엔드에서 필터링
  const filteredList = expertListData?.expertSummaryProfileDtoList?.filter(expert => {
    if (selectedCategory === "전체") return true;
    
    // specialty가 undefined이거나 null인 경우 처리
    if (!expert.specialty) {
      console.log('전문분야가 없는 전문가:', {
        expertId: expert.expertId,
        name: expert.name,
        specialty: expert.specialty
      });
      return false; // 전문분야가 없는 전문가는 필터링에서 제외
    }
    
    // 디버깅을 위한 로그 추가
    console.log('필터링 중인 전문가:', {
      expertId: expert.expertId,
      name: expert.name,
      specialty: expert.specialty,
      specialtyKorean: getSpecialtyKoreanName(expert.specialty),
      selectedCategory: selectedCategory
    });
    
    const expertSpecialtyKorean = getSpecialtyKoreanName(expert.specialty);
    const isMatch = expertSpecialtyKorean === selectedCategory;
    
    console.log('매칭 결과:', {
      expertName: expert.name,
      expertSpecialtyKorean,
      selectedCategory,
      isMatch
    });
    
    return isMatch;
  }) || [];

  console.log('필터링 결과:', {
    totalExperts: expertListData?.expertSummaryProfileDtoList?.length || 0,
    filteredCount: filteredList.length,
    selectedCategory,
    filteredList: filteredList.map(expert => ({
      id: expert.expertId,
      name: expert.name,
      specialty: expert.specialty
    }))
  });

  const displayList: Expert[] = filteredList;

  // 페이지네이션 로직
  const totalPages = expertListData?.totalPages || 1;
  const pagedList = displayList;
  // const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // 페이지 변경 시 스크롤 상단 이동(선택사항)
  // React.useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // }, [currentPage]);

  return (
    <div className="flex flex-col items-center py-8 xl:py-12">
      <ExpertIntroSection />
      <div className="pb-6 xl:pb-[3.1rem]" />
      <div className="w-full flex flex-col items-center px-4 sm:px-6 xl:px-8 xl:px-12 max-w-[87.5rem] mx-auto">
        <div className="w-full">
          <ExpertCategoryFilter selected={selectedCategory} onSelect={handleCategorySelect} />
          <div className="h-[0.1rem] bg-[#DBE6FF] w-full mx-auto mt-4 mb-4" />
          {/* 필터링 버튼은 전체 카테고리에서만 표시 */}
          {selectedCategory === "전체" && (
            <div className="pb-6 xl:pb-8">
              <ExpertCategoryPopover 
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
            </div>
          )}
          
          {/* 로딩 상태 */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="text-lg text-gray-600">전문가 목록을 불러오는 중...</div>
            </div>
          )}
          
          {/* 에러 상태 */}
          {error && (
            <div className="flex justify-center items-center py-12">
              <div className="text-lg text-red-600">전문가 목록을 불러오는데 실패했습니다.</div>
            </div>
          )}
          
          {/* 카드리스트: 더 안정적인 반응형 그리드 */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6 xl:gap-8 w-full">
                          {pagedList.map((expert: Expert) => {
              return (
                <ExpertCard 
                  key={expert.expertId} 
                  nickname={expert.nickname || ""}
                  realname={expert.name}
                  role={getSpecialtyKoreanName(expert.specialty)}
                  slogan={expert.introduction}
                  description={expert.introduction}
                  profile={expert.profile || ""}
                  careers={[]}
                  organizationName={expert.organizationName}
                  onClick={() => setSelectedExpert(mapExpertToDetail(expert))} 
                />
              );
            })}
            </div>
          )}
          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="mt-8 xl:mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  // 페이지 변경 시 스크롤 상단으로 이동
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          )}
        </div>
      </div>
      {selectedExpert && (
        <ExpertDetailModal
          expertId={selectedExpert.expertId}
          expertStatus="rejected" // 기본값으로 rejected 설정 (요청 가능한 상태)
          onClose={() => setSelectedExpert(null)}
        />
      )}
    </div>
  );
};

export default ExpertPage;