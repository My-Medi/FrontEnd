import { useState } from 'react';
import { useExpertUserReportQuery } from '../../hooks/expert/report/useExpertUserReportQuery';
import { mapExpertReportToCombinedByCategory } from '../../utils/mappers/expertReportMapper';
import type { Category } from '../../constants/medicalCategory';
import LeftPatientCard from '../MyMedicalReport/body/Cards/LeftPatientCard';
import RightAverageCard from '../MyMedicalReport/body/Cards/RightAverageCard';
import IndicationDescription from '../MyMedicalReport/body/Cards/IndicationDescription';
import CategorySelector from '../MyMedicalReport/body/CategorySelector';
import ExpertSummaryTextArea from './ExpertSummaryTextArea';
import Compare from '../MyMedicalReport/body/Cards/Compare';

interface ExpertPatientCardListProps {
  userId: number;
  round: number;
  nickname: string;
}

const ExpertPatientCardList: React.FC<ExpertPatientCardListProps> = ({
  userId,
  round,
  nickname,
}) => {
  const [currentCategory, setCurrentCategory] = useState<Category>('비만/복부비만');

  // API 데이터 가져오기
  const { data: reportData, isLoading, error } = useExpertUserReportQuery(userId, round);

  // API 데이터가 있으면 사용, 없으면 기본값 사용
  const displayNickname = nickname || '사용자';

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error || !reportData) {
    return <div>데이터를 불러오는데 실패했습니다.</div>;
  }

  // API 데이터를 컴포넌트에서 사용할 수 있는 형태로 변환
  const combinedData = mapExpertReportToCombinedByCategory(
    reportData,
    {}, // categoryMap 대신 빈 객체 사용 (API에서 데이터를 받으므로 불필요)
    displayNickname,
  );

  const currentCategoryData = combinedData[currentCategory] || [];

  // 데이터 처리 완료

  return (
    <div className='flex flex-col justify-center items-center mt-[-40px]'>
      <CategorySelector selected={currentCategory} onSelect={setCurrentCategory} />
      <div className='flex mt-[40px]'>
        <ExpertSummaryTextArea
          selectedCategory={currentCategory}
          reportData={reportData}
          nickname={nickname}
        />
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
                gender={row.descProps.gender || '여'}
                ageGroup10Yr={row.descProps.ageGroup10Yr}
                rankType={row.descProps.rankType}
                rankPercent={row.descProps.rankPercent}
                comparisonText={row.descProps.comparisonText}
                isUnknown={row.descProps.isUnknown}
                nickname={row.leftProps.nickname}
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

export default ExpertPatientCardList;
