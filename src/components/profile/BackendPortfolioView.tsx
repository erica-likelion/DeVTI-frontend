import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./BackendPortfolioView.styles";
import SelfAssessmentGroup from "./SelfAssessmentGroup";
import StarDisplay from "@/components/StarDisplay/StarDisplay";
import InputField from "@/components/Input/InputField";
import CheckboxButton from "@/components/ButtonDynamic/CheckboxButton";
import Modal from "@/components/modal/Modal";
import type { SelfAssessmentItem } from "./SelfAssessmentGroup";
import CopyBlackGray from "@/assets/icons/Copy/CopyBlackGray.svg";
import { BACKEND_TECH_ITEMS_MAP } from "@/constants/profile/backendAssessmentItems";

const TECH_ITEMS_MAP = BACKEND_TECH_ITEMS_MAP;

interface BackendPortfolioViewProps {
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

export default function BackendPortfolioView({
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
  // @ts-ignore - 사용 예정
  onBack,
}: BackendPortfolioViewProps) {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 각 기술별 평균 점수 계산
  const techAverages = useMemo(() => {
    const averages: Record<string, number> = {};
    selectedTechs.forEach((tech) => {
      const items = TECH_ITEMS_MAP[tech as keyof typeof TECH_ITEMS_MAP] || [];
      averages[tech] = calculateAverage(techAssessments[tech] || {}, items);
    });
    return averages;
  }, [selectedTechs, techAssessments]);

  const handleEditClick = () => {
    navigate('/profile/edit/backend', {
      state: {
        name,
        intro,
        dbtiInfo,
        profileImage,
        selectedParts,
        part: "백엔드" as const,
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
        selectedParts: selectedParts.filter(part => part !== "백엔드"),
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
        <S.PortfolioTitle>백엔드 포트폴리오</S.PortfolioTitle>
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
              onClick={() => {}}
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
                  items={TECH_ITEMS_MAP[tech as keyof typeof TECH_ITEMS_MAP] || []}
                  values={techAssessments[tech] || {}}
                  onChange={() => {}}
                  variant="output"
                  cardSize="L"
                />
              </S.TechAssessmentWrapper>
            ))}
          </S.SelfAssessmentSection>
        )}
      </S.ContentFrame>
    </S.Wrapper>
  );
}

