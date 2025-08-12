import React, { useState } from 'react';
import BackIcon from '/src/assets/back.svg';
import PatientInfo from '../../RequestHealthCare/DetailModal/PatientInfo';
import RequestHealthGoal from '../../RequestHealthCare/DetailModal/HealthGoal';
import AbnormalPart from '../../RequestHealthCare/DetailModal/AbnormalPart';
import ReportSummary from '../../RequestHealthCare/DetailModal/ReportSummary';
import MemberReauestMessage from './memberRequestMessage';
import AdvicePart from './advicePart';
import AdviceRegisterModal from './adviceRegisterModel';
import ConsultReservationModal from '../consultReservationModal/CalendarModal';
import { useNavigate } from 'react-router-dom';

interface Member {
  nickname: string;
  age: string;
  gender: string;
  height: number;
  weight: number;
  testDate: string;
  healthInterest: string[];
  healthStatus: '위험' | '주의' | '관심' | '안심' | '정상';
  signupDate?: string;
}

interface MemberCardModalProps {
  member: Member;
  onClose: () => void;
  openAdviceRegister: () => void;
  openConsultReservation: () => void;
}

const reportData = {
  nickname: '하나',
  bmi: 17.4,
  waist: 62,
  sp: 117,
  dp: 62,
  fastingBlood: 130,
  creatinine: 0.9,
  eGFR: 72,
  ast: 18,
  alt: 9,
  gtp: 17,
  hemoglobin: 17.2,
  cholesterol: 100,
  hdl: 78,
  neutralFat: 64,
  ldl: 100,
  urineProtein: '정상',
};

const MemberCardModal: React.FC<MemberCardModalProps> = ({
  member,
  onClose,
  openAdviceRegister,
  openConsultReservation,
}) => {
  const [showAdviceModal, setShowAdviceModal] = useState(false);
  const [showConsultModal, setShowConsultModal] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/health-result-input');
  };
  return (
    <>
      {!showAdviceModal && !showConsultModal && (
        <>
          <div className='fixed inset-0 bg-black/30 z-40' />
          <div className='absolute left-1/2 -translate-x-1/2 z-50 top-[20px]'>
            <div className='hidden lg:flex flex-col items-center gap-6 relative w-[984px] pt-[50px] pl-[50px] pr-[80px] pb-[50px] rounded-[40px] bg-white shadow-md'>
              {/* 상단 헤더 */}
              <div className='flex items-center gap-6 w-full justify-center'>
                {/* 뒤로가기 버튼 */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClose();
                  }}
                  className='cursor-pointer shrink-0 flex items-center justify-center hover:opacity-80 transition-opacity z-10'
                  style={{ position: 'relative', zIndex: 10 }}
                >
                  <img
                    src={BackIcon}
                    alt='뒤로가기'
                    className='w-[17px] h-[35px] pointer-events-none'
                  />
                </button>

                {/* 텍스트 블럭 */}
                <div className='flex flex-col w-[837px] items-center justify-between h-[60px]'>
                  <p className='text-[#75787B] text-[16px] font-semibold font-[Pretendard] leading-[22px] tracking-[-0.48px]'>
                    {(member.signupDate = '2024.08.16')} 부터 함께하고 있는 회원이에요!
                  </p>
                  <p className='text-[#121218] text-[24px] font-semibold font-[Pretendard] leading-[36px] tracking-[-0.72px]'>
                    {(member.nickname = '하나')} 회원님의 건강데이터
                  </p>
                </div>
              </div>
              <div>
                <PatientInfo
                  nickname='하나'
                  gender='여자'
                  age={27}
                  height={168}
                  weight={52}
                  testDate='2023. 06. 15'
                  healthInterest='영양관리, 체중조절, 혈당관리'
                />
              </div>
              <div className='flex flex-col gap-[24px] w-max-[496px] whitespace-pre-line'>
                {/* 여기에 한줄 조언 등록 버튼이랑 상담예약일 지정 버튼 */}
                <div className='flex flex-col ml-[90px] justify-center items-center border-[#DBE6FF] w-[645px] h-[56px]'>
                  <div className='flex gap-[96px]'>
                    {/* 한줄 조언 등록 버튼 */}
                    <button
                      onClick={openAdviceRegister}
                      className='flex justify-center items-center gap-[10px] w-[274px] h-[48px] px-[80px] py-[20px] rounded-[60px] bg-[#FFF] border border-[#E3E6EB] text-[#25282B] text-[18px] font-semibold font-[Pretendard] leading-[27px] tracking-[-0.54px] shadow-[0px_0px_5px_5px_rgba(29,104,255,0.05)] cursor-pointer'
                    >
                      한줄 조언 등록
                    </button>

                    {/* 상담예약일 지정 버튼 */}
                    <button
                      onClick={openConsultReservation}
                      className='flex justify-center items-center gap-[10px] w-[274px] h-[48px] px-[80px] py-[20px] rounded-[60px] bg-[#1D68FF] border border-[#E3E6EB] text-[#FFF] text-[18px] font-semibold font-[Pretendard] leading-[27px] tracking-[-0.54px] shadow-[0px_0px_5px_5px_rgba(29,104,255,0.05)] cursor-pointer'
                    >
                      상담예약일 지정
                    </button>
                  </div>
                </div>
                <RequestHealthGoal
                  goal={`식단 플래너 공유, 1:1 메시지 상담, 주간 체크리스트 제공 등 2개월정도 관리 생각하고 있고
                체중 3kg 감량과 혈당 정상화, 그리고 꾸준한 식단 루틴을 만들고 싶어요!`}
                />
                <MemberReauestMessage
                  message={`최근 자취를 시작하면서 식사 패턴이 불규칙해졌어요. 간헐적 단식 중인데, 공복혈당이 높게 나왔고 종종 두통이 있습니다.
          주 1회 요가를 하고 있지만 체력이 낮은 편입니다. 건강하게 체중을 감량하고 싶고, 당 수치도 안정시키고 싶어요.`}
                />
                {/* 여기가 등록한 한줄 조언 */}
                <AdvicePart />
                <AbnormalPart abnormal={['공복 혈당', 'BMI / 체지방률']} />
                <ReportSummary {...reportData} />
              </div>
              {/* 하단 버튼 */}
              <div className='flex flex-col ml-[12px] items-center border-[#DBE6FF] w-[300px] h-[56px] gap-4 '>
                <div className='flex gap-[96px]'>
                  {/* 페이지 이동 버튼 */}
                  <button
                    onClick={handleClick}
                    className='flex justify-center items-center gap-[10px] w-[280px] h-[48px] px-[80px] py-[20px] rounded-[60px] bg-[#FFF] border border-[#E3E6EB] text-[#25282B] text-[18px] font-medium font-[Pretendard] leading-[36px] tracking-[-0.54px] shadow-[0px_0px_5px_5px_rgba(29,104,255,0.05)] cursor-pointer'
                  >
                    리포트 전체 보기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* AdviceRegisterModal 열기 */}

      {showAdviceModal && <AdviceRegisterModal onClose={() => setShowAdviceModal(false)} />}
      {showConsultModal && <ConsultReservationModal onClose={() => setShowConsultModal(false)} />}
    </>
  );
};
export default MemberCardModal;
