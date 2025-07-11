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
  <div className="flex flex-col items-center w-full">
    <div className="flex flex-col md:flex-row w-full justify-center items-center gap-8 md:gap-16 mb-10">
      {/* 개인 선택 박스 */}
      <button
        type="button"
        onClick={() => setSelected("personal")}
        className={`group flex flex-col items-center justify-center w-full max-w-sm md:w-96 h-72 rounded-xl transition-all duration-200 
                    ${selected === "personal" 
                      ? "border-4 border-[#1D68FF] shadow-[0_0_12px_2px_#1D68FF]" 
                      : "border-2 border-[#8CB6FF] hover:border-4 hover:border-[#1D68FF] hover:shadow-[0_0_12px_2px_#1D68FF]"}`
        }
      >
        <span className={`text-3xl md:text-4xl font-bold transition-colors mb-4
                          ${selected === "personal" ? "text-black" : "text-gray-400 group-hover:text-black"}`}
        >
          개인
        </span>
        <img 
          src={selected === "personal" ? personalIcon : unactivePersonalIcon} 
          alt="personal" 
          className="w-24 h-24 md:w-32 md:h-32 group-hover:hidden" 
        />
        <img 
          src={personalIcon} 
          alt="personal active" 
          className="w-24 h-24 md:w-32 md:h-32 hidden group-hover:block" 
        />
      </button>

      {/* 전문가 선택 박스 */}
      <button
        type="button"
        onClick={() => setSelected("expert")}
        className={`group flex flex-col items-center justify-center w-full max-w-sm md:w-96 h-72 rounded-xl transition-all duration-200 
                    ${selected === "expert" 
                      ? "border-4 border-[#1D68FF] shadow-[0_0_12px_2px_#1D68FF]" 
                      : "border-2 border-[#8CB6FF] hover:border-4 hover:border-[#1D68FF] hover:shadow-[0_0_12px_2px_#1D68FF]"}`
        }
      >
        <span className={`text-3xl md:text-4xl font-bold transition-colors mb-4
                          ${selected === "expert" ? "text-black" : "text-gray-400 group-hover:text-black"}`}
        >
          전문가
        </span>
        <img 
          src={selected === "expert" ? expertIcon : unactiveExpertIcon} 
          alt="expert" 
          className="w-24 h-24 md:w-32 md:h-32 group-hover:hidden" 
        />
        <img 
          src={expertIcon} 
          alt="expert active" 
          className="w-24 h-24 md:w-32 md:h-32 hidden group-hover:block" 
        />
      </button>
    </div>
    <button
      className={`w-full max-w-md md:w-[380px] mt-10 px-8 py-4 md:px-20 md:py-5 rounded-full text-2xl md:text-[32px] font-semibold text-white transition
          ${!selected ? "bg-gray-400 cursor-not-allowed" : "bg-[#1d68ff] hover:bg-blue-700"}`}
      onClick={onSubmit}
      disabled={!selected}
    >
      회원가입하기
    </button>
  </div>
);

export default StepSelector; 