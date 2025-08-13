import React from 'react';
import TotalConstant from '@/assets/health-constants/total-constant.svg';
import danger from '@/assets/health-constants/danger-constant.svg';
import caution from '@/assets/health-constants/caution-constant.svg';
import interest from '@/assets/health-constants/interest-constant.svg';
import normal from '@/assets/health-constants/normal-constant.svg';
import safe from '@/assets/health-constants/safe-constant.svg';
import DotCol from '@/assets/dotcol.svg';

interface ReportProps {
  nickname: string;
  bmi?: number | null;
  waist?: number | null;
  /* 수축기 혈압 */
  sp?: number | null;
  /* 이완기 혈압 */
  dp?: number | null;
  /* 공복혈당 */
  fastingBlood?: number | null;
  /* 혈청 크레아티닌 */
  creatinine?: number | null;
  /* eGFR신사구체여과율 */
  eGFR?: number | null;
  /* AST */
  ast?: number | null;
  /* ALT */
  alt?: number | null;
  /* 감마-GTP(Y-GTP) */
  gtp?: number | null;
  /* 혈색소 */
  hemoglobin?: number | null;
  /* 총 콜레스테롤 */
  cholesterol?: number | null;
  /* HDL-콜레스테롤 */
  hdl?: number | null;
  /* 중성지방 */
  neutralFat?: number | null;
  /* LDL-콜레스테롤 */
  ldl?: number | null;
  /* 요단백 */
  urineProtein?: string | null;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case '위험':
      return danger;
    case '주의':
      return caution;
    case '관심':
      return interest;
    case '정상':
      return normal;
    case '안심':
      return safe;
  }
};

