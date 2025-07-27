interface RequestMessageProps {
  message: string;
}

const requestMessage: React.FC<RequestMessageProps> = ({ message }) => (
  <blockquote className='text-[#1D68FF] font-[Pretendard] text-[16px] justify-center items-center leading-[22px] tracking-[-0.48px] font-semibold'>
    {message}
  </blockquote>
);

export default requestMessage;
