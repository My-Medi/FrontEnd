// import "./App.css";

import MyConstantMedical from "./components/patientsMyHome/MyConstantMedical";
import PatientInfoSection from "./components/patientsMyHome/ProfileInfo";
//import type { HealthStatus } from "./constants/healthStatus";

// function App() {
//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-100">
//       <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded shadow">
//         Tailwind 작동 테스트
//       </button>
//     </div>
//   );
// }

function App() {
  //  const userStatus: HealthStatus = "정상";
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
      <div className="p-10">
        <MyConstantMedical status="관심" nickname="하나" />
      </div>
    </div>
  );
}

export default App;
