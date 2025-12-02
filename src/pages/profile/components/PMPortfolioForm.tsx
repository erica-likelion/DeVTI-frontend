import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasePortfolioForm from "./BasePortfolioForm";
import SelfAssessmentGroup from "./SelfAssessmentGroup";
import type { SelfAssessmentItem } from "./SelfAssessmentGroup";
import type {
  DailyAvailabilityKey,
  WeeklyAvailabilityKey,
} from "./BasePortfolioForm";

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
      "디자이너와 피드백을 주고받을 때, 디자인 언어 (베리어블, 패딩, 시각적 계층, 컴포넌트 등)를 활용할 수 있다.",
  },
  {
    key: "priority",
    title: "우선순위 판단 능력",
    description:
      "디자인 완성도보다 사용자 가치(목표 달성)에 초점을 맞춰 의사결정할 수 있다.",
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
      "주요 기술 스택 (React, Spring, AWS 등)의 기능과 한계를 개괄적으로 설명할 수 있다.",
  },
  {
    key: "executionSense",
    title: "일정 / 리소스 감각",
    description:
      "개발 일정이나 기능 구현 난이도를 대화 중에 현실적으로 고려할 수 있다.",
  },
  {
    key: "devCommunication",
    title: "커뮤니케이션 및 조정 역량",
    description:
      "개발자의 피드백, 이슈 사항을 이해하고 우선순위를 조율할 수 있다.",
  },
  {
    key: "problemSolving",
    title: "문제 해결 과정 이해",
    description:
      "오류나 예외 상황 발생 시, 원인 파악 과정을 논리적으로 함께 점검할 수 있다.",
  },
] as const;

interface PMPortfolioFormProps {
  name?: string;
  intro?: string;
  dbtiInfo?: string | null;
  profileImage?: string | null;
  portfolioData?: {
    experienceSummary?: string;
    strengths?: string;
    dailyAvailability?: DailyAvailabilityKey | null;
    weeklyAvailability?: WeeklyAvailabilityKey | null;
    designAssessment?: Record<string, number>;
    developmentAssessment?: Record<string, number>;
    isNewcomer?: boolean;
  } | null;
  onRegister?: () => void; // 등록 버튼 클릭 시 호출 (파트 추가를 위해)
}

export default function PMPortfolioForm({ 
  name, 
  intro, 
  dbtiInfo, 
  profileImage,
  portfolioData,
  onRegister
}: PMPortfolioFormProps) {
  const navigate = useNavigate();
  const [experienceSummary, setExperienceSummary] = useState(portfolioData?.experienceSummary || "");
  const [strengths, setStrengths] = useState(portfolioData?.strengths || "");
  const [dailyAvailability, setDailyAvailability] =
    useState<DailyAvailabilityKey | null>(portfolioData?.dailyAvailability || null);
  const [weeklyAvailability, setWeeklyAvailability] =
    useState<WeeklyAvailabilityKey | null>(portfolioData?.weeklyAvailability || null);
  const [designAssessment, setDesignAssessment] = useState<
    Record<string, number>
  >(portfolioData?.designAssessment || {});
  const [developmentAssessment, setDevelopmentAssessment] = useState<
    Record<string, number>
  >(portfolioData?.developmentAssessment || {});

  const strengthsPlaceholder =
    "PM으로서의 강점을 사례 중심으로 적어보세요. (ex. 리서치, 문서화, 이해관계자 조율 등)";

  const handleDesignAssessmentChange = (key: string, value: number) => {
    setDesignAssessment((prev) => ({ ...prev, [key]: value }));
  };

  const handleDevelopmentAssessmentChange = (key: string, value: number) => {
    setDevelopmentAssessment((prev) => ({ ...prev, [key]: value }));
  };

  const toggleDailyAvailability = (key: DailyAvailabilityKey) => {
    setDailyAvailability((prev) => (prev === key ? null : key));
  };

  const toggleWeeklyAvailability = (key: WeeklyAvailabilityKey) => {
    setWeeklyAvailability((prev) => (prev === key ? null : key));
  };

  // 자가평가 유효성 검사: 모든 항목이 평가되어야 함
  const isDesignAssessmentComplete = DESIGN_ITEMS.every(
    (item) => designAssessment[item.key] !== undefined && designAssessment[item.key] > 0
  );
  const isDevelopmentAssessmentComplete = DEVELOPMENT_ITEMS.every(
    (item) => developmentAssessment[item.key] !== undefined && developmentAssessment[item.key] > 0
  );
  const isSelfAssessmentValid = isDesignAssessmentComplete && isDevelopmentAssessmentComplete;

  const handleRegister = (isNewcomerValue: boolean) => {
    // 등록 버튼 클릭 시 파트 추가를 위해 부모 컴포넌트에 알림
    if (onRegister) {
      // onRegister 콜백 실행 (selectedParts에 파트 추가 및 저장 버튼 활성화)
      onRegister();
      // 등록 후 페이지로 이동
      navigate("/profile/pm/view", {
        state: {
          name,
          intro,
          dbtiInfo,
          profileImage,
          experienceSummary,
          strengths,
          dailyAvailability,
          weeklyAvailability,
          designAssessment,
          developmentAssessment,
          isNewcomer: isNewcomerValue,
        },
      });
    } else {
      // onRegister가 없으면 바로 페이지 이동
      navigate("/profile/pm/view", {
        state: {
          name,
          intro,
          dbtiInfo,
          profileImage,
          experienceSummary,
          strengths,
          dailyAvailability,
          weeklyAvailability,
          designAssessment,
          developmentAssessment,
          isNewcomer: isNewcomerValue,
        },
      });
    }
  };

  return (
    <BasePortfolioForm
      title="PM 포트폴리오"
      experienceSummary={experienceSummary}
      strengths={strengths}
      dailyAvailability={dailyAvailability}
      weeklyAvailability={weeklyAvailability}
      strengthsPlaceholder={strengthsPlaceholder}
      isFormValid={isSelfAssessmentValid}
      onExperienceChange={setExperienceSummary}
      onStrengthsChange={setStrengths}
      onDailyAvailabilityChange={toggleDailyAvailability}
      onWeeklyAvailabilityChange={toggleWeeklyAvailability}
      onRegister={handleRegister}
      initialIsNewcomer={portfolioData?.isNewcomer || false}
    >
      <SelfAssessmentGroup
        title="디자인에 대한 이해도 자가평가"
        items={DESIGN_ITEMS}
        values={designAssessment}
        onChange={handleDesignAssessmentChange}
      />

      <SelfAssessmentGroup
        title="개발에 대한 이해도 자가평가"
        items={DEVELOPMENT_ITEMS}
        values={developmentAssessment}
        onChange={handleDevelopmentAssessmentChange}
      />
    </BasePortfolioForm>
  );
}

