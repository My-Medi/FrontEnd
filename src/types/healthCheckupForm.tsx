import type { ApiResponse } from "./common";

export interface HealthCheckupRequest {
    hospitalName: string;       // 병원명
    checkupDate: string;        // YYYY-MM-DD 형식
  
    measurementDto: {
      height: number;           // 키
      weight: number;           // 몸무게
      bmi: number;              // BMI
      bmiCategory: "UNDERWEIGHT"| "NORMAL"| "OVERWEIGHT"| "OBESE"; 
      waist: number;            // 허리둘레
      waistType: "NORMAL" | "ABDOMINAL_OBESITY"; // 허리둘레 상태
      vision: string;               // 시력
      hearingLeft: "NORMAL" | "SUSPECTED_DISEASE"; // 왼쪽 귀 청력
      hearingRight: "NORMAL" | "SUSPECTED_DISEASE"; // 오른쪽 귀 청력
    };
  
    bloodPressureDto: {
      systolic: number;           // 수축기 혈압
      diastolic: number;          // 이완기 혈압
      bloodPressureStatus:
        | "NORMAL"                 // 정상 
        | "PREHYPERTENSION"        // 고혈압 전단계
        | "HYPERTENSION"          // 고혈압
        |  "HYPERTENSIVE_PATIENT";   // 고혈압 유질환자
    };
  
    bloodTestDto: {
      hemoglobin: number;         // 혈색소
      hemoglobinStatus: "NORMAL" | "SUSPECTED_ANEMIA" | "OTHERS"; // 혈색소 상태 정상, 빈혈, 기타
      fastingGlucose: number;     // 공복혈당
      fastingGlucoseType: "NORMAL" | "DISEASE" | "IMPAIRED_FASTING_GLUCOSE" | "DIABETES_MELLITUS"; // 공복혈당 상태 정상, 질병, 공복혈당 증가, 당뇨병
      totalCholesterol: number;  // 총 콜레스테롤
      hdl: number;               // HDL 콜레스테롤
      triglyceride: number;      // 중성지방
      ldl: number;              // LDL 콜레스테롤
      cholesterolStatus: "NORMAL" | "HYPER_CHOLESTEROL_EMIA" | "LOW_HDL_CHOLESTEROL" |"HIGH_TRIGLYCERIDES"| "DISEASE" ; // 콜레스테롤 상태 정상, 고콜레스테롤혈증, 저HDL콜레스테롤혈증, 질병 - 고중성지방 없음 수정 필요
      creatinine: number;       // 크레아티닌
      egfr: number;             // eGFR
      renalFunctionStatus: "NORMAL" | "RENAL_FUNCTION_IMPAIRMENT"; // 신장기능 상태 정상, 신장기능 저하
      ast: number;              // AST
      alt: number;              // ALT
      gtp: number;              // GTP
      liverFunctionStatus: "NORMAL" | "LIVER_FUNCTION_IMPAIRMENT"; // 간기능 상태 정상, 간기능 저하
    };
  
    urineTestDto: {
      urineTestStatus: "NORMAL" | "BORDERLINE" | "PROTEINURIA"; // 요단백 상태 정상, 경계구간, 단백뇨
    };
  
    imagingTestDto: {
      imagingTestStatus: "NORMAL" | "INACTIVE_PULMONARY_TUBERCULOSIS" | "DISEASE" |"OTHERS"; // 영상검사 상태 정상, 비활성 폐렴구균, 질병, 기타
    };
  
    interviewDto: {
      hasPastDisease: "POSITIVE" | "NEGATIVE"; // 과거 질병 여부
      onMedication: "POSITIVE" | "NEGATIVE"; // 약물 복용 여부
      // 서버 스펙: lifestyleHabitsStatusList
      lifestyleHabitsStatusList: (
        | "SMOKING_CESSATION_NEEDED"
        | "ALCOHOL_REDUCTION_NEEDED"
        | "PHYSICAL_ACTIVITY_NEEDED"
        | "STRENGTH_TRAINING_NEEDED"
      )[]; // 생활습관 상태 배열

    };
  
    hasAdditionalTest: boolean;
  
    additionalTestDto: {
      b8Hepatitis: { // b형 간염 검사
        b8hepatitis_applicability: "APPLICABLE"|"NOT_APPLICABLE"; // b형 간염 적용 여부
        surfaceAntigen: "NORMAL"  | "PRECISION"; // 표면항원 상태 (일반/정밀)
        surfaceAntibody: "NORMAL" | "PRECISION"; // 표면항체 상태 (일반/정밀)
        b8HepatitisStatus: "POSITIVE" | "NEGATIVE" | "SUSPECTED_CARRIER" | "UNDETERMINED"; // b형 간염 상태 (양성/음성/의심/미결정)
      };
      depression: "NOT_APPLICABLE" | "NO_SYMPTOMS" | "MILD" | "MODERATE_SUSPECTED" | "SEVERE_SUSPECTED"; // 우울증 상태 적용 없음, 없음, 경미한 우울증, 중증 우울증, 심한 우울증
      cognitiveImpairment: "NOT_APPLICABLE" | "NO_ABNORMALITY" | "IMPAIRMENT_SUSPECTED"; // 인지기능 상태 적용 없음, 정상, 인지기능 저하
      boneDensityStatus: "NOT_APPLICABLE" | "NORMAL" | "OSTEOPENIA" | "OSTEOPOROSIS"; // 골밀도 상태 적용 없음, 정상, 골밀도 감소, 골밀도 감소
      elderlyPhysicalFunctionStatus: "NOT_APPLICABLE" | "NORMAL" | "DECLINED"; // 노년기 신체기능 상태 적용 없음, 정상, 노년기 신체기능 저하
      elderlyFunctionTest: { //노인기능 평가
        elderlyFunctionTest_applicability: "APPLICABLE"|"NOT_APPLICABLE"; // 노인기능 평가 적용 여부
        fallRiskStatus: "NORMAL" | "HIGH_RISK"; // 낙상
        dailyLifeStatus: "NORMAL" | "NEEDS_ASSISTANCE"; // 일상생활 수행 능력
        vaccinationStatus: //예방접종
          | "NEEDS_INFLUENZA" // 인플루엔자 예방접종 필요
          | "NEEDS_PNEUMOCOCCAL" // 폐렴구균 예방접종 필요
          | "NO_NEED"; //필요 없음
        urinationDisorderStatus: "NORMAL" | "SUSPECTED"; // 배뇨장애 상태
      };
    };
  }
  

export type HealthCheckupFormResponse = ApiResponse<HealthCheckupRequest>;