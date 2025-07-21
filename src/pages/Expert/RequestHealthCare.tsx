import React, { useState } from 'react';
import SideBar from '../../components/MyHome/SideBar';
import SimpleBox from '../../components/MyHome/SimpleBox';
import RequestHealthCareCard from '../../components/Expert/RequestHealthCareCard';

const RequestHealthCare: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const RequestHealthCareCards = () => {
    return (
      <div className='p-10 max-w-[900px] mx-auto'>
        <RequestHealthCareCard
          nickname='수정'
          gender='여성'
          age={35}
          height={168}
          weight={78}
          requestMessage={`최근 들어 야근과 불규칙한 생활 패턴이 반복되면서 속이 자주 더부룩하고 식사 후에 소화가 잘 되지 않는 느낌을 자주 받습니다.특히 기름진 음식을 먹었을 때 속이 답답해지고 컨디션이 떨어지는 경우가 많아, 전반적인 소화기 건강과 식습관 개선에 대한 전문적인 관리가 필요하다고 생각했습니다.
하루 식사 타이밍이나 음식 조합 등에 대해 조언을 받고 싶고, 장 건강까지 고려한 관리 방향이 있다면 함께 제안받고 싶
습니다.`}
          receivedDate='25. 7. 23 수신'
        />
      </div>
    );
  };

  return (
    <div className='relative w-full'>
      <div className='flex flex-col lg:hidden'>
        <SideBar userType='patient' selectedMenu={selectedMenu} onMenuSelect={setSelectedMenu} />
        <SimpleBox>
          <div className='p-4 sm:p-6'></div>
        </SimpleBox>
      </div>

      <div className='hidden lg:flex lg:justify-center'>
        <SideBar userType='patient' selectedMenu={selectedMenu} onMenuSelect={setSelectedMenu} />
        <main className='lg:pt-5 lg:pl-[25px]'>
          <SimpleBox>
            <div className='p-8 xl:p-16'></div>
            <RequestHealthCareCards />
          </SimpleBox>
        </main>
      </div>
    </div>
  );
};

export default RequestHealthCare;
