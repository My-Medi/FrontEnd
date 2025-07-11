import React, { useState } from 'react';
import SimpleBox from '../../components/MyHome/SimpleBox';
import SideBar from '../../components/MyHome/SideBar';
import Calendar from '../../components/MyHome/Calendar';

import type { ScheduleType } from '../../components/MyHome/ScheduleCard';
import ExpertAdvice from '../../components/MyHome/ExpertAdvice';
import MyConstantMedical from '../../components/MyHome/MyConstantMedical';
import PatientInfoSection from '../../components/MyHome/ProfileInfo';
import ScheduleCard from '../../components/MyHome/ScheduleCard';

const scheduleData = [
  {
    type: 'report' as ScheduleType,
    date: { month: 6, day: 15 },
    title: '마이메디컬리포트 시작일',
    description: '국가건강검진결과를 마이메디컬리포트로 쉽게 이해할 수 있어요!',
    source: { text: '마이메디' },
    time: { text: '12:00 pm' },
  },
  {
    type: 'birthday' as ScheduleType,
    date: { month: 6, day: 17 },
    title: '하나 님의 생일',
    description:
      '마이메디가 하나님의 생일을 축하드립니다!! 생일에도 마이메디와 함께 건강지키기!',
    source: { text: '마이메디' },
    time: { text: '12:00 am' },
  },
  {
    type: 'appointment' as ScheduleType,
    date: { month: 6, day: 25 },
    title: '00운동처방사와 상담예약일',
    description:
      '00운동처방사와 화상 상담받기, 일주일 동안 운동 기록 정리해올 것.',
    source: { text: '여의도 스타벅스' },
    time: { text: '11:00 am - 1:00 pm' },
  },
];

const MyHome: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const renderContent = () => {
    switch (selectedMenu) {
      case 0:
        return (
          <>
            <PatientInfoSection
              nickname="하나"
              name="김민지"
              age={23}
              height={168}
              weight={52}
              checkupCount={2}
            />
            <div className="w-full h-[2px] bg-[#DBE6FF] my-4 lg:mt-[36px] lg:mb-[44px]" />
            <MyConstantMedical status="안심" nickname="하나" />
            <ExpertAdvice adviceText="하루 1시간 이상 걷기, 추천 운동법으로 혈당 수치를 낮춰보세요!" />
            <div className="w-full h-[2px] bg-[#DBE6FF] my-4 lg:mt-[22px] lg:mb-[54px]" />
            <Calendar />
            <div className="mt-8 flex flex-col gap-6 lg:mt-[34px]">
              {scheduleData.map((schedule, index) => (
                <ScheduleCard key={index} {...schedule} />
              ))}
            </div>
          </>
        );
      case 1:
        return <div className="p-6 text-center">건강관리요청서 작성하기 페이지</div>;
      case 2:
        return <div className="p-6 text-center">내 알림 페이지</div>;
      case 3:
        return <div className="p-6 text-center">매칭된 전문가 페이지</div>;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-col lg:hidden">
        <SideBar
          userType="patient"
          selectedMenu={selectedMenu}
          onMenuSelect={setSelectedMenu}
        />
        <SimpleBox>
          <div className="p-6">{renderContent()}</div>
        </SimpleBox>
      </div>

      <div className="hidden lg:flex lg:pt-[70px]">
        <SideBar
          userType="patient"
          selectedMenu={selectedMenu}
          onMenuSelect={setSelectedMenu}
        />
        <main className="flex-grow lg:ml-[70px]">
          <SimpleBox>
            <div className="pl-[73px] pt-[76px] pr-[73px] pb-[80px]">
              {renderContent()}
            </div>
          </SimpleBox>
        </main>
      </div>
    </div>
  );
};

export default MyHome;
