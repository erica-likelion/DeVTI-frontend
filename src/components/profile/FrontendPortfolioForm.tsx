import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BasePortfolioForm from "./BasePortfolioForm";
import SelfAssessmentGroup from "./SelfAssessmentGroup";
import DropBox from "@/components/DropBox";
import * as S from "./FrontendPortfolioForm.styles";
import {
  FRONTEND_TECH_OPTIONS,
  FRONTEND_TECH_ITEMS_MAP,
  type FrontendTech,
} from "@/constants/profile/frontendAssessmentItems";
import { updateProfile, createProfile, getProfile } from "@/services/profile";

const TECH_ITEMS_MAP = FRONTEND_TECH_ITEMS_MAP;

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
  // @ts-ignore - 사용 예정
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const handleRegister = async (isNewcomerValue: boolean) => {
    let updatedSelectedParts = currentSelectedParts;
    if (onRegister) {
      updatedSelectedParts = onRegister();
    } else {
      updatedSelectedParts = currentSelectedParts.includes("프론트엔드")
        ? currentSelectedParts
        : [...currentSelectedParts, "프론트엔드"];
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

    // techAssessments를 development_score 배열 형식으로 변환
    const developmentScore: [string, number][] = [];
    selectedTechs.forEach((tech) => {
      const assessments = techAssessments[tech] || {};
      const items = TECH_ITEMS_MAP[tech];
      if (items && items.length > 0) {
        // 각 기술별로 평균 점수 계산
        const scores = items
          .map((item) => assessments[item.key] ?? 0)
          .filter((score) => score > 0);
        if (scores.length > 0) {
          const average = scores.reduce((acc, score) => acc + score, 0) / scores.length;
          // 0.5 단위로 내림
          const roundedAverage = Math.floor(average * 2) / 2;
          developmentScore.push([tech, roundedAverage]);
        }
      }
    });

    // API 요청 데이터 준비 (JSON 형식)
    const requestData: {
      experienced?: string | null;
      strength?: string | string[];
      github_url?: string;
      development_score?: [string, number][];
    } = {
      // 신입인 경우 null, 아니면 experienceSummary 전송 (빈 문자열은 제외)
      ...(isNewcomerValue 
        ? { experienced: null } 
        : experienceSummary ? { experienced: experienceSummary } : {}),
      strength: strengths || "",
      github_url: github,
      development_score: developmentScore,
    };

    // 프로필 존재 여부 확인
    const existingProfile = await getProfile("FE");
    let result;
    
    if (existingProfile.success && existingProfile.data) {
      // 프로필이 있으면 PUT (업데이트)
      result = await updateProfile(requestData, "FE");
    } else {
      // 프로필이 없으면 POST (생성)
      result = await createProfile(requestData, "FE");
    }
    
    if (!result.success) {
      // TODO: 에러 처리 (토스트 메시지 등)
      console.error("프로필 저장 실패:", result.error);
      return;
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
            placeholder="언어, 프레임워크 선택"
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
            title={tech}
            items={TECH_ITEMS_MAP[tech]}
            values={techAssessments[tech] || {}}
            onChange={(key, value) => handleAssessmentChange(tech, key, value)}
            cardSize="L"
          />
        ))}
      </S.SelfAssessmentSection>
    </BasePortfolioForm>
  );
}
