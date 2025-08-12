import React, { useState } from 'react';
import RoundSelector from './RoundSelector';
import AdditionalExamSection from './AdditionalExamSection';
import CustomCheckboxButton from '../Common/CustomCheckboxButton';
import backSvg from '../../assets/back.svg';
import { useNavigate } from 'react-router-dom';
import fileboxIcon from '../../assets/MyHome/Resume/filebox2.svg';
import { createHealthReport } from '../../apis/healthCheckupApi/healthCheckup';
import type { HealthCheckupRequest } from '../../types/healthCheckupForm';



const HealthCheckupForm = () => {
  // 회차 상태 관리
  const [rounds, setRounds] = useState([1]);
  const [currentRound, setCurrentRound] = useState(1);
  // 회차 추가 핸들러
  const onAddRound = () => {
    const next = Math.max(...rounds) + 1;
    setRounds([...rounds, next]);
    setCurrentRound(next);
  };
  // 회차 선택 핸들러
  const onSelectRound = (round: number) => {
    setCurrentRound(round);
  };

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  const removeFile = (index: number) => {
    console.log('파일 삭제 호출됨 - 인덱스:', index);
    console.log('삭제 전 uploadedFiles:', uploadedFiles);
    console.log('삭제 전 uploadedImageUrls:', uploadedImageUrls);
    
    setUploadedFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      console.log('삭제 후 uploadedFiles:', newFiles);
      return newFiles;
    });
    
    setUploadedImageUrls(prev => {
      const newUrls = prev.filter((_, i) => i !== index);
      console.log('삭제 후 uploadedImageUrls:', newUrls);
      return newUrls;
    });
  };

  // 이미지 업로드 성공 핸들러는 현재 미사용

  // 파일 선택 핸들러 추가
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
      
      // 파일 URL 생성 (미리보기용)
      newFiles.forEach(file => {
        const url = URL.createObjectURL(file);
        setUploadedImageUrls(prev => [...prev, url]);
      });
    }
  };

  // 드래그 앤 드롭 핸들러 추가
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
      
      // 파일 URL 생성 (미리보기용)
      newFiles.forEach(file => {
        const url = URL.createObjectURL(file);
        setUploadedImageUrls(prev => [...prev, url]);
      });
    }
  };

  // 상태 관리 (필요한 모든 항목)
  const [date, setDate] = useState('');
  const [hospital, setHospital] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [bmiType, setBmiType] = useState<'정상' | '저체중' | '과체중' | '비만' | ''>('');
  const [waist, setWaist] = useState('');
  const [waistType, setWaistType] = useState<'정상' | '복부비만' | ''>('');
  const [bpHigh, setBpHigh] = useState('');
  const [bpLow, setBpLow] = useState('');
  const [bpType, setBpType] = useState<'정상' | '고혈압 전단계' | '고혈압의심' | '유질환자' | ''>('');

  const [hemoglobin, setHemoglobin] = useState('');
  const [hemoglobinStatusLabel, setHemoglobinStatusLabel] = useState<'정상' | '빈혈의심' | '기타'|''>('');
  const [fastingGlucose, setFastingGlucose] = useState('');
  const [fastingGlucoseTypeLabel, setFastingGlucoseTypeLabel] = useState<'정상' | '유질환자' | '공복혈당장애 의심' | '당뇨병 의심'|''>('');
  const [cholesterol, setCholesterol] = useState('');
  const [hdl, setHdl] = useState('');
  const [ldl, setLdl] = useState('');
  const [triglyceride, setTriglyceride] = useState('');
  const [lipidProfile, setLipidProfile] = useState<'정상' | '고콜레스테롤혈증 의심' | '고중성지방혈증 의심' | '낮은 HDL 콜레스테롤 의심' | '유질환자'|''>('');
  const [protein, setProtein] = useState('');
  // const [proteinType, setProteinType] = useState('정상');
  const [serumCreatinine, setSerumCreatinine] = useState('');

    const [kidneyFunction, setKidneyFunction] = useState('');
  const [ast, setAst] = useState('');
  const [alt, setAlt] = useState('');
  const [gammaGtp, setGammaGtp] = useState('');
  const [liverFunction, setLiverFunction] = useState<'정상' | '간기능 장애'|''>('');
  // const [urineProtein, setUrineProtein] = useState('');
  const [urineProteinType, setUrineProteinType] = useState<'정상' | '경계' | '요단백 의심'|''>('');
  const [chestXray, setChestXray] = useState<'정상' | '비활동성 폐결핵' | '질환의심' | '기타' | ''>('');
  const [history, setHistory] = useState('');
  const [medication, setMedication] = useState('');
  const [lifestyle, setLifestyle] = useState<string[]>([]);
  const [hearingLeft, setHearingLeft] = useState<'정상' | '청력 장애'|''>('');
  const [hearingRight, setHearingRight] = useState<'정상' | '청력 장애'|''>('');
  const [additionalExam, setAdditionalExam] = useState<'해당' | '미해당'>('미해당');
  const [additionalExamDetail, setAdditionalExamDetail] = useState<any>({
    
  });

  // BMI 계산 함수
  const calculateBMI = (height: string, weight: string) => {
    if (!height || !weight) {
      setBmi('');
      setBmiType('정상');
      return;
    }
    
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    
    if (heightInMeters <= 0 || weightInKg <= 0) {
      setBmi('');
      setBmiType('정상');
      return;
    }
    
    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(1));
    
    // BMI 분류
    if (bmiValue < 18.5) {
      setBmiType('저체중');
    } else if (bmiValue < 23) {
      setBmiType('정상');
    } else if (bmiValue < 25) {
      setBmiType('과체중');
    } else {
      setBmiType('비만');
    }
  };

  // 키 변경 핸들러
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHeight(value);
    calculateBMI(value, weight);
  };

  // 몸무게 변경 핸들러
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWeight(value);
    calculateBMI(height, value);
  };

  // API 요청 데이터 변환
 // === replace your transformFormDataToAPI() with this ===
