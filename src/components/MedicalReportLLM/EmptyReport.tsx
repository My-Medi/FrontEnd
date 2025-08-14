import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChartClip from '/src/assets/MyMedicalReport/chart-clip.svg';
import ChartSideClip from '/src/assets/MyMedicalReport/chart-2-clip.svg';
import exReport from '/src/assets/MyMedicalReport/exReport.svg';

const EmptyReport = () => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/health-result-input');
  };

  return (
    <>
      <div className='p-8'>
        <div className='max-w-[1301px] mx-auto flex-shrink-0 rounded-[20px] border-[2px] border-[#DBE6FF] bg-[linear-gradient(157deg,_rgba(161,189,255,0.30)_-0.5%,_rgba(219,230,255,0.30)_85.34%)] flex flex-col items-center pt-[46px] relative'>
          {/* 회색 클립 이미지 그룹 */}
          <div className='max-w-[1237px] w-full mx-auto relative flex justify-center items-start mb-[-32px] z-10'>
            {/* 가운데 클립 */}
            <img
              src={ChartClip}
              alt='center-clip'
              width={549}
              height={64}
              className='z-0 mx-auto'
            />
          </div>
          <div className='w-[1237px] h-[600px] mt-[10px] mb-[46px] flex-shrink-0 rounded-[20px] bg-white shadow-[0_2px_4px_rgba(119,119,119,0.25)] px-[70px] pt-[60px] pb-[40px] relative z-20'>
            {/* 왼쪽 작은 클립 */}
            <img
              src={ChartSideClip}
              alt='left-clip'
              width={12}
              height={36}
              className='absolute left-[calc(50%-245px)] top-[-14px] z-10'
            />
            {/* 오른쪽 작은 클립 */}
            <img
              src={ChartSideClip}
              alt='right-clip'
              width={12}
              height={36}
              className='absolute right-[calc(50%-245px)] top-[-14px] z-10'
            />

            {/* 빈 상태 메시지 */}
            <div className='flex items-center justify-center h-full'>
              <p className='text-[24px] font-medium leading-[40px] tracking-[-3%] text-[#75787B]'>
                등록된 건강검진결과가 없습니다.
              </p>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center mt-[118px]'>
          <p className='text-black text-[32px] font-medium leading-[36px] tracking-[-0.54px] mb-[64px]'>
            건강 검진 결과를 입력하고 마이메디컬리포트를 받아보세요!
          </p>
          <button
            onClick={handleButtonClick}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className={`mb-[58px] ${isButtonHovered ? 'font-bold' : 'font-medium'} text-[24px] leading-[40px] tracking-[-3%] bg-[#1D68FF] text-white rounded-[60px] flex items-center justify-center gap-10 mx-auto transition-all duration-300 pl-[72px] pr-[72px] py-[20px] shadow-lg`}
          >
            <div>건강검진결과 입력하러 가기</div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='13'
              height='20'
              viewBox='0 0 13 20'
              fill='none'
            >
              <path
                d='M2.44995 1.90039L10.55 10.0004L2.44995 18.1004'
                stroke='white'
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>
      </div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='1988'
        height='2'
        viewBox='0 0 1988 2'
        fill='none'
        className='w-full'
      >
        <path d='M0 1H1988' stroke='#82ABFD' strokeWidth='2' strokeDasharray='8 8' />
      </svg>

      <div className='bg-white py-16 w-full'>
        <div className='w-full px-8'>
          {/* 메인 제목 */}
          <h1 className='text-[32px] font-bold text-black text-center mb-[64px]'>
            마이메디컬리포트란?
          </h1>

          {/* 서비스 설명 */}
          <p className='text-[18px] text-gray-500 font-medium text-center mb-[64px] leading-relaxed'>
            건강검진 결과 자동 분석 서비스로 <br /> 건강검진결과지를 업로드하거나 결과를 직접
            입력하면 같은 연령대의 사람들의 건강과 비교해 <br />내 건강 상태를 더 쉽고 자세하게
            알려드립니다!
          </p>

          {/* 기능 리스트 */}
          <div className='relative w-full flex justify-center'>
            <div className='relative'>
              {/* 점선 연결선: 양끝 원을 넘지 않도록 상하 여백 */}
              <div className='absolute left-[8.5px] top-[12px] bottom-[12px] w-0.5 border-l-2 border-dotted border-[#1D68FF]'></div>

              {/* 기능 항목들 */}
              <div className='space-y-[56px]'>
                <div className='flex items-start gap-[32px]'>
                  <div className='w-[17px] h-[17px] bg-blue-500 rounded-full mt-2 flex-shrink-0 relative z-10'></div>
                  <p className='text-[20px] text-black font-medium'>
                    검사 결과를 분석·시각화하여 이해하기 쉽게 제시
                  </p>
                </div>

                <div className='flex items-start gap-[32px]'>
                  <div className='w-[17px] h-[17px] bg-blue-500 rounded-full mt-2 flex-shrink-0 relative z-10'></div>
                  <p className='text-[20px] text-black font-medium'>
                    질환별 수치를 색상으로 구분하고 종합 건강 지수를 함께 제공
                  </p>
                </div>

                <div className='flex items-start gap-[32px]'>
                  <div className='w-[17px] h-[17px] bg-blue-500 rounded-full mt-2 flex-shrink-0 relative z-10'></div>
                  <p className='text-[20px] text-black font-medium'>
                    현재 건강 상태를 같은 연령대 평균과 비교해 객관적으로 평가
                  </p>
                </div>

                <div className='flex items-start gap-[32px]'>
                  <div className='w-[17px] h-[17px] bg-blue-500 rounded-full mt-2 flex-shrink-0 relative z-10'></div>
                  <p className='text-[20px] text-black font-medium'>
                    2년마다 받은 검진 결과를 한 곳에서 통합 관리해 추세를 파악
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 예시 이미지 (단일) */}
      <div className='flex justify-center items-center mt-[104px] w-full'>
        <img
          src={exReport}
          alt='마이메디컬리포트 예시'
          className='w-full max-w-[1920px] h-auto mx-auto'
        />
      </div>
    </>
  );
};

export default EmptyReport;