const ReportSummary: React.FC<ReportProps> = ({
  nickname,
  bmi,
  waist,
  sp,
  dp,
  fastingBlood,
  creatinine,
  eGFR,
  ast,
  alt,
  gtp,
  hemoglobin,
  cholesterol,
  hdl,
  neutralFat,
  ldl,
  urineProtein,
}) => {
  // 외부 API 의존 제거: 상위에서 전달된 값만 표시
  const summary = undefined as any;

  const derived = {
    bmi: bmi ?? summary?.obesity?.bmi ?? null,
    waist: waist ?? (summary?.obesity?.waistType as any) ?? null,
    sp: sp ?? summary?.hypertension?.systolic ?? null,
    dp: dp ?? summary?.hypertension?.diastolic ?? null,
    fastingBlood: fastingBlood ?? summary?.diabetes?.fastingGlucose ?? null,
    creatinine: creatinine ?? summary?.kidney?.creatinine ?? null,
    eGFR: eGFR ?? summary?.kidney?.egfr ?? null,
    ast: ast ?? summary?.liver?.ast ?? null,
    alt: alt ?? summary?.liver?.alt ?? null,
    gtp: gtp ?? summary?.liver?.gtp ?? null,
    hemoglobin: hemoglobin ?? summary?.anemia?.hemoglobin ?? null,
    cholesterol: cholesterol ?? summary?.dyslipidemia?.totalCholesterol ?? null,
    hdl: hdl ?? summary?.dyslipidemia?.hdl ?? null,
    neutralFat: neutralFat ?? summary?.dyslipidemia?.triglyceride ?? null,
    ldl: ldl ?? summary?.dyslipidemia?.ldl ?? null,
    urineProtein: urineProtein ?? summary?.urine?.urineTestStatus ?? null,
  };

  const isEmpty = (v: any) => v === undefined || v === null || (typeof v === 'number' && Number.isNaN(v));
  const hasAnyValue = !Object.values(derived).every(isEmpty);
  return (
    <>
      <div className='w-[817px] font-[Pretendard]'>
        {/* 제목 */}
        <div className='hidden lg:flex justify-between items-center mb-6'>
          <div className='flex items-center gap-4'>
            <div className='w-[14.25px] h-[14.25px] bg-[#1D68FF] rounded-[4.5px]' />
            <span className='text-[#121218] text-[16px] leading-[36px] font-medium tracking-[-0.48px]'>
              {nickname}님의 건강검진 리포트 요약
            </span>
          </div>
          <img src={TotalConstant} alt='전체 기준' className='w-auto h-[34px]' />
        </div>

        {/* 리포트 요약 부분 (데스크톱) */}
        <div className='hidden lg:flex flex-row gap-[36px] pl-[32px]'>
          {/* 왼쪽 */}
          <div className={`flex flex-col gap-4 ${!hasAnyValue ? 'flex-1 items-center justify-center' : ''}`}>
            {!hasAnyValue ? (
              <div className='text-[#9DA0A3] text-[14px] font-medium leading-6 tracking-[-0.03em] text-center'>
                아직 등록된 리포트가 없습니다.
              </div>
            ) : (
              <>
            <div className='flex items-start gap-2'>
              <img src={getStatusIcon('안심')} alt='안심' className='w-3 h-3 mt-3' />
              <div className='flex gap-6'>
                <p className='text-[#121218] text-[16px] leading-[36px] font-medium tracking-[-0.48px]'>
                  비만/복부비만
                </p>
                <div className='flex flex-col mt-[7px] gap-1 text-[14px] font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                  <p>체질량 지수 : {derived.bmi ?? '-'} kg/m²</p>
                  <p>허리둘레 : {derived.waist ?? '-'} mm/HG</p>
                </div>
              </div>
            </div>

            <div className='flex items-start gap-2'>
              <img src={getStatusIcon('정상')} alt='정상' className='w-3 h-3 mt-3' />
              <div className='flex gap-17'>
                <p className='text-[#121218] text-[16px] leading-[36px] font-medium tracking-[-0.48px]'>
                  고혈압
                </p>
                <div className='flex flex-col mt-[8px] gap-1 text-[14px] font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                  <p>수축기 혈압 : {derived.sp ?? '-'} kg/m²</p>
                  <p>이완기 혈압 : {derived.dp ?? '-'} mm/HG</p>
                </div>
              </div>
            </div>

            <div className='flex items-start gap-2'>
              <img src={getStatusIcon('주의')} alt='주의' className='w-3 h-3 mt-3' />
              <div className='flex gap-17'>
                <p className='text-[16px] font-medium leading-[36px] tracking-[-0.48px] text-[#121218]'>
                  당뇨병
                </p>
                <p className='text-[14px] mt-[7.5px] font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                  공복혈당 : {derived.fastingBlood ?? '-'} mg/dL
                </p>
              </div>
            </div>

            <div className='flex items-start gap-2'>
              <img src={getStatusIcon('안심')} alt='안심' className='w-3 h-3 mt-3' />
              <div className='flex gap-13'>
                <p className='text-[16px] font-medium leading-[36px] tracking-[-0.48px] text-[#121218]'>
                  신장질환
                </p>
                <div className='text-[14px] gap-1 mt-[8px] flex-col font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                  <p>혈청 크레아티닌 : {derived.creatinine ?? '-'} mg/dL</p>
                  <p>eGFR신사구체여과율 : {derived.eGFR ?? '-'} ml/min/1.73m²</p>
                </div>
              </div>
            </div>

            <div className='flex items-start gap-2'>
              <img src={getStatusIcon('정상')} alt='정상' className='w-3 h-3 mt-3' />
              <div className='flex gap-13'>
                <p className='text-[16px] font-medium leading-[36px] tracking-[-0.48px] text-[#121218]'>
                  간장질환
                </p>
                <div className='text-[14px] gap-1 mt-[7px] flex-col font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                  <p>AST : {derived.ast ?? '-'} IU/L</p>
                  <p>ALT : {derived.alt ?? '-'} IU/L</p>
                  <p>감마-GTP(Y-GTP) : {derived.gtp ?? '-'} IU/L</p>
                </div>
              </div>
            </div>
              </>
            )}
          </div>

          {/* 세로 점선 */}
          <div className='max-h-[370px]'>
            <img src={DotCol} alt='dot-line' />
          </div>

          {/* 오른쪽 */}
          <div className={`flex flex-col gap-4 ${!hasAnyValue ? 'flex-1 items-center justify-center' : ''}`}>
            {!hasAnyValue ? (
              <div className='text-[#9DA0A3] text-[14px] font-medium leading-6 tracking-[-0.03em] text-center'>
                아직 등록된 리포트가 없습니다.
              </div>
            ) : (
              <>
            <div className='flex items-start gap-2'>
              <img src={getStatusIcon('주의')} alt='주의' className='w-3 h-3 mt-3' />
              <div className='flex gap-22'>
                <p className='text-[16px] font-medium leading-[36px] tracking-[-0.48px] text-[#121218]'>
                  빈혈
                </p>
                <p className='text-[14px] mt-[6px] font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                  혈색소 : {derived.hemoglobin ?? '-'} g/dL
                </p>
              </div>
            </div>

            <div className='flex items-start gap-2'>
              <img src={getStatusIcon('정상')} alt='정상' className='w-[12px] h-[12px] mt-3' />
              <div className='flex gap-8'>
                <p className='text-[16px] font-medium leading-[36px] tracking-[-0.48px] text-[#121218]'>
                  이상지질혈증
                </p>
                <div className='text-[14px] mt-[8px] flex-col gap-1 font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                  <p>총콜레스테롤 : {derived.cholesterol ?? '-'} mg/dL</p>
                  <p>HDL-콜레스테롤 : {derived.hdl ?? '-'} mg/dL</p>
                  <p>중성지방 : {derived.neutralFat ?? '-'} mg/dL</p>
                  <p>LDL-콜레스테롤 : {derived.ldl ?? '-'} mg/dL</p>
                </div>
              </div>
            </div>

            <div className='flex items-start gap-2'>
              <img src={getStatusIcon('안심')} alt='안심' className='w-[12px] h-[12px] mt-3' />
              <div className='flex gap-18'>
                <p className='text-[16px] font-medium leading-[36px] tracking-[-0.48px] text-[#121218]'>
                  요단백
                </p>
                <p className='text-[14px] mt-[7px] font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                  {derived.urineProtein ?? '-'}
                </p>
              </div>
            </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* 제목 - 모바일 */}
      <div className='lg:hidden w-[full] px-[16px] flex justify-between items-start font-[Pretendard] mt-[20px]'>
        {/* 왼쪽 텍스트 */}
        <div className='flex items-center'>
          <div className='w-[12px] h-[12px] bg-[#1D68FF] rounded-[3px] mr-[10px]' />
          <span className='text-[#121218] text-[15px] leading-[20px] tracking-[-0.4px] font-semibold'>
            {nickname}님의 건강검진 리포트 요약
          </span>
        </div>

        {/* 오른쪽 이미지 */}
        <img src={TotalConstant} alt='전체 기준' className='h-[26px] w-auto ml-4 shrink-0' />
      </div>

      {/* 모바일 빈 상태 */}
      {!hasAnyValue && (
        <div className='lg:hidden w-full px-[16px] py-5 text-center'>
          <div className='text-[#9DA0A3] text-[14px] font-medium leading-6 tracking-[-0.03em]'>
            아직 등록된 리포트가 없습니다.
          </div>
        </div>
      )}
      {/* 모바일 UI */}
      {hasAnyValue && (
      <div className='flex flex-wrap ml-[10px] items-start lg:hidden gap-x-[20px] gap-y-[24px] justify-center font-[Pretendard]'>
        {[
          {
            title: '비만/복부비만',
            status: '안심',
            values: [`체질량 지수 : ${bmi} kg/m²`, `허리둘레 : ${waist} mm/HG`],
          },
          {
            title: '고혈압',
            status: '정상',
            values: [`수축기 혈압 : ${sp} kg/m²`, `이완기 혈압 : ${dp} mm/HG`],
          },
          { title: '당뇨병', status: '주의', values: [`공복혈당 : ${fastingBlood} mg/dL`] },
          {
            title: '신장질환',
            status: '안심',
            values: [
              `혈청 크레아티닌 : ${creatinine} mg/dL`,
              `eGFR신사구체여과율 : ${eGFR} ml/min/1.73m²`,
            ],
          },
          {
            title: '간장질환',
            status: '정상',
            values: [`AST : ${ast} IU/L`, `ALT : ${alt} IU/L`, `감마-GTP(Y-GTP) : ${gtp} IU/L`],
          },
          { title: '빈혈', status: '주의', values: [`혈색소 : ${hemoglobin} g/dL`] },
          {
            title: '이상지질혈증',
            status: '정상',
            values: [
              `총콜레스테롤 : ${cholesterol} mg/dL`,
              `HDL-콜레스테롤 : ${hdl} mg/dL`,
              `중성지방 : ${neutralFat} mg/dL`,
              `LDL-콜레스테롤 : ${ldl} mg/dL`,
            ],
          },
          { title: '요단백', status: '안심', values: [`${urineProtein}`] },
        ].map((section, idx) => (
          <div key={idx} className='flex w-[160px] flex-col items-start'>
            <div className='flex items-center gap-2 mb-1'>
              <img src={getStatusIcon(section.status)} alt={section.status} className='w-3 h-3' />
              <p className='text-[14px] font-medium leading-[20px] tracking-[-0.42px] text-[#121218]'>
                {section.title}
              </p>
            </div>
            <div className='text-[12px] font-light leading-[18px] tracking-[-0.36px] text-[#121218]'>
              {section.values.map((v, i) => (
                <p key={i}>{v}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      )}
    </>
  );
};

export default ReportSummary;
