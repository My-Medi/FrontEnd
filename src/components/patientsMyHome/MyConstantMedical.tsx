import type { HealthStatus } from "../../constants/healthStatus";
import { healthStatusMap } from "../../constants/healthStatus";

interface Props {
  status: HealthStatus;
  nickname: string;
}

const MyConstantMedical: React.FC<Props> = ({ status, nickname }) => {
  const current = healthStatusMap[status];

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 py-6 space-y-4">
      {/* 제목 부분 */}
      <h2 className="font-pretendard font-medium text-[20px] md:text-[24px] text-[#121218]">
        내 건강은 지금!
      </h2>

      {/* 건강 카트 디자인 전체 */}
      <div
        className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-[38px] rounded-xl px-6 py-4 border"
        style={{
          backgroundColor: current.bgColor,
          borderColor: current.borderColor,
        }}
      >
        {/* 좌측: svg + 설명 */}
        <div className="flex items-start lg:items-center gap-4 lg:gap-[38px] flex-1">
          {/* 건강 svg 부분 */}
          <img
            src={current.iconPath}
            alt={`${status} 아이콘`}
            className="w-[60px] h-[60px] lg:w-[77px] lg:h-[65px]"
          />

          {/* 세로선 : borderline -> borderColor로 사용 */}
          <div
            className="w-[3px] h-[75.5px]"
            style={{ backgroundColor: current.borderColor }}
          />

          {/* 텍스트 부분: ~님의 건강은 ~~ */}
          <p
            className="font-pretendard font-semibold text-[16px] md:text-[18px] lg:text-[20px] leading-[140%]"
            style={{ color: current.textColor }}
          >
            {current.message(nickname)}
          </p>
        </div>

        {/* 마이 메디컬 리포트로 가는 링크 */}
        <a
          href="#"
          className="text-sm md:text-base text-[#1D68FF] font-pretendard mt-auto self-end whitespace-nowrap"
        >
          마이 메디컬 리포트로 알아보기 &gt;
        </a>
      </div>
    </section>
  );
};

export default MyConstantMedical;
