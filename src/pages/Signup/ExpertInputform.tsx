import React from "react";

const ExpertInputForm = () => {
  return (
    <div className="w-full bg-white flex flex-col items-center py-[100px]">
      {/* 타이틀 및 화살표 */}
      <div className="relative w-full flex justify-center mb-15">
        <svg 
          width={31} 
          height={57} 
          viewBox="0 0 31 57" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-[27px] h-[53px] absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer" 
          preserveAspectRatio="none"
        >
          <path 
            d="M29 2L2 29.0933L29 55" 
            stroke="#121218" 
            strokeOpacity="0.5" 
            strokeWidth={4} 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
        <p className="text-4xl font-semibold mt-5 text-center text-[#121218]">마이메디 회원가입</p>
      </div>
      
      {/* 타이틀 및 단계 표시 */}
      
      <div className="flex items-center justify-center gap-2 mb-16">
        <StepCircle number={1} label="약관동의" active />
        <Divider active />
        <StepCircle number={2} label="회원정보입력" active />
        <Divider active />
        <StepCircle number={3} label="전문가정보입력" active />
        <Divider dashed />
        <StepCircle number={4} label="가입완료" />
      </div>

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

      {/* 경력사항 */}
      <SectionTitle title="경력사항" />
      <CareerTable />
      <AddButton/>

      
      <SectionTitle title="경력소개" />
      <div className="w-[1301px] h-[319px] bg-white border-2 border-[#dbe6ff] rounded-[14px] p-6 mb-20">
        <p className="text-[22px] text-left text-[#121218]">
          안녕하세요. 저는 -에서 근무했던 000영양사입니다. ---마이메디를 통해--------------ㅁ
        </p>
      </div>

      {/* 버튼 */}
      <div className="flex gap-[268px]">
        <button className="px-20 py-5 rounded-[60px] cursor-pointer bg-[#dbe6ff] text-[32px] text-[#121218] font-medium">이전</button>
        <button className="w-[380px] px-20 py-5 rounded-[60px] cursor-pointer bg-[#1d68ff] text-[32px] text-white font-semibold">완료</button>
      </div>
    </div>
  );
};

const StepCircle = ({ number, label, active }: { number: number; label: string; active?: boolean }) => (
  <div className="flex flex-col items-center">
    <div
      className={`w-[68px] h-[68px] rounded-full flex items-center justify-center text-[32px] font-medium ${
        active ? "bg-[#1d68ff] text-white" : "bg-white border border-[#1d68ff]/50 text-[#121218]/50"
      }`}
      style={active ? { boxShadow: "0px 0px 30px 1px rgba(29,104,255,0.4)" } : {}}
    >
      {number}
    </div>
    <p className={`mt-2 text-xl text-center ${active ? "text-[#121218]" : "text-[#121218]/50"}`}>{label}</p>
  </div>
);

// const Divider = ({ active }: { active?: boolean }) => (
//   <div className={`w-[130px] h-[4px] self-start mt-8 ${active ? "bg-[#1d68ff]" : "bg-[#DBE6FF]"}`} />
// );
const Divider = ({ active, dashed }: { active?: boolean; dashed?: boolean }) => (
  <div 
    className="w-[130px] h-[4px] self-start mt-8"
    style={
      dashed 
        ? {
            backgroundImage: `repeating-linear-gradient(to right, #DBE6FF 0, #DBE6FF 8px, transparent 8px, transparent 16px)`,
            backgroundColor: 'transparent'
          }
        : {
            backgroundColor: active ? '#1d68ff' : '#DBE6FF'
          }
    }
  />
);

const SectionTitle = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 w-[1300px] mb-6">
    <div className="w-[19px] h-[19px] rounded-md bg-[#1d68ff]" />
    <p className="text-[28px] font-medium text-left text-[#121218]">{title}</p>
  </div>
);



const CareerTable = () => (
  <div className="w-[1301px] border-2 border-[#dbe6ff] text-[#121218] text-20 rounded-[14px] overflow-hidden mb-14">
    <div className="flex text-[#121218] bg-white border-b-2 border-[#dbe6ff]">
      <HeaderCell width="308px">회사/기관명</HeaderCell>
      <HeaderCell width="524px">근무기간</HeaderCell>
      <HeaderCell width="469px">역할입력</HeaderCell>
    </div>
    {[1, 2].map((_, i) => (
      <div key={i} className="flex border-b flex-grow-0 flex-shrink-0 text-[22px] border-[#dbe6ff] bg-white text-[#121218]">
        <Cell width="308px">대한영양사협회</Cell>
        <div className="flex">
          <Cell width="242px">2022.05.24</Cell>
          <Cell width="40px">-</Cell>
          <Cell width="242px">2025.05.12</Cell>
        </div>
        <Cell width="469px">식단 계획 및 조리</Cell>
      </div>
    ))}
  </div>
);

const HeaderCell = ({ children, width }: { children: React.ReactNode; width: string }) => (
  <div className={`flex justify-center text-2xl font-semibold items-center h-14`} style={{ width }}>{children}</div>
);

const Cell = ({ children, width }: { children: React.ReactNode; width: string }) => (
  <div className={`flex justify-center items-center h-14 px-5`} style={{ width }}>{children}</div>
);

const AddButton = () => (
  <div className="flex justify-center items-center w-[413px] h-[50px] rounded-[50px] border-2 border-[#dbe6ff] bg-white cursor-pointer">
    <svg
      width={23}
      height={24}
      viewBox="0 0 23 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-grow-0 flex-shrink-0"
      preserveAspectRatio="none"
    >
      <path
        d="M11.3608 0.533203C12.1892 0.533203 12.8608 1.2048 12.8608 2.0332V10.6396H21.4663C22.2946 10.6396 22.9661 11.3114 22.9663 12.1396C22.9663 12.9681 22.2947 13.6396 21.4663 13.6396H12.8608V21.9658C12.8607 22.7941 12.1892 23.4658 11.3608 23.4658C10.5325 23.4658 9.86102 22.7941 9.86084 21.9658V13.6396H1.53369C0.705617 13.6392 0.0336914 12.9678 0.0336914 12.1396C0.0338703 11.3116 0.705727 10.6401 1.53369 10.6396H9.86084V2.0332C9.86087 1.20482 10.5325 0.533233 11.3608 0.533203Z"
        fill="#75787B"
      />
    </svg>
  </div>
);


export default ExpertInputForm;