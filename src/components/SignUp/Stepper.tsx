import React from "react";

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
          className={`w-[40px] h-[40px] rounded-full flex items-center justify-center font-size-[19px] font-bold ${
            status === "completed" || status === "active"
              ? "bg-[#1D68FF] text-white shadow-[0_0_16px_0_rgba(29,104,255,0.25)]"
              : "border-2 border-[#B5D0FF] text-[#888] bg-white"
          }`}
        >
          {stepNumber}
        </div>
        {/* 단계 라벨 표시 */}
        <span 
          className={`mt-2 font-size-[12px] font-semibold ${
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
      <div 
        key={`divider-${stepNumber}`}
        className={`h-[3px] w-[154px] -ml-7 -mr-7 mb-[38px] z-0 ${
          status === "completed" 
            ? "bg-[#1D68FF]" 
            : "border-b-[3px] border-dashed border-[#B5D0FF]"
        }`}
      />
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