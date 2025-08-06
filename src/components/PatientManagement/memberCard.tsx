import { HEALTH_STATUS_COLOR } from '../../constants/memberStatusColor';
import { FiChevronRight } from 'react-icons/fi';
import defaultProfile from '@/assets/MyHome/noProfile.svg';
import { useState } from 'react';
import MemberCardModal from './memberCardModel/memberCardModal';
import AdviceRegisterModal from './memberCardModel/adviceRegisterModel';
import ConsultReservationModal from './consultReservationModal/CalendarModal';
import ConsultDateModal from './consultReservationModal/Date';
import type dayjs from 'dayjs';

interface Member {
  profileImageUrl?: string;
  nickname: string;
  gender: string;
  age: number;
  height: number;
  weight: number;
  testDate: string;
  healthInterest: string[];
  healthStatus: '위험' | '주의' | '관심' | '안심' | '정상';
  signupDate: string;
}

const MemberCard: React.FC<{ member: Member }> = ({ member }) => {
  const color = HEALTH_STATUS_COLOR[member.healthStatus];
  const [showMemberCardModal, setShowMemberCardModal] = useState(false);
  const [showAdviceRegisterModal, setShowAdviceRegisterModal] = useState(false);
  const [showConsultReservationModal, setShowConsultReservationModal] = useState(false);
  const [showConsultDateModal, setShowConsultDateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  const openAdviceRegisterModal = () => {
    setShowMemberCardModal(false);
    setShowAdviceRegisterModal(true);
  };

  const closeAdviceRegisterModal = () => setShowAdviceRegisterModal(false);
  const openConsultReservationModal = () => {
    setShowMemberCardModal(false);
    setShowConsultReservationModal(true);
  };
  const closeConsultReservationModal = () => setShowConsultReservationModal(false);

  const openConsultDateModal = () => {
    setShowMemberCardModal(false);
    setShowConsultReservationModal(false);
    setShowConsultDateModal(true);
  };
  const closeConsultDateModal = () => setShowConsultDateModal(false);

  return (
    <div
      className='flex sm:w-[1046px] w-full cursor-pointer h-[168px] px-14 items-center gap-[40px] rounded-[20px]'
      style={{ border: `0.5px solid ${color}`, background: 'rgba(255, 255, 255, 0.80)' }}
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
          만 {member.age}세 / {member.gender}
        </span>
        <span>
          {member.height}cm / {member.weight}kg
        </span>
        <span>최근 국가건강검진일 : {member.testDate}</span>
        <span>건강 관심 분야 : {member.healthInterest.join(', ')}</span>
      </div>

      <div className='ml-auto mr-[-40px]' onClick={() => setShowMemberCardModal(true)}>
        <FiChevronRight
          className='flex cursor-pointer'
          size={160}
          style={{ stroke: color, strokeWidth: 0.3, fill: 'rgba(255, 255, 255, 0.80)' }}
        />
      </div>

      {showMemberCardModal && (
        <MemberCardModal
          member={member}
          onClose={() => setShowMemberCardModal(false)}
          openAdviceRegister={openAdviceRegisterModal}
          openConsultReservation={openConsultReservationModal}
        />
      )}
      {showAdviceRegisterModal && <AdviceRegisterModal onClose={closeAdviceRegisterModal} />}
      {showConsultReservationModal && (
        <ConsultReservationModal
          onClose={closeConsultReservationModal}
          onNext={(date) => {
            setSelectedDate(date);
            setShowConsultReservationModal(false);
            setShowConsultDateModal(true);
          }}
        />
      )}
      {showConsultDateModal && selectedDate && (
        <ConsultDateModal onClose={closeConsultDateModal} selectedDate={selectedDate} />
      )}
    </div>
  );
};

export default MemberCard;
