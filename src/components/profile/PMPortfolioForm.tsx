import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BasePortfolioForm from "./BasePortfolioForm";
import SelfAssessmentGroup from "./SelfAssessmentGroup";
import type { SelfAssessmentItem } from "./SelfAssessmentGroup";
import type {
  DailyAvailabilityKey,
  WeeklyAvailabilityKey,
} from "./BasePortfolioForm";
import { updateProfile, createProfile, getProfile } from "@/services/profile";

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
  selectedParts?: string[]; // 현재 선택된 파트 목록
  portfolioData?: {
    experienceSummary?: string;
    strengths?: string;
    dailyAvailability?: DailyAvailabilityKey | null;
    weeklyAvailability?: WeeklyAvailabilityKey | null;
    designAssessment?: Record<string, number>;
    developmentAssessment?: Record<string, number>;
    isNewcomer?: boolean;
  } | null;
  onRegister?: () => string[]; // 등록 버튼 클릭 시 호출 (파트 추가를 위해), 업데이트된 selectedParts 반환
}

export default function PMPortfolioForm({ 
  name, 
  intro, 
  dbtiInfo, 
  profileImage,
  selectedParts: propSelectedParts,
  portfolioData,
  onRegister
}: PMPortfolioFormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { selectedParts?: string[] } | null;
  // prop으로 전달된 selectedParts를 우선 사용, 없으면 location.state에서 가져오기
  const currentSelectedParts = propSelectedParts || locationState?.selectedParts || [];
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

  // daily/weekly availability를 숫자로 변환
  const convertDailyAvailabilityToNumber = (key: DailyAvailabilityKey | null): number => {
    if (!key) return 0;
    const map: Record<DailyAvailabilityKey, number> = {
      under1h: 1,
      "1to3h": 3,
      over3h: 5,
    };
    return map[key];
  };

  const convertWeeklyAvailabilityToNumber = (key: WeeklyAvailabilityKey | null): number => {
    if (!key) return 0;
    const map: Record<WeeklyAvailabilityKey, number> = {
      under10h: 10,
      "10to20h": 20,
      over20h: 30,
    };
    return map[key];
  };

  // 자가평가 점수의 평균 계산
  const calculateAverage = (assessments: Record<string, number>, items: readonly SelfAssessmentItem[]): number => {
    const scores = items
      .map((item) => assessments[item.key] ?? 0)
      .filter((score) => score > 0);
    if (scores.length === 0) return 0;
    const sum = scores.reduce((acc, score) => acc + score, 0);
    const average = sum / scores.length;
    // 0.5 단위로 내림
    return Math.floor(average * 2) / 2;
  };

  const handleRegister = async (isNewcomerValue: boolean) => {
    // 등록 버튼 클릭 시 파트 추가를 위해 부모 컴포넌트에 알림
    let updatedSelectedParts = currentSelectedParts;
    if (onRegister) {
      // onRegister 콜백 실행 (selectedParts에 파트 추가 및 저장 버튼 활성화)
      // 업데이트된 selectedParts를 반환받음
      updatedSelectedParts = onRegister();
    } else {
      // onRegister가 없으면 직접 업데이트
      updatedSelectedParts = currentSelectedParts.includes("PM") 
        ? currentSelectedParts 
        : [...currentSelectedParts, "PM"];
    }

    // 공통 프로필이 없으면 먼저 생성
    if (name || intro) {
      const commonProfileResult = await updateProfile({
        username: name,
        comment: intro,
      });
      
      if (!commonProfileResult.success) {
        console.error("공통 프로필 생성/업데이트 실패:", commonProfileResult.error);
        // 공통 프로필 생성 실패해도 계속 진행 (이미 존재할 수 있음)
      }
    }

    // API 요청 데이터 준비 (JSON 형식)
    const designUnderstanding = calculateAverage(designAssessment, DESIGN_ITEMS);
    const developmentUnderstanding = calculateAverage(developmentAssessment, DEVELOPMENT_ITEMS);
    
    const requestData: {
      experienced?: string | null;
      strength?: string | string[];
      daily_time_capacity?: number;
      weekly_time_capacity?: number;
      design_understanding?: number;
      development_understanding?: number;
    } = {
      // 신입인 경우 null, 아니면 experienceSummary 전송 (빈 문자열은 제외)
      ...(isNewcomerValue 
        ? { experienced: null } 
        : experienceSummary ? { experienced: experienceSummary } : {}),
      strength: strengths || "",
      daily_time_capacity: convertDailyAvailabilityToNumber(dailyAvailability),
      weekly_time_capacity: convertWeeklyAvailabilityToNumber(weeklyAvailability),
      design_understanding: designUnderstanding,
      development_understanding: developmentUnderstanding,
    };

    console.log("PM 프로필 요청 데이터:", JSON.stringify(requestData, null, 2));
    
    // 프로필 존재 여부 확인
    const existingProfile = await getProfile("PM");
    let result;
    
    if (existingProfile.success && existingProfile.data) {
      // 프로필이 있으면 PUT (업데이트)
      result = await updateProfile(requestData, "PM");
    } else {
      // 프로필이 없으면 POST (생성)
      result = await createProfile(requestData, "PM");
    }
    
    if (!result.success) {
      // TODO: 에러 처리 (토스트 메시지 등)
      console.error("프로필 저장 실패:", result.error);
      return;
    }
    
    // PM 포트폴리오 데이터를 localStorage에 저장
    const pmData = {
      name,
      intro,
      dbtiInfo,
      profileImage,
      selectedParts: updatedSelectedParts,
      experienceSummary,
      strengths,
      dailyAvailability,
      weeklyAvailability,
      designAssessment,
      developmentAssessment,
      isNewcomer: isNewcomerValue,
    };
    localStorage.setItem('portfolio_PM', JSON.stringify(pmData));
    
    // 등록 후 view 화면으로 이동 (포트폴리오 섹션에 수정/삭제 버튼, LeftPanel에 저장 버튼 활성화)
    navigate("/profile/pm/view", {
      state: {
        ...pmData,
        part: "PM" as const, // 마지막에 저장한 파트 정보
      },
    });
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

