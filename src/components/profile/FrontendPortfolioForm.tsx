import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BasePortfolioForm from "./BasePortfolioForm";
import SelfAssessmentGroup from "./SelfAssessmentGroup";
import DropBox from "@/components/DropBox";
import type { SelfAssessmentItem } from "./SelfAssessmentGroup";
import type {
  DailyAvailabilityKey,
  WeeklyAvailabilityKey,
} from "./BasePortfolioForm";
import * as S from "./FrontendPortfolioForm.styles";

// Android Studio 자가평가 항목
const ANDROID_STUDIO_ITEMS: SelfAssessmentItem[] = [
  {
    key: "layoutStructure",
    title: "레이아웃 구조 및 화면 설계 역량",
    description:
      "Android XML 기반의 레이아웃 구성 원리를 이해하고, ConstraintLayout·LinearLayout 등 상황에 맞는 UI 요소를 선택하여 화면을 설계할 수 있다.",
  },
  {
    key: "uiTags",
    title: "UI 태그 및 필수 속성 활용 능력",
    description:
      "Button, TextView, EditText 등 주요 UI 태그의 역할을 이해하고, id, layout_width, layout_height 같은 필수 속성을 올바르게 설정하여 UI 컴포넌트를 원하는 형태로 구현할 수 있다.",
  },
  {
    key: "dependencyManagement",
    title: "의존성 관리 및 빌드 환경 구성 능력",
    description:
      "Gradle 의존성 관리 및 빌드 설정을 이해하고, 외부 라이브러리를 프로젝트에 안정적으로 적용할 수 있다.",
  },
  {
    key: "listComposition",
    title: "로컬 데이터 및 네트워크 기반 리스트 구성 능력",
    description:
      "오프라인 캐싱 · paging 기반 리스트 · 데이터 동기화 구조를 설계할 수 있다.",
  },
  {
    key: "architectureDesign",
    title: "대규모 프로젝트 확장 고려 아키텍처 설계 역량",
    description:
      "멀티 모듈 분리(Feature Module · Core Module) 등을 통해 빌드 속도 개선 / 모듈 재사용성 향상 / 대규모 프로젝트 확장성 확보를 고려한 구조를 설계할 수 있다.",
  },
] as const;

// JavaScript와 React는 Android Studio와 동일한 질문으로 임시 처리
const JAVASCRIPT_ITEMS: SelfAssessmentItem[] = ANDROID_STUDIO_ITEMS;
const REACT_ITEMS: SelfAssessmentItem[] = ANDROID_STUDIO_ITEMS;

const FRONTEND_TECH_OPTIONS = ["JavaScript", "Android Studio", "React"] as const;

type FrontendTech = (typeof FRONTEND_TECH_OPTIONS)[number];

const TECH_ITEMS_MAP: Record<FrontendTech, SelfAssessmentItem[]> = {
  JavaScript: JAVASCRIPT_ITEMS,
  "Android Studio": ANDROID_STUDIO_ITEMS,
  React: REACT_ITEMS,
};

interface FrontendPortfolioFormProps {
  name?: string;
  intro?: string;
  dbtiInfo?: string | null;
  profileImage?: string | null;
  selectedParts?: string[];
  portfolioData?: {
    experienceSummary?: string;
    strengths?: string;
    github?: string;
    selectedTechs?: FrontendTech[];
    techAssessments?: Record<string, Record<string, number>>; // tech -> { key: score }
    isNewcomer?: boolean;
  } | null;
  onRegister?: () => string[];
}

