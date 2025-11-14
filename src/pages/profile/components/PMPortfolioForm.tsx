import { useMemo, useState } from "react";
import * as S from "./PMPortfolioForm.styles";
import SelfAssessmentGroup from "./SelfAssessmentGroup";
import type { SelfAssessmentItem } from "./SelfAssessmentGroup";

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

const DESIGN_ITEMS: SelfAssessmentItem[] = [
  {
    key: "uxFlow",
    title: "UX 구조 이해",
    description: "서비스의 핵심 UX 흐름(사용자 여정)을 직접 설명할 수 있다.",
  },
  {
    key: "visualStructure",
    title: "시각적 구조 및 흐름 이해",
    description: "와이어프레임이나 프로토타입을 보고 개선 포인트를 논의할 수 있다.",
  },
  {
    key: "designIntent",
    title: "디자인 의도 해석",
    description:
      "디자인 의사결정(컬러, 타이포, 인터랙션 등)이 사용자 경험에 어떤 영향을 주는지 알고 있다.",
  },
  {
    key: "communication",
    title: "커뮤니케이션 역량",
    description:
      "디자이너와 피드백을 주고받을 때, 디자인 언어(레이아웃, 패턴, 시각적 계층, 컴포넌트 등)를 활용할 수 있다.",
  },
  {
    key: "priority",
    title: "우선순위 판단 능력",
    description:
      "디자인 완성도보다 사용자 가치(목표 달성)에 초점을 맞춰 의사결정을 할 수 있다.",
  },
] as const;

const DEVELOPMENT_ITEMS: SelfAssessmentItem[] = [
  {
    key: "techStructure",
    title: "기술 구조 이해",
    description:
      "백엔드와 프론트엔드의 역할을 구분하고 협업 구조를 이해하고 있다.",
  },
  {
    key: "techContext",
    title: "기술 맥락 파악",
    description:
      "주요 기술 스택(React, Spring, AWS 등)의 기능과 한계를 개략적으로 설명할 수 있다.",
  },
  {
    key: "executionSense",
    title: "일정 / 리소스 감각",
    description:
      "개발 일정이나 기능 구현 난이도에 대해 현실적으로 고려할 수 있다.",
  },
  {
    key: "devCommunication",
    title: "커뮤니케이션 및 조정 역량",
    description:
      "개발자 피드백과 이슈 사항을 이해하고 우선순위를 조율할 수 있다.",
  },
  {
    key: "problemSolving",
    title: "문제 해결 과정 이해",
    description:
      "오류나 이슈 상황 발생 시, 원인 파악을 논리적으로 함께 점검할 수 있다.",
  },
] as const;

export default function PMPortfolioForm() {
  const [experienceSummary, setExperienceSummary] = useState("");
  const [strengths, setStrengths] = useState("");
  const [dailyAvailability, setDailyAvailability] = useState<
    (typeof DAILY_OPTIONS)[number]["key"] | null
  >(null);
  const [weeklyAvailability, setWeeklyAvailability] = useState<
    (typeof WEEKLY_OPTIONS)[number]["key"] | null
  >(null);
  const [designAssessment, setDesignAssessment] = useState<
    Record<string, number>
  >({});
  const [developmentAssessment, setDevelopmentAssessment] = useState<
    Record<string, number>
  >({});

  const experiencePlaceholder = useMemo(
    () =>
      [
        "프로젝트 / 회사명, 담당 역할, 기간 등을 자유롭게 작성해주세요.",
        "예시) 2024.03 ~ 2024.06 / 스타트업 A / 제품 기획 및 지표 관리",
      ].join("\n"),
    [],
  );

  const strengthsPlaceholder =
    "PM으로서의 강점을 사례 중심으로 적어보세요. (ex. 리서치, 문서화, 이해관계자 조율 등)";

  const handleDesignAssessmentChange = (key: string, value: number) => {
    setDesignAssessment((prev) => ({ ...prev, [key]: value }));
  };

  const handleDevelopmentAssessmentChange = (key: string, value: number) => {
    setDevelopmentAssessment((prev) => ({ ...prev, [key]: value }));
  };

  const toggleDailyAvailability = (key: (typeof DAILY_OPTIONS)[number]["key"]) =>
    setDailyAvailability((prev) => (prev === key ? null : key));

  const toggleWeeklyAvailability = (
    key: (typeof WEEKLY_OPTIONS)[number]["key"],
  ) => setWeeklyAvailability((prev) => (prev === key ? null : key));

  return (
    <S.Wrapper>
      <S.Header>
        <S.PortfolioTitle>PM 포트폴리오</S.PortfolioTitle>
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
            placeholder={strengthsPlaceholder}
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

      <SelfAssessmentGroup
        title="디자인에 대한 이해도\n자가평가"
        items={DESIGN_ITEMS}
        values={designAssessment}
        onChange={handleDesignAssessmentChange}
      />

      <SelfAssessmentGroup
        title="개발에 대한 이해도\n자가평가"
        items={DEVELOPMENT_ITEMS}
        values={developmentAssessment}
        onChange={handleDevelopmentAssessmentChange}
      />
    </S.Wrapper>
  );
}

