import { useMemo, useState } from "react";
import * as S from "./PortfolioForm.styles";

const DAILY_OPTIONS = [
  { key: "under1h", label: "1시간 이하" },
  { key: "1to3h", label: "1 - 3시간" },
  { key: "over3h", label: "3시간 이상" },
] as const;

const WEEKLY_OPTIONS = [
  { key: "under10h", label: "10시간 이하" },
  { key: "10to20h", label: "10 - 20시간" },
  { key: "over20h", label: "20시간 이상" },
] as const;

type Part = "PM" | "디자인" | "프론트엔드" | "백엔드";

interface PartConfig {
  title: string;
  experiencePlaceholder: string[];
  strengthsPlaceholder: string;
}

const PART_CONFIGS: Record<Part, PartConfig> = {
  PM: {
    title: "PM 포트폴리오",
    experiencePlaceholder: [
      "프로젝트 / 회사명, 담당 역할, 기간 등을 자유롭게 작성해주세요.",
      "예시) 2024.03 ~ 2024.06 / 스타트업 A / 제품 기획 및 지표 관리",
    ],
    strengthsPlaceholder:
      "PM으로서의 강점을 사례 중심으로 적어보세요. (ex. 리서치, 문서화, 이해관계자 조율 등)",
  },
  디자인: {
    title: "디자인 포트폴리오",
    experiencePlaceholder: [
      "프로젝트 / 회사명, 담당 역할, 기간 등을 자유롭게 작성해주세요.",
      "예시) 2024.03 ~ 2024.06 / 스타트업 A / UI/UX 디자인",
    ],
    strengthsPlaceholder:
      "디자이너로서의 강점을 사례 중심으로 적어보세요. (ex. 사용자 리서치, 프로토타이핑, 디자인 시스템 구축 등)",
  },
  프론트엔드: {
    title: "프론트엔드 포트폴리오",
    experiencePlaceholder: [
      "프로젝트 / 회사명, 담당 역할, 기간 등을 자유롭게 작성해주세요.",
      "예시) 2024.03 ~ 2024.06 / 스타트업 A / React 기반 웹 애플리케이션 개발",
    ],
    strengthsPlaceholder:
      "프론트엔드 개발자로서의 강점을 사례 중심으로 적어보세요. (ex. React, TypeScript, 상태관리, 성능 최적화 등)",
  },
  백엔드: {
    title: "백엔드 포트폴리오",
    experiencePlaceholder: [
      "프로젝트 / 회사명, 담당 역할, 기간 등을 자유롭게 작성해주세요.",
      "예시) 2024.03 ~ 2024.06 / 스타트업 A / RESTful API 개발 및 데이터베이스 설계",
    ],
    strengthsPlaceholder:
      "백엔드 개발자로서의 강점을 사례 중심으로 적어보세요. (ex. Spring Boot, 데이터베이스 설계, API 설계, 서버 최적화 등)",
  },
};

interface PortfolioFormProps {
  part: Part;
}

export default function PortfolioForm({ part }: PortfolioFormProps) {
  const [experienceSummary, setExperienceSummary] = useState("");
  const [strengths, setStrengths] = useState("");
  const [dailyAvailability, setDailyAvailability] = useState<
    (typeof DAILY_OPTIONS)[number]["key"] | null
  >(null);
  const [weeklyAvailability, setWeeklyAvailability] = useState<
    (typeof WEEKLY_OPTIONS)[number]["key"] | null
  >(null);

  const config = PART_CONFIGS[part];

  const experiencePlaceholder = useMemo(
    () => config.experiencePlaceholder.join("\n"),
    [config],
  );

  const toggleDailyAvailability = (key: (typeof DAILY_OPTIONS)[number]["key"]) =>
    setDailyAvailability((prev) => (prev === key ? null : key));

  const toggleWeeklyAvailability = (
    key: (typeof WEEKLY_OPTIONS)[number]["key"],
  ) => setWeeklyAvailability((prev) => (prev === key ? null : key));

  return (
    <S.Wrapper>
      <S.Header>
        <S.PortfolioTitle>{config.title}</S.PortfolioTitle>
      </S.Header>

      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>경력사항</S.SectionTitle>
          <S.Badge>
            <S.BadgeIcon />
            신입
          </S.Badge>
        </S.SectionHeader>
        <S.TextFieldBox>
          <S.TextArea
            placeholder={experiencePlaceholder}
            value={experienceSummary}
            onChange={(event) => setExperienceSummary(event.target.value)}
          />
        </S.TextFieldBox>
      </S.Section>

      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>강점</S.SectionTitle>
        </S.SectionHeader>
        <S.TextFieldBox>
          <S.TextArea
            placeholder={config.strengthsPlaceholder}
            value={strengths}
            onChange={(event) => setStrengths(event.target.value)}
          />
        </S.TextFieldBox>
      </S.Section>

      <S.TimeAvailabilitySection>
        <S.SectionHeader>
          <S.SectionTitle>할애할 수 있는 시간</S.SectionTitle>
        </S.SectionHeader>

        <S.TimeRow>
          <S.TimeRowLabel>1일 기준</S.TimeRowLabel>
          <S.TimeOptionGroup>
            {DAILY_OPTIONS.map((option) => (
              <S.TimeOptionButton
                key={option.key}
                type="button"
                $active={dailyAvailability === option.key}
                onClick={() => toggleDailyAvailability(option.key)}
              >
                {option.label}
              </S.TimeOptionButton>
            ))}
          </S.TimeOptionGroup>
        </S.TimeRow>

        <S.TimeRow>
          <S.TimeRowLabel>1주 기준</S.TimeRowLabel>
          <S.TimeOptionGroup>
            {WEEKLY_OPTIONS.map((option) => (
              <S.TimeOptionButton
                key={option.key}
                type="button"
                $active={weeklyAvailability === option.key}
                onClick={() => toggleWeeklyAvailability(option.key)}
              >
                {option.label}
              </S.TimeOptionButton>
            ))}
          </S.TimeOptionGroup>
        </S.TimeRow>
      </S.TimeAvailabilitySection>
    </S.Wrapper>
  );
}

