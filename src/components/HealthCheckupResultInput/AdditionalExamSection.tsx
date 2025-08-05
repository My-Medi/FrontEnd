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
          {examList.map((exam, idx) => (
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
                <div className="ml-10 flex flex-wrap gap-4">
                  <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-medium text-gray-700 w-15">포면항원</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="40" viewBox="0 0 4 40" fill="none" className="mr-4">
                      <path d="M2 2V38" stroke="#DBE6FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6"/>
                    </svg>
                  <CustomCheckboxButton checked={!!detail.hepatitis?.antigenGeneral} onClick={() => setDetail({ ...detail, hepatitis: { ...detail.hepatitis, antigenGeneral: !detail.hepatitis?.antigenGeneral } })} label="일반" />
                  <CustomCheckboxButton checked={!!detail.hepatitis?.antigenDetail} onClick={() => setDetail({ ...detail, hepatitis: { ...detail.hepatitis, antigenDetail: !detail.hepatitis?.antigenDetail } })} label="정밀" />

                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-medium text-gray-700 w-15">표면항체</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="40" viewBox="0 0 4 40" fill="none" className="mr-4">
                      <path d="M2 2V38" stroke="#DBE6FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6"/>
                    </svg>
                    <CustomCheckboxButton checked={!!detail.hepatitis?.antibodyGeneral} onClick={() => setDetail({ ...detail, hepatitis: { ...detail.hepatitis, antibodyGeneral: !detail.hepatitis?.antibodyGeneral } })} label="일반" />
                    <CustomCheckboxButton checked={!!detail.hepatitis?.antibodyDetail} onClick={() => setDetail({ ...detail, hepatitis: { ...detail.hepatitis, antibodyDetail: !detail.hepatitis?.antibodyDetail } })} label="정밀" />
                  </div>
                  <div className="flex items-center gap-10">
                  <CustomCheckboxButton checked={!!detail.hepatitis?.hasAntibody} onClick={() => setDetail({ ...detail, hepatitis: { ...detail.hepatitis, hasAntibody: !detail.hepatitis?.hasAntibody } })} label="항체 있음" />
                  <CustomCheckboxButton checked={!!detail.hepatitis?.noAntibody} onClick={() => setDetail({ ...detail, hepatitis: { ...detail.hepatitis, noAntibody: !detail.hepatitis?.noAntibody } })} label="항체 없음" />
                  <CustomCheckboxButton checked={!!detail.hepatitis?.suspectCarrier} onClick={() => setDetail({ ...detail, hepatitis: { ...detail.hepatitis, suspectCarrier: !detail.hepatitis?.suspectCarrier } })} label="B형 간염 보유자 의심" />
                  <CustomCheckboxButton checked={!!detail.hepatitis?.judgement} onClick={() => setDetail({ ...detail, hepatitis: { ...detail.hepatitis, judgement: !detail.hepatitis?.judgement } })} label="판정보류" />
                </div>
                  </div>

                  </div>
              )}
              {/* 세부 옵션: 우울증 */}
              {exam.key === 'depression' && (
                <div className="flex flex-col gap-4">
                  <div className="ml-10 flex flex-wrap gap-19">
                    <CustomCheckboxButton checked={!!detail.depression?.none} onClick={() => setDetail({ ...detail, depression: { ...detail.depression, none: !detail.depression?.none } })} label="우울증상이 없음" />
                    <CustomCheckboxButton checked={!!detail.depression?.mild} onClick={() => setDetail({ ...detail, depression: { ...detail.depression, mild: !detail.depression?.mild } })} label="가벼운 우울증상" />
                   </div>
                  <div className="ml-10 flex flex-wrap gap-10">
                    <CustomCheckboxButton checked={!!detail.depression?.moderate} onClick={() => setDetail({ ...detail, depression: { ...detail.depression, moderate: !detail.depression?.moderate } })} label="중간 정도 우울증 의심" />
                    <CustomCheckboxButton checked={!!detail.depression?.severe} onClick={() => setDetail({ ...detail, depression: { ...detail.depression, severe: !detail.depression?.severe } })} label="심한 우울증 의심" />
                  </div>
                </div>
              )}
              {/* 세부 옵션: 인지기능장애 */}
              {exam.key === 'cognitive' && (
                <div className="ml-10 flex flex-wrap gap-10">
                  <CustomCheckboxButton checked={!!detail.cognitive?.none} onClick={() => setDetail({ ...detail, cognitive: { ...detail.cognitive, none: !detail.cognitive?.none } })} label="특이소견 없음" />
                  <CustomCheckboxButton checked={!!detail.cognitive?.suspect} onClick={() => setDetail({ ...detail, cognitive: { ...detail.cognitive, suspect: !detail.cognitive?.suspect } })} label="인지기능 저하 의심" />
                </div>
              )}
              {/* 세부 옵션: 골밀도검사 */}
              {exam.key === 'bone' && (
                <div className="ml-10 flex flex-wrap gap-10">
                  <CustomCheckboxButton checked={!!detail.bone?.normal} onClick={() => setDetail({ ...detail, bone: { ...detail.bone, normal: !detail.bone?.normal } })} label="정상" />
                  <CustomCheckboxButton checked={!!detail.bone?.osteopenia} onClick={() => setDetail({ ...detail, bone: { ...detail.bone, osteopenia: !detail.bone?.osteopenia } })} label="골감소증" />
                  <CustomCheckboxButton checked={!!detail.bone?.osteoporosis} onClick={() => setDetail({ ...detail, bone: { ...detail.bone, osteoporosis: !detail.bone?.osteoporosis } })} label="골다공증" />
                </div>
              )}
              {/* 세부 옵션: 노인신체기능검사 */}
              {exam.key === 'seniorPhysical' && (
                <div className="ml-10 flex flex-wrap gap-10">
                  <CustomCheckboxButton checked={!!detail.seniorPhysical?.normal} onClick={() => setDetail({ ...detail, seniorPhysical: { ...detail.seniorPhysical, normal: !detail.seniorPhysical?.normal } })} label="정상" />
                  <CustomCheckboxButton checked={!!detail.seniorPhysical?.low} onClick={() => setDetail({ ...detail, seniorPhysical: { ...detail.seniorPhysical, low: !detail.seniorPhysical?.low } })} label="신체기능저하" />
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
                      <CustomCheckboxButton checked={!!detail.seniorFunction?.fallRisknormal} onClick={() => setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, fallRisknormal: !detail.seniorFunction?.fallRisknormal } })} label="정상" />
                      <CustomCheckboxButton checked={!!detail.seniorFunction?.fallRiskSuspect} onClick={() => setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, fallRiskSuspect: !detail.seniorFunction?.fallRiskSuspect } })} label="낙상 고위험자" />
                    </div>
                  </div>
                  {/* 일상생활 수행능력 */}
                  <div className="flex items-center">
                    <span className="text-medium text-gray-700 w-32">일상생활 수행능력</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="40" viewBox="0 0 4 40" fill="none" className="mr-4">
                      <path d="M2 2V38" stroke="#DBE6FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6"/>
                    </svg>
                    <div className="flex gap-10">
                      <CustomCheckboxButton checked={!!detail.seniorFunction?.ADLnormal} onClick={() => setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, ADLnormal: !detail.seniorFunction?.ADLnormal } })} label="정상" />
                      <CustomCheckboxButton checked={!!detail.seniorFunction?.ADLSuspect} onClick={() => setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, ADLSuspect: !detail.seniorFunction?.ADLSuspect } })} label="일상생활 도움 필요" />
                    </div>
                  </div>
                  {/* 예방접종 */}
                  <div className="flex items-center">
                    <span className="text-medium text-gray-700 w-20">예방접종</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="40" viewBox="0 0 4 40" fill="none" className="mr-4">
                      <path d="M2 2V38" stroke="#DBE6FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6"/>
                    </svg>
                    <div className="flex gap-10">
                      <CustomCheckboxButton checked={!!detail.seniorFunction?.vaccineInfluenza} onClick={() => setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, vaccineInfluenza: !detail.seniorFunction?.vaccineInfluenza } })} label="인플루엔자 접종 필요" />
                      <CustomCheckboxButton checked={!!detail.seniorFunction?.vaccinePneumonia} onClick={() => setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, vaccinePneumonia: !detail.seniorFunction?.vaccinePneumonia } })} label="폐렴구균 접종 필요" />
                      <CustomCheckboxButton checked={!!detail.seniorFunction?.vaccineNone} onClick={() => setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, vaccineNone: !detail.seniorFunction?.vaccineNone } })} label="접종 필요 없음" />
                    </div>
                  </div>
                  {/* 배뇨장애 */}
                  <div className="flex items-center">
                    <span className="text-medium text-gray-700 w-20">배뇨장애</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="40" viewBox="0 0 4 40" fill="none" className="mr-4">
                      <path d="M2 2V38" stroke="#DBE6FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6"/>
                    </svg>
                    <div className="flex gap-10">
                      <CustomCheckboxButton checked={!!detail.seniorFunction?.urinationNormal} onClick={() => setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, urinationNormal: !detail.seniorFunction?.urinationNormal } })} label="정상" />
                      <CustomCheckboxButton checked={!!detail.seniorFunction?.urinationSuspect} onClick={() => setDetail({ ...detail, seniorFunction: { ...detail.seniorFunction, urinationSuspect: !detail.seniorFunction?.urinationSuspect } })} label="배뇨장애 의심" />
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