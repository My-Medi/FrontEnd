import ExpertAdvice from "../../components/patientsMyHome/ExpertAdvice";
import MyConstantMedical from "../../components/patientsMyHome/MyConstantMedical";
import PatientInfoSection from "../../components/patientsMyHome/ProfileInfo";
//import type { HealthStatus } from "../../constants/healthStatus";

export default function MyHome() {
  //const userStatus: HealthStatus = "정상";
  return (
    <div>
      <div className="max-w-[1280px] mx-auto px-4 py-8">
        <PatientInfoSection
          nickname="하나"
          name="김민지"
          age={23}
          height={168}
          weight={52}
          checkupCount={2}
        />
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[1398px] h-[2px] bg-[#DBE6FF]" />
      </div>
      <div className="px-[clamp(16px,3vw,40px)] py-[clamp(16px,3vw,40px)]">
        <div className="flex flex-col gap-[clamp(8px,1.5vw,32px)]">
          <MyConstantMedical status="안심" nickname="하나" />
          <ExpertAdvice adviceText="하루 1시간 이상 걷기, 추천 운동법으로 혈당 수치를 낮춰보세요!" />
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[clamp(300px,90vw,1398px)] h-[2px] bg-[#DBE6FF]" />
      </div>
    </div>
  );
}