const transformFormDataToAPI = (): HealthCheckupRequest => {
  // helper
  const toInt = (v: string) => Number.isFinite(parseInt(v)) ? parseInt(v) : 0;
  const toNum = (v: string) => Number.isFinite(parseFloat(v)) ? parseFloat(v) : 0;
  const detail = additionalExamDetail ?? {};

  const heightNum = toNum(height);
  const weightNum = toNum(weight);
  const bmiNum = heightNum > 0 ? Number((weightNum / Math.pow(heightNum / 100, 2)).toFixed(1)) : 0;

  // BMI enum
  let bmiCategory: HealthCheckupRequest["measurementDto"]["bmiCategory"] = "NORMAL";
  if (bmiNum < 18.5) bmiCategory = "UNDERWEIGHT";
  else if (bmiNum >= 30) bmiCategory = "OBESE";
  else if (bmiNum >= 25) bmiCategory = "OVERWEIGHT";

  // 혈압 enum (라벨이 길어서 포함 여부로 매핑)
  const bpStatus: HealthCheckupRequest["bloodPressureDto"]["bloodPressureStatus"] =
    bpType.includes("유질환") ? "HYPERTENSIVE_PATIENT" :
    bpType.includes("전단계") ? "PREHYPERTENSION" :
    bpType.includes("의심") ? "HYPERTENSION" :
    "NORMAL";

  // 지질 enum
  const cholStatus: HealthCheckupRequest["bloodTestDto"]["cholesterolStatus"] =
    lipidProfile === "정상" ? "NORMAL" :
    lipidProfile === "고콜레스테롤혈증 의심" ? "HYPER_CHOLESTEROL_EMIA" :
    lipidProfile === "고중성지방혈증 의심" ? "HIGH_TRIGLYCERIDES" :
    lipidProfile === "낮은 HDL 콜레스테롤 의심" ? "LOW_HDL_CHOLESTEROL" :
    "DISEASE";

  // 신장/간 기능 enum
  const renalStatus: HealthCheckupRequest["bloodTestDto"]["renalFunctionStatus"] =
    kidneyFunction === "정상" ? "NORMAL" : "RENAL_FUNCTION_IMPAIRMENT";
  const liverStatus: HealthCheckupRequest["bloodTestDto"]["liverFunctionStatus"] =
    liverFunction === "정상" ? "NORMAL" : "LIVER_FUNCTION_IMPAIRMENT";

  // 요검사 enum
  const urineStatus: HealthCheckupRequest["urineTestDto"]["urineTestStatus"] =
    urineProteinType === "정상" ? "NORMAL" :
    urineProteinType === "경계" ? "BORDERLINE" : "PROTEINURIA";

  // 흉부 X-ray enum
  const imagingStatus: HealthCheckupRequest["imagingTestDto"]["imagingTestStatus"] =
    chestXray === "정상" ? "NORMAL" :
    chestXray === "비활동성 폐결핵" ? "INACTIVE_PULMONARY_TUBERCULOSIS" :
    chestXray === "질환의심" ? "DISEASE" : "OTHERS";

  // 혈색소/공복혈당 enum
  const hemoglobinStatus: HealthCheckupRequest["bloodTestDto"]["hemoglobinStatus"] =
    hemoglobinStatusLabel === "정상" ? "NORMAL" :
    hemoglobinStatusLabel === "빈혈의심" ? "SUSPECTED_ANEMIA" : "OTHERS";

  const fastingType: HealthCheckupRequest["bloodTestDto"]["fastingGlucoseType"] =
    fastingGlucoseTypeLabel === "정상" ? "NORMAL" :
    fastingGlucoseTypeLabel === "유질환자" ? "DISEASE" :
    fastingGlucoseTypeLabel.includes("공복혈당장애") ? "IMPAIRED_FASTING_GLUCOSE" :
    "DIABETES_MELLITUS";

  // 인터뷰 enum
  const hasPastDisease = history === "유" ? "POSITIVE" : "NEGATIVE";
  const onMedication = medication === "유" ? "POSITIVE" : "NEGATIVE";
  const lifestyleStatus: HealthCheckupRequest["interviewDto"]["lifestyleHabitsStatus"] =
    lifestyle.includes("금연 필요") ? "SMOKING_CESSATION_NEEDED" :
    lifestyle.includes("절주 필요") ? "ALCOHOL_REDUCTION_NEEDED" :
    lifestyle.includes("근력운동 필요") ? "STRENGTH_TRAINING_NEEDED" :
    "PHYSICAL_ACTIVITY_NEEDED";

  const base: HealthCheckupRequest = {
    hospitalName: hospital.trim(),
    checkupDate: date, // YYYY-MM-DD
    measurementDto: {
      height: Math.max(0, heightNum),
      weight: Math.max(0, weightNum),
      bmi: bmiNum,
      bmiCategory,
      waist: Math.max(0, toNum(waist)),
      waistType: waistType === "복부비만" ? "ABDOMINAL_OBESITY" : "NORMAL",
      vision: "1.0/1.0", // TODO: 필요시 입력 값으로 교체
      hearingLeft: hearingLeft === "정상" ? "NORMAL" : "SUSPECTED_DISEASE",
      hearingRight: hearingRight === "정상" ? "NORMAL" : "SUSPECTED_DISEASE",
    },
    bloodPressureDto: {
      systolic: Math.max(0, toInt(bpHigh)),
      diastolic: Math.max(0, toInt(bpLow)),
      bloodPressureStatus: bpStatus,
    },
    bloodTestDto: {
      hemoglobin: Math.max(0, toNum(hemoglobin)),
      hemoglobinStatus,
      fastingGlucose: Math.max(0, toInt(fastingGlucose)),
      fastingGlucoseType: fastingType,
      totalCholesterol: Math.max(0, toInt(cholesterol)),
      hdl: Math.max(0, toInt(hdl)),
      triglyceride: Math.max(0, toInt(triglyceride)),
      ldl: Math.max(0, toInt(ldl)),
      cholesterolStatus: cholStatus,
      // UI 라벨 주의: protein = '혈청 크레아티닌', serumCreatinine = 'eGFR'
      creatinine: Math.max(0, toNum(protein)),
      egfr: Math.max(0, toInt(serumCreatinine)),
      renalFunctionStatus: renalStatus,
      ast: Math.max(0, toInt(ast)),
      alt: Math.max(0, toInt(alt)),
      gtp: Math.max(0, toInt(gammaGtp)),
      liverFunctionStatus: liverStatus,
    },
    urineTestDto: {
      urineTestStatus: urineStatus,
    },
    imagingTestDto: {
      imagingTestStatus: imagingStatus,
    },
    interviewDto: {
      hasPastDisease,
      onMedication,
      lifestyleHabitsStatus: lifestyleStatus,
    },
    hasAdditionalTest: additionalExam === "해당",
    // additionalTestDto: 아래에서 조건부로 주입
    // @ts-expect-error - 조건부로 추가
    additionalTestDto: undefined,
  };

  // 추가검사 세팅
  if (additionalExam === "해당") {
    base.additionalTestDto = {
      b8Hepatitis: {
        surfaceAntigen: detail.hepatitis?.antigenGeneral ? "NORMAL" : "PRECISION",
        surfaceAntibody: detail.hepatitis?.antibodyGeneral ? "NORMAL" : "PRECISION",
        b8HepatitisStatus:
          detail.hepatitis?.hasAntibody ? "POSITIVE" :
          detail.hepatitis?.noAntibody ? "NEGATIVE" :
          detail.hepatitis?.suspectCarrier ? "SUSPECTED_CARRIER" : "UNDETERMINED",
      },
      depression:
        detail.depression?.none ? "NO_SYMPTOMS" :
        detail.depression?.mild ? "MILD" :
        detail.depression?.moderate ? "MODERATE_SUSPECTED" : "SEVERE_SUSPECTED",
      cognitiveImpairment:
        detail.cognitive?.none ? "NO_ABNORMALITY" : "IMPAIRMENT_SUSPECTED",
      boneDensityStatus:
        detail.bone?.normal ? "NORMAL" :
        detail.bone?.osteopenia ? "OSTEOPENIA" : "OSTEOPOROSIS",
      elderlyPhysicalFunctionStatus:
        detail.seniorPhysical?.normal ? "NORMAL" : "DECLINED",
      elderlyFunctionTest: {
        fallRiskStatus:
          detail.seniorFunction?.fallRisknormal ? "NORMAL" : "HIGH_RISK",
        dailyLifeStatus:
          detail.seniorFunction?.ADLnormal ? "NORMAL" : "NEEDS_ASSISTANCE",
        vaccinationStatus:
          detail.seniorFunction?.vaccineInfluenza ? "NEEDS_INFLUENZA" :
          detail.seniorFunction?.vaccinePneumonia ? "NEEDS_PNEUMOCOCCAL" : "NO_NEED",
        urinationDisorderStatus:
          detail.seniorFunction?.urinationNormal ? "NORMAL" : "SUSPECTED",
      },
    };
  } else {
    // @ts-ignore
    delete base.additionalTestDto;
  }

  return base;
};


  // 저장 버튼 클릭 핸들러
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hospital.trim()) {
      alert('병원명을 입력해주세요.');
      return;
    }
    if (!date) {
      alert('검진일을 선택해주세요.');
      return;
    }
    const requiredNumbers = [
      height,
      weight,
      bpHigh,
      bpLow,
      hemoglobin,
      fastingGlucose,
      cholesterol,
      hdl,
      triglyceride,
      ldl,
      protein,
      serumCreatinine,
      ast,
      alt,
      gammaGtp,
    ];
    if (requiredNumbers.some((v) => !v || isNaN(parseFloat(v)))) {
      alert('필수 검사 수치를 모두 입력해주세요.');
      return;
    }
    try {
      const payload = transformFormDataToAPI();
      console.log('HealthReport payload:', payload);
      await createHealthReport(payload);
      alert('건강리포트가 성공적으로 생성되었습니다.');
      navigate('/');
    } catch (error: any) {
      console.error('건강리포트 생성 실패:', error);
      console.error('API error response:', error?.response?.data);
      const apiMessage = error?.response?.data?.message || error?.message || '알 수 없는 오류';
      alert(`건강리포트 생성에 실패했습니다.\n사유: ${apiMessage}`);
    }
  };

  // 체크박스 다중 선택
  const handleLifestyle = (value: string) => {
    setLifestyle(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };


  return (
    <form
      className="mx-auto px-4 bg-white min-h-screen max-w-[1300px]"
      onSubmit={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        if ((e as React.KeyboardEvent<HTMLFormElement>).key === 'Enter') {
          e.preventDefault();
        }
      }}
    >
      {/* 상단 타이틀/뒤로가기 */}
      <div className="flex items-center justify-center w-full py-8 my-8">
      <button
          onClick={handleBack}
          className="absolute w-[17px] h-[35px] flex items-center justify-center top-[230px] left-[312px]"
          aria-label="뒤로가기"
        >
          <img src={backSvg} alt="뒤로가기" className="w-full h-full object-contain" />
        </button>
        <h2 className="text-2xl font-bold text-center w-full">건강검진결과 입력</h2>
      </div>


      {/* 회차 선택/추가/이전회차 보기 */}
      <div className="flex inline-flex items-center gap-2 mb-8">
        <RoundSelector
          rounds={rounds}
          currentRound={currentRound}
          onAddRound={onAddRound}
          onSelectRound={onSelectRound}
        />
      </div>

      <div className=" mb-8">
        <div className="flex items-center gap-4 xl:gap-[0.9rem] mb-4 xl:mb-[0.9rem]">
          <span className="text-[18px] font-medium text-[#121218] font-pretendard">건강검진결과지업로드</span>
        </div>
        
        {/* 파일 업로드 영역 */}
        <div 
          className="w-full h-auto min-h-[5.9rem] xl:h-[5.9rem] border border-[#DBE6FF] rounded-[0.525rem] xl:rounded-[0.525rem] flex items-center justify-center cursor-pointer transition-colors p-3 xl:p-3 mb-4"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="flex items-center gap-2 xl:gap-[0.375rem] cursor-pointer">
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 7.2V2.88L14.4 7.2M2 0.4C1.068 0.4 0 1.468 0 2.8V18C0 18.6364 0.252857 19.247 0.702944 19.6971C1.15303 20.1471 1.76364 20.4 2.4 20.4H13.6C14.2364 20.4 14.847 20.1471 15.2971 19.6971C15.7471 19.247 16 18.6364 16 18V6L10 0.4H2Z" fill="#9DA0A3"/>
            </svg>
            <p className="text-sm xl:text-sm font-medium text-[#9DA0A3] font-pretendard leading-[1.714] tracking-[-0.03em] text-center">
              여기에 파일을 마우스로 끌어오세요.
            </p>
          </label>
        </div>
        
        {/* 업로드된 파일들 */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2 xl:space-y-[0.6rem] mb-[18px]">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex justify-center">
                <div className="w-full max-w-[24.7rem] xl:w-[24.7rem] h-auto min-h-[2.6rem] xl:h-[2.6rem] bg-[#DBE6FF] rounded-[0.525rem] xl:rounded-[0.525rem] flex items-center justify-between px-4 xl:px-[0.9rem]">
                  <div className="flex items-center gap-4 xl:gap-[0.9rem] flex-1 min-w-0">
                    <img src={fileboxIcon} alt="업로드된 파일" className="w-8 h-6 xl:w-[2.2rem] xl:h-[1.6rem] flex-shrink-0" />
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-sm xl:text-sm font-medium text-[#25282B] font-pretendard leading-[1.714] tracking-[-0.03em] truncate">
                        {file.name}
                      </span>
                      {uploadedImageUrls[index] && (
                        <span className="text-xs text-green-600">✓ 업로드됨</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-[#9DA0A3] hover:text-[#1D68FF] transition-colors flex-shrink-0 ml-2"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 파일 업로드 안내 박스 */}
      <div className="flex justify-center mb-[34px]">
          <div className="w-full max-w-[24.7rem] xl:w-[24.7rem] h-auto min-h-[2.6rem] xl:h-[2.6rem] bg-[#82ABFD] rounded-[0.525rem] xl:rounded-[0.525rem] flex items-center justify-center gap-4 xl:gap-[0.9rem]">
            <img src={fileboxIcon} alt="업로드된 파일" className="w-8 h-6 xl:w-[2.2rem] xl:h-[1.6rem]" />
            <span className="text-sm xl:text-sm font-medium text-white font-pretendard leading-[1.714] tracking-[-0.03em]">
              이미지 파일 업로드(png,jpg,pdf)
            </span>
          </div>
        </div>

      {/* 검진일/검진장소 입력 */}
      <div className="flex items-center gap-8 mb-8">
        <div className="flex items-center gap-2">
          <label className="font-semibold text-base text-[18px] text-black mr-2">검진일</label>
          <input
            type="date"
            className="rounded-[14px] border border-gray-200 px-6 py-2 text-base text-gray-700 focus:outline-none focus:border-[#82ABFD] transition w-[200px]"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-semibold text-base text-[18px] text-black mr-2">검진장소</label>
          <input
            type="text"
            className="rounded-[14px] border border-gray-200 px-6 py-2 text-base text-gray-700 focus:outline-none focus:border-[#82ABFD] transition w-[200px]"
            placeholder="병원명을 입력하세요"
            value={hospital}
            onChange={e => setHospital(e.target.value)}
          />
        </div>
      </div>

      {/* 계측 검사 섹션 */}
      <div className="mb-10">
        <div className="bg-[#DBE6FF] rounded-[14px] px-6 py-2 font-bold text-base mb-2">
          계측 검사
        </div>
        <div className="space-y-6 bg-white rounded-[14px] p-6">
          {/* 키 */}
          <div className="flex items-center mb-[24px]">
            <label className="w-40 font-medium text-black text-[18px]">키 (cm)</label>
            <input type="number" className="rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10" placeholder="cm" value={height} onChange={handleHeightChange} />
          </div>
          {/* 몸무게 */}
          <div className="flex items-center border-b-2 border-[#DBE6FF]">
            <div className="flex items-center mb-[24px]">
            <label className="w-40 font-medium text-black text-[18px]">몸무게 (kg)</label>
            <input type="number" className="rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10" placeholder="kg" value={weight} onChange={handleWeightChange} />
            </div>
          </div>
          {/* BMI */}
          <div className="border-b-2 border-[#DBE6FF] mb-[24px]">
            <div className="flex items-center mb-[24px]">
              <label className="w-40 font-medium text-black text-[18px]">BMI 체질량지수</label>
              <input type="number" className="rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10" placeholder="결과 자동 계산" value={bmi} onChange={e => setBmi(e.target.value)} readOnly />
            </div>
            <div className="flex gap-10 ml-50 mb-[24px]">
              {['저체중', '정상', '과체중', '비만'].map((v) => (
                <CustomCheckboxButton key={v} checked={bmiType === v} onClick={() => setBmiType(v as '저체중' | '정상' | '과체중' | '비만')} label={v} />
              ))}
            </div>
          </div>
          {/* 허리둘레 */}
          <div className="border-b-2 border-[#DBE6FF]">
            <div className="flex items-center mb-[24px]">
              <label className="w-40 font-medium text-black text-[18px]">허리둘레 (cm)</label>
              <input type="number" className="rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10" placeholder="cm" value={waist} onChange={e => setWaist(e.target.value)} />
            </div>
            <div className="flex gap-10 ml-50 mb-[24px]">
              {['정상', '복부비만'].map((v) => (
                <CustomCheckboxButton key={v} checked={waistType === v} onClick={() => setWaistType(v as '정상' | '복부비만')} label={v} />
              ))}
            </div>
          </div>
          {/* 시각이상 */}
          <div className="flex items-center">
            <label className="w-40 text-black text-[18px] font-medium">시각이상(좌/우)</label>
              <input type="text" className="rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10" placeholder="예) 0.9 / 0.8" />
          </div>
          {/* 청각이상 */}
          <div className="border-b-2 border-[#DBE6FF]">
            <div className="flex items-start">
              <label className="w-40 text-black text-[18px] font-medium mt-[10px]">청각이상(좌/우)</label>
              <div className="flex-1 flex">
                {/* 오른쪽 체크박스 영역 */}
                <div className="flex-1 flex flex-col gap-4">
                  {/* 좌측 */}
                  <div className="flex items-center gap-4">
                    <span className="text-[18px] text-gray-700 w-8 ml-10">좌</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="40" viewBox="0 0 4 40" fill="none" className="mr-4 mt-[10px]">
                      <path d="M2 2V38" stroke="#DBE6FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6"/>
                    </svg>
                    {['정상', '질환의심'].map((v) => (
                      <CustomCheckboxButton 
                        key={v} 
                        checked={hearingLeft === v} 
                        onClick={() => setHearingLeft(v as '정상' | '청력 장애')} 
                        label={v} 
                      />
                    ))}
                  </div>
                  {/* 우측 */}
                  <div className="flex items-center gap-4 mb-[24px]">
                    <span className="text-[18px] text-gray-700 w-8 ml-10">우</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="40" viewBox="0 0 4 40" fill="none" className="mr-4">
                      <path d="M2 2V38" stroke="#DBE6FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6"/>
                    </svg>
                    
                    {['정상', '질환의심'].map((v) => (
                      <CustomCheckboxButton 
                        key={v} 
                        checked={hearingRight === v} 
                        onClick={() => setHearingRight(v as '정상' | '청력 장애')} 
                        label={v} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 혈압 */}
          <div className="flex items-center mb-2">
            <label className="w-40 font-medium text-black text-[18px]">혈압(mmHg)</label>
            <div className="flex gap-4 mb-[24px]">
              <div className="flex items-center gap-2">
                <span className="ml-10 text-[18px]">수축기 혈압</span>
                <input type="number" className="rounded-[14px] border border-gray-300 px-4 py-2 h-10 w-[180px]" placeholder="120" value={bpHigh} onChange={e => setBpHigh(e.target.value)} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[18px]">이완기 혈압</span>
                <input type="number" className="rounded-[14px] border border-gray-300 px-4 py-2 h-10 w-[200px]" placeholder="80" value={bpLow} onChange={e => setBpLow(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 ml-50">
            <div className="flex gap-10 mb-[16px]">
              {['정상', '유질환자'].map((v) => (
                <CustomCheckboxButton key={v} checked={bpType === v} onClick={() => setBpType(v as '정상' | '유질환자')} label={v} />
              ))}
            </div>
            <div className="mb-[16px]">
              <CustomCheckboxButton 
                key="고혈압 전단계(수축기 120-139 또는  이완기 80-89)" 
                checked={bpType === '고혈압 전단계'} 
                onClick={() => setBpType('고혈압 전단계(수축기 120-139 또는  이완기 80-89)' as '고혈압 전단계' | '고혈압의심' | '유질환자')} 
                label="고혈압 전단계(수축기 120-139 또는  이완기 80-89)" 
              />
            </div>
            <div>
              <CustomCheckboxButton 
                key="고혈압의심 (140이상) 또는 90이상"
                checked={bpType === '고혈압의심'} 
                onClick={() => setBpType('고혈압의심 (140이상) 또는 90이상' as '고혈압 전단계' | '고혈압의심' | '유질환자')} 
                label="고혈압의심 (140이상) 또는 90이상" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* 혈액 검사 섹션 */}
      <div className="mb-[24px]">
        <div className="bg-[#DBE6FF] rounded-[14px] font-bold px-6 py-2 text-[18px] mb-[24px]">
          혈액 검사
        </div>
        <div className="space-y-6 bg-white rounded-[14px] p-6">
          {/* 혈색소 */}
          <div className="border-b-2 border-[#DBE6FF]">
            <div className="flex items-center mb-[24px]">
              <label className="w-40 font-medium text-black text-[18px]">혈색소(g/dL)</label>
              <input
                type="number"
                className="rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10"
                placeholder="12.3"
                value={hemoglobin}
                onChange={(e) => setHemoglobin(e.target.value)}
              />
            </div>
            <div className="flex gap-10 ml-50 mb-[24px]">
              {['정상', '빈혈의심', '기타'].map((v) => (
                <CustomCheckboxButton
                  key={v}
                  checked={hemoglobinStatusLabel === v}
                  onClick={() => setHemoglobinStatusLabel(v as '정상' | '빈혈의심' | '기타')}
                  label={v}
                />
              ))}
            </div>
          </div>
          {/* 공복혈당 */}
          <div className="border-b-2 border-[#DBE6FF]">
            <div className="flex items-center mb-[24px]">
              <label className="w-40 font-medium text-black text-[18px]">공복혈당(mg/dL)</label>
              <input
                type="number"
                className="rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10"
                placeholder="85"
                value={fastingGlucose}
                onChange={(e) => setFastingGlucose(e.target.value)}
              />
            </div>
            <div className="flex gap-10 ml-50 mb-[24px]">
              {['정상', '유질환자', '공복혈당장애 의심', '당뇨병 의심'].map((v) => (
                <CustomCheckboxButton
                  key={v}
                  checked={fastingGlucoseTypeLabel === v}
                  onClick={() =>
                    setFastingGlucoseTypeLabel(
                      v as '정상' | '유질환자' | '공복혈당장애 의심' | '당뇨병 의심'
                    )
                  }
                  label={v}
                />
              ))}
            </div>
          </div>
          {/* 지질 프로필 */}
          <div className="border-b-2 border-[#DBE6FF]">
            <div className="flex items-start">
              <div className="flex flex-col">
                {/* 총 콜레스테롤 */}
                <div className="flex items-center mb-[24px]">
                  <label className="w-40 font-medium text-black text-[18px]">총 콜레스테롤 (mg/dL)</label>
                  <input type="number" className="rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10" placeholder="0" value={cholesterol} onChange={e => setCholesterol(e.target.value)} />
                </div>
                {/* HDL 콜레스테롤 */}
                <div className="flex items-center mb-[24px]">
                  <label className="w-40 font-medium text-black text-[18px]">HDL-콜레스테롤(mg/dL)</label>
                  <input type="number" className="rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10" placeholder="0" value={hdl} onChange={e => setHdl(e.target.value)} />
                </div>
                {/* 중성지방 */}
                <div className="flex items-center mb-[24px]">
                  <label className="w-40 font-medium text-black text-[18px]">중성지방 (mg/dL)</label>
                  <input type="number" className="rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10" placeholder="0" value={triglyceride} onChange={e => setTriglyceride(e.target.value)} />
                </div>
                {/* LDL 콜레스테롤 */}
                <div className="flex items-center">
                  <label className="w-40 font-medium text-black text-[18px]">LDL-콜레스테롤(mg/dL)</label>
                  <input type="number" className="rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10" placeholder="0" value={ldl} onChange={e => setLdl(e.target.value)} />
                </div>
              </div>
              {/* 세로 점선 */}
              <div className="w-8 flex flex-col items-center mx-4 mb-[24px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="268" viewBox="0 0 4 268" fill="none">
                  <path d="M2 2L2.00001 266" stroke="#DBE6FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6"/>
                </svg>
              </div>
              {/* 오른쪽 체크박스 영역 */}
              <div className="flex flex-col gap-8">
                {['정상', '고콜레스테롤혈증 의심', '고중성지방혈증 의심', '낮은 HDL 콜레스테롤 의심', '유질환자'].map((v) => (
                  <CustomCheckboxButton 
                    key={v} 
                    checked={lipidProfile === v} 
                    onClick={() => setLipidProfile(v as '정상' | '고콜레스테롤혈증 의심' | '고중성지방혈증 의심' | '낮은 HDL 콜레스테롤 의심' | '유질환자')} 
                    label={v} 
                  />
                ))}
              </div>
            </div>
          </div>
          {/* 신장기능 */}
          <div className="border-b-2 border-[#DBE6FF]">
            <div className="flex items-start">
              <div className="flex flex-col">
                {/* 혈청 크레아티닌 */}
                <div className="flex items-center mb-[24px]">
                  <label className="w-40 font-medium text-black text-[18px]">혈청 크레아티닌</label>
                  <input type="number" className="rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10" placeholder="1.2" value={protein} onChange={e => setProtein(e.target.value)} />
                </div>
                {/* eGFR */}
                <div className="flex items-center mb-[24px]">
                  <label className="w-40 font-medium text-black text-[18px]">eGFR(신사구체여과율)</label>
                  <input type="number" className="rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10" placeholder="72" value={serumCreatinine} onChange={e => setSerumCreatinine(e.target.value)} />
                </div>
              </div>
              {/* 세로 점선 */}
              <div className="w-8 flex flex-col items-center mx-4 mb-[24px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="120" viewBox="0 0 4 120" fill="none">
                  <path d="M2 2L2.00001 118" stroke="#DBE6FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6"/>
                </svg>
              </div>
              {/* 오른쪽 체크박스 영역 */}
              <div className="flex flex-col gap-6 mt-5">
                {['정상', '신장기능 이상 의심'].map((v) => (
                  <CustomCheckboxButton 
                    key={v} 
                    checked={kidneyFunction === v} 
                    onClick={() => setKidneyFunction(v)} 
                    label={v} 
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* 간기능 */}
          <div className="flex items-start">
            <div className="flex flex-col">
              {/* AST(SGOT) */}
              <div className="flex items-center mb-[24px]">
                <label className="w-40 font-medium text-black text-[18px]">AST(SGOT)</label>
                <input type="number" className="rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10" placeholder="25" value={ast} onChange={e => setAst(e.target.value)} />
              </div>
              {/* ALT(SGPT) */}
              <div className="flex items-center mb-[24px]">
                <label className="w-40 font-medium text-black text-[18px]">ALT(SGPT)</label>
                <input type="number" className="rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10" placeholder="25" value={alt} onChange={e => setAlt(e.target.value)} />
              </div>
              {/* 감마-GTP(Y-GTP) */}
              <div className="flex items-center mb-[24px]">
                <label className="w-40 font-medium text-black text-[18px]">감마-GTP(Y-GTP)</label>
                <input type="number" className="rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10" placeholder="30" value={gammaGtp} onChange={e => setGammaGtp(e.target.value)} />
              </div>
            </div>
            {/* 세로 점선 */}
            <div className="w-8 flex flex-col items-center mx-4 mb-[24px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="4" height="180" viewBox="0 0 4 180" fill="none">
                <path d="M2 2L2.00001 178" stroke="#DBE6FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6"/>
              </svg>
            </div>
            {/* 오른쪽 체크박스 영역 */}
            <div className="flex flex-col gap-6 mt-10">
              {['정상', '간기능 이상 의심'].map((v) => (
                <CustomCheckboxButton 
                  key={v} 
                  checked={liverFunction === v} 
                  onClick={() => setLiverFunction(v as '정상' | '간기능 장애')} 
                  label={v} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 요검사 섹션 */}
      <div className="mb-3">
        <div className="bg-[#DBE6FF] rounded-[14px] px-6 py-2 font-bold text-base mb-3">
          요검사
        </div>
        <div className="bg-white rounded-[14px] p-6">
          {/* 요단백 */}
          <div className="flex items-center mb-2">
            <label className="w-40 font-medium text-black text-[18px]">요단백</label>
            <div className="flex gap-10 ml-15">
              {['정상', '경계', '단백뇨의심'].map((v) => (
                <CustomCheckboxButton key={v} checked={urineProteinType === v} onClick={() => setUrineProteinType(v as '정상' | '경계' | '요단백 의심')} label={v} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* 영상검사 섹션 */}
      <div className="mb-3">
        <div className="bg-[#DBE6FF] text-[20px] rounded-[14px] px-6 py-2 font-bold text-base mb-3">
          영상검사
        </div>
        <div className="bg-white rounded-[14px] p-6">
          {/* 흉부촬영 */}
          <div className="flex items-center mb-2">
            <label className="w-40 font-medium text-black text-[18px]">흉부촬영</label>
            <div className="flex gap-10 ml-15">
                {['정상', '비활동성 폐결핵', '질환의심', '기타'].map((v) => (
                  <CustomCheckboxButton
                    key={v}
                    checked={chestXray === v}
                    onClick={() => setChestXray(v as '정상' | '비활동성 폐결핵' | '질환의심' | '기타')}
                    label={v}
                  />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 진찰(문진) 섹션 */}
      <div className="mb-3">
        <div className="bg-[#DBE6FF] rounded-[14px] px-6 py-2 font-bold text-base mb-3">
          진찰(문진)
        </div>
        <div className="bg-white rounded-[14px] p-6">
          {/* 과거병력 */}
          <div className="flex items-center mb-10">
            <label className="w-40 font-medium text-black text-[18px]">과거병력</label>
            <div className="flex gap-10 ml-15">
              {['유', '무'].map((v) => (
                <CustomCheckboxButton key={v} checked={history === v} onClick={() => setHistory(v)} label={v} />
              ))}
            </div>
          </div>
          {/* 약물치료 */}
          <div className="flex items-center mb-10">
            <label className="w-40 font-medium text-black text-[18px]">약물치료</label>
            <div className="flex gap-10 ml-15">
              {['유', '무'].map((v) => (
                <CustomCheckboxButton key={v} checked={medication === v} onClick={() => setMedication(v)} label={v} />
              ))}
            </div>
          </div>
          {/* 생활습관 */}
          <div className="flex items-center mb-7">
            <label className="w-40 font-medium text-black text-[18px]">생활습관</label>
            <div className="flex gap-10 ml-15">
              {['금연 필요', '절주 필요', '신체활동 필요', '근력운동 필요'].map((v) => (
                <CustomCheckboxButton key={v} checked={lifestyle.includes(v)} onClick={() => handleLifestyle(v)} label={v} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 추가검사 */}
      <AdditionalExamSection
        value={additionalExam}
        onChange={setAdditionalExam}
        detail={additionalExamDetail}
        setDetail={setAdditionalExamDetail}
      />

      {/* 저장 버튼 */}
      <div className="flex justify-center mt-12">
        <button
          type="submit"
          className="w-[400px] h-[72px] bg-[#1D68FF] text-white rounded-[60px] text-[24px] font-semibold shadow hover:bg-blue-600 transition"
          onClick={handleSave}
        >
          저장하기
        </button>
      </div>
    </form>
  );
};

export default HealthCheckupForm;
