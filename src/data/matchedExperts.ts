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
}

export const matchedExpertsData: MatchedExpert[] = [
  {
    id: '1',
    name: '진호헬퍼',
    realName: '정희정',
    position: '영양사',
    startDate: '2023. 08. 23.',
    description: '작은 습관의 변화로 큰 건강을 얻을 수 .',
    phone: '010-9238-0044',
    status: 'matched'
  },
  {
    id: '2',
    name: '주연코치',
    realName: '이주연',
    position: '웰니스 코치',
    startDate: '2024. 11. 24.',
    description: '꾸준한 실천을 통해 건강한 변화를 ',
    phone: '010-9238-0033',
    status: 'request'
  },
  {
    id: '3',
    name: '창훈핏',
    realName: '김창훈',
    position: '운동처방사',
    startDate: '2024. 10. 26.',
    description: '바쁜 일상 속 건강을 지키는 방법을 함께 ',
    phone: '010-9238-0022',
    status: 'matched'
  },
  {
    id: '4',
    name: '다혜쌤',
    realName: '박다혜',
    position: '영양사',
    startDate: '2023. 08. 23.',
    description: '바쁜 일상 속 건강을 지키는 방법을 함께',
    phone: '010-9238-0011',
    status: 'rejected'
  },
  {
    id: '5',
    name: '다은닥터',
    realName: '홍다은',
    position: '웰니스 코치',
    startDate: '2024. 11. 24.',
    description: '몸과 마음의 균형을 위한 웰니스 관리를',
    phone: '010-9238-0022',
    status: 'matched'
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