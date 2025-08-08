// 공통 색상 팔레트
export const eventColors = [
  '#8EB3FF', '#4A86FF', '#1D68FF', '#E3FDDE', '#FFE57F', '#FFB3B3'
];

// 특정 이벤트의 고정 색상
export const fixedEventColors = {
  '이력서 등록일': '#E3FDDE',
  '마이메디 등록일': '#E3FDDE',
};

// 이벤트별 색상 매핑을 위한 캐시
const eventColorCache = new Map<string, string>();

// 색상 가져오기 함수
export const getEventColor = (eventText: string): string => {
  // 고정 색상이 있으면 사용
  if (fixedEventColors[eventText as keyof typeof fixedEventColors]) {
    return fixedEventColors[eventText as keyof typeof fixedEventColors];
  }
  
  // 캐시에 있으면 기존 색상 반환
  if (eventColorCache.has(eventText)) {
    return eventColorCache.get(eventText)!;
  }
  
  // 새로운 이벤트면 순차적으로 색상 할당
  const colorIndex = eventColorCache.size;
  const color = eventColors[colorIndex % eventColors.length];
  eventColorCache.set(eventText, color);
  
  return color;
};

// 인덱스 기반 순환 색상 제공 (카드/이벤트 포지션에 따라 순환)
export const getCycledColor = (index: number): string => {
  return eventColors[(index ?? 0) % eventColors.length];
};

// 키 기반 결정적 색상 매핑 (문자열 해시)
export const getDeterministicColor = (key: string): string => {
  if (!key) return eventColors[0];
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return eventColors[hash % eventColors.length];
};

// 색상 값에 따른 Tailwind 텍스트 색상 클래스 매핑
export const getTextColorClass = (color: string): string => {
  switch (color) {
    case '#8EB3FF': return 'text-[#8EB3FF]';
    case '#4A86FF': return 'text-[#4A86FF]';
    case '#1D68FF': return 'text-[#1D68FF]';
    case '#E3FDDE': return 'text-[#A1F68E]';
    case '#A1F68E': return 'text-[#A1F68E]';
    case '#FFE57F': return 'text-[#FFE57F]';
    case '#FFB3B3': return 'text-[#FFB3B3]';
    default: return 'text-[#1D68FF]';
  }
};

// 색상 값에 따른 Tailwind 배경색 클래스 매핑
export const getBgColorClass = (color: string): string => {
  switch (color) {
    case '#8EB3FF': return 'bg-[#8EB3FF]';
    case '#4A86FF': return 'bg-[#4A86FF]';
    case '#1D68FF': return 'bg-[#1D68FF]';
    case '#E3FDDE': return 'bg-[#E3FDDE]';
    case '#A1F68E': return 'bg-[#A1F68E]';
    case '#FFE57F': return 'bg-[#FFE57F]';
    case '#FFB3B3': return 'bg-[#FFB3B3]';
    default: return 'bg-[#1D68FF]';
  }
}; 