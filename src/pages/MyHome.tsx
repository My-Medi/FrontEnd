import React from "react";
import SimpleBox from "../components/MyPage/SimpleBox";
import SideBar from "../components/MyPage/SideBar";
import Calendar from "../components/MyPage/Calendar";
import ScheduleCard from "../components/MyPage/ScheduleCard";
import type { ScheduleType } from "../components/MyPage/ScheduleCard";

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
  return (
    <div
      className="relative w-full flex flex-row"
      style={{
        minHeight: "calc(2950 * 100vw / 1920)",
      }}
    >
      <SideBar />
      <SimpleBox>
        <Calendar />
        <div className="mt-8 flex flex-col gap-6">
          {scheduleData.map((schedule, index) => (
            <ScheduleCard key={index} {...schedule} />
          ))}
        </div>
      </SimpleBox>
    </div>
  );
};

export default MyHome;
