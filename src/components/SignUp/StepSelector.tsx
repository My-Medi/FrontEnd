import React from "react";
import unactivePersonalIcon from "../../assets/SignUp/personal_unactive.png";
import unactiveExpertIcon from "../../assets/SignUp/expert_unactive.png";
import personalIcon from "../../assets/SignUp/personal.png";
import expertIcon from "../../assets/SignUp/expert.png";

interface StepSelectorProps {
  selected: "personal" | "expert" | null;
  setSelected: (type: "personal" | "expert") => void;
  onSubmit: () => void;
}

const StepSelector: React.FC<StepSelectorProps> = ({ selected, setSelected, onSubmit }) => (
  <div className="flex flex-col items-center">
    <div className="flex space-x-16 mb-10">
      {/* 개인 선택 박스 */}
      <button
        type="button"
        onClick={() => setSelected("personal")}
        className="flex flex-col items-center justify-center w-64 h-48 rounded-xl transition-all duration-150 hover:cursor-pointer"
        style={{
          border: selected === "personal" ? "4px solid #1D68FF" : "2px solid #8CB6FF",
          boxShadow: selected === "personal" ? "0 0 12px 2px #1D68FF" : "none",
          outline: "none"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 0 12px 2px #1D68FF";
          e.currentTarget.style.border = "4px solid #1D68FF";
          // 텍스트 색상 변경
          const span = e.currentTarget.querySelector('span');
          if (span) span.style.color = "#000";
          // 아이콘 변경
          const img = e.currentTarget.querySelector('img');
          if (img) img.src = personalIcon;
        }}
        onMouseLeave={(e) => {
          if (selected !== "personal") {
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.border = "2px solid #8CB6FF";
            // 텍스트 색상 회색으로
            const span = e.currentTarget.querySelector('span');
            if (span) span.style.color = "#9ca3af"; // Tailwind gray-400
            // 아이콘 변경
            const img = e.currentTarget.querySelector('img');
            if (img) img.src = unactivePersonalIcon;
          }
        }}
      >
        <img src={selected === "personal" ? personalIcon : unactivePersonalIcon} alt="personal" className="w-20 h-20" />
        <span className={`mt-4 text-2xl font-bold ${selected === "personal" ? "text-black" : "text-gray-400"}`}>개인</span>
      </button>
      {/* 전문가 선택 박스 */}
      <button
        type="button"
        onClick={() => setSelected("expert")}
        className="flex flex-col items-center justify-center w-64 h-48 rounded-xl transition-all duration-150 hover:cursor-pointer"
        style={{
          border: selected === "expert" ? "4px solid #1D68FF" : "2px solid #8CB6FF",
          boxShadow: selected === "expert" ? "0 0 12px 2px #1D68FF" : "none",
          outline: "none"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 0 12px 2px #1D68FF";
          e.currentTarget.style.border = "4px solid #1D68FF";
          // 텍스트 색상 변경
          const span = e.currentTarget.querySelector('span');
          if (span) span.style.color = "#000";
          // 아이콘 변경
          const img = e.currentTarget.querySelector('img');
          if (img) img.src = expertIcon;
        }}
        onMouseLeave={(e) => {
          if (selected !== "expert") {
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.border = "2px solid #8CB6FF";
            // 텍스트 색상 회색으로
            const span = e.currentTarget.querySelector('span');
            if (span) span.style.color = "#9ca3af"; // Tailwind gray-400
            // 아이콘 변경
            const img = e.currentTarget.querySelector('img');
            if (img) img.src = unactiveExpertIcon;
          }
        }}
      >
        <img src={selected === "expert" ? expertIcon : unactiveExpertIcon} alt="expert" className="w-20 h-20" />
        <span className={`mt-4 text-2xl font-bold ${selected === "expert" ? "text-black" : "text-gray-400"}`}>전문가</span>
      </button>
    </div>
    <button
      className={`w-[380px] mt-10 px-20 py-5 rounded-[60px] text-[32px] font-semibold text-white transition hover:cursor-pointer hover:bg-blue-700
          ${!selected ? "bg-gray-400 cursor-not-allowed" : "bg-[#1d68ff] cursor-pointer"}`}
      onClick={onSubmit}
      disabled={!selected}
    >
      회원가입하기
    </button>
  </div>
);

export default StepSelector; 