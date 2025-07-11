import React from "react";

interface SocialLoginButtonProps {
  icon: string;
  text: string;
  alt: string;
}

const SocialLoginButton = ({ icon, text, alt }: SocialLoginButtonProps) => {
  return (
    <button className="flex items-center justify-center w-full h-22.5 bg-[#EDF0F3] rounded-full gap-x-7">
      <img src={icon} alt={alt} className="w-10 h-10" />
      <span className="text-3xl font-medium text-[#4D5053]">{text}</span>
    </button>
  );
};

export default SocialLoginButton; 