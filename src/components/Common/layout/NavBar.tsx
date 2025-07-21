import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full hidden lg:flex justify-center" >
      <div
        className="bg-white rounded-full flex items-center justify-around py-[14px] w-[87%] min-h-[56px] mx-[124px]"
        style={{ boxShadow: "0px 0px 20px 0px #1D68FF33" }}
      >
        <p onClick={() => navigate('/myhome')} className="cursor-pointer text-[#121212] text-[22px] leading-[26px]">마이 홈</p>
        <p onClick={() => navigate('/health-result-input')} className="cursor-pointer text-[#121212] text-[22px] leading-[26px]">마이 메디컬 리포트</p>
        <a href="#" className="text-[#121212] text-[22px] leading-[26px]">전문가 찾기</a>
        <a href="#" className="text-[#121212] text-[22px] leading-[26px]">건강용어 알아보기</a>
    <div className='hidden lg:block border-b border-[#1D68FF] bg-white mt-[-15px]'>
      {/*Topbar와 동일한 기준을 (max-w + mx-auto) 적용해서 -> 바로 아래에 위치 고정 */}
      <div className='flex justify-center px-[60px]'>
        <div className='w-full max-w-[1301px] mx-auto'>
          <div className='flex items-center gap-[32px] px-0 py-[14px] h-[40px] w-fit'>
            <p
              onClick={() => navigate('/myhome')}
              className='cursor-pointer text-[#121218] text-[16px] leading-[36px] tracking-[-0.48px] font-[Pretendard] font-medium'
            >
              마이 홈
            </p>
            <p className='cursor-pointer text-[#121218] text-[16px] leading-[36px] tracking-[-0.48px] font-[Pretendard] font-medium'>
              마이 메디컬 리포트
            </p>
            <p
              onClick={() => navigate('/expert')}
              className='cursor-pointer text-[#121218] text-[16px] leading-[36px] tracking-[-0.48px] font-[Pretendard] font-medium'
            >
              전문가 찾기
            </p>
            <p className='cursor-pointer text-[#121218] text-[16px] leading-[36px] tracking-[-0.48px] font-[Pretendard] font-medium'>
              건강용어 알아보기
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
