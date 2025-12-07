import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BasePortfolioForm from "./BasePortfolioForm";
import SelfAssessmentGroup from "./SelfAssessmentGroup";
import DropBox from "@/components/DropBox";
import * as S from "./BackendPortfolioForm.styles";
import {
  BACKEND_TECH_OPTIONS,
  BACKEND_TECH_ITEMS_MAP,
  type BackendTech,
} from "./constants/backendAssessmentItems";

const TECH_ITEMS_MAP = BACKEND_TECH_ITEMS_MAP;

interface BackendPortfolioFormProps {
  name?: string;
  intro?: string;
  dbtiInfo?: string | null;
  profileImage?: string | null;
  selectedParts?: string[];
  portfolioData?: {
    experienceSummary?: string;
    strengths?: string;
    github?: string;
    selectedTechs?: BackendTech[];
    techAssessments?: Record<string, Record<string, number>>; // tech -> { key: score }
    isNewcomer?: boolean;
  } | null;
  onRegister?: () => string[];
}

export default function BackendPortfolioForm({
  name,
  intro,
  dbtiInfo,
  profileImage,
  selectedParts: propSelectedParts,
  portfolioData,
  onRegister,
}: BackendPortfolioFormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { selectedParts?: string[] } | null;
  const currentSelectedParts = propSelectedParts || locationState?.selectedParts || [];
  
  const [experienceSummary, setExperienceSummary] = useState(
    portfolioData?.experienceSummary || ""
  );
  const [strengths, setStrengths] = useState(portfolioData?.strengths || "");
  const [github, setGithub] = useState(portfolioData?.github || "");
  const [selectedTechs, setSelectedTechs] = useState<BackendTech[]>(
    portfolioData?.selectedTechs || []
  );
  const [techAssessments, setTechAssessments] = useState<
    Record<string, Record<string, number>>
  >(portfolioData?.techAssessments || {});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const strengthsPlaceholder =
    "백엔드 개발자로서의 강점을 사례 중심으로 적어보세요.";

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
  const handleTechSelect = (tech: BackendTech) => {
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
  // @ts-ignore - 사용 예정
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTechRemove = (tech: BackendTech) => {
    setSelectedTechs(selectedTechs.filter((t) => t !== tech));
    const newAssessments = { ...techAssessments };
    delete newAssessments[tech];
    setTechAssessments(newAssessments);
  };

  // 자가평가 변경 핸들러
  const handleAssessmentChange = (tech: BackendTech, key: string, value: number) => {
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
      updatedSelectedParts = currentSelectedParts.includes("백엔드")
        ? currentSelectedParts
        : [...currentSelectedParts, "백엔드"];
    }

    const backendData = {
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
    localStorage.setItem("portfolio_백엔드", JSON.stringify(backendData));

    navigate("/profile/backend/view", {
      state: {
        ...backendData,
        part: "백엔드" as const,
      },
    });
  };

  // 사용 가능한 기술 옵션 (이미 선택된 것 제외)
  const availableTechOptions = BACKEND_TECH_OPTIONS.filter(
    (tech) => !selectedTechs.includes(tech)
  );

  return (
    <BasePortfolioForm
      title="백엔드 포트폴리오"
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
            onSelectOption={(option) => handleTechSelect(option as BackendTech)}
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
