import React from 'react';

import danger from '@/assets/health-constants/danger-constant.svg';
import caution from '@/assets/health-constants/caution-constant.svg';
import interest from '@/assets/health-constants/interest-constant.svg';
import normal from '@/assets/health-constants/normal-constant.svg';
import safe from '@/assets/health-constants/safe-constant.svg';
import DotCol from '@/assets/dotcol.svg';
import healthGaugeChart from '@/assets/123.svg';

interface ReportProps {
  nickname: string;
  healthStatus?: '위험' | '주의' | '관심' | '안심' | '정상';
  summary?: {
    obesity?: { bmi?: number; waistType?: string };
    hypertension?: { systolic?: number; diastolic?: number };
    diabetes?: { fastingGlucose?: number };
    kidney?: { creatinine?: number; egfr?: number };
    liver?: { ast?: number; alt?: number; gtp?: number };
    anemia?: { hemoglobin?: number };
    dyslipidemia?: { totalCholesterol?: number; hdl?: number; triglyceride?: number; ldl?: number };
    urine?: { urineTestStatus?: string };
  };
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

// 공용 상태 아이콘 컴포넌트 (스타일 고정, 접근성 레이블 포함)
export const HealthStatusIcon: React.FC<{ status: string; className?: string }> = ({ status, className }) => (
  <img
    src={getStatusIcon(status)}
    alt={status}
    className={`w-[12px] h-[12px] min-w-[12px] min-h-[12px] shrink-0 mt-[5px] ${className || ''}`}
  />
);

const ReportSummary: React.FC<ReportProps> = ({
  nickname,
  healthStatus,
  summary,
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

  const mapUrineProteinStatus = (status?: string | null) => {
    if (!status) return '-';
    const s = String(status).toUpperCase();
    switch (s) {
      case 'NORMAL':
        return '정상';
      case 'BORDERLINE':
        return '경계';
      case 'PROTEINURIA':
        return '단백뇨의심';
      default:
        return status;
    }
  };
  const urineProteinDisplay = mapUrineProteinStatus(derived.urineProtein as any);

  // API 상태코드(DANGER/CAUTION/WATCH/NORMAL/SAFE) → 아이콘 한글 상태 매핑
  const mapApiStatusToKor = (status?: string | null) => {
    if (!status) return '정상';
    const s = String(status).toUpperCase();
    switch (s) {
      case 'DANGER':
        return '위험';
      case 'CAUTION':
        return '주의';
      case 'WATCH':
        return '관심';
      case 'NORMAL':
        return '정상';
      case 'SAFE':
        return '안심';
      default:
        return '정상';
    }
  };

  // 허리둘레 상태값 처리 함수
  const getWaistDisplay = (waistValue: any) => {
    if (!waistValue) return '-';
    
    // 숫자인 경우 그대로 반환
    if (typeof waistValue === 'number') {
      return `${waistValue} cm`;
    }
    
    // 문자열인 경우 상태값인지 확인
    const s = String(waistValue).toUpperCase();
    if (['DANGER', 'CAUTION', 'WATCH', 'NORMAL', 'SAFE'].includes(s)) {
      return mapApiStatusToKor(waistValue);
    }
    
    // ABDOMINAL_OBESITY는 복부비만으로 변환
    if (s === 'ABDOMINAL_OBESITY') {
      return '복부비만';
    }
    
    // 그 외의 경우 그대로 반환
    return waistValue;
  };

  // 각 지표별 상태 한글 문자열 준비
  const statuses = {
    obesityBmi: mapApiStatusToKor((summary as any)?.obesity?.bmiHealthStatus),
    obesityWaist: mapApiStatusToKor((summary as any)?.obesity?.waistHealthStatus),
    hypertensionSystolic: mapApiStatusToKor((summary as any)?.hypertension?.systolicHealthStatus),
    hypertensionDiastolic: mapApiStatusToKor((summary as any)?.hypertension?.diastolicHealthStatus),
    diabetesFasting: mapApiStatusToKor((summary as any)?.diabetes?.fastingGlucoseHealthStatus),
    kidneyCreatinine: mapApiStatusToKor((summary as any)?.kidney?.creatinineHealthStatus),
    kidneyEgfr: mapApiStatusToKor((summary as any)?.kidney?.egfrHealthStatus),
    liverAst: mapApiStatusToKor((summary as any)?.liver?.astHealthStatus),
    liverAlt: mapApiStatusToKor((summary as any)?.liver?.altHealthStatus),
    liverGtp: mapApiStatusToKor((summary as any)?.liver?.gtpHealthStatus),
    anemiaHemoglobin: mapApiStatusToKor((summary as any)?.anemia?.hemoglobinHealthStatus),
    dyslipidemiaTotalChol: mapApiStatusToKor((summary as any)?.dyslipidemia?.totalCholesterolHealthStatus),
    dyslipidemiaHdl: mapApiStatusToKor((summary as any)?.dyslipidemia?.hdlHealthStatus),
    dyslipidemiaTriglyceride: mapApiStatusToKor((summary as any)?.dyslipidemia?.triglycerideHealthStatus),
    dyslipidemiaLdl: mapApiStatusToKor((summary as any)?.dyslipidemia?.ldlHealthStatus),
    urineProtein: mapApiStatusToKor((summary as any)?.urine?.urineProteinHealthStatus),
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
          <div className='flex items-center gap-2'>
            {/* 건강 상태 게이지 차트 */}
            <div className='flex items-center'>
              <img 
                src={healthGaugeChart} 
                alt="건강 상태 게이지 차트" 
                className="w-auto h-[34px]"
              />
            </div>
          </div>
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
                <div className='flex items-star gap-[20px]'>
                <p className='text-[#121218] text-[16px] leading-[36px] font-medium tracking-[-0.48px] shrink-0'>
                  비만/복부비만
                </p>
                <div className='flex flex-col mt-[4px] text-[14px] font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                  <div className='flex items-start gap-2'>
                    <HealthStatusIcon status={statuses.obesityBmi} />
                    <p>체질량 지수 : {derived.bmi ?? '-'} kg/m²</p>
                  </div>
                  <div className='flex items-start gap-2'>
                    <HealthStatusIcon status={statuses.obesityWaist} />
                    <p>허리둘레 : {getWaistDisplay(derived.waist)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex items-start gap-2'>
              <div className='flex items-start gap-[65px]'>
                <p className='text-[#121218] text-[16px] leading-[36px] font-medium tracking-[-0.48px] shrink-0'>
                  고혈압
                </p>
                <div className='flex flex-col mt-[4px] gap-1 text-[14px] font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                  <div className='flex items-start gap-2'>
                    <HealthStatusIcon status={statuses.hypertensionSystolic} />
                    <p>수축기 혈압 : {derived.sp ?? '-'} mmHg</p>
                  </div>
                  <div className='flex items-start gap-2'>
                    <HealthStatusIcon status={statuses.hypertensionDiastolic} />
                    <p>이완기 혈압 : {derived.dp ?? '-'} mmHg</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex items-start gap-2'>
              <div className='flex items-start gap-[65px]'>
                <p className='text-[16px] font-medium leading-[36px] tracking-[-0.48px] text-[#121218] shrink-0'>
                  당뇨병
                </p>
                <div className='flex items-start gap-2 mt-[4px]'>
                  <HealthStatusIcon status={statuses.diabetesFasting} />
                  <p className='text-[14px] font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                    공복혈당 : {derived.fastingBlood ?? '-'} mg/dL
                  </p>
                </div>
              </div>
            </div>

            <div className='flex items-start gap-2'>
              <div className='flex items-start gap-[52px]'>
                <p className='text-[16px] font-medium leading-[36px] tracking-[-0.48px] text-[#121218] shrink-0'>
                  신장질환
                </p>
                <div className='text-[14px] gap-1 mt-[4px] flex-col font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                  <div className='flex items-start gap-2'>
                    <HealthStatusIcon status={statuses.kidneyCreatinine} />
                    <p>혈청 크레아티닌 : {derived.creatinine ?? '-'} mg/dL</p>
                  </div>
                  <div className='flex items-start gap-2'>
                    <HealthStatusIcon status={statuses.kidneyEgfr} />
                    <p>eGFR신사구체여과율 : {derived.eGFR ?? '-'} ml/min/1.73m²</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex items-start gap-2'>

              <div className='flex items-start gap-[52px]'>
                <p className='text-[16px] font-medium leading-[36px] tracking-[-0.48px] text-[#121218] shrink-0'>
                  간장질환
                </p>
                <div className='text-[14px] gap-1 mt-[4px] flex-col font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                  <div className='flex items-start gap-2'>
                    <HealthStatusIcon status={statuses.liverAst} />
                    <p>AST : {derived.ast ?? '-'} IU/L</p>
                  </div>
                  <div className='flex items-start gap-2'>
                    <HealthStatusIcon status={statuses.liverAlt} />
                    <p>ALT : {derived.alt ?? '-'} IU/L</p>
                  </div>
                  <div className='flex items-start gap-2'>
                    <HealthStatusIcon status={statuses.liverGtp} />
                    <p>감마-GTP(Y-GTP) : {derived.gtp ?? '-'} IU/L</p>
                  </div>
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
              <div className='flex gap-[20px] items-start gap-[77px]'>
                <p className='text-[16px] font-medium leading-[36px] tracking-[-0.48px] text-[#121218] shrink-0'>
                  빈혈
                </p>
                <div className='flex items-start gap-2 mt-[4px]'>
                  <HealthStatusIcon status={statuses.anemiaHemoglobin} />
                  <p className='text-[14px] font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                    혈색소 : {derived.hemoglobin ?? '-'} g/dL
                  </p>
                </div>
              </div>
            </div>

            <div className='flex items-start gap-2'>
              <div className='flex gap-[20px] items-start gap-[24px]'>
                <p className='text-[16px] font-medium leading-[36px] tracking-[-0.48px] text-[#121218] shrink-0'>
                  이상지질혈증
                </p>
                <div className='text-[14px] mt-[4px] flex-col gap-1 font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                  <div className='flex items-start gap-2'>
                    <HealthStatusIcon status={statuses.dyslipidemiaTotalChol} />
                    <p>총콜레스테롤 : {derived.cholesterol ?? '-'} mg/dL</p>
                  </div>
                  <div className='flex items-start gap-2'>
                    <HealthStatusIcon status={statuses.dyslipidemiaHdl} />
                    <p>HDL-콜레스테롤 : {derived.hdl ?? '-'} mg/dL</p>
                  </div>
                  <div className='flex items-start gap-2'>
                    <HealthStatusIcon status={statuses.dyslipidemiaTriglyceride} />
                    <p>중성지방 : {derived.neutralFat ?? '-'} mg/dL</p>
                  </div>
                  <div className='flex items-start gap-2'>
                    <HealthStatusIcon status={statuses.dyslipidemiaLdl} />
                    <p>LDL-콜레스테롤 : {derived.ldl ?? '-'} mg/dL</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex items-start gap-2'>
              <div className='flex gap-[20px] items-start gap-[64px]'>
                <p className='text-[16px] font-medium leading-[36px] tracking-[-0.48px] text-[#121218] shrink-0'>
                  요단백
                </p>
                <div className='flex items-start gap-2 mt-[4px]'>
                  <HealthStatusIcon status={statuses.urineProtein} />
                  <p className='text-[14px] font-light leading-[22px] tracking-[-0.42px] text-[#121218]'>
                    {urineProteinDisplay}
                  </p>
                </div>
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
        <div className='flex items-center gap-2'>
          <HealthStatusIcon status={healthStatus || '정상'} />
          <span className='text-[#121218] text-[12px] font-medium'>
            {healthStatus || '정상'}
          </span>
        </div>
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
            values: [`체질량 지수 : ${derived.bmi ?? '-'} kg/m²`, `허리둘레 : ${getWaistDisplay(derived.waist)}`],
          },
          {
            title: '고혈압',
            status: '정상',
            values: [`수축기 혈압 : ${derived.sp ?? '-'} mmHg`, `이완기 혈압 : ${derived.dp ?? '-'} mmHg`],
          },
          { title: '당뇨병', status: '주의', values: [`공복혈당 : ${derived.fastingBlood ?? '-'} mg/dL`] },
          {
            title: '신장질환',
            status: '안심',
            values: [
              `혈청 크레아티닌 : ${derived.creatinine ?? '-'} mg/dL`,
              `eGFR신사구체여과율 : ${derived.eGFR ?? '-'} ml/min/1.73m²`,
            ],
          },
          {
            title: '간장질환',
            status: '정상',
            values: [`AST : ${derived.ast ?? '-'} IU/L`, `ALT : ${derived.alt ?? '-'} IU/L`, `감마-GTP(Y-GTP) : ${derived.gtp ?? '-'} IU/L`],
          },
          { title: '빈혈', status: '주의', values: [`혈색소 : ${derived.hemoglobin ?? '-'} g/dL`] },
          {
            title: '이상지질혈증',
            status: '정상',
            values: [
              `총콜레스테롤 : ${derived.cholesterol ?? '-'} mg/dL`,
              `HDL-콜레스테롤 : ${derived.hdl ?? '-'} mg/dL`,
              `중성지방 : ${derived.neutralFat ?? '-'} mg/dL`,
              `LDL-콜레스테롤 : ${derived.ldl ?? '-'} mg/dL`,
            ],
          },
          { title: '요단백', status: '안심', values: [`${urineProteinDisplay}`] },
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
