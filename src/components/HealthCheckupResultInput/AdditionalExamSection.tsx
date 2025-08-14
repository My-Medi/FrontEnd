import React from 'react';
import CustomCheckboxButton from '../Common/CustomCheckboxButton';

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
            <CustomCheckboxButton key={v} checked={value === v} onClick={() => onChange(v as '해당' | '미해당')} label={v} />
          ))}
        </div>
      </div>
      {value === '해당' && (
        <div className="mt-4 bg-white rounded-[14px] p-6">
          {/* 각 추가검사 항목 반복 */}
          {examList.map((exam, idx) => {
            const isEnabled = !!detail[exam.key]?.checked;
            return (
            <div
              key={exam.key}
              className={`flex items-start mb-6 ${idx !== examList.length - 1 ? 'border-b-2 border-[#eaf1ff] pb-[24px]' : ''}`}
            >
              {/* 해당 체크박스 */}
              <div className="flex items-center min-w-[60px] font-medium text-black font-size-[18px]">
                <CustomCheckboxButton
                  checked={!!detail[exam.key]?.checked}
                  onClick={() => setDetail({ ...detail, [exam.key]: { ...detail[exam.key], checked: !detail[exam.key]?.checked } })}
                  label="해당"
                />
              </div>
              {/* 검사명 */}
              <div className="ml-40 min-w-[110px] font-medium text-black font-size-[18px]">{exam.label}</div>
              {/* 세부 옵션: B형간염 */}
              {exam.key === 'hepatitis' && (
                <div className={`ml-10 flex flex-wrap gap-4 ${!isEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
                  <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-medium text-gray-700 w-15">포면항원</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="40" viewBox="0 0 4 40" fill="none" className="mr-4">
                      <path d="M2 2V38" stroke="#DBE6FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6"/>
                    </svg>
                  <CustomCheckboxButton checked={isEnabled && !!detail.hepatitis?.antigenGeneral} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, hepatitis: { ...detail.hepatitis, antigenGeneral: true, antigenDetail: false } }); }} label="일반" />
                  <CustomCheckboxButton checked={isEnabled && !!detail.hepatitis?.antigenDetail} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, hepatitis: { ...detail.hepatitis, antigenGeneral: false, antigenDetail: true } }); }} label="정밀" />

                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-medium text-gray-700 w-15">표면항체</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="40" viewBox="0 0 4 40" fill="none" className="mr-4">
                      <path d="M2 2V38" stroke="#DBE6FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6"/>
                    </svg>
                    <CustomCheckboxButton checked={isEnabled && !!detail.hepatitis?.antibodyGeneral} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, hepatitis: { ...detail.hepatitis, antibodyGeneral: true, antibodyDetail: false } }); }} label="일반" />
                    <CustomCheckboxButton checked={isEnabled && !!detail.hepatitis?.antibodyDetail} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, hepatitis: { ...detail.hepatitis, antibodyGeneral: false, antibodyDetail: true } }); }} label="정밀" />
                  </div>
                  <div className="flex items-center gap-10">
                  <CustomCheckboxButton checked={isEnabled && !!detail.hepatitis?.hasAntibody} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, hepatitis: { ...detail.hepatitis, hasAntibody: true, noAntibody: false, suspectCarrier: false, judgement: false } }); }} label="항체 있음" />
                  <CustomCheckboxButton checked={isEnabled && !!detail.hepatitis?.noAntibody} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, hepatitis: { ...detail.hepatitis, hasAntibody: false, noAntibody: true, suspectCarrier: false, judgement: false } }); }} label="항체 없음" />
                  <CustomCheckboxButton checked={isEnabled && !!detail.hepatitis?.suspectCarrier} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, hepatitis: { ...detail.hepatitis, hasAntibody: false, noAntibody: false, suspectCarrier: true, judgement: false } }); }} label="B형 간염 보유자 의심" />
                  <CustomCheckboxButton checked={isEnabled && !!detail.hepatitis?.judgement} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, hepatitis: { ...detail.hepatitis, hasAntibody: false, noAntibody: false, suspectCarrier: false, judgement: true } }); }} label="판정보류" />
                </div>
                  </div>

                  </div>
              )}
              {/* 세부 옵션: 우울증 */}
              {exam.key === 'depression' && (
                <div className={`flex flex-col gap-4 ${!isEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
                  <div className="ml-10 flex flex-wrap gap-19">
                  <CustomCheckboxButton checked={isEnabled && !!detail.depression?.none} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, depression: { ...detail.depression, none: true, mild: false, moderate: false, severe: false } }); }} label="우울증상이 없음" />
                  <CustomCheckboxButton checked={isEnabled && !!detail.depression?.mild} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, depression: { ...detail.depression, none: false, mild: true, moderate: false, severe: false } }); }} label="가벼운 우울증상" />
                   </div>
                  <div className="ml-10 flex flex-wrap gap-10">
                  <CustomCheckboxButton checked={isEnabled && !!detail.depression?.moderate} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, depression: { ...detail.depression, none: false, mild: false, moderate: true, severe: false } }); }} label="중간 정도 우울증 의심" />
                  <CustomCheckboxButton checked={isEnabled && !!detail.depression?.severe} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, depression: { ...detail.depression, none: false, mild: false, moderate: false, severe: true } }); }} label="심한 우울증 의심" />
                  </div>
                </div>
              )}
              {/* 세부 옵션: 인지기능장애 */}
              {exam.key === 'cognitive' && (
                <div className={`ml-10 flex flex-wrap gap-10 ${!isEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
                  <CustomCheckboxButton checked={isEnabled && !!detail.cognitive?.none} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, cognitive: { ...detail.cognitive, none: true, suspect: false } }); }} label="특이소견 없음" />
                  <CustomCheckboxButton checked={isEnabled && !!detail.cognitive?.suspect} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, cognitive: { ...detail.cognitive, none: false, suspect: true } }); }} label="인지기능 저하 의심" />
                </div>
              )}
              {/* 세부 옵션: 골밀도검사 */}
              {exam.key === 'bone' && (
                <div className={`ml-10 flex flex-wrap gap-10 ${!isEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
                  <CustomCheckboxButton checked={isEnabled && !!detail.bone?.normal} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, bone: { ...detail.bone, normal: true, osteopenia: false, osteoporosis: false } }); }} label="정상" />
                  <CustomCheckboxButton checked={isEnabled && !!detail.bone?.osteopenia} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, bone: { ...detail.bone, normal: false, osteopenia: true, osteoporosis: false } }); }} label="골감소증" />
                  <CustomCheckboxButton checked={isEnabled && !!detail.bone?.osteoporosis} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, bone: { ...detail.bone, normal: false, osteopenia: false, osteoporosis: true } }); }} label="골다공증" />
                </div>
              )}
              {/* 세부 옵션: 노인신체기능검사 */}
              {exam.key === 'seniorPhysical' && (
                <div className={`ml-10 flex flex-wrap gap-10 ${!isEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
                  <CustomCheckboxButton checked={isEnabled && !!detail.seniorPhysical?.normal} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, seniorPhysical: { ...detail.seniorPhysical, normal: true, low: false } }); }} label="정상" />
                  <CustomCheckboxButton checked={isEnabled && !!detail.seniorPhysical?.low} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, seniorPhysical: { ...detail.seniorPhysical, normal: false, low: true } }); }} label="신체기능저하" />
                </div>
              )}
              {/* 세부 옵션: 노인기능평가 */}
              {exam.key === 'seniorFunction' && (
                <div className={`ml-10 flex flex-col gap-4 ${!isEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
                  {/* 낙상 */}
                  <div className="flex items-center">
                    <span className="text-medium text-gray-700 w-20">낙상</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="40" viewBox="0 0 4 40" fill="none" className="mr-4">
                      <path d="M2 2V38" stroke="#DBE6FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6"/>
                    </svg>
                    <div className="flex gap-10">
                      <CustomCheckboxButton checked={isEnabled && !!detail.seniorFunction?.fallRisknormal} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, fallRisknormal: true, fallRiskSuspect: false } }); }} label="정상" />
                      <CustomCheckboxButton checked={isEnabled && !!detail.seniorFunction?.fallRiskSuspect} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, fallRisknormal: false, fallRiskSuspect: true } }); }} label="낙상 고위험자" />
                    </div>
                  </div>
                  {/* 일상생활 수행능력 */}
                  <div className="flex items-center">
                    <span className="text-medium text-gray-700 w-32">일상생활 수행능력</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="40" viewBox="0 0 4 40" fill="none" className="mr-4">
                      <path d="M2 2V38" stroke="#DBE6FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6"/>
                    </svg>
                    <div className="flex gap-10">
                      <CustomCheckboxButton checked={isEnabled && !!detail.seniorFunction?.ADLnormal} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, ADLnormal: true, ADLSuspect: false } }); }} label="정상" />
                      <CustomCheckboxButton checked={isEnabled && !!detail.seniorFunction?.ADLSuspect} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, ADLnormal: false, ADLSuspect: true } }); }} label="일상생활 도움 필요" />
                    </div>
                  </div>
                  {/* 예방접종 */}
                  <div className="flex items-center">
                    <span className="text-medium text-gray-700 w-20">예방접종</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="40" viewBox="0 0 4 40" fill="none" className="mr-4">
                      <path d="M2 2V38" stroke="#DBE6FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6"/>
                    </svg>
                    <div className="flex gap-10">
                      <CustomCheckboxButton checked={isEnabled && !!detail.seniorFunction?.vaccineInfluenza} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, vaccineInfluenza: true, vaccinePneumonia: false, vaccineNone: false } }); }} label="인플루엔자 접종 필요" />
                      <CustomCheckboxButton checked={isEnabled && !!detail.seniorFunction?.vaccinePneumonia} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, vaccineInfluenza: false, vaccinePneumonia: true, vaccineNone: false } }); }} label="폐렴구균 접종 필요" />
                      <CustomCheckboxButton checked={isEnabled && !!detail.seniorFunction?.vaccineNone} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, vaccineInfluenza: false, vaccinePneumonia: false, vaccineNone: true } }); }} label="접종 필요 없음" />
                    </div>
                  </div>
                  {/* 배뇨장애 */}
                  <div className="flex items-center">
                    <span className="text-medium text-gray-700 w-20">배뇨장애</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="40" viewBox="0 0 4 40" fill="none" className="mr-4">
                      <path d="M2 2V38" stroke="#DBE6FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6"/>
                    </svg>
                    <div className="flex gap-10">
                      <CustomCheckboxButton checked={isEnabled && !!detail.seniorFunction?.urinationNormal} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, urinationNormal: true, urinationSuspect: false } }); }} label="정상" />
                      <CustomCheckboxButton checked={isEnabled && !!detail.seniorFunction?.urinationSuspect} onClick={() => { if (!isEnabled) return; setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, urinationNormal: false, urinationSuspect: true } }); }} label="배뇨장애 의심" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );})}
        </div>
      )}
    </div>
  );
};

export default AdditionalExamSection; 