import React, { useState } from "react";
import ExpertCard from "../../components/Expert/ExpertCard";
import ExpertIntroSection from "../../components/Expert/ExpertIntroSection";
import ExpertCategoryFilter from "../../components/Expert/ExpertCategoryFilter";

const expertList = [
  {
    nickname: "보람핏",
    realname: "류옥순",
    role: "웰니스 코치",
    slogan: "지속 가능한 건강, 함께 만들어봐요.",
    description: "개인의 상황에 맞는 맞춤형 플랜을 제안합니다.",
    profile: "", // 빈 문자열: 기본 이미지
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

const ExpertPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const filteredList = selectedCategory === "전체"
    ? expertList
    : expertList.filter(expert => expert.role === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col items-center py-12">
      <ExpertIntroSection />
      <div className="w-full flex justify-end pr-80 mb-10">
        <button
          className="
            bg-[#82ABFD] text-white text-base font-semibold
            rounded-[10.5px] px-6 py-2.5 shadow
            hover:bg-[#5d8eea] transition
          "
        >
          건강검진 결과로 추천받기
        </button>
      </div>
      <ExpertCategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {filteredList.map((expert, idx) => (
          <ExpertCard key={idx} {...expert} />
        ))}
      </div>
    </div>
  );
};

export default ExpertPage;
