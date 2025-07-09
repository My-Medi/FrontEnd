interface Props {
    adviceText: string;
  }
  
  const ExpertAdvice: React.FC<Props> = ({ adviceText }) => {
    return (
      <section className="w-full max-w-[1980px] mx-auto p-4 lg:py-[2vw] lg:space-y-[1.5vw] lg:mt-[0.5vw] lg:ml-[-[calc(73*100vw/1920)]]">
        {/* 제목 */}
        <h2 className="font-medium text-xl text-[#121218] mb-4 lg:text-[clamp(16px,1.25vw,24px)] lg:mt-[-2vw]">
          전문가 한마디
        </h2>
        {/* 카드 + 링크 한 줄 수평 정렬 */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center lg:mt-[-0.8vw] lg:mb-[0.3vw]">
          {/* 전문가 조언 텍스트 부분 */}
          <div
            className="flex items-center justify-center
            rounded-lg px-4 py-3 border w-full h-auto
            lg:rounded-[clamp(8px,1vw,20px)] lg:px-[clamp(16px,2vw,24px)]
            lg:py-[clamp(12px,1.5vw,16px)] lg:w-[clamp(300px,50vw,960px)]
            lg:h-[clamp(60px,6vw,100px)] lg:mr-[clamp(8px,1.5vw,24px)]"
            style={{
              borderColor: "#82ABFD",
            }}
          >
            <p className="font-semibold text-base leading-tight lg:font-pretendard lg:text-[clamp(8px,1.2vw,24px)] lg:leading-[140%]">
              {adviceText}
            </p>
          </div>
  
          {/* 오른쪽 링크 */}
          <a
            href="#"
            className="text-base text-[#1D68FF] hover:underline mt-4 self-end 
                       lg:whitespace-nowrap lg:text-[clamp(10px,0.9vw,20px)] lg:ml-[clamp(5px,1vw,20px)] lg:mt-[3.8vw]"
          >
            매칭된 전문가 보기 &gt;
          </a>
        </div>
      </section>
    );
  };
  
  export default ExpertAdvice;