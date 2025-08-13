import React, { useEffect, useState } from 'react';
import MyMedicalReportRoundSelector from '../Common/MyMedicalReportRoundSelector';
import AdditionalExamSection from './AdditionalExamSection';
import CustomCheckboxButton from '../Common/CustomCheckboxButton';
import backSvg from '../../assets/back.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import FileUploadSection from '../Common/FileUploadSection';
import { useExpertUserReportByRound } from '../../hooks/consultation/expert/queries/useExpertUserReportByRound';
import FunLoadingOverlay from './FunLoadingOverlay';
import { createHealthReport, getHealthReportCount, parseHealthReportImage } from '../../apis/healthCheckupApi/healthCheckup';
import useHealthReportQuery from '../../hooks/healthCheckup/useHealthReportQuery';
import { useHealthReportUpdateMutation } from '../../hooks/healthCheckup/useHealthReportMutation';
import type { HealthCheckupRequest } from '../../types/healthCheckupForm';
import SuccessModal from '../MyHome/Edit/SuccessModal';
import ConfirmModal from '../MyHome/Edit/ConfirmModal';

const HealthCheckupForm = () => {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const externalUserId = search.get('userId');
  const externalRound = search.get('round');

  // 회차 상태 관리 (서버 count 기반)
  const [rounds, setRounds] = useState<number[]>([1]);
  const [serverRoundCount, setServerRoundCount] = useState<number>(1);
  const [currentRound, setCurrentRound] = useState<number>(externalRound ? parseInt(externalRound) : 1);
  // 회차 추가 핸들러
  const onAddRound = () => {
    const currentMax = Math.max(...rounds);
    // 서버에 저장된 총 회차 수 + 1(새 회차)까지만 허용
    if (currentMax >= serverRoundCount + 1) {
      alert('새 회차는 한 번에 하나만 추가할 수 있어요. 먼저 저장해 주세요.');
      return;
    }
    const next = currentMax + 1;
    setRounds([...rounds, next]);
    setCurrentRound(next);
  };
  // 회차 선택 핸들러
  const onSelectRound = (round: number) => {
    setCurrentRound(round);
  };
  const handleRoundFilterClick = () => {
    // 건강검진 입력 페이지에서는 별도의 필터 동작이 필요 없음 (콜백만 전달)
  };

  // 초기 로드 시 서버에서 총 회차 불러와 UI 세팅
  useEffect(() => {
    (async () => {
      try {
        const res = await getHealthReportCount();
        const count = res.result ?? 1;
        const arr = Array.from({ length: Math.max(1, count) }, (_, i) => i + 1);
        setRounds(arr);
        setServerRoundCount(Math.max(1, count));
        if (!externalRound) setCurrentRound(arr[arr.length - 1]);
      } catch (e) {
        console.error('회차 수 조회 실패', e);
        setRounds([1]);
        setServerRoundCount(1);
        if (!externalRound) setCurrentRound(1);
      }
    })();
  }, [externalRound]);

  // 파일 업로드(커스텀 구현) 상태는 FileUploadSection으로 대체

  // 저장 완료 확인 모달 상태
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [navigateAfterConfirm, setNavigateAfterConfirm] = useState<boolean>(false);
  const [isGoReportConfirmOpen, setIsGoReportConfirmOpen] = useState<boolean>(false);
  const openConfirm = (shouldNavigate = false) => {
    setNavigateAfterConfirm(shouldNavigate);
    setIsConfirmOpen(true);
  };
  // 업로드 이미지 (컴포넌트 기반)
  // 이미지 파싱 로딩 상태
  const [isParsing, setIsParsing] = useState(false);

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
    if (navigateAfterConfirm) {
      navigate('/my-medical-report');
    }
    setNavigateAfterConfirm(false);
  };

  // 기존 수동 업로드 핸들러 제거 (컴포넌트 사용)

  // 기존 수동 업로드 핸들러 제거 (컴포넌트 사용)

  // 드래그 앤 드롭 핸들러 추가
  // 드래그앤드롭 제거 (컴포넌트 사용)

  // 상태 관리 (필요한 모든 항목)
  const [date, setDate] = useState('');
  const [hospital, setHospital] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [bmiType, setBmiType] = useState<'정상' | '저체중' | '과체중' | '비만' | ''>('');
  const [waist, setWaist] = useState('');
  const [waistType, setWaistType] = useState<'정상' | '복부비만' | ''>('');
  const [vision, setVision] = useState('');
  const [bpHigh, setBpHigh] = useState('');
  const [bpLow, setBpLow] = useState('');
  const [bpType, setBpType] = useState<'정상' | '고혈압 전단계' | '고혈압의심' | '유질환자' | ''>(
    '',
  );

  const [hemoglobin, setHemoglobin] = useState('');
  const [hemoglobinStatusLabel, setHemoglobinStatusLabel] = useState<
    '정상' | '빈혈의심' | '기타' | ''
  >('');
  const [fastingGlucose, setFastingGlucose] = useState('');
  const [fastingGlucoseTypeLabel, setFastingGlucoseTypeLabel] = useState<
    '정상' | '유질환자' | '공복혈당장애 의심' | '당뇨병 의심' | ''
  >('');
  const [cholesterol, setCholesterol] = useState('');
  const [hdl, setHdl] = useState('');
  const [ldl, setLdl] = useState('');
  const [triglyceride, setTriglyceride] = useState('');
  const [lipidProfile, setLipidProfile] = useState<
    | '정상'
    | '고콜레스테롤혈증 의심'
    | '고중성지방혈증 의심'
    | '낮은 HDL 콜레스테롤 의심'
    | '유질환자'
    | ''
  >('');
  const [protein, setProtein] = useState('');
  // const [proteinType, setProteinType] = useState('정상');
  const [serumCreatinine, setSerumCreatinine] = useState('');

  const [kidneyFunction, setKidneyFunction] = useState('');
  const [ast, setAst] = useState('');
  const [alt, setAlt] = useState('');
  const [gammaGtp, setGammaGtp] = useState('');
  const [liverFunction, setLiverFunction] = useState<'정상' | '간기능 장애' | ''>('');
  // const [urineProtein, setUrineProtein] = useState('');
  const [urineProteinType, setUrineProteinType] = useState<'정상' | '경계' | '요단백 의심' | ''>(
    '',
  );
  const [chestXray, setChestXray] = useState<'정상' | '비활동성 폐결핵' | '질환의심' | '기타' | ''>(
    '',
  );
  const [history, setHistory] = useState('');
  const [medication, setMedication] = useState('');
  const [lifestyle, setLifestyle] = useState<string[]>([]);
  const [hearingLeft, setHearingLeft] = useState<'정상' | '청력 장애' | ''>('');
  const [hearingRight, setHearingRight] = useState<'정상' | '청력 장애' | ''>('');
  const [additionalExam, setAdditionalExam] = useState<'해당' | '미해당'>('미해당');
  const [additionalExamDetail, setAdditionalExamDetail] = useState<any>({});

  // 회차별 기존 리포트 조회 (전문가가 환자 보기: userId 파라미터 있으면 전문가용 API 사용)
  const isExpertViewingUser = Boolean(externalUserId);
  const { data: expertReportResponse } = useExpertUserReportByRound(
    isExpertViewingUser ? parseInt(externalUserId!) : null,
    isExpertViewingUser ? currentRound : null,
    isExpertViewingUser,
  );
  const { data: reportResponse } = useHealthReportQuery(currentRound, !isExpertViewingUser);
  const updateMutation = useHealthReportUpdateMutation(currentRound);

  const resetForm = () => {
    setDate('');
    setHospital('');
    setHeight('');
    setWeight('');
    setBmi('');
    setBmiType('');
    setWaist('');
    setWaistType('');
    setVision('');
    setBpHigh('');
    setBpLow('');
    setBpType('');
    setHemoglobin('');
    setHemoglobinStatusLabel('');
    setFastingGlucose('');
    setFastingGlucoseTypeLabel('');
    setCholesterol('');
    setHdl('');
    setLdl('');
    setTriglyceride('');
    setLipidProfile('');
    setProtein('');
    setSerumCreatinine('');
    setKidneyFunction('');
    setAst('');
    setAlt('');
    setGammaGtp('');
    setLiverFunction('');
    setUrineProteinType('');
    setChestXray('');
    setHistory('');
    setMedication('');
    setLifestyle([]);
    setHearingLeft('');
    setHearingRight('');
    setAdditionalExam('미해당');
    setAdditionalExamDetail({});
  };

  const applyReportToForm = (report: HealthCheckupRequest) => {
    try {
      setDate(report.checkupDate || '');
      setHospital(report.hospitalName || '');

      const m = report.measurementDto;
      if (m) {
        setHeight(m.height != null ? String(m.height) : '');
        setWeight(m.weight != null ? String(m.weight) : '');
        setBmi(m.bmi != null ? String(m.bmi) : '');
        // BMI 타입은 수치로 유추
        const bmiValue = Number(m.bmi);
        if (!isNaN(bmiValue)) {
          if (bmiValue < 18.5) setBmiType('저체중');
          else if (bmiValue < 23) setBmiType('정상');
          else if (bmiValue < 25) setBmiType('과체중');
          else setBmiType('비만');
        } else {
          setBmiType('');
        }
        setWaist(m.waist != null ? String(m.waist) : '');
        setWaistType(m.waistType === 'ABDOMINAL_OBESITY' ? '복부비만' : m.waistType ? '정상' : '');
        setVision(m.vision || '');
        setHearingLeft(m.hearingLeft === 'NORMAL' ? '정상' : m.hearingLeft ? '청력 장애' : '');
        setHearingRight(m.hearingRight === 'NORMAL' ? '정상' : m.hearingRight ? '청력 장애' : '');
      }

      const bp = report.bloodPressureDto;
      if (bp) {
        setBpHigh(bp.systolic != null ? String(bp.systolic) : '');
        setBpLow(bp.diastolic != null ? String(bp.diastolic) : '');
        const mapBp = bp.bloodPressureStatus;
        setBpType(
          mapBp === 'HYPERTENSIVE_PATIENT'
            ? '유질환자'
            : mapBp === 'PREHYPERTENSION'
              ? '고혈압 전단계'
              : mapBp === 'HYPERTENSION'
                ? '고혈압의심'
                : mapBp === 'NORMAL'
                  ? '정상'
                  : '',
        );
      }

      const bt = report.bloodTestDto;
      if (bt) {
        setHemoglobin(bt.hemoglobin != null ? String(bt.hemoglobin) : '');
        setHemoglobinStatusLabel(
          bt.hemoglobinStatus === 'NORMAL'
            ? '정상'
            : bt.hemoglobinStatus === 'SUSPECTED_ANEMIA'
              ? '빈혈의심'
              : bt.hemoglobinStatus
                ? '기타'
                : '',
        );
        setFastingGlucose(bt.fastingGlucose != null ? String(bt.fastingGlucose) : '');
        setFastingGlucoseTypeLabel(
          bt.fastingGlucoseType === 'NORMAL'
            ? '정상'
            : bt.fastingGlucoseType === 'DISEASE'
              ? '유질환자'
              : bt.fastingGlucoseType === 'IMPAIRED_FASTING_GLUCOSE'
                ? '공복혈당장애 의심'
                : bt.fastingGlucoseType === 'DIABETES_MELLITUS'
                  ? '당뇨병 의심'
                  : '',
        );
        setCholesterol(bt.totalCholesterol != null ? String(bt.totalCholesterol) : '');
        setHdl(bt.hdl != null ? String(bt.hdl) : '');
        setTriglyceride(bt.triglyceride != null ? String(bt.triglyceride) : '');
        setLdl(bt.ldl != null ? String(bt.ldl) : '');
        setLipidProfile(
          bt.cholesterolStatus === 'NORMAL'
            ? '정상'
            : bt.cholesterolStatus === 'HYPER_CHOLESTEROL_EMIA'
              ? '고콜레스테롤혈증 의심'
              : bt.cholesterolStatus === 'HIGH_TRIGLYCERIDES'
                ? '고중성지방혈증 의심'
                : bt.cholesterolStatus === 'LOW_HDL_CHOLESTEROL'
                  ? '낮은 HDL 콜레스테롤 의심'
                  : bt.cholesterolStatus === 'DISEASE'
                    ? '유질환자'
                    : '',
        );
        setProtein(bt.creatinine != null ? String(bt.creatinine) : '');
        setSerumCreatinine(bt.egfr != null ? String(bt.egfr) : '');
        setKidneyFunction(
          bt.renalFunctionStatus === 'NORMAL'
            ? '정상'
            : bt.renalFunctionStatus
              ? '신장기능 이상 의심'
              : '',
        );
        setAst(bt.ast != null ? String(bt.ast) : '');
        setAlt(bt.alt != null ? String(bt.alt) : '');
        setGammaGtp(bt.gtp != null ? String(bt.gtp) : '');
        setLiverFunction(
          bt.liverFunctionStatus === 'NORMAL'
            ? '정상'
            : bt.liverFunctionStatus
              ? '간기능 장애'
              : '',
        );
      }

      const urine = report.urineTestDto;
      if (urine) {
        setUrineProteinType(
          urine.urineTestStatus === 'NORMAL'
            ? '정상'
            : urine.urineTestStatus === 'BORDERLINE'
              ? '경계'
              : urine.urineTestStatus === 'PROTEINURIA'
                ? '요단백 의심'
                : '',
        );
      }

      const img = report.imagingTestDto;
      if (img) {
        setChestXray(
          img.imagingTestStatus === 'NORMAL'
            ? '정상'
            : img.imagingTestStatus === 'INACTIVE_PULMONARY_TUBERCULOSIS'
              ? '비활동성 폐결핵'
              : img.imagingTestStatus === 'DISEASE'
                ? '질환의심'
                : img.imagingTestStatus === 'OTHERS'
                  ? '기타'
                  : '',
        );
      }

      const interview = report.interviewDto;
      if (interview) {
        setHistory(
          interview.hasPastDisease === 'POSITIVE' ? '유' : interview.hasPastDisease ? '무' : '',
        );
        setMedication(
          interview.onMedication === 'POSITIVE' ? '유' : interview.onMedication ? '무' : '',
        );
        // 서버 표준: lifestyleHabitsStatusList (배열)
        const statuses = (interview as any).lifestyleHabitsStatusList
          ? (interview as any).lifestyleHabitsStatusList
          : (interview as any).lifestyleHabitsStatuses
            ? (interview as any).lifestyleHabitsStatuses
            : ((interview as any).lifestyleHabitsStatus
                ? [(interview as any).lifestyleHabitsStatus]
                : []);
        const mapped = (statuses as string[]).map((s: string) =>
          s === 'SMOKING_CESSATION_NEEDED' ? '금연 필요'
          : s === 'ALCOHOL_REDUCTION_NEEDED' ? '절주 필요'
          : s === 'STRENGTH_TRAINING_NEEDED' ? '근력운동 필요'
          : '신체활동 필요'
        );
        setLifestyle(mapped);
      }

      setAdditionalExam(report.hasAdditionalTest ? '해당' : '미해당');
      // 추가검사 상세 매핑
      const ad = (report as any).additionalTestDto;
      if (ad && report.hasAdditionalTest) {
        // B형 간염
        const hep = ad.b8Hepatitis || {};
        const hepApplicable = hep.b8hepatitis_applicability
          ? hep.b8hepatitis_applicability === 'APPLICABLE'
          : Boolean(hep.surfaceAntigen || hep.surfaceAntibody || hep.b8HepatitisStatus);

        // 우울증
        const dep = ad.depression as string | undefined;
        const depApplicable = dep && dep !== 'NOT_APPLICABLE';

        // 인지기능
        const cog = ad.cognitiveImpairment as string | undefined;
        const cogApplicable = cog && cog !== 'NOT_APPLICABLE';

        // 골밀도
        const bone = ad.boneDensityStatus as string | undefined;
        const boneApplicable = bone && bone !== 'NOT_APPLICABLE';

        // 노인신체기능
        const sp = ad.elderlyPhysicalFunctionStatus as string | undefined;
        const spApplicable = sp && sp !== 'NOT_APPLICABLE';

        // 노인기능 평가
        const sft = ad.elderlyFunctionTest || {};
        const sftApplicable = sft.elderlyFunctionTest_applicability
          ? sft.elderlyFunctionTest_applicability === 'APPLICABLE'
          : Boolean(sft.fallRiskStatus || sft.dailyLifeStatus || sft.vaccinationStatus || sft.urinationDisorderStatus);

        const detailNext: any = {};

        detailNext.hepatitis = {
          checked: !!hepApplicable,
          antigenGeneral: hep.surfaceAntigen === 'NORMAL',
          antigenDetail: hep.surfaceAntigen === 'PRECISION',
          antibodyGeneral: hep.surfaceAntibody === 'NORMAL',
          antibodyDetail: hep.surfaceAntibody === 'PRECISION',
          hasAntibody: hep.b8HepatitisStatus === 'POSITIVE',
          noAntibody: hep.b8HepatitisStatus === 'NEGATIVE',
          suspectCarrier: hep.b8HepatitisStatus === 'SUSPECTED_CARRIER',
          judgement: hep.b8HepatitisStatus === 'UNDETERMINED',
        };

        detailNext.depression = {
          checked: !!depApplicable,
          none: dep === 'NO_SYMPTOMS',
          mild: dep === 'MILD',
          moderate: dep === 'MODERATE_SUSPECTED',
          severe: dep === 'SEVERE_SUSPECTED',
        };

        detailNext.cognitive = {
          checked: !!cogApplicable,
          none: cog === 'NO_ABNORMALITY',
          suspect: cog === 'IMPAIRMENT_SUSPECTED',
        };

        detailNext.bone = {
          checked: !!boneApplicable,
          normal: bone === 'NORMAL',
          osteopenia: bone === 'OSTEOPENIA',
          osteoporosis: bone === 'OSTEOPOROSIS',
        };

        detailNext.seniorPhysical = {
          checked: !!spApplicable,
          normal: sp === 'NORMAL',
          low: sp === 'DECLINED',
        };

        detailNext.seniorFunction = {
          checked: !!sftApplicable,
          fallRisknormal: sft.fallRiskStatus === 'NORMAL',
          fallRiskSuspect: sft.fallRiskStatus === 'HIGH_RISK',
          ADLnormal: sft.dailyLifeStatus === 'NORMAL',
          ADLSuspect: sft.dailyLifeStatus === 'NEEDS_ASSISTANCE',
          vaccineInfluenza: sft.vaccinationStatus === 'NEEDS_INFLUENZA',
          vaccinePneumonia: sft.vaccinationStatus === 'NEEDS_PNEUMOCOCCAL',
          vaccineNone: sft.vaccinationStatus === 'NO_NEED',
          urinationNormal: sft.urinationDisorderStatus === 'NORMAL',
          urinationSuspect: sft.urinationDisorderStatus === 'SUSPECTED',
        };

        setAdditionalExamDetail(detailNext);
      } else {
        setAdditionalExamDetail({});
      }
    } catch (e) {
      console.error('리포트 데이터 폼 반영 실패', e);
    }
  };

  useEffect(() => {
    const report = (isExpertViewingUser ? expertReportResponse?.result : reportResponse?.result) as any;
    if (report) {
      applyReportToForm(report as HealthCheckupRequest);
    } else {
      // 해당 회차 데이터 없으면 초기화
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportResponse, expertReportResponse, isExpertViewingUser]);

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
    const toInt = (v: string) => (Number.isFinite(parseInt(v)) ? parseInt(v) : 0);
    const toNum = (v: string) => (Number.isFinite(parseFloat(v)) ? parseFloat(v) : 0);
    const detail = additionalExamDetail ?? {};

    const heightNum = toNum(height);
    const weightNum = toNum(weight);
    const bmiNum =
      heightNum > 0 ? Number((weightNum / Math.pow(heightNum / 100, 2)).toFixed(1)) : 0;

    // BMI enum
    let bmiCategory: HealthCheckupRequest['measurementDto']['bmiCategory'] = 'NORMAL';
    if (bmiNum < 18.5) bmiCategory = 'UNDERWEIGHT';
    else if (bmiNum >= 30) bmiCategory = 'OBESE';
    else if (bmiNum >= 25) bmiCategory = 'OVERWEIGHT';

    // 혈압 enum (라벨이 길어서 포함 여부로 매핑)
    const bpStatus: HealthCheckupRequest['bloodPressureDto']['bloodPressureStatus'] =
      bpType.includes('유질환')
        ? 'HYPERTENSIVE_PATIENT'
        : bpType.includes('전단계')
          ? 'PREHYPERTENSION'
          : bpType.includes('의심')
            ? 'HYPERTENSION'
            : 'NORMAL';

    // 지질 enum
    const cholStatus: HealthCheckupRequest['bloodTestDto']['cholesterolStatus'] =
      lipidProfile === '정상'
        ? 'NORMAL'
        : lipidProfile === '고콜레스테롤혈증 의심'
          ? 'HYPER_CHOLESTEROL_EMIA'
          : lipidProfile === '고중성지방혈증 의심'
            ? 'HIGH_TRIGLYCERIDES'
            : lipidProfile === '낮은 HDL 콜레스테롤 의심'
              ? 'LOW_HDL_CHOLESTEROL'
              : 'DISEASE';

    // 신장/간 기능 enum
    const renalStatus: HealthCheckupRequest['bloodTestDto']['renalFunctionStatus'] =
      kidneyFunction === '정상' ? 'NORMAL' : 'RENAL_FUNCTION_IMPAIRMENT';
    const liverStatus: HealthCheckupRequest['bloodTestDto']['liverFunctionStatus'] =
      liverFunction === '정상' ? 'NORMAL' : 'LIVER_FUNCTION_IMPAIRMENT';

    // 요검사 enum
    const urineStatus: HealthCheckupRequest['urineTestDto']['urineTestStatus'] =
      urineProteinType === '정상'
        ? 'NORMAL'
        : urineProteinType === '경계'
          ? 'BORDERLINE'
          : 'PROTEINURIA';

    // 흉부 X-ray enum
    const imagingStatus: HealthCheckupRequest['imagingTestDto']['imagingTestStatus'] =
      chestXray === '정상'
        ? 'NORMAL'
        : chestXray === '비활동성 폐결핵'
          ? 'INACTIVE_PULMONARY_TUBERCULOSIS'
          : chestXray === '질환의심'
            ? 'DISEASE'
            : 'OTHERS';

    // 혈색소/공복혈당 enum
    const hemoglobinStatus: HealthCheckupRequest['bloodTestDto']['hemoglobinStatus'] =
      hemoglobinStatusLabel === '정상'
        ? 'NORMAL'
        : hemoglobinStatusLabel === '빈혈의심'
          ? 'SUSPECTED_ANEMIA'
          : 'OTHERS';

    const fastingType: HealthCheckupRequest['bloodTestDto']['fastingGlucoseType'] =
      fastingGlucoseTypeLabel === '정상'
        ? 'NORMAL'
        : fastingGlucoseTypeLabel === '유질환자'
          ? 'DISEASE'
          : fastingGlucoseTypeLabel.includes('공복혈당장애')
            ? 'IMPAIRED_FASTING_GLUCOSE'
            : 'DIABETES_MELLITUS';

    // 인터뷰 enum
    const hasPastDisease = history === '유' ? 'POSITIVE' : 'NEGATIVE';
    const onMedication = medication === '유' ? 'POSITIVE' : 'NEGATIVE';
    const lifestyleStatuses: HealthCheckupRequest['interviewDto']['lifestyleHabitsStatusList'] = [
      ...(lifestyle.includes('금연 필요') ? ['SMOKING_CESSATION_NEEDED'] as const : []),
      ...(lifestyle.includes('절주 필요') ? ['ALCOHOL_REDUCTION_NEEDED'] as const : []),
      ...(lifestyle.includes('신체활동 필요') ? ['PHYSICAL_ACTIVITY_NEEDED'] as const : []),
      ...(lifestyle.includes('근력운동 필요') ? ['STRENGTH_TRAINING_NEEDED'] as const : []),
    ];

    const base: HealthCheckupRequest = {
      hospitalName: hospital.trim(),
      checkupDate: date, // YYYY-MM-DD
      measurementDto: {
        height: Math.max(0, heightNum),
        weight: Math.max(0, weightNum),
        bmi: bmiNum,
        bmiCategory,
        waist: Math.max(0, toNum(waist)),
        waistType: waistType === '복부비만' ? 'ABDOMINAL_OBESITY' : 'NORMAL',
        vision: vision.trim(),
        hearingLeft: hearingLeft === '정상' ? 'NORMAL' : 'SUSPECTED_DISEASE',
        hearingRight: hearingRight === '정상' ? 'NORMAL' : 'SUSPECTED_DISEASE',
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
        lifestyleHabitsStatusList: lifestyleStatuses,
      },
      hasAdditionalTest: additionalExam === '해당',
      additionalTestDto: {
        b8Hepatitis: {
          b8hepatitis_applicability: 'NOT_APPLICABLE',
          surfaceAntigen: 'NORMAL',
          surfaceAntibody: 'NORMAL',
          b8HepatitisStatus: 'UNDETERMINED',
        },
        depression: 'NOT_APPLICABLE',
        cognitiveImpairment: 'NOT_APPLICABLE',
        boneDensityStatus: 'NOT_APPLICABLE',
        elderlyPhysicalFunctionStatus: 'NOT_APPLICABLE',
        elderlyFunctionTest: {
          elderlyFunctionTest_applicability: 'NOT_APPLICABLE',
          fallRiskStatus: 'NORMAL',
          dailyLifeStatus: 'NORMAL',
          vaccinationStatus: 'NO_NEED',
          urinationDisorderStatus: 'NORMAL',
        },
      },
    };

    // 추가검사 세팅 (NOT_APPLICABLE 기본 → 개별 적용 시 override)
    const hasAdditional = additionalExam === '해당';

    // B형 간염
    const hepatitisApplicable = hasAdditional && !!detail.hepatitis?.checked;
    base.additionalTestDto.b8Hepatitis = {
      b8hepatitis_applicability: hepatitisApplicable ? 'APPLICABLE' : 'NOT_APPLICABLE',
      surfaceAntigen: hepatitisApplicable
        ? (detail.hepatitis?.antigenGeneral ? 'NORMAL' : 'PRECISION')
        : 'NORMAL',
      surfaceAntibody: hepatitisApplicable
        ? (detail.hepatitis?.antibodyGeneral ? 'NORMAL' : 'PRECISION')
        : 'NORMAL',
      b8HepatitisStatus: hepatitisApplicable
        ? (detail.hepatitis?.hasAntibody
            ? 'POSITIVE'
            : detail.hepatitis?.noAntibody
              ? 'NEGATIVE'
              : detail.hepatitis?.suspectCarrier
                ? 'SUSPECTED_CARRIER'
                : 'UNDETERMINED')
        : 'UNDETERMINED',
    };

    // 우울증
    const depressionApplicable = hasAdditional && !!detail.depression?.checked;
    base.additionalTestDto.depression = depressionApplicable
      ? (detail.depression?.none
          ? 'NO_SYMPTOMS'
          : detail.depression?.mild
            ? 'MILD'
            : detail.depression?.moderate
              ? 'MODERATE_SUSPECTED'
              : 'SEVERE_SUSPECTED')
      : 'NOT_APPLICABLE';

    // 인지기능
    const cognitiveApplicable = hasAdditional && !!detail.cognitive?.checked;
    base.additionalTestDto.cognitiveImpairment = cognitiveApplicable
      ? (detail.cognitive?.none ? 'NO_ABNORMALITY' : 'IMPAIRMENT_SUSPECTED')
      : 'NOT_APPLICABLE';

    // 골밀도
    const boneApplicable = hasAdditional && !!detail.bone?.checked;
    base.additionalTestDto.boneDensityStatus = boneApplicable
      ? (detail.bone?.normal
          ? 'NORMAL'
          : detail.bone?.osteopenia
            ? 'OSTEOPENIA'
            : detail.bone?.osteoporosis
              ? 'OSTEOPOROSIS'
              : 'NORMAL')
      : 'NOT_APPLICABLE';

    // 노인신체기능검사
    const seniorPhysicalApplicable = hasAdditional && !!detail.seniorPhysical?.checked;
    base.additionalTestDto.elderlyPhysicalFunctionStatus = seniorPhysicalApplicable
      ? (detail.seniorPhysical?.normal ? 'NORMAL' : 'DECLINED')
      : 'NOT_APPLICABLE';

    // 노인기능평가
    const seniorFunctionApplicable = hasAdditional && !!detail.seniorFunction?.checked;
    base.additionalTestDto.elderlyFunctionTest = {
      elderlyFunctionTest_applicability: seniorFunctionApplicable ? 'APPLICABLE' : 'NOT_APPLICABLE',
      fallRiskStatus: seniorFunctionApplicable
        ? (detail.seniorFunction?.fallRisknormal ? 'NORMAL' : 'HIGH_RISK')
        : 'NORMAL',
      dailyLifeStatus: seniorFunctionApplicable
        ? (detail.seniorFunction?.ADLnormal ? 'NORMAL' : 'NEEDS_ASSISTANCE')
        : 'NORMAL',
      vaccinationStatus: seniorFunctionApplicable
        ? (detail.seniorFunction?.vaccineInfluenza
            ? 'NEEDS_INFLUENZA'
            : detail.seniorFunction?.vaccinePneumonia
              ? 'NEEDS_PNEUMOCOCCAL'
              : 'NO_NEED')
        : 'NO_NEED',
      urinationDisorderStatus: seniorFunctionApplicable
        ? (detail.seniorFunction?.urinationNormal ? 'NORMAL' : 'SUSPECTED')
        : 'NORMAL',
    };

    return base;
  };

  // 필수 체크박스/세부옵션 검증
  const validateRequiredSelections = (): boolean => {
    const messages: string[] = [];


    // 추가검사 세부 옵션
    if (additionalExam === '해당') {
      const d = additionalExamDetail ?? {};
      if (d.hepatitis?.checked) {
        if (!d.hepatitis.antigenGeneral && !d.hepatitis.antigenDetail) {
          messages.push('B형 간염: 표면항원(일반/정밀)을 선택해주세요.');
        }
        if (!d.hepatitis.antibodyGeneral && !d.hepatitis.antibodyDetail) {
          messages.push('B형 간염: 표면항체(일반/정밀)을 선택해주세요.');
        }
        if (!d.hepatitis.hasAntibody && !d.hepatitis.noAntibody && !d.hepatitis.suspectCarrier && !d.hepatitis.judgement) {
          messages.push('B형 간염: 판정을 선택해주세요.');
        }
      }
      if (d.depression?.checked) {
        if (!d.depression.none && !d.depression.mild && !d.depression.moderate && !d.depression.severe) {
          messages.push('우울증: 상태를 선택해주세요.');
        }
      }
      if (d.cognitive?.checked) {
        if (!d.cognitive.none && !d.cognitive.suspect) {
          messages.push('인지기능장애: 상태를 선택해주세요.');
        }
      }
      if (d.bone?.checked) {
        if (!d.bone.normal && !d.bone.osteopenia && !d.bone.osteoporosis) {
          messages.push('골밀도검사: 상태를 선택해주세요.');
        }
      }
      if (d.seniorPhysical?.checked) {
        if (!d.seniorPhysical.normal && !d.seniorPhysical.low) {
          messages.push('노인신체기능검사: 상태를 선택해주세요.');
        }
      }
      if (d.seniorFunction?.checked) {
        const sf = d.seniorFunction;
        if (!sf.fallRisknormal && !sf.fallRiskSuspect) {
          messages.push('노인기능평가: 낙상 상태를 선택해주세요.');
        }
        if (!sf.ADLnormal && !sf.ADLSuspect) {
          messages.push('노인기능평가: 일상생활 수행능력을 선택해주세요.');
        }
        if (!sf.vaccineInfluenza && !sf.vaccinePneumonia && !sf.vaccineNone) {
          messages.push('노인기능평가: 예방접종을 선택해주세요.');
        }
        if (!sf.urinationNormal && !sf.urinationSuspect) {
          messages.push('노인기능평가: 배뇨장애를 선택해주세요.');
        }
      }
    }

    if (messages.length > 0) {
      alert('다음 항목을 선택해주세요:\n- ' + messages.join('\n- '));
      return false;
    }
    return true;
  };

  // 저장 버튼 클릭 핸들러
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRequiredSelections()) return;
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
      bmi
    ];
    if (requiredNumbers.some((v) => !v || isNaN(parseFloat(v)))) {
      alert('필수 검사 수치를 모두 입력해주세요.');
      return;
    }
    try {
      const payload = transformFormDataToAPI();
      console.log('HealthReport payload:', payload);
      const hasExisting = Boolean(reportResponse?.result);
      if (hasExisting) {
        await updateMutation.mutateAsync(payload);
      } else {
        await createHealthReport(payload);
        // 새 회차 저장 성공 시, 서버 카운트 최신화 (로컬 기준으로 보정)
        setServerRoundCount((prev) => Math.max(prev, Math.max(...rounds)));
      }
      openConfirm();
    } catch (error: any) {
      console.error('건강리포트 저장 실패:', error);
      console.error('API error response:', error?.response?.data);
      const apiMessage = error?.response?.data?.message || error?.message || '알 수 없는 오류';
      alert(`건강리포트 저장에 실패했습니다.\n사유: ${apiMessage}`);
    }
  };

  // 체크박스 다중 선택
  const handleLifestyle = (value: string) => {
    setLifestyle((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleSaveAndGoReport = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsGoReportConfirmOpen(true);
  };

  const handleConfirmGoReport = async () => {
    if (!validateRequiredSelections()) { setIsGoReportConfirmOpen(false); return; }
    if (!hospital.trim()) { alert('병원명을 입력해주세요.'); setIsGoReportConfirmOpen(false); return; }
    if (!date) { alert('검진일을 선택해주세요.'); setIsGoReportConfirmOpen(false); return; }
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
      setIsGoReportConfirmOpen(false);
      return;
    }
    try {
      const payload = transformFormDataToAPI();
      const hasExisting = Boolean(reportResponse?.result);
      if (hasExisting) {
        await updateMutation.mutateAsync(payload);
      } else {
        await createHealthReport(payload);
        setServerRoundCount((prev) => Math.max(prev, Math.max(...rounds)));
      }
      setIsGoReportConfirmOpen(false);
      navigate('/my-medical-report');
    } catch (error: any) {
      console.error('건강리포트 저장 후 이동 실패:', error);
      const apiMessage = error?.response?.data?.message || error?.message || '알 수 없는 오류';
      alert(`이동 중 오류가 발생했습니다.\n사유: ${apiMessage}`);
      setIsGoReportConfirmOpen(false);
    }
  };

  const handleCancelGoReport = () => {
    setIsGoReportConfirmOpen(false);
    navigate('/my-medical-report');
  };

  return (
    <form
      className='mx-auto px-4 bg-white min-h-screen max-w-[1300px]'
      onSubmit={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        if ((e as React.KeyboardEvent<HTMLFormElement>).key === 'Enter') {
          e.preventDefault();
        }
      }}
    >
      <fieldset disabled={isExpertViewingUser}>
      {/* 상단 타이틀/뒤로가기 */}
      <div className='relative flex items-center justify-center w-full py-8 my-8'>
        <button
          onClick={handleBack}
          className='absolute left-4 top-1/2 -translate-y-1/2 w-[17px] h-[35px] flex items-center justify-center z-10'
          aria-label='뒤로가기'
        >
          <img src={backSvg} alt='뒤로가기' className='w-full h-full object-contain' />
        </button>
        <h2 className='text-2xl font-bold text-center w-full'>건강검진결과 입력</h2>
      </div>

      {/* 회차 선택/추가/이전회차 보기 */}
      <div className='flex inline-flex items-center gap-2 mb-8'>
        <MyMedicalReportRoundSelector
          rounds={rounds}
          selectedRound={currentRound}
          onRoundChange={onSelectRound}
          onAddRound={onAddRound}
          onFilterClick={handleRoundFilterClick}
        />
      </div>

      <div className=' mb-8'>
        <div className='flex items-center gap-4 xl:gap-[0.9rem] mb-4 xl:mb-[0.9rem]'>
          <span className='text-[18px] font-medium text-[#121218] font-pretendard'>
            건강검진결과지업로드
          </span>
        </div>
        <FileUploadSection
          existingFiles={[]}
          onExistingFilesChange={() => {}}
          onNewImagesChange={() => {}}
          uploadFiles={async (files) => {
            // 1) S3 업로드 → URL 획득
            // 2) 첫 파일을 바로 파싱 API에도 전송 (서버가 파일 수신해 파싱)
            //    S3 URL은 보여주기/참고용으로 유지
            try {
              if (!files || files.length === 0) return [];
              setIsParsing(true);
              const s3UrlsRes = await (await import('../../apis/imageApi/image')).imageAPI.uploadImages(files);
              const urls = s3UrlsRes.result || [];
              // 동시에 첫 파일로 파싱 실행
              const parsed = await parseHealthReportImage(files[0]);
              const result = (parsed as any).result;
              if (result) {
                applyReportToForm(result as any);
              }
              return urls; // FileUploadSection이 새 파일 목록 표시를 위해 URL 반환
            } catch (e) {
              console.error('이미지 업로드/파싱 실패', e);
              alert('이미지 업로드/파싱에 실패했습니다. 다시 시도해주세요.');
              return [];
            } finally {
              setIsParsing(false);
            }
          }}
          accept='image/*,.pdf'
          allowMultiple
        />
      </div>

      {/* 검진일/검진장소 입력 */}
      <fieldset>
      <div className='flex items-center gap-8 mb-8'>
        <div className='flex items-center gap-2'>
          <label className='font-semibold text-base text-[18px] text-black mr-2'>검진일</label>
          <input
            type='date'
            className='rounded-[14px] border border-gray-200 px-6 py-2 text-base text-gray-700 focus:outline-none focus:border-[#82ABFD] transition w-[200px]'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className='flex items-center gap-2'>
          <label className='font-semibold text-base text-[18px] text-black mr-2'>검진장소</label>
          <input
            type='text'
            className='rounded-[14px] border border-gray-200 px-6 py-2 text-base text-gray-700 focus:outline-none focus:border-[#82ABFD] transition w-[200px]'
            placeholder='병원명을 입력하세요'
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
          />
        </div>
      </div>
      </fieldset>
      <FunLoadingOverlay isOpen={isParsing} messages={[]} />

      {/* 계측 검사 섹션 */}
      <fieldset>
      <div className='mb-10'>
        <div className='bg-[#DBE6FF] rounded-[14px] px-6 py-2 font-bold text-base mb-2'>
          계측 검사
        </div>
        <div className='space-y-6 bg-white rounded-[14px] p-6'>
          {/* 키 */}
          <div className='flex items-center mb-[24px]'>
            <label className='w-40 font-medium text-black text-[18px]'>키 (cm)</label>
            <input
              type='number'
              className='rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10'
              placeholder='cm'
              value={height}
              onChange={handleHeightChange}
            />
          </div>
          {/* 몸무게 */}
          <div className='flex items-center border-b-2 border-[#DBE6FF]'>
            <div className='flex items-center mb-[24px]'>
              <label className='w-40 font-medium text-black text-[18px]'>몸무게 (kg)</label>
              <input
                type='number'
                className='rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10'
                placeholder='kg'
                value={weight}
                onChange={handleWeightChange}
              />
            </div>
          </div>
          {/* BMI */}
          <div className='border-b-2 border-[#DBE6FF] mb-[24px]'>
            <div className='flex items-center mb-[24px]'>
              <label className='w-40 font-medium text-black text-[18px]'>BMI 체질량지수</label>
              <input
                type='number'
                className='rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10'
                placeholder='결과 자동 계산'
                value={bmi}
                onChange={(e) => setBmi(e.target.value)}
                readOnly
              />
            </div>
            <div className='flex gap-10 ml-50 mb-[24px]'>
              {['저체중', '정상', '과체중', '비만'].map((v) => (
                <CustomCheckboxButton
                  key={v}
                  checked={bmiType === v}
                  onClick={() => setBmiType(v as '저체중' | '정상' | '과체중' | '비만')}
                  label={v}
                />
              ))}
            </div>
          </div>
          {/* 허리둘레 */}
          <div className='border-b-2 border-[#DBE6FF]'>
            <div className='flex items-center mb-[24px]'>
              <label className='w-40 font-medium text-black text-[18px]'>허리둘레 (cm)</label>
              <input
                type='number'
                className='rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10'
                placeholder='cm'
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
              />
            </div>
            <div className='flex gap-10 ml-50 mb-[24px]'>
              {['정상', '복부비만'].map((v) => (
                <CustomCheckboxButton
                  key={v}
                  checked={waistType === v}
                  onClick={() => setWaistType(v as '정상' | '복부비만')}
                  label={v}
                />
              ))}
            </div>
          </div>
          {/* 시각이상 */}
          <div className='flex items-center'>
            <label className='w-40 text-black text-[18px] font-medium'>시각이상(좌/우)</label>
            <input
              type='text'
              className='rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10'
              placeholder='예) 0.9 / 0.8'
              value={vision}
              onChange={(e) => setVision(e.target.value)}
            />
          </div>
          {/* 청각이상 */}
          <div className='border-b-2 border-[#DBE6FF]'>
            <div className='flex items-start'>
              <label className='w-40 text-black text-[18px] font-medium mt-[10px]'>
                청각이상(좌/우)
              </label>
              <div className='flex-1 flex'>
                {/* 오른쪽 체크박스 영역 */}
                <div className='flex-1 flex flex-col gap-4'>
                  {/* 좌측 */}
                  <div className='flex items-center gap-4'>
                    <span className='text-[18px] text-gray-700 w-8 ml-10'>좌</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='4'
                      height='40'
                      viewBox='0 0 4 40'
                      fill='none'
                      className='mr-4 mt-[10px]'
                    >
                      <path
                        d='M2 2V38'
                        stroke='#DBE6FF'
                        strokeWidth='3'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeDasharray='6 6'
                      />
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
                  <div className='flex items-center gap-4 mb-[24px]'>
                    <span className='text-[18px] text-gray-700 w-8 ml-10'>우</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='4'
                      height='40'
                      viewBox='0 0 4 40'
                      fill='none'
                      className='mr-4'
                    >
                      <path
                        d='M2 2V38'
                        stroke='#DBE6FF'
                        strokeWidth='3'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeDasharray='6 6'
                      />
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
          <div className='flex items-center mb-2'>
            <label className='w-40 font-medium text-black text-[18px]'>혈압(mmHg)</label>
            <div className='flex gap-4 mb-[24px]'>
              <div className='flex items-center gap-2'>
                <span className='ml-10 text-[18px]'>수축기 혈압</span>
                <input
                  type='number'
                  className='rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10'
                  placeholder='120'
                  value={bpHigh}
                  onChange={(e) => setBpHigh(e.target.value)}
                />
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-[18px]'>이완기 혈압</span>
                <input
                  type='number'
                  className='rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10'
                  placeholder='80'
                  value={bpLow}
                  onChange={(e) => setBpLow(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2 ml-50'>
            <div className='flex gap-10 mb-[16px]'>
              {['정상', '유질환자'].map((v) => (
                <CustomCheckboxButton
                  key={v}
                  checked={bpType === v}
                  onClick={() => setBpType(v as '정상' | '유질환자')}
                  label={v}
                />
              ))}
            </div>
            <div className='mb-[16px]'>
              <CustomCheckboxButton
                key='고혈압 전단계(수축기 120-139 또는  이완기 80-89)'
                checked={bpType === '고혈압 전단계'}
                onClick={() => setBpType('고혈압 전단계')}
                label='고혈압 전단계(수축기 120-139 또는  이완기 80-89)'
              />
            </div>
            <div>
              <CustomCheckboxButton
                key='고혈압의심 (140이상) 또는 90이상'
                checked={bpType === '고혈압의심'}
                onClick={() => setBpType('고혈압의심')}
                label='고혈압의심 (140이상) 또는 90이상'
              />
            </div>
          </div>
        </div>
      </div>
      </fieldset>

      {/* 혈액 검사 섹션 */}
      <fieldset>
      <div className='mb-[24px]'>
        <div className='bg-[#DBE6FF] rounded-[14px] font-bold px-6 py-2 text-[18px] mb-[24px]'>
          혈액 검사
        </div>
        <div className='space-y-6 bg-white rounded-[14px] p-6'>
          {/* 혈색소 */}
          <div className='border-b-2 border-[#DBE6FF]'>
            <div className='flex items-center mb-[24px]'>
              <label className='w-40 font-medium text-black text-[18px]'>혈색소(g/dL)</label>
              <input
                type='number'
                className='rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10'
                placeholder='12.3'
                value={hemoglobin}
                onChange={(e) => setHemoglobin(e.target.value)}
              />
            </div>
            <div className='flex gap-10 ml-50 mb-[24px]'>
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
          <div className='border-b-2 border-[#DBE6FF]'>
            <div className='flex items-center mb-[24px]'>
              <label className='w-40 font-medium text-black text-[18px]'>공복혈당(mg/dL)</label>
              <input
                type='number'
                className='rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10'
                placeholder='85'
                value={fastingGlucose}
                onChange={(e) => setFastingGlucose(e.target.value)}
              />
            </div>
            <div className='flex gap-10 ml-50 mb-[24px]'>
              {['정상', '유질환자', '공복혈당장애 의심', '당뇨병 의심'].map((v) => (
                <CustomCheckboxButton
                  key={v}
                  checked={fastingGlucoseTypeLabel === v}
                  onClick={() =>
                    setFastingGlucoseTypeLabel(
                      v as '정상' | '유질환자' | '공복혈당장애 의심' | '당뇨병 의심',
                    )
                  }
                  label={v}
                />
              ))}
            </div>
          </div>
          {/* 지질 프로필 */}
          <div className='border-b-2 border-[#DBE6FF]'>
            <div className='flex items-start'>
              <div className='flex flex-col'>
                {/* 총 콜레스테롤 */}
                <div className='flex items-center mb-[24px]'>
                  <label className='w-40 font-medium text-black text-[18px]'>
                    총 콜레스테롤 (mg/dL)
                  </label>
                  <input
                    type='number'
                    className='rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10'
                    placeholder='0'
                    value={cholesterol}
                    onChange={(e) => setCholesterol(e.target.value)}
                  />
                </div>
                {/* HDL 콜레스테롤 */}
                <div className='flex items-center mb-[24px]'>
                  <label className='w-40 font-medium text-black text-[18px]'>
                    HDL-콜레스테롤(mg/dL)
                  </label>
                  <input
                    type='number'
                    className='rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10'
                    placeholder='0'
                    value={hdl}
                    onChange={(e) => setHdl(e.target.value)}
                  />
                </div>
                {/* 중성지방 */}
                <div className='flex items-center mb-[24px]'>
                  <label className='w-40 font-medium text-black text-[18px]'>
                    중성지방 (mg/dL)
                  </label>
                  <input
                    type='number'
                    className='rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10'
                    placeholder='0'
                    value={triglyceride}
                    onChange={(e) => setTriglyceride(e.target.value)}
                  />
                </div>
                {/* LDL 콜레스테롤 */}
                <div className='flex items-center'>
                  <label className='w-40 font-medium text-black text-[18px]'>
                    LDL-콜레스테롤(mg/dL)
                  </label>
                  <input
                    type='number'
                    className='rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10'
                    placeholder='0'
                    value={ldl}
                    onChange={(e) => setLdl(e.target.value)}
                  />
                </div>
              </div>
              {/* 세로 점선 */}
              <div className='w-8 flex flex-col items-center mx-4 mb-[24px]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='4'
                  height='268'
                  viewBox='0 0 4 268'
                  fill='none'
                >
                  <path
                    d='M2 2L2.00001 266'
                    stroke='#DBE6FF'
                    strokeWidth='3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeDasharray='6 6'
                  />
                </svg>
              </div>
              {/* 오른쪽 체크박스 영역 */}
              <div className='flex flex-col gap-8'>
                {[
                  '정상',
                  '고콜레스테롤혈증 의심',
                  '고중성지방혈증 의심',
                  '낮은 HDL 콜레스테롤 의심',
                  '유질환자',
                ].map((v) => (
                  <CustomCheckboxButton
                    key={v}
                    checked={lipidProfile === v}
                    onClick={() =>
                      setLipidProfile(
                        v as
                          | '정상'
                          | '고콜레스테롤혈증 의심'
                          | '고중성지방혈증 의심'
                          | '낮은 HDL 콜레스테롤 의심'
                          | '유질환자',
                      )
                    }
                    label={v}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* 신장기능 */}
          <div className='border-b-2 border-[#DBE6FF]'>
            <div className='flex items-start'>
              <div className='flex flex-col'>
                {/* 혈청 크레아티닌 */}
                <div className='flex items-center mb-[24px]'>
                  <label className='w-40 font-medium text-black text-[18px]'>혈청 크레아티닌</label>
                  <input
                    type='number'
                    className='rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10'
                    placeholder='1.2'
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                  />
                </div>
                {/* eGFR */}
                <div className='flex items-center mb-[24px]'>
                  <label className='w-40 font-medium text-black text-[18px]'>
                    eGFR(신사구체여과율)
                  </label>
                  <input
                    type='number'
                    className='rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10'
                    placeholder='72'
                    value={serumCreatinine}
                    onChange={(e) => setSerumCreatinine(e.target.value)}
                  />
                </div>
              </div>
              {/* 세로 점선 */}
              <div className='w-8 flex flex-col items-center mx-4 mb-[24px]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='4'
                  height='120'
                  viewBox='0 0 4 120'
                  fill='none'
                >
                  <path
                    d='M2 2L2.00001 118'
                    stroke='#DBE6FF'
                    strokeWidth='3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeDasharray='6 6'
                  />
                </svg>
              </div>
              {/* 오른쪽 체크박스 영역 */}
              <div className='flex flex-col gap-6 mt-5'>
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
          <div className='flex items-start'>
            <div className='flex flex-col'>
              {/* AST(SGOT) */}
              <div className='flex items-center mb-[24px]'>
                <label className='w-40 font-medium text-black text-[18px]'>AST(SGOT)</label>
                <input
                  type='number'
                  className='rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10'
                  placeholder='25'
                  value={ast}
                  onChange={(e) => setAst(e.target.value)}
                />
              </div>
              {/* ALT(SGPT) */}
              <div className='flex items-center mb-[24px]'>
                <label className='w-40 font-medium text-black text-[18px]'>ALT(SGPT)</label>
                <input
                  type='number'
                  className='rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10'
                  placeholder='25'
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                />
              </div>
              {/* 감마-GTP(Y-GTP) */}
              <div className='flex items-center mb-[24px]'>
                <label className='w-40 font-medium text-black text-[18px]'>감마-GTP(Y-GTP)</label>
                <input
                  type='number'
                  className='rounded-[14px] border border-gray-300 px-4 py-2 h-[48px] w-[200px] ml-10'
                  placeholder='30'
                  value={gammaGtp}
                  onChange={(e) => setGammaGtp(e.target.value)}
                />
              </div>
            </div>
            {/* 세로 점선 */}
            <div className='w-8 flex flex-col items-center mx-4 mb-[24px]'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='4'
                height='180'
                viewBox='0 0 4 180'
                fill='none'
              >
                <path
                  d='M2 2L2.00001 178'
                  stroke='#DBE6FF'
                  strokeWidth='3'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeDasharray='6 6'
                />
              </svg>
            </div>
            {/* 오른쪽 체크박스 영역 */}
            <div className='flex flex-col gap-6 mt-10'>
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
      </fieldset>

      {/* 요검사 섹션 */}
      <fieldset>
      <div className='mb-3'>
        <div className='bg-[#DBE6FF] rounded-[14px] px-6 py-2 font-bold text-base mb-3'>요검사</div>
        <div className='bg-white rounded-[14px] p-6'>
          {/* 요단백 */}
          <div className='flex items-center mb-2'>
            <label className='w-40 font-medium text-black text-[18px]'>요단백</label>
            <div className='flex gap-10 ml-15'>
              {['정상', '경계', '단백뇨의심'].map((v) => (
                <CustomCheckboxButton
                  key={v}
                  checked={urineProteinType === v}
                  onClick={() => setUrineProteinType(v as '정상' | '경계' | '요단백 의심')}
                  label={v}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      </fieldset>

      {/* 영상검사 섹션 */}
      <fieldset>
      <div className='mb-3'>
        <div className='bg-[#DBE6FF] rounded-[14px] px-6 py-2 font-bold text-base mb-3'>
          영상검사
        </div>
        <div className='bg-white rounded-[14px] p-6'>
          {/* 흉부촬영 */}
          <div className='flex items-center mb-2'>
            <label className='w-40 font-medium text-black text-[18px]'>흉부촬영</label>
            <div className='flex gap-10 ml-15'>
              {['정상', '비활동성 폐결핵', '질환의심', '기타'].map((v) => (
                <CustomCheckboxButton
                  key={v}
                  checked={chestXray === v}
                  onClick={() =>
                    setChestXray(v as '정상' | '비활동성 폐결핵' | '질환의심' | '기타')
                  }
                  label={v}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      </fieldset>

      {/* 진찰(문진) 섹션 */}
      <fieldset>
      <div className='mb-3'>
        <div className='bg-[#DBE6FF] rounded-[14px] px-6 py-2 font-bold text-base mb-3'>
          진찰(문진)
        </div>
        <div className='bg-white rounded-[14px] p-6'>
          {/* 과거병력 */}
          <div className='flex items-center mb-10'>
            <label className='w-40 font-medium text-black text-[18px]'>과거병력</label>
            <div className='flex gap-10 ml-15'>
              {['유', '무'].map((v) => (
                <CustomCheckboxButton
                  key={v}
                  checked={history === v}
                  onClick={() => setHistory(v)}
                  label={v}
                />
              ))}
            </div>
          </div>
          {/* 약물치료 */}
          <div className='flex items-center mb-10'>
            <label className='w-40 font-medium text-black text-[18px]'>약물치료</label>
            <div className='flex gap-10 ml-15'>
              {['유', '무'].map((v) => (
                <CustomCheckboxButton
                  key={v}
                  checked={medication === v}
                  onClick={() => setMedication(v)}
                  label={v}
                />
              ))}
            </div>
          </div>
          {/* 생활습관 */}
          <div className='flex items-center mb-7'>
            <label className='w-40 font-medium text-black text-[18px]'>생활습관</label>
            <div className='flex gap-10 ml-15'>
              {['금연 필요', '절주 필요', '신체활동 필요', '근력운동 필요'].map((v) => (
                <CustomCheckboxButton
                  key={v}
                  checked={lifestyle.includes(v)}
                  onClick={() => handleLifestyle(v)}
                  label={v}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      </fieldset>

      {/* 추가검사 */}
      <AdditionalExamSection
        value={additionalExam}
        onChange={setAdditionalExam}
        detail={additionalExamDetail}
        setDetail={setAdditionalExamDetail}
      />

      {/* 저장 버튼 */}
      {!isExpertViewingUser && (
      <div className='flex justify-center mt-12 gap-[200px]'>
        <button
          type='submit'
          className='w-[300px] h-[72px] bg-[#FFF] text-black rounded-[60px] text-[24px] font-semibold shadow-[0_0_6px_4px_rgba(29,104,255,0.10)] transition'
          onClick={handleSave}
        >
          {reportResponse?.result ? '저장하기' : '저장하기'}
        </button>
        <button
          className='flex h-[72px] px-20 py-5 justify-center items-center gap-[10px] rounded-[60px] bg-[#1D68FF] text-white text-center font-pretendard text-[24px] font-semibold leading-[36px] tracking-[-0.72px]'
          onClick={handleSaveAndGoReport}
        >
          마이메디컬리포트로 확인하기
        </button>

      </div>
      )}
      </fieldset>
      {/* 저장 완료 확인 모달 */}
      <SuccessModal
        isOpen={isConfirmOpen}
        onClose={handleCloseConfirm}
        message="건강리포트가 저장되었습니다"
      />
      {/* 이동 확인 모달 */}
      <ConfirmModal
        isOpen={isGoReportConfirmOpen}
        onClose={handleCancelGoReport}
        onConfirm={handleConfirmGoReport}
        onCancel={handleCancelGoReport}
      />
    </form>
  );
};

export default HealthCheckupForm;
