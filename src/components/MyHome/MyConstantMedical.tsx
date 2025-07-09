import {
    healthStatusMap,
    type HealthStatus,
  } from "../../constants/healthStatus";
  
  interface Props {
    status: HealthStatus;
    nickname: string;
  }
  
  const MyConstantMedical: React.FC<Props> = ({ status, nickname }) => {
    const current = healthStatusMap[status];
  
    return (
      <section className="w-full max-w-[1980px] mx-auto p-4 lg:py-[2vw] lg:space-y-[1.5vw] lg:mt-[0.5vw] lg:ml-[-[calc(73*100vw/1920)]]">
        {/* 제목 */}
        <h2 className="font-medium text-xl text-[#121218] mb-4 lg:text-[clamp(16px,1.25vw,24px)] lg:mt-[-2vw]">
          내 건강은 지금!
        </h2>
  
        {/* 카드 + 링크 한 줄 수평 정렬 */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center lg:mt-[-0.8vw]">
          {/* 건강 카드부분 */}
          <div
            className="flex items-center gap-4 rounded-lg px-4 py-3 border w-full h-auto
                       lg:gap-[clamp(12px,2vw,38px)] lg:rounded-[clamp(8px,1vw,20px)] lg:px-[clamp(16px,2vw,24px)] lg:py-[clamp(12px,1.5vw,16px)] lg:w-[clamp(300px,50vw,960px)] lg:h-[clamp(60px,6vw,100px)]"
            style={{
              backgroundColor: current.bgColor,
              borderColor: current.borderColor,
            }}
          >
            {/* svg 이미지와 + 설명 */}
            <div className="flex items-center gap-4 lg:gap-[clamp(12px,2vw,38px)]">
              {/* svg이미지 */}
              <img
                src={current.iconPath}
                alt={`${status} 아이콘`}
                className="w-12 h-12 lg:w-[clamp(40px,4.5vw,77px)] lg:h-[clamp(40px,4vw,65px)] lg:ml-[clamp(4px,0.5vw,16px)]"
              />
  
              {/* 세로선 */}
              <div
                className="w-px h-12 lg:w-[0.1vw] lg:h-[clamp(40px,4.3vw,75.5px)]"
                style={{ backgroundColor: current.borderColor }}
              />
  
              {/* 설명 텍스트 */}
              <p
                className="font-semibold text-base leading-tight lg:text-[clamp(8px,1.2vw,24px)] lg:leading-[140%]"
                style={{ color: current.textColor }}
              >
                {current.message(nickname)}
              </p>
            </div>
          </div>
  
          {/* 오른쪽 링크 */}
          <a
            href="#"
            className="text-base text-[#1D68FF] hover:underline mt-4 self-end lg:whitespace-nowrap lg:text-[clamp(10px,0.9vw,20px)] lg:mt-[3.8vw]"
          >
            마이 메디컬 리포트로 알아보기 &gt;
          </a>
        </div>
      </section>
    );
  };
  
  export default MyConstantMedical;