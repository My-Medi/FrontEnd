// import React, { useState } from 'react';
// import { FiChevronRight } from 'react-icons/fi';
// import HealthDataModal from './DetailModal/DetailModal';

// interface RequestHealthCareProps {
//   nickname: string;
//   gender: string;
//   age: number;
//   height: number;
//   weight: number;
//   requestMessage: string;
//   receivedDate: string;
// }

// const RequestHealthCareCard: React.FC<RequestHealthCareProps> = ({
//   nickname,
//   gender,
//   age,
//   height,
//   weight,
//   requestMessage,
//   receivedDate,
// }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const handleAccept = () => {
//     setIsModalOpen(false);
//   };
//   const handleReject = () => {
//     setIsModalOpen(false);
//   };
//   return (
//     <>
//       {/* 데스크탑 전용 UI */}
//       <div className='hidden lg:block'>
//         {/* 날짜 텍스트 */}
//         <p className='text-[#4D5053] ml-[34px] items-start text-[14px] font-medium leading-[24px] tracking-[-0.42px] mb-2 font-[Pretendard]'>
//           {receivedDate}
//         </p>

//         {/* 요청 카드 박스 */}
//         <div
//           className='w-[771px] bg-white rounded-[12px] px-[30px] py-[24px] flex flex-col justify-center items-center gap-[16px] mx-auto mb-10'
//           style={{ border: '1.2px solid #DBE6FF' }}
//         >
//           <div className='flex w-[621px] max-h-[491px] flex-col items-center gap-8px'>
//             <h3 className='w-full font-semibold'>
//               <span className='text-[#1D68FF] font-[Pretendard] text-[20px] leading-[36px] tracking-[-0.6px]'>
//                 {nickname}
//               </span>
//               <span className='text-[#121218] font-[Pretendard] text-[20px] leading-[36px] tracking-[-0.6px]'>
//                 회원님의 건강관리요청서
//               </span>
//             </h3>

//             {/* 기본 정보 */}
//             <div className='w-full flex flex-col items-start mt-[8px]'>
//               <p className='mb-[4px] text-[#25282B] font-semibold font-[Pretendard] text-[16px] leading-[22px] tracking-[-0.48px]'>
//                 기본 정보
//               </p>
//               <div className='flex items-start gap-[9.6px] h-[22px]'>
//                 <span className='text-[14px] font-light text-[#121218]'>{gender}</span>
//                 <span className='text-[14px] font-light text-[#121218]'>·</span>
//                 <span className='text-[14px] font-light text-[#121218]'>만 {age}세</span>
//                 <span className='text-[14px] font-light text-[#121218]'>·</span>
//                 <span className='text-[14px] font-light text-[#121218]'>
//                   {height}cm / {weight}kg
//                 </span>
//               </div>
//             </div>

//             {/* 요청 사항 */}
//             <div className='w-full flex flex-col items-start gap-4px mt-[8px]'>
//               <p className='mb-[4px] font-semibold font-[Pretendard] text-[#25282B] text-[16px] leading-[22px] tracking-[-0.48px]'>
//                 요청사항
//               </p>
//               <div className='max-w-[618px] max-h-[214px] overflow-y-auto'>
//                 {requestMessage.split('\n').map((line, index) =>
//                   line.trim() === '' ? (
//                     <div key={index} className='my-[6px]' />
//                   ) : (
//                     <p
//                       key={index}
//                       className='text-[14px] text-[#121218] font-light leading-[22px] tracking-[-0.4px]'
//                     >
//                       {line}
//                     </p>
//                   ),
//                 )}
//               </div>
//             </div>

//             {/* 건강데이터 보기 버튼 */}
//             <div
//               className='w-full mt-[8px] whitespace-nowrap text-[#1D68FF] font-semibold flex justify-center items-center cursor-pointer'
//               onClick={() => setIsModalOpen(true)}
//             >
//               <span className='mr-[20px] leading-[22px] tracking-[-0.48px]'>
//                 건강데이터 자세히 보기
//               </span>
//               <FiChevronRight size={30} color='#1D68FF' />
//             </div>
//           </div>

