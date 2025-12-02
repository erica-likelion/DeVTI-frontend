import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BasePortfolioForm from "./BasePortfolioForm";
import SelfAssessmentGroup from "./SelfAssessmentGroup";
import type { SelfAssessmentItem } from "./SelfAssessmentGroup";
import * as S from "./DesignPortfolioForm.styles";
import WtLPawButton from "@/components/ButtonDynamic/WtLPawButton";
import WtLCloseButton from "@/components/ButtonDynamic/WtLCloseButton";
import UploadIcon from "@/assets/icons/Upload.svg";

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

interface DesignPortfolioFormProps {
  name?: string;
  intro?: string;
  dbtiInfo?: string | null;
  profileImage?: string | null;
  portfolioData?: {
    experienceSummary?: string;
    strengths?: string;
    designWorkFile?: string | null;
    figmaAssessment?: Record<string, number>;
    isNewcomer?: boolean;
  } | null;
  onRegister?: () => void; // 등록 버튼 클릭 시 호출 (파트 추가를 위해)
}

export default function DesignPortfolioForm({ 
  name, 
  intro, 
  dbtiInfo, 
  profileImage,
  portfolioData,
  onRegister
}: DesignPortfolioFormProps) {
  const navigate = useNavigate();
  const [experienceSummary, setExperienceSummary] = useState(portfolioData?.experienceSummary || "");
  const [strengths, setStrengths] = useState(portfolioData?.strengths || "");
  const [designWorkFile, setDesignWorkFile] = useState<File | null>(null);
  const [designWorkFileName, setDesignWorkFileName] = useState<string | null>(portfolioData?.designWorkFile || null);
  const [figmaAssessment, setFigmaAssessment] = useState<
    Record<string, number>
  >(portfolioData?.figmaAssessment || {});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const strengthsPlaceholder =
    "디자이너로서의 강점을 사례 중심으로 적어보세요. (ex. UI/UX 디자인, 브랜딩, 일러스트레이션 등)";

  const handleFigmaAssessmentChange = (key: string, value: number) => {
    setFigmaAssessment((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDesignWorkFile(file);
      setDesignWorkFileName(file.name);
    }
  };

  const handleFileRemove = () => {
    setDesignWorkFile(null);
    setDesignWorkFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 자가평가 유효성 검사: 모든 항목이 평가되어야 함
  const isFigmaAssessmentComplete = FIGMA_ITEMS.every(
    (item) => figmaAssessment[item.key] !== undefined && figmaAssessment[item.key] > 0
  );
  const isSelfAssessmentValid = isFigmaAssessmentComplete;

  const handleRegister = (isNewcomerValue: boolean) => {
    // 등록 버튼 클릭 시 파트 추가를 위해 부모 컴포넌트에 알림
    if (onRegister) {
      // onRegister 콜백 실행 (selectedParts에 파트 추가 및 저장 버튼 활성화)
      onRegister();
      // 등록 후 페이지로 이동
      navigate("/profile/design/view", {
        state: {
          name,
          intro,
          dbtiInfo,
          profileImage,
          experienceSummary,
          strengths,
          designWorkFile: designWorkFileName, // 파일명만 전달
          figmaAssessment,
          isNewcomer: isNewcomerValue,
        },
      });
    } else {
      // onRegister가 없으면 바로 페이지 이동
      navigate("/profile/design/view", {
        state: {
          name,
          intro,
          dbtiInfo,
          profileImage,
          experienceSummary,
          strengths,
          designWorkFile: designWorkFileName,
          figmaAssessment,
          isNewcomer: isNewcomerValue,
        },
      });
    }
  };

  return (
    <BasePortfolioForm
      title="디자인 포트폴리오"
      experienceSummary={experienceSummary}
      strengths={strengths}
      dailyAvailability={null}
      weeklyAvailability={null}
      strengthsPlaceholder={strengthsPlaceholder}
      isFormValid={isSelfAssessmentValid}
      onExperienceChange={setExperienceSummary}
      onStrengthsChange={setStrengths}
      onDailyAvailabilityChange={() => {}}
      onWeeklyAvailabilityChange={() => {}}
      onRegister={handleRegister}
      initialIsNewcomer={portfolioData?.isNewcomer || false}
      showTimeAvailability={false}
    >
      {/* 디자인 작업물 */}
      <S.DesignWorkSection>
        <S.SectionTitle>디자인 작업물</S.SectionTitle>
        <S.FileUploadContainer>
          <input
            ref={fileInputRef}
            type="file"
            accept="*/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <S.UploadButton onClick={handleFileUpload} disabled={!!designWorkFile || !!designWorkFileName}>
            <S.UploadIcon src={UploadIcon} alt="Upload" />
            파일 업로드
          </S.UploadButton>
          {designWorkFileName && (
            <WtLCloseButton onClick={handleFileRemove}>
              {designWorkFileName}
            </WtLCloseButton>
          )}
        </S.FileUploadContainer>
      </S.DesignWorkSection>

      {/* 협업 툴 (Figma) 숙련도 자가평가 */}
      <SelfAssessmentGroup
        title="협업 툴 (Figma) 숙련도 자가평가"
        items={FIGMA_ITEMS}
        values={figmaAssessment}
        onChange={handleFigmaAssessmentChange}
      />
    </BasePortfolioForm>
  );
}
