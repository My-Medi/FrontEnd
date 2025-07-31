import React from 'react';
import problemImage from '../../../assets/Introduce/problem.svg';

const ProblemCards: React.FC = () => {
  return (
    <div className="relative w-full overflow-x-hidden">
      <div className="flex justify-center pb-6">
        <img 
          src={problemImage} 
          alt="Problem Cards" 
          className="w-full h-auto object-contain max-w-[120rem]"
        />
      </div>
    </div>
  );
};

export default ProblemCards; 