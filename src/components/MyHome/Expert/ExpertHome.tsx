import React from 'react';
import PatientInfoSection from '../Profile/ProfileInfo';
import HomeCalendar from '../Common/HomeCalendar';
import ResumeManagement from '../Resume/ResumeManagement';
import RequestHealthCare from '../../RequestHealthCare/RequestHealthCare';
import { NotificationList } from '../../Alarm/NotificationList';

import ExpertSchedule from './ExpertSchedule';
import PatientManagementList from '../../PatientManagement/memberList';

interface ExpertHomeProps {
  selectedMenu: number;
  selectedDate?: number;
  today: Date;
  onDateSelect: (date: number) => void;
  onEditInfo: () => void;
  onMenuSelect: (menuIndex: number) => void;
}

const ExpertHome: React.FC<ExpertHomeProps> = ({
  selectedMenu,
  selectedDate,
  today,
  onDateSelect,
  onEditInfo,
  // onMenuSelect,
}) => {
  switch (selectedMenu) {
    case 0: // 마이 홈
      return (
        <>
          <PatientInfoSection
            onEditInfo={onEditInfo}
            userType='expert'
            useApiData={true}
          />
          <ExpertSchedule />
          <HomeCalendar selectedDate={selectedDate} today={today} onDateSelect={onDateSelect} userType='expert' />
        </>
      );
    case 1: // 환자 관리
      return <PatientManagementList />;
    case 2: // 이력서 관리
      return <ResumeManagement />;
    case 3: // 건강관리요청서 확인하기
      return <RequestHealthCare />;
    case 4: // 내 알림
      return <NotificationList userType="expert" />;
    default:
      return null;
  }
};

export default ExpertHome;
