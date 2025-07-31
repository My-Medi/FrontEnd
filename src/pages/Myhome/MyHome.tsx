import React, { useState, useMemo } from 'react';
import SimpleBox from '../../components/MyHome/SimpleBox';
import SideBar from '../../components/MyHome/SideBar';
import Calendar from '../../components/MyHome/Calendar';
import ExpertAdvice from '../../components/MyHome/ExpertAdvice';
import MyConstantMedical from '../../components/MyHome/MyConstantMedical';
import ScheduleCard from '../../components/MyHome/ScheduleCard';
import RequestForm from '../../components/HealthCareRequest/RequestForm';
import MatchedExperts from '../../components/MyHome/User_MatchingExpert/MatchedExperts';
import { useAuth } from '../../contexts/AuthContext';
import ResumeManagement from '../../components/MyHome/Expert_Resume/ResumeManagement';
import EditInfo from '../../components/MyHome/MyHomeEdit/EditInfo';
import ConfirmModal from '../../components/MyHome/MyHomeEdit/ConfirmModal';
import RequestHealthCare from '../../components/RequestHealthCare/RequestHealthCare';
import { NotificationList } from '../../components/Alarm/NotificationList';
import { patientNotificationList } from '../../data/patientNotificationList';
import { expertNotificationList } from '../../data/expertNotificationList';
import PatientInfoSection from '../../components/MyHome/ProfileInfo';
import { getSchedulesForDate, getTodaySchedules, initializeRandomSchedules } from '../../data/scheduleData';


// 기존 scheduleData는 제거하고 동적으로 생성하도록 변경

const MyHome: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [showEditInfo, setShowEditInfo] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingMenuIndex, setPendingMenuIndex] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | undefined>(undefined);
  const { userType } = useAuth();

  // 오늘 날짜 가져오기
  const today = useMemo(() => {
    const now = new Date();
    const koreaTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Seoul"}));
    return koreaTime;
  }, []);

  // 랜덤 일정 초기화 (컴포넌트 마운트 시 한 번만 실행)
  useMemo(() => {
    initializeRandomSchedules(15); // 15개의 랜덤 일정 생성
  }, []);

  // 선택된 날짜의 스케줄 데이터 가져오기
  const currentSchedules = useMemo(() => {
    if (selectedDate) {
      // 선택된 날짜가 있는 경우 해당 날짜의 스케줄
      const selectedDateObj = new Date(today.getFullYear(), today.getMonth(), selectedDate);
      return getSchedulesForDate(selectedDateObj);
    } else {
      // 선택된 날짜가 없으면 오늘 날짜의 스케줄 (기본값)
      return getTodaySchedules();
    }
  }, [selectedDate, today]);

  // 선택된 날짜가 오늘인지 확인
  const isSelectedDateToday = selectedDate === today.getDate();

  // 날짜 선택 핸들러
  const handleDateSelect = (date: number) => {
    setSelectedDate(date);
  };

  // 메뉴 선택 핸들러
  const handleMenuSelect = (menuIndex: number) => {
    // EditInfo 페이지가 열려있고 변경사항이 있다면 확인 모달 표시
    if (showEditInfo && hasChanges) {
      setPendingMenuIndex(menuIndex);
      setShowConfirmModal(true);
    } else {
      setSelectedMenu(menuIndex);
      if (showEditInfo) {
        setShowEditInfo(false);
      }
    }
  };

  // 확인 모달에서 저장 선택 시
  const handleConfirmSave = () => {
    setShowConfirmModal(false);
    if (pendingMenuIndex !== null) {
      setSelectedMenu(pendingMenuIndex);
      setShowEditInfo(false);
      setPendingMenuIndex(null);
    }
  };

  // 확인 모달에서 취소 선택 시
  const handleConfirmCancel = () => {
    setShowConfirmModal(false);
    setPendingMenuIndex(null);
  };

  // 사용자 타입이 없으면 기본값으로 patient 사용
  const currentUserType = userType || 'patient';

  const renderContent = () => {
    // 회원정보 수정 페이지가 활성화된 경우
    if (showEditInfo) {
      return (
        <EditInfo
          userType={currentUserType}
          onBack={() => setShowEditInfo(false)}
          onHasChanges={setHasChanges}
        />
      );
    }

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
              onEditInfo={() => setShowEditInfo(true)}
            />
              <MyConstantMedical status='안심' nickname='하나' />
              <ExpertAdvice 
                adviceText='하루 1시간 이상 걷기, 추천 운동법으로 혈당 수치를 낮춰보세요!' 
                onMenuSelect={handleMenuSelect}
              />
              <Calendar 
                selectedDate={selectedDate}
                defaultSelectedDate={selectedDate ? undefined : today.getDate()}
                onDateSelect={handleDateSelect}
              />
              <div className='flex flex-col gap-6 mt-10'>
                {currentSchedules.length > 0 ? (
                  currentSchedules.map((schedule, index) => (
                    <div key={index} className={index === currentSchedules.length - 1 ? 'mb-[50px]' : ''}>
                      <ScheduleCard {...schedule} />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    {selectedDate ? (
                      <div>
                        <div className="text-lg font-medium mb-2">
                          {isSelectedDateToday ? '오늘' : `${selectedDate}일`}
                        </div>
                        <div>예정된 스케줄이 없습니다.</div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-lg font-medium mb-2">오늘</div>
                        <div>예정된 스케줄이 없습니다.</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          );
        case 1: // 환자 관리
          return <div className='text-center'>환자 관리 페이지</div>;
        case 2: // 이력서 관리
          return <ResumeManagement />;
        case 3: // 건강관리요청서 확인하기
          return <RequestHealthCare />;
        case 4: // 내 알림
          return <NotificationList notifications={expertNotificationList} />;
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
              onEditInfo={() => setShowEditInfo(true)}
            />
            <MyConstantMedical status='안심' nickname='하나' />
            <ExpertAdvice 
              adviceText='하루 1시간 이상 걷기, 추천 운동법으로 혈당 수치를 낮춰보세요!' 
              onMenuSelect={handleMenuSelect}
            />
            <Calendar 
              selectedDate={selectedDate}
              defaultSelectedDate={selectedDate ? undefined : today.getDate()}
              onDateSelect={handleDateSelect}
            />
            <div className='flex flex-col gap-[22px] mt-8'>
              {currentSchedules.length > 0 ? (
                currentSchedules.map((schedule, index) => (
                  <div key={index} className={index === currentSchedules.length - 1 ? 'mb-[50px]' : ''}>
                    <ScheduleCard {...schedule} />
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {selectedDate ? (
                    <div>
                      <div className="text-lg font-medium mb-2">
                        {isSelectedDateToday ? '오늘' : `${selectedDate}일`}
                      </div>
                      <div>예정된 스케줄이 없습니다.</div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-lg font-medium mb-2">오늘</div>
                      <div>예정된 스케줄이 없습니다.</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        );
      case 1:
        return <NotificationList notifications={patientNotificationList} />;
      case 2:
        return <MatchedExperts />;
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
          onMenuSelect={handleMenuSelect}
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
          onMenuSelect={handleMenuSelect}
        />
        <main className='lg:pt-5 lg:pl-[25px]'>
          <SimpleBox>
            <div>{renderContent()}</div>
          </SimpleBox>
        </main>
      </div>

      {/* 확인 모달 */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSave}
        onCancel={handleConfirmCancel}
      />
    </div>
  );
};

export default MyHome;
