export interface MatchedExpert {
  id: string;
  name: string;
  realName: string;
  position: string;
  startDate: string;
  description: string;
  phone: string;
  profileImage?: string;
  isAddCard?: boolean;
  status?: 'request' | 'matched' | 'rejected'; // 요청, 매칭, 거절 상태
  career?: string; // 경력사항 추가
}

export const matchedExpertsData: MatchedExpert[] = [
  {
    id: '1',
    name: '진호헬퍼',
    realName: '정희정',
    position: '영양사',
    startDate: '2023. 08. 23.',
    description: '작은 습관의 변화로 큰 건강을 얻을 수 있어요.',
    phone: '010-9238-0044',
    status: 'matched',
    career: '• 서울대학교 식품영양학과 졸업\n• 삼성서울병원 임상영양사 (2018-2021)\n• 세브란스병원 영양과 과장 (2021-2023)\n• 대한영양사협회 정회원\n• 임상영양 및 영양상담 전문\n• 만성질환 영양관리 전문가'
  },
  {
    id: '2',
    name: '주연코치',
    realName: '이주연',
    position: '웰니스 코치',
    startDate: '2024. 11. 24.',
    description: '꾸준한 실천을 통해 건강한 변화를 ',
    phone: '010-9238-0033',
    status: 'request',
    career: '• 연세대학교 스포츠의학과 졸업\n• 국민체육진흥공단 웰니스센터 코치 (2019-2022)\n• 서울시체육회 웰니스 프로그램 총괄 (2022-2024)\n• 대한체육학회 정회원\n• 스포츠의학 및 운동처방 전문\n• 웰니스 라이프스타일 코칭 전문가'
  },
  {
    id: '3',
    name: '창훈핏',
    realName: '김창훈',
    position: '운동처방사',
    startDate: '2024. 10. 26.',
    description: '바쁜 일상 속 건강을 지키는 방법을 함께 ',
    phone: '010-9238-0022',
    status: 'matched',
    career: '• 경희대학교 체육학과 졸업\n• 강남구청 체육센터 운동처방사 (2020-2023)\n• 서울시민체육센터 운동처방과장 (2023-2024)\n• 대한운동처방사협회 정회원\n• 운동처방 및 재활운동 전문\n• 노인운동 및 만성질환 운동처방 전문가'
  },
  {
    id: '4',
    name: '다혜쌤',
    realName: '박다혜',
    position: '영양사',
    startDate: '2023. 08. 23.',
    description: '바쁜 일상 속 건강을 지키는 방법을 함께',
    phone: '010-9238-0011',
    status: 'rejected',
    career: '• 고려대학교 식품영양학과 졸업\n• 아산병원 임상영양사 (2017-2020)\n• 분당차병원 영양과 과장 (2020-2023)\n• 대한영양사협회 정회원\n• 임상영양 및 영양교육 전문\n• 소아영양 및 성장발달 영양관리 전문가'
  },
  {
    id: '5',
    name: '다은닥터',
    realName: '홍다은',
    position: '웰니스 코치',
    startDate: '2024. 11. 24.',
    description: '몸과 마음의 균형을 위한 웰니스 관리를',
    phone: '010-9238-0022',
    status: 'matched',
    career: '• 성균관대학교 스포츠과학과 졸업\n• 롯데월드타워 웰니스센터 코치 (2018-2021)\n• 코엑스몰 웰니스센터 총괄코치 (2021-2024)\n• 대한스포츠의학회 정회원\n• 웰니스 코칭 및 라이프스타일 관리 전문\n• 스트레스 관리 및 정신건강 전문가'
  }
];

// 마지막 카드용 데이터 (플러스 아이콘 카드)
export const addExpertCard: MatchedExpert = {
  id: 'add',
  name: '',
  realName: '',
  position: '',
  startDate: '',
  description: '',
  phone: '',
  isAddCard: true
}; 