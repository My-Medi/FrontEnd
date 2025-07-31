import type { ScheduleType } from '../components/MyHome/ScheduleCard';

export interface ScheduleData {
  type: ScheduleType;
  date: {
    month: number;
    day: number;
    year: number;
  };
  title: string;
  description: string;
  source: {
    text: string;
  };
  time: {
    text: string;
  };
}

export const scheduleData: ScheduleData[] = [
  {
    type: 'report',
    date: { month: 6, day: 15, year: 2024 },
    title: '마이메디컬리포트 시작일',
    description: '국가건강검진결과를 마이메디컬리포트로 쉽게 이해할 수 있어요!',
    source: { text: '마이메디' },
    time: { text: '12:00 pm' },
  },
  {
    type: 'birthday',
    date: { month: 6, day: 17, year: 2024 },
    title: '하나 님의 생일',
    description: '마이메디가 하나님의 생일을 축하드립니다!! 생일에도 마이메디와 함께 건강지키기!',
    source: { text: '마이메디' },
    time: { text: '12:00 am' },
  },
  {
    type: 'appointment',
    date: { month: 6, day: 25, year: 2024 },
    title: '00운동처방사와 상담예약일',
    description: '00운동처방사와 화상 상담받기, 일주일 동안 운동 기록 정리해올 것.',
    source: { text: '여의도 스타벅스' },
    time: { text: '11:00 am - 1:00 pm' },
  },
  {
    type: 'appointment',
    date: { month: 6, day: 7, year: 2024 },
    title: '건강검진 예약',
    description: '종합건강검진 예약일입니다. 검진 전 12시간 금식이 필요합니다.',
    source: { text: '서울대병원' },
    time: { text: '09:00 am' },
  },
  {
    type: 'appointment',
    date: { month: 6, day: 12, year: 2024 },
    title: '운동처방사 상담',
    description: '개인 맞춤 운동 프로그램 상담을 받습니다.',
    source: { text: '마이메디 센터' },
    time: { text: '02:00 pm' },
  },
  {
    type: 'report',
    date: { month: 6, day: 15, year: 2024 },
    title: '이력서 등록일',
    description: '전문가 이력서를 등록하여 환자와 매칭을 시작합니다.',
    source: { text: '마이메디' },
    time: { text: '10:00 am' },
  },
  {
    type: 'appointment',
    date: { month: 6, day: 18, year: 2024 },
    title: '첫 환자 매칭',
    description: '첫 번째 환자와 매칭이 완료되었습니다.',
    source: { text: '마이메디' },
    time: { text: '03:00 pm' },
  },
  {
    type: 'appointment',
    date: { month: 6, day: 22, year: 2024 },
    title: '영양사 상담',
    description: '개인 맞춤 영양 상담을 받습니다.',
    source: { text: '마이메디 센터' },
    time: { text: '11:30 am' },
  },
  {
    type: 'appointment',
    date: { month: 6, day: 25, year: 2024 },
    title: '00님 예약일',
    description: '환자 00님과의 상담 예약입니다.',
    source: { text: '마이메디 센터' },
    time: { text: '04:00 pm' },
  },
  {
    type: 'report',
    date: { month: 6, day: 28, year: 2024 },
    title: '혈당 체크',
    description: '정기 혈당 측정 및 기록을 진행합니다.',
    source: { text: '마이메디' },
    time: { text: '08:00 am' },
  },
  {
    type: 'report',
    date: { month: 6, day: 30, year: 2024 },
    title: '체중 관리',
    description: '월말 체중 측정 및 관리 리포트를 확인합니다.',
    source: { text: '마이메디' },
    time: { text: '07:00 am' },
  },
];

// 랜덤 일정 데이터
const randomScheduleTemplates = [
  {
    type: 'appointment' as ScheduleType,
    titles: [
      '건강검진 예약',
      '운동처방사 상담',
      '영양사 상담',
      '심리상담',
      '물리치료',
      '치과 검진',
      '안과 검진',
      '피부과 상담',
      '내과 상담',
      '정형외과 상담'
    ],
    descriptions: [
      '정기 건강검진을 통해 건강 상태를 점검합니다.',
      '개인 맞춤 운동 프로그램을 상담받습니다.',
      '건강한 식습관에 대한 전문적인 조언을 받습니다.',
      '정신 건강을 위한 전문 상담을 진행합니다.',
      '근골격계 문제 해결을 위한 치료를 받습니다.',
      '구강 건강을 점검하고 관리 방법을 안내받습니다.',
      '시력 검사 및 안구 건강을 점검합니다.',
      '피부 상태를 점검하고 관리 방법을 상담합니다.',
      '전반적인 건강 상태를 점검하고 상담받습니다.',
      '관절 및 근골격계 문제를 상담받습니다.'
    ],
    sources: [
      '서울대병원',
      '마이메디 센터',
      '건강검진센터',
      '종합병원',
      '전문병원',
      '의료센터',
      '건강관리센터',
      '웰빙센터',
      '라이프케어센터',
      '헬스케어센터'
    ],
    times: [
      '09:00 am',
      '10:00 am',
      '11:00 am',
      '02:00 pm',
      '03:00 pm',
      '04:00 pm',
      '05:00 pm',
      '06:00 pm'
    ]
  },
  {
    type: 'report' as ScheduleType,
    titles: [
      '혈당 체크',
      '체중 관리',
      '혈압 측정',
      '콜레스테롤 검사',
      '간기능 검사',
      '신장기능 검사',
      '갑상선 검사',
      '비타민 검사',
      '호르몬 검사',
      '알레르기 검사'
    ],
    descriptions: [
      '정기 혈당 측정 및 기록을 진행합니다.',
      '체중 변화를 추적하고 관리 계획을 수립합니다.',
      '혈압을 측정하고 관리 방법을 점검합니다.',
      '콜레스테롤 수치를 확인하고 관리 방안을 상담합니다.',
      '간 기능을 점검하고 건강 상태를 확인합니다.',
      '신장 기능을 점검하고 관리 방법을 안내받습니다.',
      '갑상선 기능을 점검하고 호르몬 상태를 확인합니다.',
      '비타민 결핍 여부를 확인하고 보충 방안을 상담합니다.',
      '호르몬 균형을 점검하고 관리 방법을 안내받습니다.',
      '알레르기 원인을 파악하고 관리 방안을 상담합니다.'
    ],
    sources: [
      '마이메디',
      '건강관리센터',
      '웰빙센터',
      '헬스케어센터',
      '라이프케어센터'
    ],
    times: [
      '07:00 am',
      '08:00 am',
      '09:00 am',
      '06:00 pm',
      '07:00 pm'
    ]
  },
  {
    type: 'birthday' as ScheduleType,
    titles: [
      '김민지 님의 생일',
      '박서연 님의 생일',
      '이지훈 님의 생일',
      '최수진 님의 생일',
      '정현우 님의 생일'
    ],
    descriptions: [
      '마이메디가 김민지님의 생일을 축하드립니다!! 생일에도 마이메디와 함께 건강지키기!',
      '마이메디가 박서연님의 생일을 축하드립니다!! 생일에도 마이메디와 함께 건강지키기!',
      '마이메디가 이지훈님의 생일을 축하드립니다!! 생일에도 마이메디와 함께 건강지키기!',
      '마이메디가 최수진님의 생일을 축하드립니다!! 생일에도 마이메디와 함께 건강지키기!',
      '마이메디가 정현우님의 생일을 축하드립니다!! 생일에도 마이메디와 함께 건강지키기!'
    ],
    sources: [
      '마이메디'
    ],
    times: [
      '12:00 am'
    ]
  }
];

