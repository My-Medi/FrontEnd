import React from "react";
import dashSvg from "@/assets/SignUp/dash.svg";

interface StepperProps {
  currentStep: "select" | "terms" | "info" | "expert-info" | "complete";
  userType?: "personal" | "expert";
}

const Stepper: React.FC<StepperProps> = ({ currentStep, userType }) => {
  // 단계별 상태 계산
  const getStepStatus = (stepNumber: number) => {
    const stepMap = {
      "select": 0,
      "terms": 1,
      "info": 2,
      "expert-info": 3,
      "complete": userType === "expert" ? 4 : 3
    };
    
    const currentStepNumber = stepMap[currentStep];
    
    if (stepNumber < currentStepNumber) {
      return "completed"; // 완료된 단계
    } else if (stepNumber === currentStepNumber) {
      return "active"; // 현재 단계
    } else {
      return "inactive"; // 아직 도달하지 않은 단계
    }
  };

  const getStepLabel = (stepNumber: number) => {
    if (userType === "expert") {
      switch (stepNumber) {
        case 1: return "약관동의";
        case 2: return "회원정보입력";
        case 3: return "전문가정보입력";
        case 4: return "가입완료";
        default: return "";
      }
    } else {
      switch (stepNumber) {
        case 1: return "약관동의";
        case 2: return "회원정보입력";
        case 3: return "가입완료";
        default: return "";
      }
    }
  };

  const getStepCount = () => {
    return userType === "expert" ? 4 : 3;
  };

  const renderStep = (stepNumber: number) => {
    const status = getStepStatus(stepNumber);
    const label = getStepLabel(stepNumber);
    
    return (
      // 현재 단계 표시
      <div key={stepNumber} className="flex flex-col items-center z-10">
        <div 
          className={`w-[40.8px] h-[40.8px] rounded-full flex items-center justify-center font-medium ${
            status === "completed" || status === "active"
              ? "bg-[#1D68FF] text-white text-[19px] shadow-[0_0_16px_0_rgba(29,104,255,0.25)]"
              : "border-2 border-[#B5D0FF] text-[#888] bg-white text-[14.4px]"
          }`}
        >
          {stepNumber}
        </div>
        {/* 단계 라벨 표시 */}
        <span 
          className={`mt-2 text-[12px] font-medium ${
            status === "completed" || status === "active" ? "text-black" : "text-[#888]"
          }`}
        >
          {label}
        </span>
      </div>
    );
  };

  const renderDivider = (stepNumber: number) => {
    const status = getStepStatus(stepNumber);
    const isLastStep = stepNumber === getStepCount();
    
    if (isLastStep) return null;
    
    return (
      // 단계 구분선 표시
      <div key={`divider-${stepNumber}`} className="-ml-8 -mr-8 mb-[30px] z-0 flex items-center justify-center">
        {status === "completed" ? (
          <div className="h-[3px] w-[164px] bg-[#1D68FF]" />
        ) : (
          <img src={dashSvg} alt="divider" className="w-[164px] h-[10px] select-none pointer-events-none" />
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full mb-15 select-none">
      <div className="flex items-center w-full justify-center relative">
        {Array.from({ length: getStepCount() }, (_, index) => {
          const stepNumber = index + 1;
          return (
            <React.Fragment key={stepNumber}>
              {renderStep(stepNumber)}
              {renderDivider(stepNumber)}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper; 