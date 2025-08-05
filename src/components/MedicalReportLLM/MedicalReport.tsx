import React from 'react';

interface MedicalReportProps {
  username?: string;
  currentRound?: string;
}

const MedicalReport: React.FC<MedicalReportProps> = ({ 
  username = "", 
  currentRound = "" 
}) => {
  return (
    <div className="min-h-screen p-8">
      <div className="bg-[#DBE6FF] rounded-[20px] shadow-lg p-8 mx-auto w-[1200px]">
        <div className="bg-white rounded-[20px] p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="227" height="83" viewBox="0 0 227 83" fill="none">
            <g filter="url(#filter0_dddd_2347_15543)">
              <path d="M5 5.21652C5 4.11195 5.89543 3.21651 7 3.21651H11.5663C12.3646 3.21651 13.0864 3.6912 13.4027 4.42414L23.4724 27.7609H23.9158L33.9856 4.42413C34.3018 3.6912 35.0236 3.21651 35.8219 3.21651H40.3882C41.4928 3.21651 42.3882 4.11194 42.3882 5.21651V35C42.3882 36.1046 41.4928 37 40.3882 37H38.2307C37.1262 37 36.2307 36.1046 36.2307 35V13.7622H35.8859L26.5038 35.6933C26.1889 36.4293 25.4655 36.9067 24.665 36.9067H22.7253C21.9238 36.9067 21.1996 36.4281 20.8854 35.6906L11.5023 13.6689H11.2067V35C11.2067 36.1046 10.3113 37 9.20674 37H7C5.89543 37 5 36.1046 5 35V5.21652Z" fill="#1D68FF"/>
              <path d="M48.4012 6.26451C47.5814 4.93196 48.5401 3.21651 50.1047 3.21651H52.6223C53.3316 3.21651 53.9878 3.59216 54.347 4.20378L62.5355 18.1484H62.8803L71.0688 4.20378C71.428 3.59216 72.0842 3.21651 72.7934 3.21651H75.3182C76.8812 3.21651 77.8402 4.92898 77.0234 6.26162L65.9344 24.3545V35C65.9344 36.1046 65.039 37 63.9344 37H61.5306C60.4261 37 59.5306 36.1046 59.5306 35V24.3545L48.4012 6.26451Z" fill="#1D68FF"/>
              <path d="M83.0276 5.21652C83.0276 4.11195 83.923 3.21651 85.0276 3.21651H89.5939C90.3922 3.21651 91.114 3.6912 91.4302 4.42414L101.5 27.7609H101.943L112.013 4.42413C112.329 3.6912 113.051 3.21651 113.849 3.21651H118.416C119.52 3.21651 120.416 4.11194 120.416 5.21651V35C120.416 36.1046 119.52 37 118.416 37H116.258C115.154 37 114.258 36.1046 114.258 35V13.7622H113.913L104.531 35.6933C104.216 36.4293 103.493 36.9067 102.693 36.9067H100.753C99.9513 36.9067 99.2272 36.4281 98.913 35.6906L89.5299 13.6689H89.2343V35C89.2343 36.1046 88.3389 37 87.2343 37H85.0276C83.923 37 83.0276 36.1046 83.0276 35V5.21652Z" fill="#1D68FF"/>
              <path d="M129.017 37C127.912 37 127.017 36.1046 127.017 35V5.21652C127.017 4.11195 127.912 3.21651 129.017 3.21651H148.218C149.323 3.21651 150.218 4.11194 150.218 5.21651V6.3027C150.218 7.40727 149.323 8.3027 148.218 8.3027H133.42V17.5418H146.986C148.091 17.5418 148.986 18.4373 148.986 19.5418V20.628C148.986 21.7326 148.091 22.628 146.986 22.628H133.42V31.8672H148.316C149.421 31.8672 150.316 32.7626 150.316 33.8671V35C150.316 36.1046 149.421 37 148.316 37H129.017Z" fill="#1D68FF"/>
              <path d="M168.493 37H158.375C157.271 37 156.375 36.1046 156.375 35V5.21652C156.375 4.11195 157.271 3.21651 158.375 3.21651H168.69C179.331 3.21651 185.784 9.56258 185.784 20.0616C185.784 30.6073 179.331 37 168.493 37ZM162.779 31.7272H168.149C175.587 31.7272 179.38 27.8542 179.38 20.0616C179.38 12.3157 175.587 8.48935 168.346 8.48935H162.779V31.7272Z" fill="#1D68FF"/>
              <path d="M193.153 37C192.048 37 191.153 36.1046 191.153 35V15.0791C191.153 13.9745 192.048 13.0791 193.153 13.0791H195.458C196.563 13.0791 197.458 13.9745 197.458 15.0791V35C197.458 36.1046 196.563 37 195.458 37H193.153ZM194.355 9.48606C192.384 9.48606 190.71 8.03953 190.71 6.2197C190.71 4.44653 192.384 3 194.355 3C196.374 3 198 4.44653 198 6.2197C198 8.03953 196.374 9.48606 194.355 9.48606Z" fill="#1D68FF"/>
            </g>
            <defs>
              <filter id="filter0_dddd_2347_15543" x="0" y="0" width="227" height="83" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="1" dy="2"/>
                <feGaussianBlur stdDeviation="2.5"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.113725 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.2 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2347_15543"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="4" dy="8"/>
                <feGaussianBlur stdDeviation="4.5"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.113725 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.17 0"/>
                <feBlend mode="normal" in2="effect1_dropShadow_2347_15543" result="effect2_dropShadow_2347_15543"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="9" dy="18"/>
                <feGaussianBlur stdDeviation="6"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.113725 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.1 0"/>
                <feBlend mode="normal" in2="effect2_dropShadow_2347_15543" result="effect3_dropShadow_2347_15543"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="15" dy="32"/>
                <feGaussianBlur stdDeviation="7"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.113725 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.03 0"/>
                <feBlend mode="normal" in2="effect3_dropShadow_2347_15543" result="effect4_dropShadow_2347_15543"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect4_dropShadow_2347_15543" result="shape"/>
              </filter>
            </defs>
          </svg>
        </div>
                  <p className="text-black text-lg font-bold" style={{
            textShadow: '24px 50px 16px rgba(29, 104, 255, 0.00), 15px 32px 14px rgba(29, 104, 255, 0.03), 9px 18px 12px rgba(29, 104, 255, 0.10), 4px 8px 9px rgba(29, 104, 255, 0.17), 1px 2px 5px rgba(29, 104, 255, 0.20)'
          }}>
            <span className="text-[#1D68FF]">{username}</span>님의 마이메디컬리포트 {currentRound} 건강 상태를 반영하여<br />
            <span className="text-[#1D68FF]">마이메디 AI</span>가 분석한 건강검진결과입니다.
          </p>
      </div>

      {/* 주요 이상 수치 Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4 mt-[80px] mb-[32px]">
          <h2 className="ml-[60px] text-blue-600 text-[24px] font-bold" style={{
            textShadow: '24px 50px 16px rgba(29, 104, 255, 0.00), 15px 32px 14px rgba(29, 104, 255, 0.03), 9px 18px 12px rgba(29, 104, 255, 0.10), 4px 8px 9px rgba(29, 104, 255, 0.17), 1px 2px 5px rgba(29, 104, 255, 0.20)'
          }}>주요 이상 수치</h2>
          <span className="text-gray-500 text-[18px]">현재 건강검진 결과를 바탕으로, 다음과 같은 수치에서 주의가 필요해 보여요!</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 ml-[60px] mb-[24px]">
            <div className="w-[11px] h-[11px] bg-[#1D68FF] rounded mt-2 flex-shrink-0"></div>
            <div>
              <span className="text-black font-normal text-[20px]">공복혈당:</span>
              <span className="text-black font-normal text-[20px]"> 107 mg/dL → 정상기준 (70~99)을 초과해 당뇨 전단계로 분류됩니다.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3 ml-[60px] mb-[24px]">
            <div className="w-[11px] h-[11px] bg-[#1D68FF] rounded mt-2 flex-shrink-0"></div>
            <div>
              <span className="text-black font-normal text-[20px]">LDL콜레스테롤:</span>
              <span className="text-black font-normal text-[20px]"> 153 mg/dL → 경계 수치로, 심혈관 질환 위험이 조금씩 생기기 시작한 상태에요.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3 ml-[60px] mb-[24px]">
            <div className="w-[11px] h-[11px] bg-[#1D68FF] rounded mt-2 flex-shrink-0"></div>
            <div>
              <span className="text-black font-normal text-[20px]">중성지방:</span>
              <span className="text-black font-normal text-[20px]"> 186 mg/dL → 높은 편으로, 특히 식습관과 관련이 많아요.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3 ml-[60px] mb-[24px]">
            <div className="w-[11px] h-[11px] bg-[#1D68FF] rounded mt-2 flex-shrink-0"></div>
            <div>
              <span className="text-black font-normal text-[20px]">ALT (간 수치):</span>
              <span className="text-black font-normal text-[20px]"> 42 IU/L → 간 기능 이상을 의심할 수 있어요.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3 ml-[60px] mb-[24px]">
            <div className="w-[11px] h-[11px] bg-[#1D68FF] rounded mt-2 flex-shrink-0"></div>
            <div>
              <span className="text-black font-normal text-[20px]">BMI:</span>
              <span className="text-black font-normal text-[20px]"> 26.1 → 과체중 범위로, 체중관리가 필요할 수 있어요.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3 ml-[60px] mb-[24px]">
            <div className="w-[11px] h-[11px] bg-[#1D68FF] rounded mt-2 flex-shrink-0"></div>
            <div>
              <span className="text-black font-normal text-[20px]">혈압:</span>
              <span className="text-black font-normal text-[20px]"> 132/87 mmHg → 고혈압 전단계입니다.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 생활 습관 제안 Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4 mt-[80px] mb-[32px]">
          <h2 className="ml-[60px] text-blue-600 text-[24px] font-bold" style={{
            textShadow: '24px 50px 16px rgba(29, 104, 255, 0.00), 15px 32px 14px rgba(29, 104, 255, 0.03), 9px 18px 12px rgba(29, 104, 255, 0.10), 4px 8px 9px rgba(29, 104, 255, 0.17), 1px 2px 5px rgba(29, 104, 255, 0.20)'
          }}>생활 습관 제안</h2>
          <span className="text-gray-500 text-[18px]">최근 건강상태와 수치를 종합해봤을 때, 다음과 같은 생활습관 개선이 도움이 될 것 같아요.</span>
        </div>
        
          <div className="space-y-4 ml-[60px]">
           <div className="mb-[32px] bg-[#F6F9FF] rounded-lg w-[950px] p-4 border-2 border-white" style={{
             filter: 'drop-shadow(0 0 6px rgba(29, 104, 255, 0.10)) drop-shadow(0 0 11px rgba(29, 104, 255, 0.06)) drop-shadow(0 0 15px rgba(29, 104, 255, 0.03)) drop-shadow(0 0 18px rgba(29, 104, 255, 0.01)) drop-shadow(0 0 20px rgba(29, 104, 255, 0.00))'
           }}>
            <h3 className="text-[#1D68FF] text-[20px] font-medium mb-2">식습관</h3>
            <p className="text-black text-[20px]">
              야식이나 당류 위주의 식사가 잡다면, 공복혈당과 중성지방 수치를 올릴 수 있어요. 하루 1끼 채소 중심 식단으로 바꿔보는 건 어떨까요?
            </p>
          </div>
          
                     <div className="mb-[32px] bg-[#F6F9FF] rounded-lg w-[950px] p-4 border-2 border-white" style={{
             filter: 'drop-shadow(0 0 6px rgba(29, 104, 255, 0.10)) drop-shadow(0 0 11px rgba(29, 104, 255, 0.06)) drop-shadow(0 0 15px rgba(29, 104, 255, 0.03)) drop-shadow(0 0 18px rgba(29, 104, 255, 0.01)) drop-shadow(0 0 20px rgba(29, 104, 255, 0.00))'
           }}>
            <h3 className="text-[#1D68FF] text-[20px] font-medium mb-2">운동</h3>
            <p className="text-black text-[20px]">
              현재 활동량이 적다면, 걷기부터라도 시작해보세요. 주 3회 이상, 30분 정도의 유산소 운동이 간 수치와 혈당 조절에 큰 도움이 돼요.
            </p>
          </div>
          
                     <div className="mb-[32px] bg-[#F6F9FF] rounded-lg w-[950px] p-4 border-2 border-white" style={{
             filter: 'drop-shadow(0 0 6px rgba(29, 104, 255, 0.10)) drop-shadow(0 0 11px rgba(29, 104, 255, 0.06)) drop-shadow(0 0 15px rgba(29, 104, 255, 0.03)) drop-shadow(0 0 18px rgba(29, 104, 255, 0.01)) drop-shadow(0 0 20px rgba(29, 104, 255, 0.00))'
           }}>
            <h3 className="text-[#1D68FF] text-[20px] font-medium mb-2">카페인/음주 습관</h3>
            <p className="text-black text-[20px]">
              음주나 잦은 카페인 섭취는 간수치와 체중 증가에 영향을 줄 수 있어요. 음주는 주 1회 이하, 하루 1~2잔 이내로 조절하는 걸 추천드려요.
            </p>
          </div>
          
                     <div className=" bg-[#F6F9FF] rounded-lg w-[950px] p-4 border-2 border-white" style={{
             filter: 'drop-shadow(0 0 6px rgba(29, 104, 255, 0.10)) drop-shadow(0 0 11px rgba(29, 104, 255, 0.06)) drop-shadow(0 0 15px rgba(29, 104, 255, 0.03)) drop-shadow(0 0 18px rgba(29, 104, 255, 0.01)) drop-shadow(0 0 20px rgba(29, 104, 255, 0.00))'
           }}>
            <h3 className="text-[#1D68FF] text-[20px] font-medium mb-2">수면</h3>
            <p className="text-black text-[20px]">
              만성피로를 느끼시나요? 수면 시간이 부족하면 혈압과 혈당 모두 영향을 받을 수 있어요. 매일 6~7시간 이상의 숙면이 중요해요.
            </p>
          </div>
        </div>
      </div>

      {/* 발병 위험순위 TOP 3 Section */}
      <div className="mb-8 mt-[80px]">
        <div className="flex items-center gap-4 mb-4 mt-[80px] mb-[32px]">
          <h2 className="ml-[60px] text-blue-600 text-[24px] font-bold" style={{
            textShadow: '24px 50px 16px rgba(29, 104, 255, 0.00), 15px 32px 14px rgba(29, 104, 255, 0.03), 9px 18px 12px rgba(29, 104, 255, 0.10), 4px 8px 9px rgba(29, 104, 255, 0.17), 1px 2px 5px rgba(29, 104, 255, 0.20)'
          }}>발병 위험순위 TOP 3</h2>
          <span className="text-gray-500 text-[18px]">검진 결과를 바탕으로, 특히 주의가 필요한 건강 이슈를 TOP3로 정리했어요!</span>
        </div>
        
                  <div className="space-y-4">
           <div className="mb-[32px]">
              <div className="flex items-center gap-[25px] mb-[8px]">
                <span className="text-[#1D68FF] font-bold text-[20px] ml-[60px]">1위</span>
                <h3 className="text-black font-bold text-[20px]">대사증후군</h3>
                <span className="text-gray-600 text-[16px]">(공복혈당 ↑, 중성지방 ↑, HDL ↓, 복부비만(BMI 기준))</span>
              </div>
              <p className="text-black ml-[110px]">
                여러 지표가 함께 경고를 보내고 있어요. 특히 HDL(좋은 콜레스테롤) 수치가 낮은 것은 체내 지방 대사에 문제가 있다는 신호입니다. 지금부터 식단 개선과 유산소 운동이 필요해요!
              </p>
            </div>
            
           <div className="mb-[32px]">
              <div className="flex items-center gap-[25px] mb-[8px]">
                <span className="text-[#1D68FF] font-bold text-[20px] ml-[60px]">2위</span>
                <h3 className="text-black font-bold text-[20px]">알콜성 지방간</h3>
                <span className="text-gray-600 text-[16px]">(AST/ALT ↑, 감마-GTP ↑)</span>
              </div>
              <p className="text-black ml-[110px]">
                간 수치가 전반적으로 높고, 술을 거의 마시지 않는다면 지방간 가능성을 의심할 수 있어요. 기름진 음식, 야식 등을 줄이고 간 해독을 위한 영양관리도 필요해요.
              </p>
            </div>
            
           <div className="mb-[80px]">
              <div className="flex items-center gap-[25px] mb-[8px]">
                <span className="text-[#1D68FF] font-bold text-[20px] ml-[60px]">3위</span>
                <h3 className="text-black font-bold text-[20px]">만성 신장 기능 저하 위험</h3>
                <span className="text-gray-600 text-[16px]">(크레아티닌 ↑, eGFR ↓)</span>
              </div>
              <p className="text-black ml-[110px]">
                현재로선 심각한 단계는 아니지만, 사구체여과율(eGFR) 이 살짝 낮아요. 평소 수분 섭취량과 단백질 섭취량을 점검하고, 앞으로도 꾸준한 모니터링이 필요해요.
              </p>
            </div>
          </div>
      </div>

      {/* 종합 분석 결과 Section */}
      <div className="mb-8 mt-[80px]">
        <div className="bg-[#F6F9FF] rounded-[32px] w-[950px] p-[25px] mx-auto mb-[40px]" 
        style={{filter: 'drop-shadow(0 0 6px rgba(29, 104, 255, 0.10)) drop-shadow(0 0 11px rgba(29, 104, 255, 0.06)) drop-shadow(0 0 15px rgba(29, 104, 255, 0.03)) drop-shadow(0 0 18px rgba(29, 104, 255, 0.01)) drop-shadow(0 0 20px rgba(29, 104, 255, 0.00))',
        }}>
          <h2 className="text-[#1D68FF] text-[24px] font-extrabold text-center mb-[24px]" style={{ textShadow:'0px 4px 8px rgba(29, 104, 255, 0.3), 0px 2px 4px rgba(29, 104, 255, 0.15)'}}>
            종합 분석 결과
          </h2>

          <div className="space-y-2 text-black text-[20px] text-center leading-relaxed">
            <p>전체적으로 보면, 지금은 건강을 다시 한 번 점검해야 할 시기인 것 같아요.</p>
            <p>아직은 대부분 경고 단계이지만 관리로 충분히 회복 가능한 상태입니다.</p>
            <p>
              특히 혈당, 중성지방, 간 수치가 동시에 높게 나온 경우는{' '}
              <span className="text-[#1D68FF] font-bold">
                생활 습관과 식단의 영향을 강하게 받고 있다는 신호예요!!
              </span>
            </p>
            <p>지금부터 차근차근 바꿔나간다면 건강을 충분히 회복할 수 있어요!</p>
          </div>
        </div>

        
        <div className="mt-6 space-y-2 flex flex-col items-center">
          <div className="flex items-center gap-2">
            <span className="text-[#82ABFD] text-[20px]">→ 영양사와 상담을 통해 식단 가이드를 받아보시고,</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#82ABFD] text-[20px]">→ 운동처방사와 함께 운동 루틴을 짜보는 것도 좋아요.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#82ABFD] text-[20px]">→ 향후 6개월 뒤 재검진을 통해 변화된 수치를 체크해보는 걸 추천드려요!</span>
          </div>
        </div>
      </div>

              {/* 전문가 찾기 버튼 */}
        <div className="text-center mt-[32px]">
          <button className="text-[24px] w-[300px] h-[60px] bg-[#1D68FF] text-white px-[40px] py-[20px] rounded-[60px] font-medium flex items-center justify-center gap-2 mx-auto hover:bg-blue-700 transition-colors">
            <div>전문가 찾기</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="20" viewBox="0 0 13 20" fill="none">
              <path d="M2.44995 1.90039L10.55 10.0004L2.44995 18.1004" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalReport; 