import { useState } from 'react';
import { useComparingReportQuery } from '../../../../hooks/myMedicalReport/useComparingReportQuery';
import { mapReportToCombinedByCategory } from '../../../../utils/mappers/medicalReportMapper';
import { categoryMap } from '../../../../data/mmrCategoryAverageData';
import type { Category } from '../../../../constants/medicalCategory';
import LeftPatientCard from './LeftPatientCard';
import RightAverageCard from './RightAverageCard';
import IndicationDescription from './IndicationDescription';
import CategorySelector from '../CategorySelector';
import SummaryTextArea from '../SummaryTextArea';
import Compare from './Compare';

const PatientCardList = () => {
  const [currentCategory, setCurrentCategory] = useState<Category>('비만/복부비만');

  // API 데이터 가져오기
  const { data: reportData, isLoading, error } = useComparingReportQuery();

  console.log('📊 PatientCardList 상태:', {
    isLoading,
    hasError: !!error,
    hasData: !!reportData,
    currentCategory,
    reportData: reportData
      ? {
          nickname: reportData.nickname,
          ageGroup10Yr: reportData.ageGroup10Yr,
          gender: reportData.gender,
          hasObesityData: !!reportData.obesityAssessmentDto,
          hasHypertensionData: !!reportData.hypertensionAssessmentDto,
        }
      : null,
  });

  if (isLoading) {
    console.log('⏳ 로딩 중...');
    return <div>로딩 중...</div>;
  }

  if (error || !reportData) {
    console.error('❌ 데이터 로드 실패:', error);
    return <div>데이터를 불러오는데 실패했습니다.</div>;
  }

  // API 데이터를 컴포넌트에서 사용할 수 있는 형태로 변환
  console.log('🔄 데이터 매핑 시작...');
  const combinedData = mapReportToCombinedByCategory(
    reportData,
    categoryMap as any,
    reportData.nickname,
  );
  console.log('✅ 데이터 매핑 완료:', {
    categories: Object.keys(combinedData),
    currentCategoryData: combinedData[currentCategory]?.length || 0,
  });

  const currentCategoryData = combinedData[currentCategory] || [];
  console.log('📋 현재 카테고리 데이터:', {
    category: currentCategory,
    dataCount: currentCategoryData.length,
    data: currentCategoryData.map((item) => ({
      id: item.indicatorId,
      title: item.leftProps.title,
      value: item.leftProps.value,
      stage: item.leftProps.stage,
    })),
  });

  return (
    <div className='flex flex-col justify-center items-center mt-[-40px]'>
      <CategorySelector selected={currentCategory} onSelect={setCurrentCategory} />
      <div className='flex mt-[40px]'>
        <SummaryTextArea selectedCategory={currentCategory} reportData={reportData} />
      </div>
      <div>
        {currentCategoryData.map((row) => (
          <div key={row.indicatorId} className='mb-[10px] mt-[48px]'>
            {/* 설명 문구 */}
            {row.descProps && (
              <IndicationDescription
                indicatorName={row.descProps.indicatorName}
                patientValue={row.descProps.patientValue}
                averageValue={row.descProps.averageValue}
                ageGroup={row.descProps.ageGroup}
                rank={row.descProps.rank}
                gender={row.descProps.gender}
                ageGroup10Yr={row.descProps.ageGroup10Yr}
                rankType={row.descProps.rankType}
                rankPercent={row.descProps.rankPercent}
                comparisonText={row.descProps.comparisonText}
                isUnknown={row.descProps.isUnknown}
              />
            )}

            {/* 좌우 카드 묶음 */}
            <div className='flex gap-4 items-center'>
              <LeftPatientCard
                nickname={row.leftProps.nickname}
                title={row.leftProps.title}
                value={row.leftProps.value}
                unit={row.leftProps.unit}
                stage={row.leftProps.stage}
                isUnknown={row.leftProps.isUnknown}
              />

              {/* 비교/우측 평균 카드 */}
              <Compare
                stage={row.compareProps.stage}
                patientValue={row.compareProps.patientValue}
                averageValue={row.compareProps.averageValue}
                indicatorId={row.compareProps.indicatorId}
              />

              {row.rightProps && <RightAverageCard {...row.rightProps} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientCardList;
