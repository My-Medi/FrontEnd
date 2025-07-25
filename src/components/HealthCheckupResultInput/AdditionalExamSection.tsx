import React from 'react';

// 커스텀 체크박스 컴포넌트 직접 정의
const CustomCheckbox = ({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) => (
  <label className="inline-flex items-center cursor-pointer select-none">
    <input type="checkbox" checked={checked} onChange={onChange} className="hidden" />
    <span className="w-6 h-6 flex items-center justify-center rounded-[6px] border border-[#1D68FF] mr-2" style={{ background: checked ? '#1D68FF' : '#fff' }}>
      {checked && (
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
          <rect y="0.75" width="22.5" height="22.5" rx="6" fill="#1D68FF"/>
          <path d="M6.75 11.6509L10.2553 15L15.75 9.75" stroke="white" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </span>
    <span className="text-base text-gray-700">{label}</span>
  </label>
);

interface AdditionalExamSectionProps {
  value: '해당' | '미해당';
  onChange: (v: '해당' | '미해당') => void;
  detail: any;
  setDetail: (d: any) => void;
}

const examList = [
  { key: 'hepatitis', label: 'B형 간염' },
  { key: 'depression', label: '우울증' },
  { key: 'cognitive', label: '인지기능장애' },
  { key: 'bone', label: '골밀도검사' },
  { key: 'seniorPhysical', label: '노인신체기능검사' },
  { key: 'seniorFunction', label: '노인기능평가' },
];

const AdditionalExamSection: React.FC<AdditionalExamSectionProps> = ({ value, onChange, detail, setDetail }) => {
  return (
    <div className="mb-10">
<div className={`flex items-center rounded-[14px] px-6 py-2 border-2 border-solid border-[#DBE6FF] ${value === '해당' ? 'bg-[#DBE6FF]' : 'bg-white'}`}>
        <label className="w-40  font-bold text-base">추가검사</label>
        <div className="flex gap-10 ml-10">
          {['해당', '미해당'].map((v) => (
            <CustomCheckbox key={v} checked={value === v} onChange={() => onChange(v as '해당' | '미해당')} label={v} />
          ))}
        </div>
      </div>
      {value === '해당' && (
        <div className="mt-4 bg-white rounded-[14px] p-6">
          {/* 각 추가검사 항목 반복 */}
          {examList.map((exam, idx) => (
            <div
              key={exam.key}
              className={`flex items-start mb-6 ${idx !== examList.length - 1 ? 'border-b-2 border-[#eaf1ff] pb-6' : ''}`}
            >
              {/* 해당 체크박스 */}
              <div className="flex items-center min-w-[60px] pt-1">
                <CustomCheckbox
                  checked={!!detail[exam.key]?.checked}
                  onChange={() => setDetail({ ...detail, [exam.key]: { ...detail[exam.key], checked: !detail[exam.key]?.checked } })}
                  label="해당"
                />
              </div>
              {/* 검사명 */}
              <div className="ml-40 min-w-[110px] font-medium text-gray-800 pt-1">{exam.label}</div>
              {/* 세부 옵션: B형간염 */}
              {exam.key === 'hepatitis' && (
                <div className="ml-10 flex flex-wrap gap-4">
                  <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-medium text-gray-700 w-15">포면항원</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="40" viewBox="0 0 4 40" fill="none" className="mr-4">
                      <path d="M2 2V38" stroke="#DBE6FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6"/>
                    </svg>
                  <CustomCheckbox checked={!!detail.hepatitis?.antigenGeneral} onChange={() => setDetail({ ...detail, hepatitis: { ...detail.hepatitis, antigenGeneral: !detail.hepatitis?.antigenGeneral } })} label="일반" />
                  <CustomCheckbox checked={!!detail.hepatitis?.antigenDetail} onChange={() => setDetail({ ...detail, hepatitis: { ...detail.hepatitis, antigenDetail: !detail.hepatitis?.antigenDetail } })} label="정밀" />

                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-medium text-gray-700 w-15">표면항체</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="40" viewBox="0 0 4 40" fill="none" className="mr-4">
                      <path d="M2 2V38" stroke="#DBE6FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6"/>
                    </svg>
                    <CustomCheckbox checked={!!detail.hepatitis?.antibodyGeneral} onChange={() => setDetail({ ...detail, hepatitis: { ...detail.hepatitis, antibodyGeneral: !detail.hepatitis?.antibodyGeneral } })} label="일반" />
                    <CustomCheckbox checked={!!detail.hepatitis?.antibodyDetail} onChange={() => setDetail({ ...detail, hepatitis: { ...detail.hepatitis, antibodyDetail: !detail.hepatitis?.antibodyDetail } })} label="정밀" />
                  </div>
                  <div className="flex items-center gap-10">
                  <CustomCheckbox checked={!!detail.hepatitis?.hasAntibody} onChange={() => setDetail({ ...detail, hepatitis: { ...detail.hepatitis, hasAntibody: !detail.hepatitis?.hasAntibody } })} label="항체 있음" />
                  <CustomCheckbox checked={!!detail.hepatitis?.noAntibody} onChange={() => setDetail({ ...detail, hepatitis: { ...detail.hepatitis, noAntibody: !detail.hepatitis?.noAntibody } })} label="항체 없음" />
                  <CustomCheckbox checked={!!detail.hepatitis?.suspectCarrier} onChange={() => setDetail({ ...detail, hepatitis: { ...detail.hepatitis, suspectCarrier: !detail.hepatitis?.suspectCarrier } })} label="B형 간염 보유자 의심" />
                  <CustomCheckbox checked={!!detail.hepatitis?.judgement} onChange={() => setDetail({ ...detail, hepatitis: { ...detail.hepatitis, judgement: !detail.hepatitis?.judgement } })} label="판정보류" />
                </div>
                  </div>

                  </div>
              )}
              {/* 세부 옵션: 우울증 */}
              {exam.key === 'depression' && (
                <div className="flex flex-col gap-4">
                  <div className="ml-10 flex flex-wrap gap-19">
                    <CustomCheckbox checked={!!detail.depression?.none} onChange={() => setDetail({ ...detail, depression: { ...detail.depression, none: !detail.depression?.none } })} label="우울증상이 없음" />
                    <CustomCheckbox checked={!!detail.depression?.mild} onChange={() => setDetail({ ...detail, depression: { ...detail.depression, mild: !detail.depression?.mild } })} label="가벼운 우울증상" />
                   </div>
                  <div className="ml-10 flex flex-wrap gap-10">
                    <CustomCheckbox checked={!!detail.depression?.moderate} onChange={() => setDetail({ ...detail, depression: { ...detail.depression, moderate: !detail.depression?.moderate } })} label="중간 정도 우울증 의심" />
                    <CustomCheckbox checked={!!detail.depression?.severe} onChange={() => setDetail({ ...detail, depression: { ...detail.depression, severe: !detail.depression?.severe } })} label="심한 우울증 의심" />
                  </div>
                </div>
              )}
              {/* 세부 옵션: 인지기능장애 */}
              {exam.key === 'cognitive' && (
                <div className="ml-10 flex flex-wrap gap-10">
                  <CustomCheckbox checked={!!detail.cognitive?.none} onChange={() => setDetail({ ...detail, cognitive: { ...detail.cognitive, none: !detail.cognitive?.none } })} label="특이소견 없음" />
                  <CustomCheckbox checked={!!detail.cognitive?.suspect} onChange={() => setDetail({ ...detail, cognitive: { ...detail.cognitive, suspect: !detail.cognitive?.suspect } })} label="인지기능 저하 의심" />
                </div>
              )}
              {/* 세부 옵션: 골밀도검사 */}
              {exam.key === 'bone' && (
                <div className="ml-10 flex flex-wrap gap-10">
                  <CustomCheckbox checked={!!detail.bone?.normal} onChange={() => setDetail({ ...detail, bone: { ...detail.bone, normal: !detail.bone?.normal } })} label="정상" />
                  <CustomCheckbox checked={!!detail.bone?.osteopenia} onChange={() => setDetail({ ...detail, bone: { ...detail.bone, osteopenia: !detail.bone?.osteopenia } })} label="골감소증" />
                  <CustomCheckbox checked={!!detail.bone?.osteoporosis} onChange={() => setDetail({ ...detail, bone: { ...detail.bone, osteoporosis: !detail.bone?.osteoporosis } })} label="골다공증" />
                </div>
              )}
              {/* 세부 옵션: 노인신체기능검사 */}
              {exam.key === 'seniorPhysical' && (
                <div className="ml-10 flex flex-wrap gap-10">
                  <CustomCheckbox checked={!!detail.seniorPhysical?.normal} onChange={() => setDetail({ ...detail, seniorPhysical: { ...detail.seniorPhysical, normal: !detail.seniorPhysical?.normal } })} label="정상" />
                  <CustomCheckbox checked={!!detail.seniorPhysical?.low} onChange={() => setDetail({ ...detail, seniorPhysical: { ...detail.seniorPhysical, low: !detail.seniorPhysical?.low } })} label="신체기능저하" />
                </div>
              )}
              {/* 세부 옵션: 노인기능평가 */}
              {exam.key === 'seniorFunction' && (
                <div className="ml-10 flex flex-col gap-4">
                  {/* 낙상 */}
                  <div className="flex items-center">
                    <span className="text-medium text-gray-700 w-20">낙상</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="40" viewBox="0 0 4 40" fill="none" className="mr-4">
                      <path d="M2 2V38" stroke="#DBE6FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6"/>
                    </svg>
                    <div className="flex gap-10">
                      <CustomCheckbox checked={!!detail.seniorFunction?.fallRisknormal} onChange={() => setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, fallRisknormal: !detail.seniorFunction?.fallRisknormal } })} label="정상" />
                      <CustomCheckbox checked={!!detail.seniorFunction?.fallRiskSuspect} onChange={() => setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, fallRiskSuspect: !detail.seniorFunction?.fallRiskSuspect } })} label="낙상 고위험자" />
                    </div>
                  </div>
                  {/* 일상생활 수행능력 */}
                  <div className="flex items-center">
                    <span className="text-medium text-gray-700 w-32">일상생활 수행능력</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="40" viewBox="0 0 4 40" fill="none" className="mr-4">
                      <path d="M2 2V38" stroke="#DBE6FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6"/>
                    </svg>
                    <div className="flex gap-10">
                      <CustomCheckbox checked={!!detail.seniorFunction?.ADLnormal} onChange={() => setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, ADLnormal: !detail.seniorFunction?.ADLnormal } })} label="정상" />
                      <CustomCheckbox checked={!!detail.seniorFunction?.ADLSuspect} onChange={() => setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, ADLSuspect: !detail.seniorFunction?.ADLSuspect } })} label="일상생활 도움 필요" />
                    </div>
                  </div>
                  {/* 예방접종 */}
                  <div className="flex items-center">
                    <span className="text-medium text-gray-700 w-20">예방접종</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="40" viewBox="0 0 4 40" fill="none" className="mr-4">
                      <path d="M2 2V38" stroke="#DBE6FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6"/>
                    </svg>
                    <div className="flex gap-10">
                      <CustomCheckbox checked={!!detail.seniorFunction?.vaccineInfluenza} onChange={() => setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, vaccineInfluenza: !detail.seniorFunction?.vaccineInfluenza } })} label="인플루엔자 접종 필요" />
                      <CustomCheckbox checked={!!detail.seniorFunction?.vaccinePneumonia} onChange={() => setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, vaccinePneumonia: !detail.seniorFunction?.vaccinePneumonia } })} label="폐렴구균 접종 필요" />
                      <CustomCheckbox checked={!!detail.seniorFunction?.vaccineNone} onChange={() => setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, vaccineNone: !detail.seniorFunction?.vaccineNone } })} label="접종 필요 없음" />
                    </div>
                  </div>
                  {/* 배뇨장애 */}
                  <div className="flex items-center">
                    <span className="text-medium text-gray-700 w-20">배뇨장애</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="40" viewBox="0 0 4 40" fill="none" className="mr-4">
                      <path d="M2 2V38" stroke="#DBE6FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6"/>
                    </svg>
                    <div className="flex gap-10">
                      <CustomCheckbox checked={!!detail.seniorFunction?.urinationNormal} onChange={() => setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, urinationNormal: !detail.seniorFunction?.urinationNormal } })} label="정상" />
                      <CustomCheckbox checked={!!detail.seniorFunction?.urinationSuspect} onChange={() => setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, urinationSuspect: !detail.seniorFunction?.urinationSuspect } })} label="배뇨장애 의심" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdditionalExamSection; 