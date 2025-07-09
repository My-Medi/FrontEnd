import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import StepSelector from "../components/SignUp/StepSelector";

const SignUp: React.FC = () => {
  const [selected, setSelected] = useState<"personal" | "expert" | null>("personal");

  return (
    <div className="flex flex-col items-center justify-center min-h-[10vh] w-full">
      <div className="mt-20 relative w-full mb-30 flex items-center justify-center">
        <button type="button" className="absolute left-[184px]">
          <FiChevronLeft size={50} className="text-gray-400" />
        </button>
        <h2 className="text-2xl font-bold">마이메디 회원가입</h2>
      </div>
      <StepSelector selected={selected} setSelected={setSelected} onSubmit={() => {}} />

    </div>
  );
};

export default SignUp;
