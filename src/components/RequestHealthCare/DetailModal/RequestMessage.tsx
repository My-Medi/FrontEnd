import QuoteOpen from '/src/assets/quoteopen.svg';
import QuoteClose from '/src/assets/quoteclose.svg';

interface RequestMessageProps {
  message: string;
}

const RequestMessage: React.FC<RequestMessageProps> = ({ message }) => (
  <div className='flex items-start max-w-[550px] text-[#1D68FF] text-[16px] justify-center items-center leading-[22px] tracking-[-0.48px] font-semibold'>
    <img src={QuoteOpen} alt='quote open' className='w-[21px] h-[36px] mr-[34px]' />
    <pre className='whitespace-pre-line gap-[32px] font-[Pretendard] text-center'>{message}</pre>
    <img src={QuoteClose} alt='quote close' className='w-[21px] h-[36px] ml-[34px]' />
  </div>
);

export default RequestMessage;
