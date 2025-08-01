import { HEALTH_STATUS_COLOR } from '../../constants/memberStatusColor';
import { FiChevronRight } from 'react-icons/fi';
import defaultProfile from '@/assets/MyHome/noProfile.svg';

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
}

const MemberCard: React.FC<{ member: Member }> = ({ member }) => {
  const color = HEALTH_STATUS_COLOR[member.healthStatus];

  return (
    <div
      className='flex sm:w-[1046px] w-full cursor-pointer h-[168px] px-14 items-center gap-[40px] rounded-[20px]'
      style={{
        border: `0.5px solid ${color}`,
        background: 'rgba(255, 255, 255, 0.80)',
      }}
    >
      {/* 프로필 이미지 */}
      <div className='w-[124px] h-[124px] rounded-full border-[2px] border-[#1D68FF] overflow-hidden'>
        <img
          src={member.profileImageUrl || defaultProfile}
          alt='프로필 이미지'
          className='w-full h-full object-cover'
        />
      </div>

      {/* 텍스트 정보 영역 */}
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

      {/* 오른쪽 화살표 */}
      <div className='ml-auto mr-[-40px]'>
        <FiChevronRight
          className='flex cursor-pointer'
          size={160}
          style={{
            stroke: color,
            strokeWidth: 0.3,
            fill: 'rgba(255, 255, 255, 0.80)',
          }}
        />
      </div>
    </div>
  );
};

export default MemberCard;
