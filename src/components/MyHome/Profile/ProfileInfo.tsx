import React from "react";
import defaultProfileImage from "../../../assets/MyHome/profile.svg";
import smileIcon from "../../../assets/MyHome/smile.svg";
import ActionButton from "../Common/ActionButton";
import { useUserProfileQuery } from "../../../hooks/users/queries/useUserProfileQuery";
import { useExpertProfileQuery } from "../../../hooks/experts/queries/useExpertProfileQuery";

interface PatientInfoProps {
  nickname?: string;
  name?: string;
  age?: number;
  height?: number;
  weight?: number;
  checkupCount?: number;
  profileImageUrl?: string;
  onEditInfo?: () => void;
  userType?: 'patient' | 'expert';
  useApiData?: boolean; // API 데이터 사용 여부
  expertises?: string[]; // 전문가 전문 분야
}

// 프로필 이미지 URL이 유효한지 확인하는 함수
const isValidProfileImageUrl = (url?: string): boolean => {
  if (!url || url === 'string' || url.trim() === '') {
    return false;
  }
  
  // URL 형식이 유효한지 확인
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const PatientInfoSection: React.FC<PatientInfoProps> = ({
  nickname,
  name,
  age,
  height,
  weight,
  checkupCount,
  profileImageUrl,
  onEditInfo,
  userType = 'patient',
  useApiData = false,
  expertises,
}) => {
  // API 데이터 사용 시 - 사용자 타입에 따라 적절한 훅만 사용
  const userProfileQuery = userType !== 'expert' ? useUserProfileQuery() : { data: undefined };
  const expertProfileQuery = userType === 'expert' ? useExpertProfileQuery() : { data: undefined };

  // 사용자 타입에 따라 적절한 프로필 데이터 선택
  const profileData = userType === 'expert' ? expertProfileQuery.data : userProfileQuery.data;

  // API 데이터 사용 시 실제 데이터 사용, 그렇지 않으면 props 사용
  // API 데이터가 없거나 에러가 있을 때는 기본값 사용
  
  const displayName = useApiData && profileData?.name ? profileData.name : (name || '사용자');
  const displayNickname = useApiData && profileData?.nickname ? profileData.nickname : (nickname || '사용자');
  const displayAge = useApiData && profileData?.age ? profileData.age : (age || 0);
  
  // 프로필 이미지 처리: API 데이터 사용 시 유효성 검사 후 기본 이미지 사용
  const getProfileImageUrl = () => {
    if (useApiData && profileData?.profileImgUrl) {
      const apiImageUrl = profileData.profileImgUrl;
      return isValidProfileImageUrl(apiImageUrl) ? apiImageUrl : defaultProfileImage;
    }
    return isValidProfileImageUrl(profileImageUrl) ? profileImageUrl : defaultProfileImage;
  };

  const displayProfileImage = getProfileImageUrl();

  // 전문가 전문분야 처리
  const getExpertSpecialty = () => {
    if (useApiData && (profileData as any)?.specialty) {
      // specialty를 한국어로 변환하는 로직 필요
      const specialtyMap: Record<string, string> = {
        'NUTRITIONIST': '영양사',
        'HEALTH_MANAGER': '건강관리사',
        'WELLNESS_COACH': '웰니스 코치',
        'EXERCISE_THERAPIST': '운동처방사',
        'ETC': '기타'
      };
      return specialtyMap[(profileData as any).specialty] || (profileData as any).specialty;
    }
    return expertises?.join(', ') || '전문분야 미설정';
  };

  return (
    <div className="w-full pt-12 pl-10 xl:pt-12 xl:pl-10 md:pt-8 md:pl-6 sm:pt-6 sm:pl-4">
      <div className="text-[#121212] text-xl font-medium leading-[1.19] tracking-[-0.66px] xl:text-xl md:text-lg sm:text-base">
        {userType === 'expert' ? (
          <>
            안녕하세요! <span className="text-[#1D68FF]">{displayNickname}</span>전문가님! 오늘도 마이메디와 함께 행복한 하루 보내세요.
            <img src={smileIcon} alt="smile" className="inline-block pl-2 w-7 h-7" />
          </>
        ) : (
          <>
            안녕하세요! <span className="text-[#1D68FF]">{displayNickname}</span>님! 오늘도 마이메디와 함께 행복한 하루 보내세요.
            <img src={smileIcon} alt="smile" className="inline-block pl-2 w-7 h-7" />
          </>
        )}
      </div>
      
      <div className="pt-6 flex items-start gap-6 xl:pt-6 xl:gap-6 md:pt-4 md:gap-6 sm:pt-3 sm:gap-4 xl:flex-row md:flex-row sm:flex-col sm:items-center">
        <div className="w-32 h-32 bg-[#EDF0F3] rounded-full flex items-center justify-center xl:w-32 xl:h-32 md:w-24 md:h-24 sm:w-20 sm:h-20">
          <img
            src={displayProfileImage}
            alt="프로필 이미지"
            className="w-20 h-20 object-contain xl:w-20 xl:h-20 md:w-16 md:h-16 sm:w-14 sm:h-14"
            onError={(e) => {
              // 이미지 로드 실패 시 기본 이미지로 대체
              const target = e.target as HTMLImageElement;
              target.src = defaultProfileImage;
            }}
          />
        </div>
        
        <div className="xl:flex-1 md:flex-1 sm:w-full">
          <div className="flex items-center gap-6 pt-6 xl:gap-6 md:gap-4 sm:gap-2 xl:flex-row md:flex-row sm:flex-col sm:items-start sm:pt-3">
            <div className="text-lg leading-[36px] tracking-[-0.54px] font-normal xl:text-lg md:text-base sm:text-sm">
              <span className="text-[#1D68FF]">{displayNickname}</span>
              <span className="text-[#121218]"> / {displayName}</span>
            </div>
            {displayAge > 0 && (
              <div className="text-[#121218] font-normal text-lg leading-[36px] tracking-[-0.54px] xl:text-lg md:text-base sm:text-sm">
                만 {displayAge}세
              </div>
            )}
            {userType === 'patient' && (
              <div className="text-[#121218] font-normal text-lg leading-[36px] tracking-[-0.54px] xl:text-lg md:text-base sm:text-sm">
                {useApiData && profileData?.height && profileData?.weight 
                  ? `${profileData.height}cm / ${profileData.weight}kg`
                  : (height && weight ? `${height}cm / ${weight}kg` : '174cm / 70kg')
                }
              </div>
            )}
          </div>
          {userType === 'patient' && (
            <div className="pt-2 text-[#121218] font-normal text-lg leading-[36px] tracking-[-0.54px] xl:text-lg md:text-base sm:text-sm">
              국가건강검진 <span className="text-[#DBE6FF]">| </span>
              {useApiData && profileData?.reportCount !== undefined 
                ? profileData.reportCount 
                : checkupCount
              }회
            </div>
          )}
          {userType === 'expert' && (
            <div className="pt-2 text-[#121218] font-normal text-lg leading-[36px] tracking-[-0.54px] xl:text-lg md:text-base sm:text-sm">
                전문분야 <span className="text-[#DBE6FF]">| </span>
                {/* To-Do: API 연동 후 수정 필요 */}
                {getExpertSpecialty()}
            </div>
          )}
        </div>
      </div>
      
      {onEditInfo && (
        <div className="block">
          <ActionButton 
            text="회원정보 수정하기" 
            onClick={onEditInfo} 
          />
        </div>
      )}
    </div>
  );
};

export default PatientInfoSection;
