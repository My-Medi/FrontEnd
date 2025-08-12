import { useState } from 'react';
import ExpertIntroSection from '../../components/Expert/Intro/ExpertIntroSection';
import ExpertCategoryFilter from '../../components/Expert/Filter/ExpertCategoryFilter';
import ExpertCard from '../../components/Expert/Card/ExpertCard';
import ExpertCardSkeleton from '../../components/Expert/Card/ExpertCardSkeleton';
import ExpertCategoryPopover from '../../components/Expert/Filter/ExpertCategoryPopover';
import ExpertDetailModal from '../../components/Expert/Modal/ExpertDetailModal';
import Pagination from '../../components/Expert/Intro/Pagination';
import { useExpertListQuery } from '../../hooks/experts/queries/useExpertListQuery';
import { useMatchedExpertsQuery } from '../../hooks/experts/queries/useMatchedExpertsQuery';
import type { Expert } from "../../types/expert/list";
import { getSpecialtyKoreanName, getSpecialtyKeyFromKorean } from "../../types/expert/common";

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
  slogan: (expert as any).introSentence || expert.introduction,
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

  // API 요청용 파라미터 생성
  const getApiParams = () => {
    const params: any = {
      currentPage,
      pageSize: CARDS_PER_PAGE,
    };

    // 팝오버에서 선택된 카테고리들이 있으면 우선 적용
    if (selectedCategories.length > 0) {
      const specialtyKeys = selectedCategories
        .map(category => getSpecialtyKeyFromKorean(category))
        .filter(key => key !== undefined);
      
      if (specialtyKeys.length > 0) {
        params.specialty = specialtyKeys;
      }
    }
    // 팝오버 필터가 없고 메인 카테고리가 전체가 아닌 경우
    else if (selectedCategory !== "전체") {
      const specialtyKey = getSpecialtyKeyFromKorean(selectedCategory);
      if (specialtyKey) {
        params.specialty = specialtyKey;
      }
    }

    return params;
  };

  // API 호출 - 전체 데이터 가져오기
  const { data: expertListData, isLoading, error } = useExpertListQuery(getApiParams());
  
  // 매칭된 전문가 목록 가져오기 (연결 상태 확인용)
  const { data: matchedExpertsData } = useMatchedExpertsQuery();

  // 카테고리 선택 시 필터 및 페이지 초기화
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedCategories([]); // 팝오버 필터 초기화
    setCurrentPage(1); // 페이지도 1페이지로 초기화
  };

  // API에서 받은 데이터를 그대로 사용 (서버 사이드 필터링)
  const displayList: Expert[] = expertListData?.expertSummaryProfileDtoList || [];
  
  // 전문가의 연결 상태 확인
  const getExpertStatus = (expertId: number): 'matched' | 'request' | 'rejected' => {
    if (!matchedExpertsData?.result) return 'rejected';
    
    const matchedExpert = matchedExpertsData.result.find(
      (expert) => expert.expertId === expertId
    );
    
    if (!matchedExpert) return 'rejected';
    
    // API 응답 상태를 ExpertDetailModal 상태로 매핑
    switch (matchedExpert.status) {
      case 'ACCEPTED':
        return 'matched';
      case 'REQUESTED':
        return 'request';
      case 'REJECTED':
      default:
        return 'rejected';
    }
  };
  
  // 디버깅 로그 제거

  // 페이지네이션 로직
  const totalPages = expertListData?.totalPages || 1;
  const pagedList = displayList;
  
  // 실제 데이터가 있는 페이지 수 계산
  // 현재 페이지에 데이터가 없으면 이전 페이지까지만 표시
  const actualTotalPages = pagedList.length === 0 && currentPage > 1 
    ? currentPage - 1 
    : totalPages;


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
          
          {/* 로딩 상태 - 스켈레톤 UI */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6 xl:gap-8 w-full">
              {Array.from({ length: 9 }, (_, index) => (
                <ExpertCardSkeleton key={index} />
              ))}
            </div>
          )}
          
          {/* 에러 상태 */}
          {error && (
            <div className="flex justify-center items-center py-12">
              <div className="text-lg text-red-600">전문가 목록을 불러오는데 실패했습니다.</div>
            </div>
          )}
          
          {/* 카드리스트: 더 안정적인 반응형 그리드 */}
          {!isLoading && !error && pagedList.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6 xl:gap-8 w-full">
              {pagedList.map((expert: Expert) => {
                return (
                  <ExpertCard 
                    key={expert.expertId} 
                    nickname={expert.nickname || ""}
                    realname={expert.name}
                    role={getSpecialtyKoreanName(expert.specialty)}
                    slogan={(expert as any).introSentence || expert.introduction}
                    description={expert.introduction}
                    profile={expert.profile || ""}
                    careers={[]}
                    organizationName={expert.organizationName}
                    careerResponseDtoList={expert.careerResponseDtoList}
                    onClick={() => setSelectedExpert(mapExpertToDetail(expert))} 
                  />
                );
              })}
            </div>
          )}
          
          {/* 데이터가 없을 때 */}
          {!isLoading && !error && pagedList.length === 0 && (
            <div className="flex justify-center items-center py-12">
              <div className="text-lg text-gray-600">해당하는 전문가가 없습니다.</div>
            </div>
          )}
          {/* 페이지네이션 */}
          {!isLoading && !error && actualTotalPages > 1 && (
            <div className="mt-8 xl:mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={actualTotalPages}
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
          expertStatus={getExpertStatus(selectedExpert.expertId)}
          onClose={() => setSelectedExpert(null)}
        />
      )}
    </div>
  );
};

export default ExpertPage;