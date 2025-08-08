import React from 'react';
import PatientInfoSection from '../Profile/ProfileInfo';
import MyConstantMedical from './MyConstantMedical';
import ExpertAdvice from './ExpertAdvice';
import HomeCalendar from '../Common/HomeCalendar';
import { NotificationList } from '../../Alarm/NotificationList';

import MatchedExperts from '../Matching/MatchedExperts';
import RequestForm from '../../HealthCareRequest/RequestForm';

interface PatientHomeProps {
  selectedMenu: number;
  selectedDate?: number;
  today: Date;
  onDateSelect: (date: number) => void;
  onEditInfo: () => void;
  onMenuSelect: (menuIndex: number) => void;
}

const PatientHome: React.FC<PatientHomeProps> = ({
  selectedMenu,
  selectedDate,
  today,
  onDateSelect,
  onEditInfo,
  onMenuSelect,
}) => {
  switch (selectedMenu) {
    case 0: // 마이 홈
      return (
        <>
          <PatientInfoSection
            onEditInfo={onEditInfo}
            userType='patient'
            useApiData={true} // API 데이터 사용
          />
          <MyConstantMedical status='안심' />
          <ExpertAdvice 
            adviceText='하루 1시간 이상 걷기, 추천 운동법으로 혈당 수치를 낮춰보세요!' 
            onMenuSelect={onMenuSelect}
          />
          <HomeCalendar
            selectedDate={selectedDate}
            today={today}
            onDateSelect={onDateSelect}
            userType='patient'
          />
        </>
      );
    case 1: // 내 알림
      return <NotificationList />;
    case 2: // 매칭된 전문가
      return <MatchedExperts />;
    case 3: // 건강관리요청서
      return <RequestForm />;
    default:
      return null;
  }
};

export default PatientHome; 