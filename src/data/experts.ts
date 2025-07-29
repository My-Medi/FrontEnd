export interface Expert {
  nickname: string;
  realname: string;
  role: string;
  slogan: string;
  description: string;
  profile: any;
  careers: string[];
}

const baseExperts: Expert[] = [
  {
    nickname: "매디",
    realname: "류옥순",
    role: "웰니스 코치",
    slogan: "지속 가능한 건강, 함께 만들어봐요.",
    description: "안녕하세요! 여러분의 작은 건강 습관을 함께 만들어갈 영양사 정인수입니다. \n대학병원 영양팀 인턴을 거쳐 현재는 지역 보건소와 건강센터에서 식습관 개선 프로그램을 운영하고 있어요. 누구보다 쉽게, 그러나 정확하게! 식단과 생활습관이 삶에 스며들 수 있도록 도와드리는 것이 저의 목표입니다.\n 특히 당뇨∙고지혈증∙비만 등 만성질환 예방을 위한 식단 설계와, 바쁜 일상 속에서도 실천 가능한 건강 습관 만들기를 중심으로 상담하고 있어요. 단기적인 식단 처방보다, 지속 가능한 건강 루틴을 함께 만들어가요. 작지만 꾸준한 변화가 여러분의 건강을 바꿉니다. 함께 시작해볼까요?",
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
    profile: "",
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
    profile: "",
    careers: [
      "- 운동처방사 자격증 보유",
      "- 피트니스 센터 8년 경력",
      "- 재활운동 전문",
    ],
  },
  {
    nickname: "웰빙닥터",
    realname: "김웰빙",
    role: "건강관리사",
    slogan: "건강한 습관, 건강한 삶!",
    description: "생활습관 개선과 건강관리를 도와드립니다.",
    profile: "",
    careers: [
      "- 건강관리사 자격증 보유",
      "- 보건소 5년 근무",
      "- 만성질환 관리 전문",
    ],
  },
  {
    nickname: "영양쌤",
    realname: "박영양",
    role: "영양사",
    slogan: "맛있고 건강한 식단을 제안합니다.",
    description: "개인별 맞춤 영양상담 및 식단 설계.",
    profile: "",
    careers: [
      "- 영양사 자격증 보유",
      "- 종합병원 3년 근무",
      "- 임상영양 전문",
    ],
  },
];

export const expertList: Expert[] = Array.from({ length: 100 }, (_, i) => {
  const base = baseExperts[i % baseExperts.length];
  return {
    ...base,
    nickname: base.nickname + (i + 1),
    realname: base.realname + (i + 1),
  };
}); 