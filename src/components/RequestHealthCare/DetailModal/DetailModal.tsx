import React from 'react';
import BackIcon from '/src/assets/back.svg';
import RequestHealthGoal from './HealthGoal';
import RequestMessage from './RequestMessage';
import PatientInfo from './PatientInfo';
import AbnormalPart from './AbnormalPart';
import ReportSummary from './ReportSummary';

interface DetailModalProps {
  nickname: string;
  onClose: () => void;
  onAccept: () => void;
  onReject: () => void;
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

const HealthDataModal: React.FC<DetailModalProps> = ({ nickname, onClose, onAccept, onReject }) => {
  return (
    <>
      <div className='fixed inset-0 bg-black/30 z-40' />
      <div className='absolute left-1/2 -translate-x-1/2 z-50 top-[20px]'>
        <div className='hidden lg:flex flex-col items-center gap-6 relative w-[984px] pt-[50px] pl-[50px] pr-[50px] pb-[50px] rounded-[40px] bg-white shadow-md'>
          {/* 상단 헤더 */}
          <div className='flex items-center gap-6  self-start'>
            {/* 뒤로가기 버튼 */}
            <button
              onClick={onClose}
              className='cursor-pointer shrink-0 flex items-center justify-center'
            >
              <img src={BackIcon} alt='뒤로가기' className='w-[17px] h-[35px]' />
            </button>

            {/* 텍스트 블럭 */}
            <div className='flex flex-col w-[837px] items-center justify-between h-[60px]'>
              <p className='text-[#4D5053] text-[14px] font-medium font-[Pretendard] leading-[24px] tracking-[-0.42px]'>
                건강 데이터 상세
              </p>
              <p className='text-[#121218] text-[24px] font-semibold font-[Pretendard] leading-[36px] tracking-[-0.72px]'>
                {(nickname = '하나')} 회원님의 건강관리 요청서
              </p>
            </div>
          </div>
          <div>
            <RequestMessage
              message={`최근 자취를 시작하면서 식사 패턴이 불규칙해졌어요.\n간헐적 단식 중인데, 공복혈당이 높게 나왔고 종종 두통이 있습니다.
          주 1회 요가를 하고 있지만 체력이 낮은 편입니다.\n건강하게 체중을 감량하고 싶고, 당 수치도 안정시키고 싶어요.`}
            />
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
          <div className='flex flex-col gap-[32px] w-max-[496px]'>
            <RequestHealthGoal
              goal='식단 플래너 공유, 1:1 메시지 상담, 주간 체크리스트 제공 등 2개월정도 관리 생각하고 있고
          체중 3kg 감량과 혈당 정상화, 그리고 꾸준한 식단 루틴을 만들고 싶어요!'
            />
            <AbnormalPart abnormal={['공복 혈당', 'BMI / 체지방률']} />
            <ReportSummary {...reportData} />
          </div>
          {/* 하단 버튼 */}
          <div className='flex flex-col items-center border-[#DBE6FF] pt-8 w-[300px] h-[56px] gap-4 mt-6 mb-[50px]'>
            <div className='flex gap-[96px]'>
              {/* 거절하기 버튼 */}
              <button
                onClick={() => {
                  onReject();
                  onClose(); // 모달 닫기
                }}
                className='flex justify-center items-center gap-[6px] w-[300px] h-[56px] rounded-full text-[#25282B] text-[20px] font-medium font-[Pretendard] border border-[#E3E6EB] leading-[36px] tracking-[-0.6px] shadow-[0px_0px_5px_5px_rgba(29,104,255,0.05)] cursor-pointer'
              >
                거절하기
              </button>

              {/* 수락하기 버튼 */}
              <button
                onClick={() => {
                  onAccept();
                  onClose(); // 모달 닫기
                }}
                className='flex justify-center items-center gap-[6px] w-[300px] h-[56px] rounded-full text-white text-[20px] font-medium font-[Pretendard] leading-[36px] tracking-[-0.6px] bg-[#1D68FF] shadow-[0px_0px_5px_5px_rgba(29,104,255,0.08)] cursor-pointer'
              >
                수락하기
              </button>
            </div>
          </div>
        </div>
        {/* 모바일 전용 모달 */}
        <div className='lg:hidden flex flex-col w-[90vw] max-w-[500px] px-4 py-6 bg-white rounded-[20px] mx-auto shadow-md'>
          {/* 상단 헤더 */}
          <div className='flex items-center gap-4 mb-4'>
            <button onClick={onClose}>
              <img src={BackIcon} alt='뒤로가기' className='w-[14px] cursor-pointer h-[28px]' />
            </button>
            <div>
              <p className='text-[#4D5053] text-[12px] leading-[18px] tracking-[-0.3px] font-medium'>
                건강 데이터 상세
              </p>
              <p className='text-[#121218] text-[18px] font-semibold leading-[28px] tracking-[-0.5px]'>
                {nickname} 회원님의 건강관리 요청서
              </p>
            </div>
          </div>

          {/* 본문 영역 */}
          <div className='flex flex-col gap-4'>
            <RequestMessage
              message={`최근 자취를 시작하면서 식사 패턴이 불규칙해졌어요.\n간헐적 단식 중인데, 공복혈당이 높게 나왔고 종종 두통이 있습니다.\n주 1회 요가를 하고 있지만 체력이 낮은 편입니다.\n건강하게 체중을 감량하고 싶고, 당 수치도 안정시키고 싶어요.`}
            />
            <PatientInfo
              nickname='하나'
              gender='여자'
              age={27}
              height={168}
              weight={52}
              testDate='2023. 06. 15'
              healthInterest='영양관리, 체중조절, 혈당관리'
            />
            <RequestHealthGoal goal='식단 플래너 공유, 1:1 메시지 상담, 주간 체크리스트 제공 등 2개월정도 관리 생각하고 있고 체중 3kg 감량과 혈당 정상화, 그리고 꾸준한 식단 루틴을 만들고 싶어요!' />
            <AbnormalPart abnormal={['공복 혈당', 'BMI / 체지방률']} />
            <ReportSummary {...reportData} />
          </div>

          {/* 하단 버튼 */}
          <div className='flex flex-col items-center mt-6 gap-2'>
            <button
              onClick={() => {
                onReject();
                onClose();
              }}
              className='w-full h-[48px] cursor-pointer rounded-full text-[#25282B] text-[16px] font-medium border border-[#E3E6EB] shadow-sm'
            >
              거절하기
            </button>
            <button
              onClick={() => {
                onAccept();
                onClose();
              }}
              className='w-full h-[48px] cursor-pointer rounded-full text-white text-[16px] font-medium bg-[#1D68FF] shadow-md'
            >
              수락하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthDataModal;
