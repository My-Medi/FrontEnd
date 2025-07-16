import React, { useState } from "react";
import ExpertCard from "../../components/Expert/ExpertCard";
import ExpertIntroSection from "../../components/Expert/ExpertIntroSection";
import ExpertCategoryFilter from "../../components/Expert/ExpertCategoryFilter";
import ExpertCategoryPopover from "../../components/Expert/ExpertCategoryPopover";
import ExpertDetailModal from '../../components/Expert/ExpertDetailModal';
import { expertList } from "../../data/experts";
import type { Expert } from "../../data/experts";
import Pagination from "../../components/Expert/Pagination";

// ExpertDetailModal에 넘길 타입
interface ExpertDetail {
  name: string;
  position: string;
  profileImage?: string;
  slogan: string;
  introduction: string;
  affiliation: string;
  specialty: string;
  career: string;
}

// Expert -> ExpertDetail 변환 함수
const mapExpertToDetail = (expert: Expert): ExpertDetail => ({
  name: expert.nickname,
  position: expert.realname,
  profileImage: typeof expert.profile === 'string' ? expert.profile : '',
  slogan: expert.slogan,
  introduction: expert.description,
  affiliation: '소속 정보 없음',
  specialty: expert.role,
  career: expert.careers.join('\n'),
});

const CARDS_PER_PAGE = 15;

const ExpertPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isChecked, setIsChecked] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedExpert, setSelectedExpert] = useState<ExpertDetail | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 중복 제거 함수 (nickname 기준)
  const getUniqueExperts = (list: Expert[]): Expert[] => {
    const seen = new Set<string>();
    return list.filter((expert: Expert) => {
      if (seen.has(expert.nickname)) return false;
      seen.add(expert.nickname);
      return true;
    });
  };

  // 카테고리와 필터 모두 반영
  const filteredList = expertList.filter(expert => {
    // 카테고리(상단 버튼) 전체 or 일치
    const categoryMatch = selectedCategory === "전체" || expert.role === selectedCategory;
    // 필터(팝오버) 선택이 있을 경우, 해당 카테고리 중 하나라도 포함
    const filterMatch = selectedCategories.length === 0 || selectedCategories.includes(expert.role);
    return categoryMatch && filterMatch;
  });

  const displayList: Expert[] = isChecked ? getUniqueExperts(filteredList) : filteredList;

  // 페이지네이션 로직
  const totalPages = Math.ceil(displayList.length / CARDS_PER_PAGE);
  const pagedList = displayList.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE
  );
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // 페이지 변경 시 스크롤 상단 이동(선택사항)
  // React.useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // }, [currentPage]);

  return (
    <div className="flex flex-col items-center py-12 ">
      <ExpertIntroSection />
      <div className="pb-8 lg:pb-[50px]" />
      <div className="w-full flex flex-col items-center px-4 lg:px-80">
        <div className="w-full mx-auto">
          <ExpertCategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
          <div className="h-[1.5px] bg-[#DBE6FF] w-full max-w-7xl mx-auto mt-3 mb-3" />
          <div className="pb-8">
            <ExpertCategoryPopover 
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          {/* 카드리스트: 한 줄 3개, 5줄(15개)씩 */}
          <div className="flex flex-wrap justify-center gap-[32px] max-w-[1296px] mx-auto">
            {pagedList.map((expert: Expert, idx: number) => (
              <ExpertCard key={idx} {...expert} onClick={() => setSelectedExpert(mapExpertToDetail(expert))} />
            ))}
          </div>
          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
      {selectedExpert && (
        <ExpertDetailModal
          expert={selectedExpert}
          onClose={() => setSelectedExpert(null)}
        />
      )}
    </div>
  );
};

export default ExpertPage;
