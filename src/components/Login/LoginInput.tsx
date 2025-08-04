import React, { forwardRef } from "react";

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

const LoginInput = forwardRef<HTMLInputElement, LoginInputProps>(
  ({
    label,
    type,
    id,
    name,
    placeholder,
    errorMessage,
    value,
    onChange,
  }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full max-w-[24rem] xl:w-[24rem] md:w-full sm:w-full">
        <label
          htmlFor={id}
          className="text-base xl:text-base md:text-sm sm:text-sm font-semibold text-[#121218] px-1 leading-[1.4] tracking-[-3%]"
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            type={type}
            id={id}
            name={name}
            className="w-full h-12 xl:h-12 md:h-11 sm:h-10 px-4 xl:px-5 md:px-4 sm:px-3 text-sm xl:text-sm md:text-sm sm:text-xs border border-[#9DA0A3] rounded-xl placeholder:text-[#9DA0A3] focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium leading-[1.714] tracking-[-3%]"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          {errorMessage && (
            <p className="text-xs xl:text-xs md:text-xs sm:text-xs text-[#75787B] mt-1 px-1 leading-[1.1] tracking-[1%] font-normal">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    );
  }
);

export default LoginInput; 