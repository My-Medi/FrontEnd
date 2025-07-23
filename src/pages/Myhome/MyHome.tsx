import React, { useState } from 'react';
import SimpleBox from '../../components/MyHome/SimpleBox';
import SideBar from '../../components/MyHome/SideBar';
import Calendar from '../../components/MyHome/Calendar';

import type { ScheduleType } from '../../components/MyHome/ScheduleCard';
import ExpertAdvice from '../../components/MyHome/ExpertAdvice';
import MyConstantMedical from '../../components/MyHome/MyConstantMedical';
import PatientInfoSection from '../../components/MyHome/ProfileInfo';
import ScheduleCard from '../../components/MyHome/ScheduleCard';
import RequestForm from '../../components/HealthCareRequest/RequestForm';
import { useAuth } from '../../contexts/AuthContext';
import ResumeManagement from '../../components/MyHome/Expert_Resume/ResumeManagement';

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
    description: '마이메디가 하나님의 생일을 축하드립니다!! 생일에도 마이메디와 함께 건강지키기!',
    source: { text: '마이메디' },
    time: { text: '12:00 am' },
  },
  {
    type: 'appointment' as ScheduleType,
    date: { month: 6, day: 25 },
    title: '00운동처방사와 상담예약일',
    description: '00운동처방사와 화상 상담받기, 일주일 동안 운동 기록 정리해올 것.',
    source: { text: '여의도 스타벅스' },
    time: { text: '11:00 am - 1:00 pm' },
  },
];

const MyHome: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const { userType } = useAuth();

  // 사용자 타입이 없으면 기본값으로 patient 사용
  const currentUserType = userType || 'patient';

  const renderContent = () => {
    // 전문가인 경우
    if (currentUserType === 'expert') {
      switch (selectedMenu) {
        case 0: // 마이 홈
          return (
            <>
              <PatientInfoSection
                nickname='하나'
                name='김민지'
                age={23}
                height={168}
                weight={52}
                checkupCount={2}
              />
              <div className='w-full h-[2px] bg-[#DBE6FF] my-4 lg:my-8' />
              <MyConstantMedical status='안심' nickname='하나' />
              <ExpertAdvice adviceText='하루 1시간 이상 걷기, 추천 운동법으로 혈당 수치를 낮춰보세요!' />
              <div className='w-full h-[2px] bg-[#DBE6FF] my-4 lg:my-8' />
              <Calendar />
              <div className='flex flex-col gap-6 mt-8'>
                {scheduleData.map((schedule, index) => (
                  <ScheduleCard key={index} {...schedule} />
                ))}
              </div>
            </>
          );
        case 1: // 환자 관리
          return <div className='text-center'>환자 관리 페이지</div>;
        case 2: // 이력서 관리
          return <ResumeManagement />;
        case 3: // 건강관리요청서 확인하기
          return <div className='text-center'>건강관리요청서 확인하기 페이지</div>;
        case 4: // 내 알림
          return <div className='text-center'>내 알림 페이지</div>;
        default:
          return null;
      }
    }

    // 일반 사용자인 경우 (기존 로직)
    switch (selectedMenu) {
      case 0:
        return (
          <>
            <PatientInfoSection
              nickname='하나'
              name='김민지'
              age={23}
              height={168}
              weight={52}
              checkupCount={2}
            />
            <div className='w-full h-[2px] bg-[#DBE6FF] my-4 lg:my-8' />
            <MyConstantMedical status='안심' nickname='하나' />
            <ExpertAdvice adviceText='하루 1시간 이상 걷기, 추천 운동법으로 혈당 수치를 낮춰보세요!' />
            <div className='w-full h-[2px] bg-[#DBE6FF] my-4 lg:my-8' />
            <Calendar />
            <div className='flex flex-col gap-6 mt-8'>
              {scheduleData.map((schedule, index) => (
                <ScheduleCard key={index} {...schedule} />
              ))}
            </div>
          </>
        );
      case 1:
        return <div className='text-center'>건강관리요청서 작성하기 페이지</div>;
      case 2:
        return <div className='text-center'>내 알림 페이지</div>;
      case 3:
        return <RequestForm />;
      default:
        return null;
    }
  };

  return (
    <div className='relative w-full'>
      <div className='flex flex-col lg:hidden'>
        <SideBar
          userType={currentUserType}
          selectedMenu={selectedMenu}
          onMenuSelect={setSelectedMenu}
        />
        <SimpleBox>
          <div
            className={`${selectedMenu === 2 && currentUserType === 'expert' ? 'p-0' : 'p-4 sm:p-6'}`}
          >
            {renderContent()}
          </div>
        </SimpleBox>
      </div>

      <div className='hidden lg:flex lg:justify-center'>
        <SideBar
          userType={currentUserType}
          selectedMenu={selectedMenu}
          onMenuSelect={setSelectedMenu}
        />
        <main className='lg:pt-5 lg:pl-[25px]'>
          <SimpleBox>
            <div>{renderContent()}</div>
          </SimpleBox>
        </main>
      </div>
    </div>
  );
};

export default MyHome;
