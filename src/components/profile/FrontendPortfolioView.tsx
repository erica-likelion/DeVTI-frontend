import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./FrontendPortfolioView.styles";
import SelfAssessmentGroup from "./SelfAssessmentGroup";
import StarDisplay from "@/components/StarDisplay/StarDisplay";
import InputField from "@/components/Input/InputField";
import CheckboxButton from "@/components/ButtonDynamic/CheckboxButton";
import Modal from "@/components/modal/Modal";
import type { SelfAssessmentItem } from "./SelfAssessmentGroup";
import CopyBlackGray from "@/assets/icons/Copy/CopyBlackGray.svg";

// FrontendPortfolioForm에서 사용한 것과 동일한 자가평가 항목
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

const JAVASCRIPT_ITEMS: SelfAssessmentItem[] = ANDROID_STUDIO_ITEMS;
const REACT_ITEMS: SelfAssessmentItem[] = ANDROID_STUDIO_ITEMS;

const TECH_ITEMS_MAP: Record<string, SelfAssessmentItem[]> = {
  JavaScript: JAVASCRIPT_ITEMS,
  "Android Studio": ANDROID_STUDIO_ITEMS,
  React: REACT_ITEMS,
};

interface FrontendPortfolioViewProps {
  experienceSummary: string;
  strengths: string;
  github?: string;
  selectedTechs?: string[];
  techAssessments?: Record<string, Record<string, number>>;
  isNewcomer: boolean;
  name?: string;
  intro?: string;
  dbtiInfo?: string | null;
  profileImage?: string | null;
  selectedParts?: string[];
  showEditButtons?: boolean;
  onBack?: () => void;
}

/**
 * 평균 점수 계산 (0.5 단위로 내림)
 */
const calculateAverage = (scores: Record<string, number>, items: SelfAssessmentItem[]): number => {
  const validScores = items
    .map((item) => scores[item.key] ?? 0)
    .filter((score) => score > 0);
  
  if (validScores.length === 0) return 0;
  
  const sum = validScores.reduce((acc, score) => acc + score, 0);
  const average = sum / validScores.length;
  
  // 0.5 단위로 내림
  return Math.floor(average * 2) / 2;
};

export default function FrontendPortfolioView({
  experienceSummary,
  strengths,
  github = "",
  selectedTechs = [],
  techAssessments = {},
  isNewcomer,
  name,
  intro,
  dbtiInfo,
  profileImage,
  selectedParts = [],
  showEditButtons = true,
  onBack,
}: FrontendPortfolioViewProps) {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 각 기술별 평균 점수 계산
  const techAverages = useMemo(() => {
    const averages: Record<string, number> = {};
    selectedTechs.forEach((tech) => {
      const items = TECH_ITEMS_MAP[tech] || [];
      averages[tech] = calculateAverage(techAssessments[tech] || {}, items);
    });
    return averages;
  }, [selectedTechs, techAssessments]);

  const handleEditClick = () => {
    navigate('/profile/edit/frontend', {
      state: {
        name,
        intro,
        dbtiInfo,
        profileImage,
        selectedParts,
        part: "프론트엔드" as const,
        experienceSummary,
        strengths,
        github,
        selectedTechs,
        techAssessments,
        isNewcomer,
      },
    });
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
    navigate('/profile/edit', {
      state: {
        name,
        intro,
        dbtiInfo,
        profileImage,
        selectedParts: selectedParts.filter(part => part !== "프론트엔드"),
      },
    });
  };

  const handleGithubCopy = async () => {
    if (github) {
      try {
        await navigator.clipboard.writeText(github);
        // TODO: 복사 성공 토스트 메시지 표시
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.PortfolioTitle>프론트엔드 포트폴리오</S.PortfolioTitle>
        {showEditButtons && (
          <S.ButtonWrapper>
            <S.EditButton onClick={handleEditClick}>수정</S.EditButton>
            <S.DeleteButton onClick={handleDeleteClick}>삭제</S.DeleteButton>
          </S.ButtonWrapper>
        )}
      </S.Header>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onPrimary={handleDeleteConfirm}
        buttonLabel="확인"
      >
        <div>포트폴리오를 삭제하시겠어요?</div>
        <div>이 작업은 복구할 수 없습니다.</div>
      </Modal>

      <S.ContentFrame>
        {/* 경력사항 */}
        <S.ExperienceSection>
          <S.SectionTitle>경력사항</S.SectionTitle>
          <InputField
            value={experienceSummary || ""}
            variant="output"
            disabled={true}
            multiline={true}
            rows={1}
          />
          <S.CheckboxWrapper>
            <CheckboxButton
              checked={isNewcomer}
              onChange={() => {}}
              disabled={false}
              onClick={(e) => e.preventDefault()}
            >
              신입
            </CheckboxButton>
          </S.CheckboxWrapper>
        </S.ExperienceSection>

        {/* 강점 */}
        <S.StrengthsSection>
          <S.SectionTitle>강점</S.SectionTitle>
          <InputField
            value={strengths || ""}
            variant="output"
            disabled={true}
            multiline={true}
            rows={1}
          />
        </S.StrengthsSection>

        {/* 깃허브 */}
        <S.GithubSection>
          <S.SectionTitle>깃허브</S.SectionTitle>
          {github ? (
            <InputField
              value={github}
              variant="output"
              disabled={true}
              icon={<img src={CopyBlackGray} alt="Copy" />}
              hasIcon={true}
              onIconClick={handleGithubCopy}
            />
          ) : (
            <S.EmptyText>-</S.EmptyText>
          )}
        </S.GithubSection>

        {/* 선택된 기술별 자가평가 */}
        {selectedTechs.length > 0 && (
          <S.SelfAssessmentSection>
            <S.SectionTitle>언어, 프레임워크 숙련도 자가평가</S.SectionTitle>
            {selectedTechs.map((tech) => (
              <S.TechAssessmentWrapper key={tech}>
                <S.TechHeader>
                  <S.TechName>{tech}</S.TechName>
                  <StarDisplay value={techAverages[tech] || 0} />
                </S.TechHeader>
                <SelfAssessmentGroup
                  title=""
                  items={TECH_ITEMS_MAP[tech] || []}
                  values={techAssessments[tech] || {}}
                  onChange={() => {}}
                  variant="output"
                />
              </S.TechAssessmentWrapper>
            ))}
          </S.SelfAssessmentSection>
        )}
      </S.ContentFrame>
    </S.Wrapper>
  );
}

