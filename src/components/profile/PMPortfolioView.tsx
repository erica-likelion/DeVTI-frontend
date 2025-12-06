import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./PMPortfolioView.styles";
import { Keyword } from "@/components/keywords/Keyword";
import SelfAssessmentGroup from "./SelfAssessmentGroup";
import StarDisplay from "@/components/StarDisplay/StarDisplay";
import InputField from "@/components/Input/InputField";
import CheckboxButton from "@/components/ButtonDynamic/CheckboxButton";
import Modal from "@/components/modal/Modal";
import type { SelfAssessmentItem } from "./SelfAssessmentGroup";
import type {
  DailyAvailabilityKey,
  WeeklyAvailabilityKey,
} from "./BasePortfolioForm";
import {
  DAILY_OPTIONS,
  WEEKLY_OPTIONS,
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

interface PMPortfolioViewProps {
  experienceSummary: string;
  strengths: string;
  dailyAvailability: DailyAvailabilityKey | null;
  weeklyAvailability: WeeklyAvailabilityKey | null;
  designAssessment: Record<string, number>;
  developmentAssessment: Record<string, number>;
  isNewcomer: boolean;
  name?: string;
  intro?: string;
  dbtiInfo?: string | null;
  profileImage?: string | null;
  selectedParts?: string[]; // 선택된 파트 목록
  showEditButtons?: boolean; // 수정/삭제 버튼 표시 여부 (기본값: true)
  onBack?: () => void; // 뒤로가기 버튼 클릭 핸들러
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

export default function PMPortfolioView({
  experienceSummary,
  strengths,
  dailyAvailability,
  weeklyAvailability,
  designAssessment,
  developmentAssessment,
  isNewcomer,
  name,
  intro,
  dbtiInfo,
  profileImage,
  selectedParts = [],
  showEditButtons = true,
  onBack,
}: PMPortfolioViewProps) {
  // 할애할 수 있는 시간을 Keyword로 변환
  const dailyKeyword = useMemo(() => {
    if (!dailyAvailability) return null;
    const dailyOption = DAILY_OPTIONS.find((opt) => opt.key === dailyAvailability);
    return dailyOption ? dailyOption.label : null;
  }, [dailyAvailability]);

  const weeklyKeyword = useMemo(() => {
    if (!weeklyAvailability) return null;
    const weeklyOption = WEEKLY_OPTIONS.find((opt) => opt.key === weeklyAvailability);
    return weeklyOption ? weeklyOption.label : null;
  }, [weeklyAvailability]);

  // 평균 점수 계산
  const designAverage = useMemo(
    () => calculateAverage(designAssessment, DESIGN_ITEMS),
    [designAssessment]
  );
  
  const developmentAverage = useMemo(
    () => calculateAverage(developmentAssessment, DEVELOPMENT_ITEMS),
    [developmentAssessment]
  );

  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditClick = () => {
    navigate('/profile/edit/pm', {
      state: {
        name,
        intro,
        dbtiInfo,
        profileImage,
        selectedParts, // selectedParts 전달
        part: "PM" as const, // 현재 파트 정보
        experienceSummary,
        strengths,
        dailyAvailability,
        weeklyAvailability,
        designAssessment,
        developmentAssessment,
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
    navigate('/profile/edit', {
      state: {
        name,
        intro,
        dbtiInfo,
        profileImage,
        selectedParts: selectedParts.filter(part => part !== "PM"), // PM 파트 제거
      },
    });
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.PortfolioTitle>PM 포트폴리오</S.PortfolioTitle>
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

        {/* 할애할 수 있는 시간 */}
        <S.TimeAvailabilitySection>
          <S.SectionTitle>할애할 수 있는 시간</S.SectionTitle>
          <S.TimeRowContainer>
            <S.TimeFrame>
              <S.TimeRowLabel>1일 기준</S.TimeRowLabel>
              {dailyKeyword ? (
                <Keyword items={[dailyKeyword]} color="green" size="m" />
              ) : (
                <S.EmptyText>-</S.EmptyText>
              )}
            </S.TimeFrame>
            <S.TimeFrame>
              <S.TimeRowLabel>1주 기준</S.TimeRowLabel>
              {weeklyKeyword ? (
                <Keyword items={[weeklyKeyword]} color="green" size="m" />
              ) : (
                <S.EmptyText>-</S.EmptyText>
              )}
            </S.TimeFrame>
          </S.TimeRowContainer>
        </S.TimeAvailabilitySection>

        {/* 디자인에 대한 이해도 자가평가 */}
        <S.SelfAssessmentSection>
          <S.SelfAssessmentHeader>
            <S.SectionTitle>디자인에 대한 이해도 자가평가</S.SectionTitle>
            <StarDisplay value={designAverage} />
          </S.SelfAssessmentHeader>
          <SelfAssessmentGroup
            title=""
            items={DESIGN_ITEMS}
            values={designAssessment}
            onChange={() => {}} // 수정 불가능
            variant="output"
          />
        </S.SelfAssessmentSection>

        {/* 개발에 대한 이해도 자가평가 */}
        <S.SelfAssessmentSection>
          <S.SelfAssessmentHeader>
            <S.SectionTitle>개발에 대한 이해도 자가평가</S.SectionTitle>
            <StarDisplay value={developmentAverage} />
          </S.SelfAssessmentHeader>
          <SelfAssessmentGroup
            title=""
            items={DEVELOPMENT_ITEMS}
            values={developmentAssessment}
            onChange={() => {}} // 수정 불가능
            variant="output"
          />
        </S.SelfAssessmentSection>
      </S.ContentFrame>
    </S.Wrapper>
  );
}

