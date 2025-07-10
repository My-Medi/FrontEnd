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
        className={`flex flex-col items-center justify-center w-64 h-48 rounded-xl transition-all duration-150 focus:outline-none
          ${selected === "personal"
            ? "border-4 border-[#1D68FF] bg-white"
            : "border-2 border-[#8CB6FF] bg-white"}
        `}
        style={{
          ...(selected === "personal"
            ? { boxShadow: "0 0 12px 2px #1D68FF", border: "4px solid #1D68FF" }
            : { border: "2px solid #8CB6FF" }),
          outline: "none"
        }}
      >
        <img src={selected === "personal" ? personalIcon : unactivePersonalIcon} alt="personal" className="w-20 h-20" />
        <span className={`mt-4 text-2xl font-bold ${selected === "personal" ? "text-black" : "text-gray-400"}`}>개인</span>
      </button>
      {/* 전문가 선택 박스 */}
      <button
        type="button"
        onClick={() => setSelected("expert")}
        className={`flex flex-col items-center justify-center w-64 h-48 rounded-xl transition-all duration-150 focus:outline-none
          ${selected === "expert"
            ? "border-4 border-[#1D68FF] bg-white"
            : "border-2 border-[#8CB6FF] bg-white"}
        `}
        style={{
          ...(selected === "expert"
            ? { boxShadow: "0 0 12px 2px #1D68FF", border: "4px solid #1D68FF" }
            : { border: "2px solid #8CB6FF" }),
          outline: "none"
        }}
      >
        <img src={selected === "expert" ? expertIcon : unactiveExpertIcon} alt="expert" className="w-20 h-20" />
        <span className={`mt-4 text-2xl font-bold ${selected === "expert" ? "text-black" : "text-gray-400"}`}>전문가</span>
      </button>
    </div>
    <button
      className="mt-4 px-10 py-3 bg-[#1D68FF] text-white rounded-full text-lg font-semibold shadow-md transition"
      onClick={onSubmit}
    >
      회원가입하기
    </button>
  </div>
);

export default StepSelector; 