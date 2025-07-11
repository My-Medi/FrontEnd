import React from "react";

interface LoginInputProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  errorMessage?: string;
}

const LoginInput = ({
  label,
  type,
  id,
  placeholder,
  errorMessage,
}: LoginInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-2xl font-medium text-[#25282B] px-2"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          className="w-full h-20 px-7 text-xl border border-[#75787B] rounded-2xl placeholder:text-[#9DA0A3] focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
        />
        {errorMessage && (
          <p className="mt-2 ml-2 text-xl text-[#75787B]">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default LoginInput; 