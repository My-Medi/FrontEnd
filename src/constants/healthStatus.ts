import dangerIcon from "@/assets/health-icons/danger-face.svg";
import cautionIcon from "@/assets/health-icons/caution-face.svg";
import interestIcon from "@/assets/health-icons/interest-face.svg";
import normalIcon from "@/assets/health-icons/normal-face.svg";
import safeIcon from "@/assets/health-icons/safe-face.svg";

export type HealthStatus = "위험" | "주의" | "관심" | "정상" | "안심";

export const healthStatusMap: Record<
  HealthStatus,
  {
    iconPath: string;
    bgColor: string;
    borderColor: string;
    textColor: string;
    message: (nickname: string) => string;
  }
> = {
  위험: {
    iconPath: dangerIcon,
    bgColor: "#FEEEEE", // ED5151 10%
    borderColor: "#ED5151",
    textColor: "#4D5053",
    message: (nickname) =>
      `${nickname}님의 건강은 현재 위험단계입니다! 병원을 방문해보세요!`,
  },
  주의: {
    iconPath: cautionIcon,
    bgColor: "#FFF1EA", //#FF732D 10%
    borderColor: "#FF732D",
    textColor: "#4D5053",
    message: (nickname) =>
      `${nickname}님의 건강은 현재 주의단계입니다! 안 좋은 곳이 있으시군요!`,
  },
  관심: {
    iconPath: interestIcon,
    bgColor: "#FFF8E5", //#FFCC00 10%
    borderColor: "#FFCC00",
    textColor: "#4D5053",
    message: (nickname) =>
      `${nickname}님의 건강은 현재 관심단계입니다! 건강에 조금 더 관심을 가져보세요!`,
  },
  정상: {
    iconPath: normalIcon,
    bgColor: "#F5FDF3", //#AlF68E 10%
    borderColor: "#A1F68E",
    textColor: "#4D5053",
    message: (nickname) =>
      `${nickname}님의 건강은 현재 정상단계입니다! 안심단계를 위해 관리해보세요!`,
  },
  안심: {
    iconPath: safeIcon,
    bgColor: "#EAF1FF", //#247CFF 10%
    borderColor: "#247CFF",
    textColor: "#4D5053",
    message: (nickname) =>
      `${nickname}님의 건강은 현재 안심단계입니다! 꾸준히 유지해보세요!`,
  },
};