//           {/* 하단 버튼 영역 */}
//           <div className='w-[615px] flex flex-col items-center border-t-[1.2px] border-[#DBE6FF] pt-8'>
//             <div className='flex gap-[105.6px]'>
//               <button
//                 className='w-[180px] h-[42px] rounded-full bg-white text-[#25282B] text-[16px] font-medium border border-[#E3E6EB] font-[Pretendard] leading-[36px] tracking-[-0.48px] cursor-pointer'
//                 style={{ boxShadow: '0px 0px 5px 5px rgba(29, 104, 255, 0.05)' }}
//                 onClick={handleReject}
//               >
//                 거절하기
//               </button>
//               <button
//                 className='w-[180px] h-[42px] rounded-full text-white text-[16px] font-medium font-[Pretendard] leading-[22.4px] tracking-[-0.48px] cursor-pointer'
//                 style={{
//                   backgroundColor: '#1D68FF',
//                   boxShadow: '0px 0px 5px 5px rgba(29, 104, 255, 0.08)',
//                 }}
//                 onClick={handleAccept}
//               >
//                 수락하기
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 모바일 전용 UI */}
//       <div className='lg:hidden px-4 mb-10 font-[Pretendard]'>
//         <p className='text-[#4D5053] text-sm font-medium leading-6 tracking-tight mb-2'>
//           {receivedDate}
//         </p>
//         <div className='w-full font-[Pretendard] bg-white rounded-xl px-4 py-5 flex flex-col gap-4 border border-[#DBE6FF]'>
//           <h3 className='text-lg font-semibold'>
//             <span className='text-[#1D68FF]'>{nickname}</span>
//             <span className='text-[#121218]'> 회원님의 건강관리요청서</span>
//           </h3>
//           <div>
//             <p className='text-[#25282B] font-semibold text-sm mb-1'>기본 정보</p>
//             <div className='text-sm text-[#121218] font-light flex gap-2'>
//               <span>{gender}</span>
//               <span>·</span>
//               <span>만 {age}세</span>
//               <span>·</span>
//               <span>
//                 {height}cm / {weight}kg
//               </span>
//             </div>
//           </div>
//           <div>
//             <p className='text-[#25282B] font-semibold text-sm mb-1'>요청사항</p>
//             <div className='max-h-[160px] overflow-y-auto text-sm text-[#121218] font-light leading-6'>
//               {requestMessage
//                 .split('\n')
//                 .map((line, index) =>
//                   line.trim() === '' ? (
//                     <div key={index} className='my-2' />
//                   ) : (
//                     <p key={index}>{line}</p>
//                   ),
//                 )}
//             </div>
//           </div>
//           <div
//             className='flex items-center justify-center text-[#1D68FF] font-semibold cursor-pointer'
//             onClick={() => setIsModalOpen(true)}
//           >
//             <span className='mr-2 text-sm'>건강데이터 자세히 보기</span>
//             <FiChevronRight size={24} color='#1D68FF' />
//           </div>
//           <div className='flex justify-between pt-4 border-t border-[#DBE6FF]'>
//             <button
//               onClick={handleReject}
//               className='w-[45%] h-[38px] rounded-full text-sm font-medium text-[#25282B] bg-white border border-[#E3E6EB] shadow-sm cursor-pointer'
//             >
//               거절하기
//             </button>
//             <button
//               onClick={handleAccept}
//               className='w-[45%] h-[38px] rounded-full text-sm font-medium text-white cursor-pointer'
//               style={{ backgroundColor: '#1D68FF' }}
//             >
//               수락하기
//             </button>
//           </div>
//         </div>
//       </div>

//       {isModalOpen && (
//         <HealthDataModal
//           nickname={nickname}
//           onClose={() => setIsModalOpen(false)}
//           onAccept={() => handleAccept()}
//           onReject={() => handleReject()}
//         />
//       )}
//     </>
//   );
// };

// export default RequestHealthCareCard;

// components/RequestHealthCare/RequestHealthCare.tsx
import React, { useState } from 'react';
import RequestHealthCareCard from './HealthCareCard';
import RequsetHealthHeader from './Header';
import Pagination from '../Expert/Intro/Pagination';
import { useExpertRequestedConsultations } from '../../hooks/consultation/expert/queries/useExpertRequestedConsultations';
import { useApproveConsultation } from '../../hooks/consultation/expert/mutation/useApproveConsultation';
import { useRejectConsultation } from '../../hooks/consultation/expert/mutation/useRejectConsultation';

const PAGE_SIZE = 10; // 필요 시 조정

const RequestHealthCare: React.FC = () => {
  // UI는 1-based, API는 0-based
  const [currentPage, setCurrentPage] = useState(1);

  const listQuery = useExpertRequestedConsultations(currentPage - 1, PAGE_SIZE, true);

  const approveMut = useApproveConsultation();
  const rejectMut = useRejectConsultation();

  const totalPages = listQuery.data?.totalPages ?? 0;

  return (
    <div className='p-8 xl:p-16'>
      <div className='flex justify-center'>
        <RequsetHealthHeader expertNickname='튼튼핏' expertName='이수형' />
      </div>

      {/* 로딩 */}
      {listQuery.isLoading && (
        <div className='p-10 max-w-[900px] mx-auto'>
          {/* 필요하면 스켈레톤 넣기 */}
          <p className='text-center text-[#75787B]'>불러오는 중…</p>
        </div>
      )}

      {/* 에러 */}
      {listQuery.isError && (
        <div className='p-10 max-w-[900px] mx-auto'>
          <p className='text-center text-red-600'>목록을 불러오지 못했습니다.</p>
        </div>
      )}

      {/* 데이터 */}
      {listQuery.isSuccess && (
        <div className='p-10 max-w-[900px] mx-auto'>
          {(listQuery.data.content ?? []).map((c) => (
            <RequestHealthCareCard
              key={c.consultationId}
              // API 매핑
              nickName={c.nickname}
              gender={c.gender} // 'MALE' | 'FEMALE' 그대로 표기 중이면 그대로 전달
              age={Number(c.age)} // UI가 숫자 기대 → 숫자 변환
              height={c.height}
              weight={c.weight}
              requestMessage={c.comment}
              // receivedDate는 스펙에 없어서 표시 생략(카드에서 optional 처리)
              // 카드 액션
              onAccept={() => approveMut.mutate(c.consultationId)}
              onReject={() => rejectMut.mutate(c.consultationId)}
            />
          ))}
        </div>
      )}

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
