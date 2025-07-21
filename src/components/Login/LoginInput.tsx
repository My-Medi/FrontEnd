import React from "react";

interface LoginInputProps {
  label: string;
  type: string;
  id: string;
  name: string;
  placeholder: string;
  errorMessage?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginInput = ({
  label,
  type,
  id,
  name,
  placeholder,
  errorMessage,
  value,
  onChange,
}: LoginInputProps) => {
  return (
    <div className="flex flex-col gap-2 w-[385.2px]">
      <label
        htmlFor={id}
        className="text-[16px] font-semibold text-[#121218] px-1 leading-[1.4] tracking-[-3%]"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          name={name}
          className="w-[385.2px] h-12 px-5 text-[14px] border border-[#9DA0A3] rounded-xl placeholder:text-[#9DA0A3] focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium leading-[1.714] tracking-[-3%]"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {errorMessage && (
          <p className="text-[12px] text-[#75787B] mt-1 px-1 leading-[1.1] tracking-[1%] font-normal">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginInput; 