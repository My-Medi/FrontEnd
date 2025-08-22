import { HEALTH_STATUS_COLOR } from '../../constants/memberStatusColor';
import { FiChevronRight } from 'react-icons/fi';
import defaultProfile from '@/assets/MyHome/noProfile.svg';
import { useState } from 'react';
import MemberCardModal from './memberCardModel/memberCardModal';
import AdviceRegisterModal from './memberCardModel/adviceRegisterModel';
import ConsultReservationModal from './consultReservationModal/CalendarModal';
import { useExpertUserLatestHealthStatusQuery } from '../../hooks/expert/report/useExpertUserLatestHealthStatusQuery';
import { mapApiResultToHealthStatus } from '../../utils/mappers/healthStatusMapper';

interface Member {
  userId: number;
  profileImageUrl?: string;
  nickname: string;
  gender: string;
  age: string;
  height: number;
  weight: number;
  testDate: string;
  healthInterest: string[];
  healthStatus: '위험' | '주의' | '관심' | '안심' | '정상';
  signupDate?: string; //optional로 변경하기 -> memberCardModal에서만 사용하니까.
  consultationId: number;
}

const MemberCard: React.FC<{ member: Member }> = ({ member }) => {
  // API에서 최신 건강 상태 가져오기
  const { data: latestHealthStatus, isLoading: healthStatusLoading } = useExpertUserLatestHealthStatusQuery(member.userId);
  
  // API 데이터가 있으면 사용, 없으면 기본값 사용
  const healthStatus = latestHealthStatus?.healthStatus 
    ? mapApiResultToHealthStatus(latestHealthStatus.healthStatus as any)
    : member.healthStatus;
  
  const color = HEALTH_STATUS_COLOR[healthStatus];
  const [showMemberCardModal, setShowMemberCardModal] = useState(false);
  const [showAdviceRegisterModal, setShowAdviceRegisterModal] = useState(false);
  const [showConsultReservationModal, setShowConsultReservationModal] = useState(false);

  // 성별을 한글로 변환하는 함수
  const toKoreanGender = (g?: string) => {
    const norm = (g ?? '').toUpperCase();
    if (norm === 'MALE' || norm === 'MAEL') return '남성';
    if (norm === 'FEMALE' || norm === 'FAMALE') return '여성';
    return g ?? '-';
  };

  const openAdviceRegisterModal = () => {
    setShowAdviceRegisterModal(true);
  };

  const openConsultReservationModal = () => {
    setShowConsultReservationModal(true);
  };

  return (
    <div
      className='flex sm:w-[1046px] w-full cursor-pointer h-[168px] px-14 items-center gap-[40px] rounded-[20px]'
      style={{ border: `0.5px solid ${color}`, background: 'rgba(255, 255, 255, 0.80)' }}
      onClick={() => setShowMemberCardModal(true)}
    >
      <div className='w-[124px] h-[124px] rounded-full border-[2px] border-[#1D68FF] overflow-hidden'>
        <img
          src={member.profileImageUrl || defaultProfile}
          alt='프로필 이미지'
          className='w-full h-full object-cover'
        />
      </div>

      <div className='flex flex-col justify-center w-[540px] text-[14px] font-medium leading-[24px] tracking-[-0.42px] text-[#121218] font-[Pretendard]'>
        <span className='text-[#1D68FF]'>{member.nickname}</span>
        <span>
          {member.age} / {toKoreanGender(member.gender)}
        </span>
        <span>
          {member.height}cm / {member.weight}kg
        </span>
        <span>최근 국가건강검진일 : {member.testDate}</span>
        <span>건강 관심 분야 : {member.healthInterest.join(', ')}</span>
      </div>

      <div className='ml-auto mr-[-40px]'>
        <FiChevronRight
          className='flex cursor-pointer'
          size={160}
          style={{ stroke: color, strokeWidth: 0.3, fill: 'rgba(255, 255, 255, 0.80)' }}
        />
      </div>

      {showMemberCardModal && !showAdviceRegisterModal && !showConsultReservationModal && (
        <MemberCardModal
          member={member}
          onClose={() => setShowMemberCardModal(false)}
          openAdviceRegister={openAdviceRegisterModal}
          openConsultReservation={openConsultReservationModal}
        />
      )}
      {showAdviceRegisterModal && (
        <AdviceRegisterModal
          userId={member.userId}
          onClose={(isFromRegister = false) => {
            setShowAdviceRegisterModal(false);
            if (isFromRegister) {
              setShowMemberCardModal(false);
            }
          }}
        />
      )}
      {showConsultReservationModal && (
        <ConsultReservationModal
          userId={member.userId}
          onClose={(isFromSuccess = false) => {
            setShowConsultReservationModal(false);
            // 성공 모달에서 확인 버튼을 누르면 모든 모달을 닫기
            if (isFromSuccess) {
              setShowMemberCardModal(false);
            }
            // 뒤로가기 버튼을 누르면 memberCardModal로 돌아감
          }}
        />
      )}
    </div>
  );
};

export default MemberCard;
