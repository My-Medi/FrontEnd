import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useEffect } from 'react';

const NavBar = () => {
  const navigate = useNavigate();
  const { userType } = useAuth();

  // 디버깅용: userType 변경 시 콘솔에 출력
  useEffect(() => {
    console.log('NavBar - Current userType:', userType);
  }, [userType]);

  return (
    <nav className="w-full hidden lg:block">
      <div className='border-b border-[#1D68FF] bg-white'>
        {/*Topbar와 동일한 기준을 (max-w + mx-auto) 적용해서 -> 바로 아래에 위치 고정 */}
        <div className='flex justify-center px-[60px]'>
          <div className='w-full max-w-[1301px] mx-auto'>
            {/* 전문가일 경우 메뉴만 숨기고 파란색 선은 유지 */}
            {userType !== 'expert' && (
              <div className='flex items-center gap-[32px] px-0 py-[14px] h-[40px] w-fit'>
                <p
                  onClick={() => navigate('/myhome')}
                  className='cursor-pointer text-[#121218] text-[16px] leading-[36px] tracking-[-0.48px] font-[Pretendard] font-medium'
                >
                  마이 홈
                </p>
                <p 
                  onClick={() => navigate('/health-result-input')}
                  className='cursor-pointer text-[#121218] text-[16px] leading-[36px] tracking-[-0.48px] font-[Pretendard] font-medium'
                >
                  마이 메디컬 리포트
                </p>
                <p
                  onClick={() => navigate('/expert')}
                  className='cursor-pointer text-[#121218] text-[16px] leading-[36px] tracking-[-0.48px] font-[Pretendard] font-medium'
                >
                  전문가 찾기
                </p>
                <p 
                  onClick={() => navigate('/health-terms')}
                  className='cursor-pointer text-[#121218] text-[16px] leading-[36px] tracking-[-0.48px] font-[Pretendard] font-medium'
                >
                  건강용어 알아보기
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
