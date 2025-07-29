import React, { useState } from 'react';
import RequestHealthCareCard from './HealthCareCard';
import RequsetHealthHeader from './Header';
import requestCardData from '../../data/requestHealthCard';
import Pagination from '../Expert/Pagination';

const RequestHealthCare: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; //예시
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
    <div className='p-8 xl:p-16'>
      <div className='flex justify-center'>
        <RequsetHealthHeader expertNickname='튼튼핏' expertName='이수형' />
      </div>
      <div>
        <RequestHealthCareCards />
      </div>
      <div className='justify-center'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default RequestHealthCare;
