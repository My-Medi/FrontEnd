import { useState } from 'react';
import LeftPatientCard from './LeftPatientCard';
import RightAverageCard from './RightAverageCard';
import IndicationDescription from './IndicationDescription';
import CategorySelector from '../CategorySelector';
import { patientIndicators } from '../../../../data/mmrPatientIndicator';
import { categoryMap } from '../../../../data/mmrCategoryAverageData';
import type { Category } from '../../../../constants/medicalCategory';
import SummaryTextArea from '../SummaryTextArea';
import Compare from './Compare';

const PatientCardList = () => {
  const [currentCategory, setCurrentCategory] = useState<Category>('비만/복부비만');
  const nickname = '하나';
  const patientData = patientIndicators[currentCategory] || [];
  const averageData = categoryMap[currentCategory] || [];

  return (
    <div className='flex flex-col justify-center items-center'>
      <CategorySelector selected={currentCategory} onSelect={setCurrentCategory} />
      <div className='flex mt-[40px]'>
        <SummaryTextArea selectedCategory={currentCategory} />
      </div>
      <div>
        {patientData.map((patient) => {
          const average = averageData.find((avg) => avg.id === patient.id);
          return (
            <div key={patient.id} className='mb-12 mt-[70px]'>
              {/* 설명 문구 */}
              {average && (
                <IndicationDescription
                  indicatorName={patient.title}
                  patientValue={patient.value}
                  averageValue={average.value}
                  ageGroup={average.ageGroup}
                />
              )}

              {/* 좌우 카드 묶음 */}
              <div className='flex gap-4 items-center'>
                <LeftPatientCard
                  nickname={nickname}
                  title={patient.title}
                  value={patient.value}
                  unit={patient.unit}
                  stage={patient.level as any}
                />
                {average && (
                  <Compare
                    stage={patient.level as any}
                    patientValue={patient.value}
                    averageValue={average.value}
                    indicatorId={patient.id}
                  />
                )}
                {average && <RightAverageCard {...average} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientCardList;
