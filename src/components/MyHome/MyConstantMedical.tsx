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
      <section className="w-full max-w-[1980px] mx-auto p-4 lg:py-[38px] lg:space-y-[28px] lg:mt-[10px]">
        {/* 제목 */}
        <h2 className="font-medium text-xl text-[#121218] mb-4 lg:text-[24px] lg:mt-[-38px]">
          내 건강은 지금!
        </h2>
  
        {/* 카드 + 링크 한 줄 수평 정렬 */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center lg:mt-[-15px]">
          {/* 건강 카드부분 */}
          <div
            className="flex items-center gap-4 rounded-lg px-4 py-3 border w-full h-auto
                       lg:gap-[38px] lg:rounded-[20px] lg:px-[40px] lg:py-[10px] lg:w-[960px] lg:h-[100px]"
            style={{
              backgroundColor: current.bgColor,
              borderColor: current.borderColor,
            }}
          >
            {/* svg 이미지와 + 설명 */}
            <div className="flex items-center gap-4 lg:gap-[38px]">
              {/* svg이미지 */}
              <img
                src={current.iconPath}
                alt={`${status} 아이콘`}
                className="w-12 h-12 lg:w-[77px] lg:h-[65px] lg:ml-[10px]"
              />
  
              {/* 세로선 */}
              <div
                className="w-px h-12 lg:w-[1px] lg:h-[75px]"
                style={{ backgroundColor: current.borderColor }}
              />
  
              {/* 설명 텍스트 */}
              <p
                className="font-semibold text-base leading-tight lg:text-[24px] lg:leading-[140%]"
                style={{ color: current.textColor }}
              >
                {current.message(nickname)}
              </p>
            </div>
          </div>
  
          {/* 오른쪽 링크 */}
          <a
            href="#"
            className="text-base text-[#1D68FF] hover:underline mt-4 self-end lg:whitespace-nowrap lg:text-[20px] lg:mt-[73px]"
          >
            마이 메디컬 리포트로 알아보기 &gt;
          </a>
        </div>
      </section>
    );
  };
  
  export default MyConstantMedical;