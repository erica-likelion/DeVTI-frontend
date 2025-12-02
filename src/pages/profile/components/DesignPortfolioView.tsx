import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./DesignPortfolioView.styles";
import { Keyword } from "@/components/keywords/Keyword";
import SelfAssessmentGroup from "./SelfAssessmentGroup";
import StarDisplay from "@/components/StarDisplay/StarDisplay";
import InputField from "@/components/Input/InputField";
import CheckboxButton from "@/components/ButtonDynamic/CheckboxButton";
import Modal from "@/components/modal/Modal";
import WtLCloseButton from "@/components/ButtonDynamic/WtLCloseButton";
import DownloadIcon from "@/assets/icons/Download.svg";
import type { SelfAssessmentItem } from "./SelfAssessmentGroup";

const FIGMA_ITEMS: SelfAssessmentItem[] = [
  {
    key: "uxPlanning",
    title: "UX 기획 능력",
    description: "사용자 경험(UX)을 고려한 인터랙션과 화면 흐름을 설계할 수 있다.",
  },
  {
    key: "designConsistency",
    title: "디자인 일관성 및 시스템 이해",
    description: "디자인 시스템(컴포넌트, 스타일, 베리어블 등)을 이해하고 일관성을 유지할 수 있다.",
  },
  {
    key: "collaborationAttitude",
    title: "협업 태도 및 피드백 수용력",
    description: "피드백을 받을 때, 개인의 취향보다는 팀의 목표나 사용자 관점을 우선시한다.",
  },
  {
    key: "collaborationFeatures",
    title: "협업 기능 활용도",
    description: "Figma의 코멘트, 버전 관리, 프로토타입 공유 기능을 활용해 팀원과 효율적으로 협업할 수 있다.",
  },
  {
    key: "communicationClarity",
    title: "커뮤니케이션 명확성",
    description: "개발자나 PM에게 전달되는 화면 구조를 명확히 하기 위해, 디자인 파일을 체계적으로 정리한다.",
  },
] as const;

interface DesignPortfolioViewProps {
  experienceSummary: string;
  strengths: string;
  designWorkFile: string | null; // 파일명
  figmaAssessment: Record<string, number>;
  isNewcomer: boolean;
  name?: string;
  intro?: string;
  dbtiInfo?: string | null;
  profileImage?: string | null;
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

export default function DesignPortfolioView({
  experienceSummary,
  strengths,
  designWorkFile,
  figmaAssessment,
  isNewcomer,
  name,
  intro,
  dbtiInfo,
  profileImage,
}: DesignPortfolioViewProps) {
  // 평균 점수 계산
  const figmaAverage = useMemo(
    () => calculateAverage(figmaAssessment, FIGMA_ITEMS),
    [figmaAssessment]
  );

  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditClick = () => {
    navigate('/profile/edit/design', {
      state: {
        name,
        intro,
        dbtiInfo,
        profileImage,
        experienceSummary,
        strengths,
        designWorkFile,
        figmaAssessment,
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
    // TODO: 삭제 로직 구현
    setIsDeleteModalOpen(false);
  };

  const handleFileDownload = () => {
    // TODO: 백엔드 API를 통해 파일 다운로드 구현 필요
    // 현재는 파일명만 표시
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.PortfolioTitle>디자인 포트폴리오</S.PortfolioTitle>
        <S.ButtonWrapper>
          <S.EditButton onClick={handleEditClick}>수정</S.EditButton>
          <S.DeleteButton onClick={handleDeleteClick}>삭제</S.DeleteButton>
        </S.ButtonWrapper>
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
          />
        </S.StrengthsSection>

        {/* 디자인 작업물 */}
        <S.DesignWorkSection>
          <S.SectionTitle>디자인 작업물</S.SectionTitle>
          {designWorkFile ? (
            <S.FileButtonWrapper>
              <WtLCloseButton onClick={handleFileDownload} icon={DownloadIcon}>
                {designWorkFile}
              </WtLCloseButton>
            </S.FileButtonWrapper>
          ) : (
            <S.EmptyText>-</S.EmptyText>
          )}
        </S.DesignWorkSection>

        {/* 협업 툴 (Figma) 숙련도 자가평가 */}
        <S.SelfAssessmentSection>
          <S.SelfAssessmentHeader>
            <S.SectionTitle>협업 툴 (Figma) 숙련도 자가평가</S.SectionTitle>
            <StarDisplay value={figmaAverage} />
          </S.SelfAssessmentHeader>
          <SelfAssessmentGroup
            title=""
            items={FIGMA_ITEMS}
            values={figmaAssessment}
            onChange={() => {}} // 수정 불가능
            variant="output"
          />
        </S.SelfAssessmentSection>
      </S.ContentFrame>
    </S.Wrapper>
  );
}

