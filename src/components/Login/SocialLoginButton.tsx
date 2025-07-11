import React from "react";

interface SocialLoginButtonProps {
  icon: string;
  text: string;
  alt: string;
}

const SocialLoginButton = ({ icon, text, alt }: SocialLoginButtonProps) => {
  return (
    <button className="flex items-center justify-center w-full h-[88px] bg-[#EDF0F3] rounded-[60px] gap-x-7">
      <img src={icon} alt={alt} className="w-10 h-10" />
      <span className="text-[30px] font-medium text-[#4D5053]">{text}</span>
    </button>
  );
};

export default SocialLoginButton; 