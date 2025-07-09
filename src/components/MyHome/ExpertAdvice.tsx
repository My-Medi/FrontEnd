interface Props {
    adviceText: string;
  }
  
  const ExpertAdvice: React.FC<Props> = ({ adviceText }) => {
    return (
      <section className="w-full max-w-[1980px] mx-auto p-4 lg:py-[38px] lg:space-y-[28px] lg:mt-[10px]">
        {/* 제목 */}
        <h2 className="font-medium text-xl text-[#121218] mb-4 lg:text-[24px] lg:mt-[-38px]">
          전문가 한마디
        </h2>
        {/* 카드 + 링크 한 줄 수평 정렬 */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center lg:mt-[-15px] lg:mb-[6px]">
          {/* 전문가 조언 텍스트 부분 */}
          <div
            className="flex items-center justify-center
            rounded-lg px-4 py-3 border w-full h-auto
            lg:rounded-[20px] lg:px-[40px]
            lg:py-[10px] lg:w-[960px]
            lg:h-[100px] lg:mr-[24px]"
            style={{
              borderColor: "#82ABFD",
            }}
          >
            <p className="font-semibold text-base leading-tight lg:font-pretendard lg:text-[24px] lg:leading-[140%]">
              {adviceText}
            </p>
          </div>
  
          {/* 오른쪽 링크 */}
          <a
            href="#"
            className="text-base text-[#1D68FF] hover:underline mt-4 self-end 
                       lg:whitespace-nowrap lg:text-[20px] lg:ml-[20px] lg:mt-[73px]"
          >
            매칭된 전문가 보기 &gt;
          </a>
        </div>
      </section>
    );
  };
  
  export default ExpertAdvice;