import React, { useState } from "react";
import ExpertCard from "../../components/Expert/ExpertCard";
import ExpertIntroSection from "../../components/Expert/ExpertIntroSection";
import ExpertCategoryFilter from "../../components/Expert/ExpertCategoryFilter";
import ExpertCategoryPopover from "../../components/Expert/ExpertCategoryPopover";
import ExpertDetailModal from '../../components/Expert/ExpertDetailModal';

// Expert 타입 정의
interface Expert {
  nickname: string;
  realname: string;
  role: string;
  slogan: string;
  description: string;
  profile: any;
  careers: string[];
}

const expertList: Expert[] = [
  {
    nickname: "보람핏",
    realname: "류옥순",
    role: "웰니스 코치",
    slogan: "지속 가능한 건강, 함께 만들어봐요.",
    description: "개인의 상황에 맞는 맞춤형 플랜을 제안합니다.",
    profile: "", 
    careers: [
      "-웰니스 코치 자격증 보유",
      "-김신 근무 경력 2년",
      "i-nventore 분야 전문",
    ],
  },
  {
    nickname: "진호헬퍼",
    realname: "정희정",
    role: "운동처방사",
    slogan: "오늘부터 건강한 변화, 함께 시작해요.",
    description: "작은 습관의 변화로 큰 건강을 얻을 수 있어요.",
    profile: <img src="/profile2.png" alt="프로필" className="w-24 h-24 rounded-full" />, // 예시
    careers: [
      "- 운동처방사 자격증 보유",
      "- 백서 트레이닝센터 근무 경력 6년",
      "- e-xercitationem 분야 전문",
    ],
  },
  {
    nickname: "주연코치",
    realname: "이주연",
    role: "운동처방사",
    slogan: "꾸준한 실천을 통해 건강한 변화를 만들어요!",
    description: "맞춤형 운동으로 건강을 지켜드릴게요.",
    profile: "", // 실제 이미지 경로 예시
    careers: [
      "- 운동처방사 자격증 보유",
      "- 피트니스 센터 8년 경력",
      "- 재활운동 전문",
    ],
  },
];

const sampleExpert = {
  name: '매디',
  position: '정민수 영양사',
  profileImage: '', // 실제 이미지 경로가 있다면 입력
  slogan: '매일 1%의 건강을 쌓아가요.',
  introduction:
    '안녕하세요! 여러분의 작은 건강 습관을 함께 만들어갈 영양사 정인수입니다.\n대학병원 영양팀 인턴을 거쳐 현재는 지역 보건소와 건강센터에서 식습관 개선 프로그램을 운영하고 있어요. 누구보다 쉽게, 그러나 정확하게! 식단과 생활습관이 삶에 스며들 수 있도록 도와드리는 것이 저의 목표입니다. 특히 당뇨∙고지혈증∙비만 등 만성질환 예방을 위한 식단 설계와, 바쁜 일상 속에서도 실천 가능한 건강 습관 만들기를 중심으로 상담하고 있어요.\n단기적인 식단 처방보다, 지속 가능한 건강 루틴을 함께 만들어가요.\n작지만 꾸준한 변화가 여러분의 건강을 바꿉니다. 함께 시작해볼까요?',
  affiliation: '한국 영양사 협회',
  specialty: '영양사',
  career: '- 건강관리사 인증\n- 지역보건소 4년 경력\n- 만성질환 맞춤 관리',
};

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

const ExpertPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isChecked, setIsChecked] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedExpert, setSelectedExpert] = useState<ExpertDetail | null>(null);

  // 중복 제거 함수 (nickname 기준)
  const getUniqueExperts = (list: Expert[]): Expert[] => {
    const seen = new Set<string>();
    return list.filter((expert: Expert) => {
      if (seen.has(expert.nickname)) return false;
      seen.add(expert.nickname);
      return true;
    });
  };

  const filteredList = selectedCategory === "전체"
    ? expertList
    : expertList.filter(expert => expert.role === selectedCategory);

  const displayList: Expert[] = isChecked ? getUniqueExperts(filteredList) : filteredList;

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
          <div className="flex flex-wrap justify-center gap-[32px] max-w-[1296px] mx-auto">
            {displayList.map((expert: Expert, idx: number) => (
              <ExpertCard key={idx} {...expert} onClick={() => setSelectedExpert(mapExpertToDetail(expert))} />
            ))}
          </div>
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