export default function FrontendPortfolioForm({
  name,
  intro,
  dbtiInfo,
  profileImage,
  selectedParts: propSelectedParts,
  portfolioData,
  onRegister,
}: FrontendPortfolioFormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { selectedParts?: string[] } | null;
  const currentSelectedParts = propSelectedParts || locationState?.selectedParts || [];
  
  const [experienceSummary, setExperienceSummary] = useState(
    portfolioData?.experienceSummary || ""
  );
  const [strengths, setStrengths] = useState(portfolioData?.strengths || "");
  const [github, setGithub] = useState(portfolioData?.github || "");
  const [selectedTechs, setSelectedTechs] = useState<FrontendTech[]>(
    portfolioData?.selectedTechs || []
  );
  const [techAssessments, setTechAssessments] = useState<
    Record<string, Record<string, number>>
  >(portfolioData?.techAssessments || {});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const strengthsPlaceholder =
    "프론트엔드 개발자로서의 강점을 사례 중심으로 적어보세요.";

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // 기술 선택 핸들러
  const handleTechSelect = (tech: FrontendTech) => {
    if (!selectedTechs.includes(tech)) {
      setSelectedTechs([...selectedTechs, tech]);
      // 초기 평가값 설정
      if (!techAssessments[tech]) {
        setTechAssessments({
          ...techAssessments,
          [tech]: {},
        });
      }
    }
    setIsDropdownOpen(false);
  };

  // 기술 제거 핸들러
  const handleTechRemove = (tech: FrontendTech) => {
    setSelectedTechs(selectedTechs.filter((t) => t !== tech));
    const newAssessments = { ...techAssessments };
    delete newAssessments[tech];
    setTechAssessments(newAssessments);
  };

  // 자가평가 변경 핸들러
  const handleAssessmentChange = (tech: FrontendTech, key: string, value: number) => {
    setTechAssessments({
      ...techAssessments,
      [tech]: {
        ...techAssessments[tech],
        [key]: value,
      },
    });
  };

  // 자가평가 유효성 검사: 선택된 모든 기술에 대해 모든 항목이 평가되어야 함
  const isAssessmentComplete = selectedTechs.every((tech) => {
    const items = TECH_ITEMS_MAP[tech];
    return items.every(
      (item) =>
        techAssessments[tech]?.[item.key] !== undefined &&
        techAssessments[tech]?.[item.key] > 0
    );
  });

  const isFormValid = selectedTechs.length > 0 && isAssessmentComplete;

  const handleRegister = (isNewcomerValue: boolean) => {
    let updatedSelectedParts = currentSelectedParts;
    if (onRegister) {
      updatedSelectedParts = onRegister();
    } else {
      updatedSelectedParts = currentSelectedParts.includes("프론트엔드")
        ? currentSelectedParts
        : [...currentSelectedParts, "프론트엔드"];
    }

    const frontendData = {
      name,
      intro,
      dbtiInfo,
      profileImage,
      selectedParts: updatedSelectedParts,
      experienceSummary,
      strengths,
      github,
      selectedTechs,
      techAssessments,
      isNewcomer: isNewcomerValue,
    };
    localStorage.setItem("portfolio_프론트엔드", JSON.stringify(frontendData));

    navigate("/profile/frontend/view", {
      state: {
        ...frontendData,
        part: "프론트엔드" as const,
      },
    });
  };

  // 사용 가능한 기술 옵션 (이미 선택된 것 제외)
  const availableTechOptions = FRONTEND_TECH_OPTIONS.filter(
    (tech) => !selectedTechs.includes(tech)
  );

  return (
    <BasePortfolioForm
      title="프론트엔드 포트폴리오"
      experienceSummary={experienceSummary}
      strengths={strengths}
      github={github}
      dailyAvailability={null}
      weeklyAvailability={null}
      strengthsPlaceholder={strengthsPlaceholder}
      isFormValid={isFormValid}
      onExperienceChange={setExperienceSummary}
      onStrengthsChange={setStrengths}
      onGithubChange={setGithub}
      onDailyAvailabilityChange={() => {}}
      onWeeklyAvailabilityChange={() => {}}
      onRegister={handleRegister}
      initialIsNewcomer={portfolioData?.isNewcomer || false}
      showTimeAvailability={false}
      showGithub={true}
    >
      {/* 언어, 프레임워크 숙련도 자가평가 */}
      <S.SelfAssessmentSection>
        <S.SectionTitle>언어, 프레임워크 숙련도 자가평가</S.SectionTitle>
        <S.DropdownWrapper ref={dropdownRef}>
          <DropBox
            size="L"
            value=""
            placeholder="언어, 프레임워크선택"
            isOpen={isDropdownOpen}
            options={availableTechOptions}
            disabledOptions={selectedTechs}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            onSelectOption={(option) => handleTechSelect(option as FrontendTech)}
          />
        </S.DropdownWrapper>

        {/* 선택된 기술별 자가평가 카드 표시 */}
        {selectedTechs.map((tech) => (
          <SelfAssessmentGroup
            key={tech}
            title={`${tech} 숙련도 자가평가`}
            items={TECH_ITEMS_MAP[tech]}
            values={techAssessments[tech] || {}}
            onChange={(key, value) => handleAssessmentChange(tech, key, value)}
          />
        ))}
      </S.SelfAssessmentSection>
    </BasePortfolioForm>
  );
}
