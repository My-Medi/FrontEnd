import QuoteOpen from '/src/assets/quoteopen.svg';
import QuoteClose from '/src/assets/quoteclose.svg';

interface RequestMessageProps {
  message: string;
}

const RequestMessage: React.FC<RequestMessageProps> = ({ message }) => (
  <>
    {/* 데스크탑 UI */}
    <div className='hidden lg:flex items-start max-w-[550px] text-[#1D68FF] text-[16px] justify-center leading-[22px] tracking-[-0.48px] font-semibold'>
      <img src={QuoteOpen} alt='quote open' className='w-[21px] h-[36px] mr-[34px]' />
      <pre className='whitespace-pre-line font-[Pretendard] text-center'>{message}</pre>
      <img src={QuoteClose} alt='quote close' className='w-[21px] h-[36px] ml-[34px]' />
    </div>

    {/* 모바일 UI */}
    <div className='lg:hidden gap-[30px] flex items-center px-4 text-[#1D68FF] text-[14px] leading-[20px] tracking-[-0.4px] font-semibold font-[Pretendard]'>
      <img src={QuoteOpen} alt='quote open' className='w-[16px] h-[28px]' />
      <pre className='whitespace-pre-line text-center font-[Pretendard]'>{message}</pre>
      <img src={QuoteClose} alt='quote close' className='w-[16px] h-[28px]' />
    </div>
  </>
);

export default RequestMessage;
