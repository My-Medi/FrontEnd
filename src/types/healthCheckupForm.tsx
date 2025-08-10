import type { ApiResponse } from "./common";

export interface HealthCheckupRequest {
    hospitalName: string;       // 병원명
    checkupDate: string;        // YYYY-MM-DD 형식
  
    measurementDto: {
      height: number;           // 키
      weight: number;           // 몸무게
      bmi: number;              // BMI
      bmiCategory: "UNDERWEIGHT" | "NORMAL" | "OVERWEIGHT" | "OBESE"; 
      waist: number;            // 허리둘레
      waistType: "NORMAL" | "ABNORMAL"; // 허리둘레 상태
      vision: string;               // 시력
      hearingLeft: "NORMAL" | "ABNORMAL"; // 왼쪽 귀 청력
      hearingRight: "NORMAL" | "ABNORMAL"; // 오른쪽 귀 청력
    };
  
    bloodPressureDto: {
      systolic: number;           // 수축기 혈압
      diastolic: number;          // 이완기 혈압
      bloodPressureStatus:
        | "NORMAL"                 // 정상
        | "HYPERTENSION_PATIENT"    // 유질환자
        | "PRE_HYPERTENSION"        // 고혈압 전단계
        | "HYPERTENSION_SUSPECT";   // 고혈압 의심
    };
  
    bloodTestDto: {
      hemoglobin: number;         // 혈색소
      hemoglobinStatus: "NORMAL" | "ANEMIA" | "ETC"; // 혈색소 상태
      fastingGlucose: number;     // 공복혈당
      fastingGlucoseType: "NORMAL" | "DIABETES_PATIENT" | "PRE_DIABETES" | "DIABETES_SUSPECT"; // 공복혈당 상태
      totalCholesterol: number;  // 총 콜레스테롤
      hdl: number;               // HDL 콜레스테롤
      triglyceride: number;      // 중성지방
      ldl: number;              // LDL 콜레스테롤
      cholesterolStatus: "NORMAL" | "HYPERLIPIDEMIA_SUSPECT" | "HIGH_TRIGLYCERIDE_SUSPECT" | "LOW_HDL_SUSPECT" | "HYPERLIPIDEMIA_PATIENT"; // 콜레스테롤 상태
      creatinine: number;       // 크레아티닌
      egfr: number;             // eGFR
      renalFunctionStatus: "NORMAL" | "RENAL_DYSFUNCTION"; // 신장기능 상태 
      ast: number;              // AST
      alt: number;              // ALT
      gtp: number;              // GTP
      liverFunctionStatus: "NORMAL" | "LIVER_DYSFUNCTION"; // 간기능 상태
    };
  
    urineTestDto: {
      urineTestStatus: "NORMAL" | "BORDERLINE" | "PROTEINURIA_SUSPECT"; // 요단백 상태
    };
  
    imagingTestDto: {
      imagingTestStatus: "NORMAL" | "INACTIVE_TB" | "SUSPECTED_DISEASE"; // 영상검사 상태
    };
  
    interviewDto: {
      hasPastDisease: "POSITIVE" | "NEGATIVE"; // 과거 질병 여부
      onMedication: "POSITIVE" | "NEGATIVE"; // 약물 복용 여부
      lifestyleHabitsStatus:
        | "NORMAL"
        | "SMOKING_CESSATION_NEEDED"
        | "ALCOHOL_RESTRICTION_NEEDED"
        | "EXERCISE_NEEDED"
        | "MUSCLE_EXERCISE_NEEDED"; // 생활습관 상태 금연, 음주제한, 운동 필요, 근력운동 필요
    };
  
    hasAdditionalTest: boolean;
  
    additionalTestDto: {
      b8Hepatitis: { // b형 간염 검사
        surfaceAntigen: "NORMAL"  | "DETAILED"; // 표면항원 상태 (일반/정밀)
        surfaceAntibody: "NORMAL" | "DETAILED"; // 표면항체 상태 (일반/정밀)
        b8HepatitisStatus: "POSITIVE" | "NEGATIVE" | "SUSPECT"; // b형 간염 상태 (양성/음성/의심)
      };
      depression: "NO_SYMPTOMS" | "MILD_SYMPTOMS" | "MODERATE_DEPRESSION" | "SEVERE_DEPRESSION"; // 우울증 상태
      cognitiveImpairment: "NORMAL" | "SUSPECTED_DEMENTIA"; // 인지기능 상태 
      boneDensityStatus: "NORMAL" | "OSTEOPENIA" | "OSTEOPOROSIS"; // 골밀도 상태 
      elderlyPhysicalFunctionStatus: "NORMAL" | "PHYSICAL_FUNCTION_DECLINE"; // 노년기 신체기능 상태
      elderlyFunctionTest: { //노인기능 평가
        fallRiskStatus: "NORMAL" | "AT_RISK"; // 낙상
        dailyLifeStatus: "NORMAL" | "RESTRICTED"; // 일상생활 수행 능력
        vaccinationStatus: //예방접종
          | "NEEDS_INFLUENZA" // 인플루엔자 예방접종 필요
          | "NEEDS_PNEUMOCOCCAL" // 폐렴구균 예방접종 필요
          | "NO_NEED"; //필요 없음
        urinationDisorderStatus: "NORMAL" | "SUSPECTED"; // 배뇨장애 상태
      };
    };
  }
  

export type HealthCheckupFormResponse = ApiResponse<HealthCheckupRequest>;