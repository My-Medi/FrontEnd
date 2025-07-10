import React from "react";

interface ExpertInputFormProps {
  onNext: () => void;
  onPrev: () => void;
}

const ExpertInputForm: React.FC<ExpertInputFormProps> = ({ onNext, onPrev }) => {
  return (
    <div className="w-full bg-white flex flex-col items-center py-[100px]">
      {/* 전문분야 */}
      <SectionTitle title="전문분야" />
      <div className="flex flex-row gap-[30px] mb-14 items-center">
        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-[18px]">
          <svg
            width={30}
            height={30}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0 w-[30px] h-[30px] relative"
          >
            <rect width={30} height={30} rx={8} fill="#1D68FF" />
            <path
              d="M9 14.5345L13.6737 19L21 12"
              stroke="white"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="flex-grow-0 flex-shrink-0 text-[28px] font-medium text-left text-[#121218]">
            영양사
          </p>
        </div>
        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-[18px]">
          <svg
            width={30}
            height={30}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0 w-[30px] h-[30px] relative"
          >
            <rect x="0.5" y="0.5" width={29} height={29} rx="7.5" fill="white" />
            <rect x="0.5" y="0.5" width={29} height={29} rx="7.5" stroke="#9DA0A3" />
            <path
              d="M9 14.5345L13.6737 19L21 12"
              stroke="#9DA0A3"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="flex-grow-0 flex-shrink-0 text-[28px] font-medium text-left text-[#4d5053]">
            건강관리사
          </p>
        </div>
        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-[18px]">
          <svg
            width={30}
            height={30}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0 w-[30px] h-[30px] relative"
          >
            <rect x="0.5" y="0.5" width={29} height={29} rx="7.5" fill="white" />
            <rect x="0.5" y="0.5" width={29} height={29} rx="7.5" stroke="#9DA0A3" />
            <path
              d="M9 14.5345L13.6737 19L21 12"
              stroke="#9DA0A3"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="flex-grow-0 flex-shrink-0 text-[28px] font-medium text-left text-[#4d5053]">
            웰니스 코치
          </p>
        </div>
        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-[18px]">
          <svg
            width={30}
            height={30}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0 w-[30px] h-[30px] relative"
          >
            <rect x="0.5" y="0.5" width={29} height={29} rx="7.5" fill="white" />
            <rect x="0.5" y="0.5" width={29} height={29} rx="7.5" stroke="#9DA0A3" />
            <path
              d="M9 14.5345L13.6737 19L21 12"
              stroke="#9DA0A3"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="flex-grow-0 flex-shrink-0 text-[28px] font-medium text-left text-[#4d5053]">
            운동 처방사
          </p>
        </div>
        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-[18px]">
          <svg
            width={30}
            height={30}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0 w-[30px] h-[30px] relative"
          >
            <rect x="0.5" y="0.5" width={29} height={29} rx="7.5" fill="white" />
            <rect x="0.5" y="0.5" width={29} height={29} rx="7.5" stroke="#9DA0A3" />
            <path
              d="M9 14.5345L13.6737 19L21 12"
              stroke="#9DA0A3"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="flex-grow-0 flex-shrink-0 text-[28px] font-medium text-left text-[#4d5053]">
            기타
          </p>
        </div>
      </div>

      {/* 소속 회사/기관명 */}
      <SectionTitle title="소속 회사/기관명" />
      <div className="w-[625px] h-[60px] mb-14 rounded-[14px] border-[1.5px] border-[#9DA0A3] px-6 flex items-center">
        <p className="text-[22px] text-center text-[#9DA0A3]">
          소속 회사/ 기관명을 입력하세요.
        </p>
      </div>

      {/* 자격증 업로드 */}
      <SectionTitle title="자격증" />
      <div className="w-[1301px] h-[157px] bg-white border-2 border-[#dbe6ff] rounded-[14px] flex items-center justify-center gap-5 mb-6">
        <svg width={24} height={31} viewBox="0 0 24 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5 11V2.75L21.75 11M3 0.5C1.335 0.5 0 1.835 0 3.5V27.5C0 28.2956 0.31607 29.0587 0.87868 29.6213C1.44129 30.1839 2.20435 30.5 3 30.5H21C21.7956 30.5 22.5587 30.1839 23.1213 29.6213C23.6839 29.0587 24 28.2956 24 27.5V9.5L15 0.5H3Z" fill="#9DA0A3" />
        </svg>
        <p className="text-2xl font-medium text-[#9da0a3]">여기에 파일을 마우스로 끌어오세요.</p>
      </div>
      <div className="w-[659px] h-[68px] rounded-[14px] bg-[#dbe6ff] flex items-center justify-center gap-6 mb-14">
        <p className="text-2xl text-[#25282b] font-medium">
          이미지 파일 업로드 <span className="text-[#25282b]">(png,jpg,pdf)</span>
        </p>
      </div>
      <div>
        <CareerTable/>
      </div>
      <div>
       <AddButton/>
      </div>

      {/* 버튼 */}
      <div className="flex items-center justify-between mt-8 w-[1200px]">
        <button type="button" className="px-10 py-3 bg-[#DBE6FF] text-black rounded-full text-lg font-semibold shadow-md" onClick={onPrev}>이전</button>
        <button type="button" className="px-10 py-3 bg-[#1D68FF] text-white rounded-full text-lg font-semibold shadow-md" onClick={onNext}>다음</button>
      </div>
    </div>
  );
};



const SectionTitle = ({ title }: { title: string }) => (
  <div className="w-[1200px] mb-6">
    <p className="text-[32px] font-medium text-[#121218]">{title}</p>
  </div>
);

const CareerTable = () => (
  <div className="w-[1200px] mb-6">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-[#f8f9fa]">
          <HeaderCell width="20%">기간</HeaderCell>
          <HeaderCell width="30%">소속</HeaderCell>
          <HeaderCell width="30%">직책</HeaderCell>
          <HeaderCell width="20%">담당업무</HeaderCell>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Cell width="20%">2020.01 - 2023.12</Cell>
          <Cell width="30%">건강관리센터</Cell>
          <Cell width="30%">영양사</Cell>
          <Cell width="20%">영양 상담</Cell>
        </tr>
      </tbody>
    </table>
  </div>
);

const HeaderCell = ({ children, width }: { children: React.ReactNode; width: string }) => (
  <th className={`border border-[#e9ecef] p-4 text-center font-medium ${width}`}>{children}</th>
);

const Cell = ({ children, width }: { children: React.ReactNode; width: string }) => (
  <td className={`border border-[#e9ecef] p-4 text-center ${width}`}>{children}</td>
);

const AddButton = () => (
  <div className="w-[1200px] mb-14">
    <button className="w-full py-4 bg-[#f8f9fa] border-2 border-dashed border-[#dee2e6] text-[#6c757d] text-lg font-medium rounded-md hover:bg-[#e9ecef] transition-colors">
      + 경력 추가
    </button>
  </div>
);

export default ExpertInputForm; 