export interface Notification {
  id: string;
  message: string;
  isNew: boolean;
}

export const expertNotificationList: Notification[] = [
  {
    id: '1',
    message: '환자분의 건강요청서가 도착했어요! 확인해보세요!',
    isNew: true,
  },
  {
    id: '2',
    message:
      '진호핏 영양사님과 첫 매칭이 완료되었습니다! 마이홈→매칭 전문가에서 전문가의 연락처를 확인하고 소통을 시작하세요!',
    isNew: true,
  },
  {
    id: '3',
    message: '진호핏 영양사님께서 건강관리요청서를 수락했습니다!',
    isNew: true,
  },
  {
    id: '4',
    message: '진호핏 영양사님께서 건강관리요청서를 수락했습니다!',
    isNew: false,
  },
  {
    id: '5',
    message: '진호핏 영양사님께서 건강관리요청서를 수락했습니다!',
    isNew: false,
  },
  {
    id: '6',
    message: '진호핏 영양사님께서 건강관리요청서를 수락했습니다!',
    isNew: false,
  },
  {
    id: '7',
    message: '진호핏 영양사님께서 건강관리요청서를 수락했습니다!',
    isNew: false,
  },
  {
    id: '8',
    message: '진호핏 영양사님께서 건강관리요청서를 수락했습니다!',
    isNew: false,
  },
  {
    id: '9',
    message: '진호핏 영양사님께서 건강관리요청서를 수락했습니다!',
    isNew: false,
  },
  {
    id: '10',
    message: '진호핏 영양사님께서 건강관리요청서를 수락했습니다!',
    isNew: false,
  },
  {
    id: '11',
    message: '진호핏 영양사님께서 건강관리요청서를 수락했습니다!',
    isNew: false,
  },
];
