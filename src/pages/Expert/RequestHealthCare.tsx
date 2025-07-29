import React, { useState } from 'react';
import SideBar from '../../components/MyHome/SideBar';
import SimpleBox from '../../components/MyHome/SimpleBox';
import RequestHealthCareCard from '../../components/RequestHealthCare/HealthCareCard';
import RequsetHealthHeader from '../../components/RequestHealthCare/Header';
import RequestHealthPagination from '../../components/RequestHealthCare/PaginationHealthCare';
import requestCardData from '../../data/requestHealthCard';

const RequestHealthCare: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const RequestHealthCareCards = () => {
    return (
      <div className='p-10 max-w-[900px] mx-auto'>
        {requestCardData.map((data, index) => (
          <RequestHealthCareCard key={index} {...data} />
        ))}
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
            <div className='p-8 xl:p-16'>
              <div className='flex justify-center'>
                <RequsetHealthHeader expertNickname='튼튼핏' expertName='이수형' />
              </div>
              <div>
                <RequestHealthCareCards />
              </div>
              <div className='justify-center'>
                <RequestHealthPagination
                  currentPage={1}
                  totalPages={10}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          </SimpleBox>
        </main>
      </div>
    </div>
  );
};

export default RequestHealthCare;
