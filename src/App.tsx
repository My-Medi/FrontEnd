import MyConstantMedical from "./components/patientsMyHome/MyConstantMedical";
import PatientInfoSection from "./components/patientsMyHome/ProfileInfo";

function App() {
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
      <div className="p-10">
        <MyConstantMedical status="정상" nickname="하나" />
      </div>
    </div>
  );
}

export default App;
