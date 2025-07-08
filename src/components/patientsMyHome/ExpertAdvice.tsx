interface Props {
  adviceText: string;
}

const ExpertAdvice: React.FC<Props> = ({ adviceText }) => {
  return (
    <section className="w-full max-w-[1980px] mx-auto px-[1.5vw] py-[-25vw] space-y-[1.5vw] ml-[-3.5vw] mt-[0.5vw]">
      {/* 제목 */}
      <h2 className="font-pretendard font-medium text-[clamp(16px,1.25vw,24px)] text-[#121218] mt-[-2vw]">
        등록된 전문가의 조언!
      </h2>
      {/* 카드 + 링크 한 줄 수평 정렬 */}
      <div className="flex justify-between items-center mt-[-0.8vw] mb-[0.3vw]">
        {/* 전문가 조언 텍스트 부분 */}
        <div
          className="flex items-center justify-center
          rounded-[clamp(8px,1vw,20px)] px-[clamp(16px,2vw,24px)]
          py-[clamp(12px,1.5vw,16px)] border w-[clamp(300px,50vw,960px)]
          h-[clamp(60px,6vw,100px)] mr-[clamp(8px,1.5vw,24px)]"
          style={{
            borderColor: "#82ABFD",
          }}
        >
          <p className="font-pretendard font-semibold text-[clamp(8px,1.2vw,24px)] leading-[140%]">
            {adviceText}
          </p>
        </div>

        {/* 오른쪽 링크 */}
        <a
          href="#"
          className="text-[clamp(10px,0.9vw,20px)] text-[#1D68FF] font-pretendard whitespace-nowrap hover:underline ml-[clamp(5px,1vw,20px)] mt-[3.8vw] mr-[-5vw]"
        >
          매칭된 전문가 보기 &gt;
        </a>
      </div>
    </section>
  );
};

export default ExpertAdvice;
