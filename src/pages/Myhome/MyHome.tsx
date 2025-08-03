import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import SideBar from '../../components/MyHome/Layout/SideBar';
import SimpleBox from '../../components/MyHome/Layout/SimpleBox';
import ConfirmModal from '../../components/MyHome/Edit/ConfirmModal';
import EditInfo from '../../components/MyHome/Edit/EditInfo';
import ExpertHome from '../../components/MyHome/Expert/ExpertHome';
import PatientHome from '../../components/MyHome/Patient/PatientHome';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import { initializeRandomSchedules } from '../../data/scheduleData';


// 기존 scheduleData는 제거하고 동적으로 생성하도록 변경

const MyHome: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [showEditInfo, setShowEditInfo] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingMenuIndex, setPendingMenuIndex] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | undefined>(undefined);
  const [imagesLoaded, setImagesLoaded] = useState(false);
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

  // 사이드바 이미지 사전 로딩
  useEffect(() => {
    const preloadSidebarImages = async () => {
      const sidebarImages = [
        '/src/assets/MyHome/SideBar/home.svg',
        '/src/assets/MyHome/SideBar/write.svg',
        '/src/assets/MyHome/SideBar/resume.svg',
        '/src/assets/MyHome/SideBar/expert.svg',
        '/src/assets/MyHome/SideBar/notification.svg',
        '/src/assets/MyHome/SideBar/check.svg'
      ];

      try {
        await Promise.all(
          sidebarImages.map(src => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = reject;
              img.src = src;
            });
          })
        );
        setImagesLoaded(true);
      } catch (error) {
        console.error('이미지 로딩 실패:', error);
        setImagesLoaded(true); // 에러가 있어도 페이지는 표시
      }
    };

    preloadSidebarImages();
  }, []);



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

    // 사용자 타입에 따라 적절한 컴포넌트 렌더링
    if (currentUserType === 'expert') {
      return (
        <ExpertHome
          selectedMenu={selectedMenu}
          selectedDate={selectedDate}
          today={today}
          onDateSelect={handleDateSelect}
          onEditInfo={() => setShowEditInfo(true)}
          onMenuSelect={handleMenuSelect}
        />
      );
    } else {
      return (
        <PatientHome
          selectedMenu={selectedMenu}
          selectedDate={selectedDate}
          today={today}
          onDateSelect={handleDateSelect}
          onEditInfo={() => setShowEditInfo(true)}
          onMenuSelect={handleMenuSelect}
        />
      );
    }
  };

  // 이미지 로딩 중일 때 로딩 스피너 표시
  if (!imagesLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner message="페이지를 불러오는 중..." size="lg" />
      </div>
    );
  }

  return (
    <div className='relative w-full'>
      {/* 모바일/태블릿 레이아웃 (1024px 미만) */}
      <div className='xl:hidden'>
        {/* 사이드바 - 가로 배치 */}
        <div className='flex justify-center w-full bg-white border-b border-[#DBE6FF] py-4'>
          <SideBar
            userType={currentUserType}
            selectedMenu={selectedMenu}
            onMenuSelect={handleMenuSelect}
          />
        </div>
        
        {/* 메인 컨텐츠 */}
        <div className='mt-4'>
          <SimpleBox>
            <div
              className={`${selectedMenu === 2 && currentUserType === 'expert' ? 'p-0' : 'p-4 sm:p-6'}`}
            >
              {renderContent()}
            </div>
          </SimpleBox>
        </div>
      </div>

      {/* 데스크톱 레이아웃 (1025px 이상) - Figma 1:1 스타일링 */}
      <div className='hidden xl:flex xl:justify-center'>
        <SideBar
          userType={currentUserType}
          selectedMenu={selectedMenu}
          onMenuSelect={handleMenuSelect}
        />
        <main className='xl:pt-5 xl:pl-6'>
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
