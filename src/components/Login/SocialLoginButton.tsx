interface SocialLoginButtonProps {
  icon: string;
  text: string;
  alt: string;
}

const SocialLoginButton = ({ icon, text, alt }: SocialLoginButtonProps) => {
  return (
    <button className="flex items-center justify-center w-[385.2px] h-[52.8px] bg-white border border-[#DBE6FF] rounded-full gap-x-4 px-[60px] py-[9px]">
      <img src={icon} alt={alt} className="w-6 h-6" />
      <span className="text-[16px] font-semibold text-[#4D5053] leading-[1.4] tracking-[-3%]">{text}</span>
    </button>
  );
};

export default SocialLoginButton; 