// 특정 요일에 여러 스케줄 생성 함수
export const generateRandomSchedules = (count: number = 10): ScheduleData[] => {
  const randomSchedules: ScheduleData[] = [];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  
  // 월요일(1)에 5개의 스케줄을 생성
  const mondayDay = getMondayOfCurrentMonth(currentYear, currentMonth);
  
  // 월요일에 5개의 스케줄 생성
  for (let i = 0; i < 5; i++) {
    const template = randomScheduleTemplates[Math.floor(Math.random() * randomScheduleTemplates.length)];
    const titleIndex = Math.floor(Math.random() * template.titles.length);
    const descriptionIndex = Math.floor(Math.random() * template.descriptions.length);
    const sourceIndex = Math.floor(Math.random() * template.sources.length);
    const timeIndex = Math.floor(Math.random() * template.times.length);
    
    randomSchedules.push({
      type: template.type,
      date: {
        month: currentMonth,
        day: mondayDay,
        year: currentYear
      },
      title: template.titles[titleIndex],
      description: template.descriptions[descriptionIndex],
      source: { text: template.sources[sourceIndex] },
      time: { text: template.times[timeIndex] }
    });
  }
  
  // 나머지 랜덤 스케줄들 생성
  for (let i = 5; i < count; i++) {
    const template = randomScheduleTemplates[Math.floor(Math.random() * randomScheduleTemplates.length)];
    const titleIndex = Math.floor(Math.random() * template.titles.length);
    const descriptionIndex = Math.floor(Math.random() * template.descriptions.length);
    const sourceIndex = Math.floor(Math.random() * template.sources.length);
    const timeIndex = Math.floor(Math.random() * template.times.length);
    
    // 월요일이 아닌 다른 날짜로 랜덤 생성
    let randomDay;
    do {
      randomDay = Math.floor(Math.random() * 30) + 1;
    } while (randomDay === mondayDay);
    
    randomSchedules.push({
      type: template.type,
      date: {
        month: currentMonth,
        day: randomDay,
        year: currentYear
      },
      title: template.titles[titleIndex],
      description: template.descriptions[descriptionIndex],
      source: { text: template.sources[sourceIndex] },
      time: { text: template.times[timeIndex] }
    });
  }
  
  return randomSchedules;
};

// 현재 월의 첫 번째 월요일 날짜를 구하는 함수
const getMondayOfCurrentMonth = (year: number, month: number): number => {
  const firstDay = new Date(year, month - 1, 1); // month는 1부터 시작하므로 -1
  const firstDayOfWeek = firstDay.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
  
  // 첫 번째 월요일까지의 일수 계산
  const daysUntilMonday = firstDayOfWeek === 0 ? 1 : (8 - firstDayOfWeek);
  
  return daysUntilMonday;
};

// 전역 랜덤 스케줄 데이터 (컴포넌트 간 공유)
let globalRandomSchedules: ScheduleData[] = [];

// 랜덤 스케줄 초기화 함수
export const initializeRandomSchedules = (count: number = 15): void => {
  globalRandomSchedules = generateRandomSchedules(count);
};

// 특정 날짜의 스케줄을 가져오는 함수
export const getSchedulesForDate = (date: Date): ScheduleData[] => {
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
  const day = date.getDate();
  const year = date.getFullYear();
  
  // 기존 고정 스케줄과 랜덤 스케줄을 합쳐서 반환
  const allSchedules = [...scheduleData, ...globalRandomSchedules];
  
  return allSchedules.filter(schedule => 
    schedule.date.month === month && 
    schedule.date.day === day && 
    schedule.date.year === year
  );
};

// 오늘 날짜의 스케줄을 가져오는 함수
export const getTodaySchedules = (): ScheduleData[] => {
  const today = new Date();
  return getSchedulesForDate(today);
}; 