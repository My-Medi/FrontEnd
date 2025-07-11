import React from "react";

interface ExpertInputFormProps {
  onNext: () => void;
  onPrev: () => void;
}

const ExpertInputForm: React.FC<ExpertInputFormProps> = ({ onNext, onPrev }) => {
  return (
    <div className="w-full bg-white flex flex-col items-center py-[30px]">
      {/* 전문분야 */}
      <div className="w-[1200px] mb-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
        <span className="w-5 h-5 bg-[#1D68FF] rounded-[6px]" />
        <p className="text-[35px] font-medium text-[#121218]">전문분야</p>
      </div>

      <div className="flex items-center gap-[24px] overflow-x-auto">
        {["영양사", "건강관리사", "웰니스 코치", "운동 처방사", "기타"].map((label, i) => (
          <div key={i} className="flex items-center gap-[6px]">
            <svg
              width={30}
              height={30}
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[30px] h-[30px]"
            >
              <rect
                x="0.5"
                y="0.5"
                width={29}
                height={29}
                rx="7.5"
                fill="white"
              />
              <rect
                x="0.5"
                y="0.5"
                width={29}
                height={29}
                rx="7.5"
                stroke="#9DA0A3"
              />
              <path
                d="M9 14.5345L13.6737 19L21 12"
                stroke="#9DA0A3"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-[28px] font-medium text-[#121218]">{label}</p>
          </div>
        ))}
      </div>
    </div>


      <div className="w-[1200px] mb-14 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="w-5 h-5 bg-[#1D68FF] rounded-[6px]" />
          <p className="text-[32px] font-medium text-[#121218]">소속 회사/기관명</p>
        </div>
        <input
          type="text"
          className="w-[625px] h-[60px] rounded-[14px] border-[1.5px] border-[#9DA0A3] px-6 text-[22px] text-[#121218] placeholder-[#9DA0A3]"
          placeholder="소속 회사/ 기관명을 입력하세요."
        />
      </div>

      {/* 자격증 업로드 */}
      <SectionTitle title="자격증" />
      <div className="w-[1200px] h-[157px] bg-white border-2 border-[#dbe6ff] rounded-[14px] flex items-center justify-center gap-5 mb-6">
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

      {/* 경력사항 */}
      <SectionTitle title="경력사항" />
      <CareerTable />
      <AddButton/>


      <SectionTitle title="경력소개" />
      <div className="w-[1200px] h-[319px] bg-white border-2 border-[#dbe6ff] rounded-[14px] p-6 mb-20">
        <p className="text-[22px] text-left text-[#121218]">
          안녕하세요. 저는 -에서 근무했던 000영양사입니다. ---마이메디를 통해--------------ㅁ
        </p>
      </div>

      {/* 버튼 */}
      <div className="flex gap-[268px]">
        <button onClick={onPrev} className="px-20 py-5 rounded-[60px] cursor-pointer bg-[#dbe6ff] text-[32px] text-[#121218] font-medium">이전</button>
        <button onClick={onNext} className="w-[380px] px-20 py-5 rounded-[60px] cursor-pointer bg-[#1d68ff] text-[32px] text-white font-semibold">완료</button>
      </div>
    </div>
  );
};



const SectionTitle = ({ title }: { title: string }) => (
  <div className="w-[1200px] mb-6 flex items-center gap-6">
    <span className="w-5 h-5 bg-[#1D68FF] rounded-[6px]"></span>
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