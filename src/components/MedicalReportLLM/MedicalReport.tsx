import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChartClip from '/src/assets/MyMedicalReport/chart-clip.svg';
import ChartSideClip from '/src/assets/MyMedicalReport/chart-2-clip.svg';
import type { MedicalReportLlmResult } from '../../types/myMedicalReport/llm';

interface MedicalReportProps {
  username?: string;
  selectedRound?: number;
  isLoading?: boolean;
  isError?: boolean;
  llmData?: MedicalReportLlmResult;
}

const MedicalReport: React.FC<MedicalReportProps> = ({
  username = '',
  selectedRound = '' as unknown as number,
  llmData,
}) => {
  const navigate = useNavigate();
  const handleFindExpert = () => navigate('/expert');

  return (
    <div className='flex flex-col mt-[20px]'>
      <div className='w-[1301px] max-h-[2600px] flex-shrink-0 rounded-[20px] border-[2px] border-[#DBE6FF] bg-[linear-gradient(157deg,_rgba(161,189,255,0.30)_-0.5%,_rgba(219,230,255,0.30)_85.34%)] flex flex-col items-center pt-[46px] relative'>
        {/* 회색 클립 이미지 그룹 */}
        <div className='relative w-full flex justify-center items-start mb-[-32px] z-10'>
          {/* 가운데 클립 */}
          <img src={ChartClip} alt='center-clip' width={549} height={64} className='z-0' />
        </div>

        {/* 내부 흰색 박스 */}
        <div className='w-[1237px] max-h-[2600px] mt-[10px] mb-[46px] flex-shrink-0 rounded-[20px] bg-white shadow-[0_2px_4px_rgba(119,119,119,0.25)] px-[70px] pt-[60px] pb-[40px] relative z-20'>
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
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='flex justify-center mb-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='227'
                height='83'
                viewBox='0 0 227 83'
                fill='none'
              >
                <g filter='url(#filter0_dddd_2347_15543)'>
                  <path
                    d='M5 5.21652C5 4.11195 5.89543 3.21651 7 3.21651H11.5663C12.3646 3.21651 13.0864 3.6912 13.4027 4.42414L23.4724 27.7609H23.9158L33.9856 4.42413C34.3018 3.6912 35.0236 3.21651 35.8219 3.21651H40.3882C41.4928 3.21651 42.3882 4.11194 42.3882 5.21651V35C42.3882 36.1046 41.4928 37 40.3882 37H38.2307C37.1262 37 36.2307 36.1046 36.2307 35V13.7622H35.8859L26.5038 35.6933C26.1889 36.4293 25.4655 36.9067 24.665 36.9067H22.7253C21.9238 36.9067 21.1996 36.4281 20.8854 35.6906L11.5023 13.6689H11.2067V35C11.2067 36.1046 10.3113 37 9.20674 37H7C5.89543 37 5 36.1046 5 35V5.21652Z'
                    fill='#1D68FF'
                  />
                  <path
                    d='M48.4012 6.26451C47.5814 4.93196 48.5401 3.21651 50.1047 3.21651H52.6223C53.3316 3.21651 53.9878 3.59216 54.347 4.20378L62.5355 18.1484H62.8803L71.0688 4.20378C71.428 3.59216 72.0842 3.21651 72.7934 3.21651H75.3182C76.8812 3.21651 77.8402 4.92898 77.0234 6.26162L65.9344 24.3545V35C65.9344 36.1046 65.039 37 63.9344 37H61.5306C60.4261 37 59.5306 36.1046 59.5306 35V24.3545L48.4012 6.26451Z'
                    fill='#1D68FF'
                  />
                  <path
                    d='M83.0276 5.21652C83.0276 4.11195 83.923 3.21651 85.0276 3.21651H89.5939C90.3922 3.21651 91.114 3.6912 91.4302 4.42414L101.5 27.7609H101.943L112.013 4.42413C112.329 3.6912 113.051 3.21651 113.849 3.21651H118.416C119.52 3.21651 120.416 4.11194 120.416 5.21651V35C120.416 36.1046 119.52 37 118.416 37H116.258C115.154 37 114.258 36.1046 114.258 35V13.7622H113.913L104.531 35.6933C104.216 36.4293 103.493 36.9067 102.693 36.9067H100.753C99.9513 36.9067 99.2272 36.4281 98.913 35.6906L89.5299 13.6689H89.2343V35C89.2343 36.1046 88.3389 37 87.2343 37H85.0276C83.923 37 83.0276 36.1046 83.0276 35V5.21652Z'
                    fill='#1D68FF'
                  />
                  <path
                    d='M129.017 37C127.912 37 127.017 36.1046 127.017 35V5.21652C127.017 4.11195 127.912 3.21651 129.017 3.21651H148.218C149.323 3.21651 150.218 4.11194 150.218 5.21651V6.3027C150.218 7.40727 149.323 8.3027 148.218 8.3027H133.42V17.5418H146.986C148.091 17.5418 148.986 18.4373 148.986 19.5418V20.628C148.986 21.7326 148.091 22.628 146.986 22.628H133.42V31.8672H148.316C149.421 31.8672 150.316 32.7626 150.316 33.8671V35C150.316 36.1046 149.421 37 148.316 37H129.017Z'
                    fill='#1D68FF'
                  />
                  <path
                    d='M168.493 37H158.375C157.271 37 156.375 36.1046 156.375 35V5.21652C156.375 4.11195 157.271 3.21651 158.375 3.21651H168.69C179.331 3.21651 185.784 9.56258 185.784 20.0616C185.784 30.6073 179.331 37 168.493 37ZM162.779 31.7272H168.149C175.587 31.7272 179.38 27.8542 179.38 20.0616C179.38 12.3157 175.587 8.48935 168.346 8.48935H162.779V31.7272Z'
                    fill='#1D68FF'
                  />
                  <path
                    d='M193.153 37C192.048 37 191.153 36.1046 191.153 35V15.0791C191.153 13.9745 192.048 13.0791 193.153 13.0791H195.458C196.563 13.0791 197.458 13.9745 197.458 15.0791V35C197.458 36.1046 196.563 37 195.458 37H193.153ZM194.355 9.48606C192.384 9.48606 190.71 8.03953 190.71 6.2197C190.71 4.44653 192.384 3 194.355 3C196.374 3 198 4.44653 198 6.2197C198 8.03953 196.374 9.48606 194.355 9.48606Z'
                    fill='#1D68FF'
                  />
                </g>
                <defs>
                  <filter
                    id='filter0_dddd_2347_15543'
                    x='0'
                    y='0'
                    width='227'
                    height='83'
                    filterUnits='userSpaceOnUse'
                    colorInterpolationFilters='sRGB'
                  >
                    <feFlood floodOpacity='0' result='BackgroundImageFix' />
                    <feColorMatrix
                      in='SourceAlpha'
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                      result='hardAlpha'
                    />
                    <feOffset dx='1' dy='2' />
                    <feGaussianBlur stdDeviation='2.5' />
                    <feColorMatrix
                      type='matrix'
                      values='0 0 0 0 0.113725 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.2 0'
                    />
                    <feBlend
                      mode='normal'
                      in2='BackgroundImageFix'
                      result='effect1_dropShadow_2347_15543'
                    />
                    <feColorMatrix
                      in='SourceAlpha'
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                      result='hardAlpha'
                    />
                    <feOffset dx='4' dy='8' />
                    <feGaussianBlur stdDeviation='4.5' />
                    <feColorMatrix
                      type='matrix'
                      values='0 0 0 0 0.113725 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.17 0'
                    />
                    <feBlend
                      mode='normal'
                      in2='effect1_dropShadow_2347_15543'
                      result='effect2_dropShadow_2347_15543'
                    />
                    <feColorMatrix
                      in='SourceAlpha'
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                      result='hardAlpha'
                    />
                    <feOffset dx='9' dy='18' />
                    <feGaussianBlur stdDeviation='6' />
                    <feColorMatrix
                      type='matrix'
                      values='0 0 0 0 0.113725 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.1 0'
                    />
                    <feBlend
                      mode='normal'
                      in2='effect2_dropShadow_2347_15543'
                      result='effect3_dropShadow_2347_15543'
                    />
                    <feColorMatrix
                      in='SourceAlpha'
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                      result='hardAlpha'
                    />
                    <feOffset dx='15' dy='32' />
                    <feGaussianBlur stdDeviation='7' />
                    <feColorMatrix
                      type='matrix'
                      values='0 0 0 0 0.113725 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.03 0'
                    />
                    <feBlend
                      mode='normal'
                      in2='effect3_dropShadow_2347_15543'
                      result='effect4_dropShadow_2347_15543'
                    />
                    <feBlend
                      mode='normal'
                      in='SourceGraphic'
                      in2='effect4_dropShadow_2347_15543'
                      result='shape'
                    />
                  </filter>
                </defs>
              </svg>
            </div>
            <p
              className='text-black text-lg font-bold'
              style={{
                textShadow:
                  '24px 50px 16px rgba(29, 104, 255, 0.00), 15px 32px 14px rgba(29, 104, 255, 0.03), 9px 18px 12px rgba(29, 104, 255, 0.10), 4px 8px 9px rgba(29, 104, 255, 0.17), 1px 2px 5px rgba(29, 104, 255, 0.20)',
              }}
            >
              <span className='text-[#1D68FF]'>{username}</span>님의 마이메디컬리포트{' '}
              {selectedRound} 건강 상태를 반영하여
              <br />
              <span className='text-[#1D68FF]'>마이메디 AI</span>가 분석한 건강검진결과입니다.
            </p>
          </div>

          {/* 주요 이상 수치 Section */}
          <div className='mb-8 ml-[-30px]'>
            <div className='flex items-center gap-4 mb-4 mt-[80px] mb-[32px]'>
              <h2
                className='ml-[60px] text-blue-600 text-[24px] font-bold'
                style={{
                  textShadow:
                    '24px 50px 16px rgba(29, 104, 255, 0.00), 15px 32px 14px rgba(29, 104, 255, 0.03), 9px 18px 12px rgba(29, 104, 255, 0.10), 4px 8px 9px rgba(29, 104, 255, 0.17), 1px 2px 5px rgba(29, 104, 255, 0.20)',
                }}
              >
                주요 이상 수치
              </h2>
              {/* 설명 문구 제거: 하드코딩 텍스트 삭제 */}
            </div>

            <div className='space-y-3'>
              {llmData?.majorAbnormalItems?.map((text, idx) => (
                <div key={`abnormal-${idx}`} className='flex items-start gap-3 ml-[60px] mb-[24px]'>
                  <div className='w-[11px] h-[11px] bg-[#1D68FF] rounded mt-2 flex-shrink-0'></div>
                  <div className='text-black font-normal text-[20px]'>{text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 생활 습관 제안 Section */}
          <div className='mb-8 ml-[-30px]'>
            <div className='flex items-center gap-4 mb-4 mt-[80px] mb-[32px]'>
              <h2
                className='ml-[60px] text-blue-600 text-[24px] font-bold'
                style={{
                  textShadow:
                    '24px 50px 16px rgba(29, 104, 255, 0.00), 15px 32px 14px rgba(29, 104, 255, 0.03), 9px 18px 12px rgba(29, 104, 255, 0.10), 4px 8px 9px rgba(29, 104, 255, 0.17), 1px 2px 5px rgba(29, 104, 255, 0.20)',
                }}
              >
                생활 습관 제안
              </h2>
              {/* 설명 문구 제거: 하드코딩 텍스트 삭제 */}
            </div>

            <div className='space-y-[3.125rem] ml-[60px]'>
              <div className='w-[1069px]'>
                <div
                  className='rounded-[0.875rem] p-[2px] bg-[linear-gradient(149deg,#FFFFFF_20%,#DBE6FF_100%)]'
                  style={{
                    boxShadow:
                      '0 0 6px 2px rgba(29,104,255,0.08), 0 0 11px 6px rgba(29,104,255,0.05), 0 0 15px 4px rgba(29,104,255,0.03), 0 0 18px 3px rgba(29,104,255,0.01)'
                  }}
                >
                  <div className='relative rounded-[0.875rem] bg-[#F6F9FF] pl-[28px] pr-[28px] pt-[34px] pb-[34px]'>
                    <h3 className='absolute left-4 top-0 -translate-y-1/2 text-[#1D68FF] text-[20px] font-semibold tracking-[-3%]'>식습관</h3>
                    <p className='text-[#25282B] text-[20px] leading-[36px] font-medium tracking-[-3%] mt-1'>
                      {llmData?.lifestyleAdvice?.[0] || ''}
                    </p>
                  </div>
                </div>
              </div>

              <div className='w-[1069px]'>
                <div
                  className='rounded-[0.875rem] p-[2px] bg-[linear-gradient(149deg,#FFFFFF_20%,#DBE6FF_100%)]'
                  style={{
                    boxShadow:
                      '0 0 6px 2px rgba(29,104,255,0.08), 0 0 11px 6px rgba(29,104,255,0.05), 0 0 15px 4px rgba(29,104,255,0.03), 0 0 18px 3px rgba(29,104,255,0.01)'
                  }}
                >
                  <div className='relative rounded-[0.875rem] bg-[#F6F9FF] pl-[28px] pr-[28px] pt-[34px] pb-[34px]'>
                    <h3 className='absolute left-4 top-0 -translate-y-1/2 text-[#1D68FF] text-[20px] font-semibold tracking-[-3%]'>운동</h3>
                    <p className='text-[#25282B] text-[20px] leading-[36px] font-medium tracking-[-3%] mt-1'>
                      {llmData?.lifestyleAdvice?.[1] || ''}
                    </p>
                  </div>
                </div>
              </div>

              <div className='w-[1069px]'>
                <div
                  className='rounded-[0.875rem] p-[2px] bg-[linear-gradient(149deg,#FFFFFF_20%,#DBE6FF_100%)]'
                  style={{
                    boxShadow:
                      '0 0 6px 2px rgba(29,104,255,0.08), 0 0 11px 6px rgba(29,104,255,0.05), 0 0 15px 4px rgba(29,104,255,0.03), 0 0 18px 3px rgba(29,104,255,0.01)'
                  }}
                >
                  <div className='relative rounded-[0.875rem] bg-[#F6F9FF] pl-[28px] pr-[28px] pt-[34px] pb-[34px]'>
                    <h3 className='absolute left-4 top-0 -translate-y-1/2 text-[#1D68FF] text-[20px] font-semibold tracking-[-3%]'>카페인/음주 습관</h3>
                    <p className='text-[#25282B] text-[20px] leading-[36px] font-medium tracking-[-3%] mt-1'>
                      {llmData?.lifestyleAdvice?.[2] || ''}
                    </p>
                  </div>
                </div>
              </div>

              <div className='w-[1069px]'>
                <div
                  className='rounded-[0.875rem] p-[2px] bg-[linear-gradient(149deg,#FFFFFF_20%,#DBE6FF_100%)]'
                  style={{
                    boxShadow:
                      '0 0 6px 2px rgba(29,104,255,0.08), 0 0 11px 6px rgba(29,104,255,0.05), 0 0 15px 4px rgba(29,104,255,0.03), 0 0 18px 3px rgba(29,104,255,0.01)'
                  }}
                >
                  <div className='relative rounded-[0.875rem] bg-[#F6F9FF] pl-[28px] pr-[28px] pt-[34px] pb-[34px]'>
                    <h3 className='absolute left-4 top-0 -translate-y-1/2 text-[#1D68FF] text-[20px] font-semibold tracking-[-3%]'>수면</h3>
                    <p className='text-[#25282B] text-[20px] leading-[36px] font-medium tracking-[-3%] mt-1'>
                      {llmData?.lifestyleAdvice?.[3] || ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 발병 위험순위 TOP 3 Section */}
          <div className='mb-8 mt-[80px] ml-[-30px]'>
            <div className='flex items-center gap-4 mb-4 mt-[80px] mb-[32px]'>
              <h2
                className='ml-[60px] text-blue-600 text-[24px] font-bold'
                style={{
                  textShadow:
                    '24px 50px 16px rgba(29, 104, 255, 0.00), 15px 32px 14px rgba(29, 104, 255, 0.03), 9px 18px 12px rgba(29, 104, 255, 0.10), 4px 8px 9px rgba(29, 104, 255, 0.17), 1px 2px 5px rgba(29, 104, 255, 0.20)',
                }}
              >
                발병 위험순위 TOP 3
              </h2>
              {/* 설명 문구 제거: 하드코딩 텍스트 삭제 */}
            </div>

            <div className='space-y-4'>
              {llmData?.top3Risks?.map((risk) => (
                <div key={`risk-${risk.rank}`} className='mb-[32px]'>
                  <div className='flex items-center gap-[25px] mb-[8px]'>
                    <span className='text-[#1D68FF] font-bold text-[20px] ml-[60px]'>
                      {risk.rank}위
                    </span>
                    <h3 className='text-black font-bold text-[20px]'>{risk.title}</h3>
                    <span className='text-gray-600 text-[16px]'>{risk.indicators}</span>
                  </div>
                  <p className='text-black ml-[110px]'>{risk.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 종합 분석 결과 Section */}
          <div className='mb-8 mt-[80px]'>
            <div
              className='bg-[#F6F9FF] rounded-[32px] w-[1050px] p-[25px] mx-auto mb-[40px]'
              style={{
                filter:
                  'drop-shadow(0 0 6px rgba(29, 104, 255, 0.10)) drop-shadow(0 0 11px rgba(29, 104, 255, 0.06)) drop-shadow(0 0 15px rgba(29, 104, 255, 0.03)) drop-shadow(0 0 18px rgba(29, 104, 255, 0.01)) drop-shadow(0 0 20px rgba(29, 104, 255, 0.00))',
              }}
            >
              <h2
                className='text-[#1D68FF] text-[24px] font-extrabold text-center mb-[24px]'
                style={{
                  textShadow:
                    '0px 4px 8px rgba(29, 104, 255, 0.3), 0px 2px 4px rgba(29, 104, 255, 0.15)',
                }}
              >
                종합 분석 결과
              </h2>

              <div className='space-y-2 text-black text-[20px] text-center leading-relaxed'>
                {llmData?.summary && (
                  <p className='text-center text-[20px] leading-[36px] tracking-[-3%]'>{llmData.summary}</p>
                )}
              </div>
            </div>

            <div className='mt-6 space-y-2 flex flex-col items-center'>
              {llmData?.recommendedActions?.map((action, idx) => (
                <div key={`action-${idx}`} className='flex items-center gap-2'>
                  <span className='text-[#82ABFD] text-[20px]'>→ {action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 전문가 찾기 버튼 */}
          <div className='text-center mt-[32px]'>
            <button
              className='text-[24px] w-[300px] h-[60px] bg-[#1D68FF] text-white px-[40px] py-[20px] rounded-[60px] font-medium flex items-center justify-center gap-2 mx-auto hover:bg-blue-700 transition-colors'
              onClick={handleFindExpert}
            >
              <div>전문가 찾기</div>
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
      </div>
    </div>
  );
};

export default MedicalReport;
