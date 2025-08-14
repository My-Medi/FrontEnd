import React, { useState, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/Login/logo.svg';
import mainLogo from '../../../assets/mainlog.svg';
import { useAuth } from '../../../contexts/AuthContext';
import { clearTokens } from '../../../utils/tokenStorage';
import TopBarNotification from '../TopBarNotification';

const Topbar = memo(() => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { userType, setUserType, showNotification, setShowNotification } = useAuth();

  const handleNavigate = useCallback((path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  }, [navigate]);

  // 로고 클릭 핸들러 - 로그인 상태에 따라 다른 페이지로 이동
  const handleLogoClick = useCallback(() => {
    if (userType) {
      navigate('/myhome');
    } else {
      navigate('/introduce');
    }
  }, [userType, navigate]);

  // 추후에 기능을 더 넣을 때 수정하겠지만 -> 검색 창이 입력+검색 되도록 수정
  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?query=${searchValue.trim()}`);
      setSearchValue('');
    }
  }, [navigate, searchValue]);

  // 로그아웃 핸들러
  const handleLogout = useCallback(() => {
    // 토큰 삭제
    clearTokens();
    // 사용자 타입 초기화
    setUserType(null);
    // 메뉴/알림 닫기
    setIsMenuOpen(false);
    setShowNotification(false);
    // 전체 새로고침으로 쿠키/상태 완전 반영 + 로그인 페이지 이동
    window.location.replace('/login');
  }, [setUserType, setShowNotification]);

  return (
    <>
      {/* Desktop View: xl(1280px) 이상에서만 보임. Figma 디자인에 맞춰 스타일 수정 */}
      <div className='hidden xl:block w-full bg-white'>
        <div className='flex justify-center items-center w-full h-32 px-15 pb-0'>
          <div className='flex items-center justify-between w-full max-w-[81.3rem]'>
            <div className='flex items-center gap-2.5'>
              <img
                src={logo}
                alt='logo'
                className='w-[15rem] h-[2.4rem] object-contain cursor-pointer'
                onClick={handleLogoClick}
              />
              <div className='w-[33.3rem] h-[1.4rem] flex gap-1 items-center mt-4'>
                {' '}
                <span className='text-[#75787B] text-sm font-[300] leading-[1.4] tracking-[-0.42px] font-[Pretendard]'>
                  마이 메디컬 리포트
                </span>
                <span className={`text-sm font-[500] leading-[1.4] tracking-[-0.42px] font-[Pretendard] ${userType === 'expert' ? 'text-[#1D68FF]' : 'text-[#121218]'}`}>
                  {userType === 'expert' ? '전문가' : '마이메디'}
                </span>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <p
                onClick={() => navigate('/introduce')}
                className='text-[#25282B] text-sm font-[300] leading-[1.4] tracking-[-0.42px] cursor-pointer whitespace-nowrap font-[Pretendard] hover:text-[#1D68FF] transition-colors duration-200'
              >
                Mymedi 소개
              </p>
              {/* 전문가 로그인 시 건강용어 알아보기 메뉴 추가 */}
              {userType === 'expert' && (
                <p
                  onClick={() => navigate('/health-terms')}
                  className='text-[#25282B] text-sm font-[300] leading-[1.4] tracking-[-0.42px] cursor-pointer whitespace-nowrap font-[Pretendard] hover:text-[#1D68FF] transition-colors duration-200'
                >
                  건강용어
                </p>
              )}
              {/* 전문가 로그인 시 마이홈 메뉴 추가 */}
              {userType === 'expert' && (
                <p
                  onClick={() => navigate('/myhome')}
                  className='text-[#25282B] text-sm font-[300] leading-[1.4] tracking-[-0.42px] cursor-pointer whitespace-nowrap font-[Pretendard] hover:text-[#1D68FF] transition-colors duration-200'
                >
                  마이홈
                </p>
              )}
              {/* 로그인 상태에 따라 Login/Logout 표시 */}
              {userType ? (
                <p
                  onClick={handleLogout}
                  className='text-[#25282B] text-sm font-[300] leading-[1.4] tracking-[-0.42px] cursor-pointer whitespace-nowrap font-[Pretendard] hover:text-[#1D68FF] transition-colors duration-200'
                >
                  Logout
                </p>
              ) : (
                <p
                  onClick={() => navigate('/login')}
                  className='text-[#25282B] text-sm font-[300] leading-[1.4] tracking-[-0.42px] cursor-pointer whitespace-nowrap font-[Pretendard] hover:text-[#1D68FF] transition-colors duration-200'
                >
                  Login
                </p>
              )}
              <div className="relative">
                <p
                  onClick={() => setShowNotification(!showNotification)}
                  className='text-[#25282B] text-sm font-[300] leading-[1.4] tracking-[-0.42px] cursor-pointer whitespace-nowrap font-[Pretendard] hover:text-[#1D68FF] transition-colors duration-200'
                >
                  알림
                </p>
                <TopBarNotification
                  isVisible={showNotification}
                  onClose={() => setShowNotification(false)}
                  onAction={() => {
                    setShowNotification(false);
                    // 여기에 실제 액션 처리 로직 추가
                    console.log('매칭 전문가 페이지로 이동');
                  }}
                  message="준호 핏 운동 처방사님께서 매칭을 수락하셨어요!"
                  actionText="매칭 전문가 보러가기"
                />
              </div>

              <form
                onSubmit={handleSearchSubmit}
                className='flex items-center gap-[10px] w-[304px] h-[32px] px-[20px] bg-[#F6F6F6] rounded-[20px]'
              >
                <input
                  type='text'
                  placeholder='Search'
                  className='bg-transparent text-[#121218]/50 placeholder-[#121218]/50 text-[14px] font-[Pretendard] font-light leading-[20px] outline-none flex-1'
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button type='submit' aria-label='검색'>
                  <svg
                    width={16}
                    height={18}
                    viewBox='0 0 21 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-[16px] h-[18px]'
                    preserveAspectRatio='xMidYMid meet'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M14.6357 14.9977C13.3152 16.1219 11.6035 16.8003 9.73341 16.8003C5.55446 16.8003 2.16675 13.4126 2.16675 9.23366C2.16675 5.0547 5.55446 1.66699 9.73341 1.66699C13.9124 1.66699 17.3001 5.0547 17.3001 9.23366C17.3001 11.0925 16.6298 12.7948 15.5178 14.112L19.1498 17.744L18.2659 18.6279L14.6357 14.9977ZM16.0501 9.23366C16.0501 12.7223 13.222 15.5503 9.73341 15.5503C6.24482 15.5503 3.41675 12.7223 3.41675 9.23366C3.41675 5.74506 6.24482 2.91699 9.73341 2.91699C13.222 2.91699 16.0501 5.74506 16.0501 9.23366Z'
                                            fill='#121212'
                      fillOpacity='0.5'
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile View: xl(1280px) 미만에서만 보임 */}{' '}
      <div className='xl:hidden'>
        {' '}
        <div className='relative z-20 flex justify-between items-center w-full h-20 px-4  shadow-sm'>
          {' '}
          <div
            className='flex items-center gap-2.5 cursor-pointer'
            onClick={handleLogoClick}
          >
            <img src={mainLogo} className='w-10 h-10 object-contain' alt='MyMedi Logo' />
            <p className='text-3xl font-semibold text-[#1d68ff]'>MYMEDi</p>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label='메뉴 열기'>
            <svg
              className='w-8 h-8 text-gray-700'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className='absolute top-20 left-0 w-full bg-white shadow-lg z-50'>
            <nav className='flex flex-col items-center gap-4 py-8'>
              {/* Topbar Links */}
              <a
                onClick={() => handleNavigate('/introduce')}
                className='px-4 py-2 text-lg text-gray-700 hover:text-[#1d68ff] cursor-pointer'
              >
                mymedi 소개
              </a>
              {userType === 'expert' && (
                <a
                  onClick={() => handleNavigate('/health-terms')}
                  className='px-4 py-2 text-lg text-gray-700 hover:text-[#1d68ff] cursor-pointer'
                >
                  건강용어
                </a>
              )}
              {userType === 'expert' && (
                <a
                  onClick={() => handleNavigate('/myhome')}
                  className='px-4 py-2 text-lg text-gray-700 hover:text-[#1d68ff] cursor-pointer'
                >
                  마이홈
                </a>
              )}
              <a
                onClick={() => setShowNotification(true)}
                className='px-4 py-2 text-lg text-gray-700 hover:text-[#1d68ff] cursor-pointer'
              >
                알림
              </a>
              <div className='w-10/12 h-px bg-gray-200 my-4'></div>
              {/* NavBar Links */}
              <a onClick={() => handleNavigate('/myhome')} className="px-4 py-2 text-lg font-semibold text-gray-700 hover:text-[#1d68ff]">마이 홈</a>
              <a onClick={() => handleNavigate('/health-result-input')} className="px-4 py-2 text-lg text-gray-700 hover:text-[#1d68ff]">마이 메디컬 리포트</a>
              <a onClick={() => handleNavigate('/find-expert')} className="px-4 py-2 text-lg text-gray-700 hover:text-[#1d68ff]">전문가 찾기</a>
              <a onClick={() => handleNavigate('/health-terms')} className="px-4 py-2 text-lg text-gray-700 hover:text-[#1d68ff]">건강용어 알아보기</a>
              <div className="w-10/12 h-px bg-gray-200 my-4"></div>
              {/* Auth Links */}
              {userType ? (
                <a
                  onClick={handleLogout}
                  className='px-4 py-2 text-lg text-gray-700 hover:text-[#1d68ff] cursor-pointer'
                >
                  LOGOUT
                </a>
              ) : (
                <>
                  <a
                    onClick={() => handleNavigate('/login')}
                    className='px-4 py-2 text-lg text-gray-700 hover:text-[#1d68ff] cursor-pointer'
                  >
                    LOGIN
                  </a>
                  <a
                    onClick={() => handleNavigate('/signup')}
                    className='px-4 py-2 text-lg text-gray-700 hover:text-[#1d68ff] cursor-pointer'
                  >
                    회원가입
                  </a>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </>
  );
});

export default Topbar;
