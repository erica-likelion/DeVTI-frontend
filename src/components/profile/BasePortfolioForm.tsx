import { useMemo, useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import * as S from "./BasePortfolioForm.styles";
import BkMTextButton from "@/components/ButtonStatic/BkMTextButton";
import SegmentControlTight from "@/components/SegmentControl/SegmentControlTight";
import InputField from "@/components/Input/InputField";
import CheckboxButton from "@/components/ButtonDynamic/CheckboxButton";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const DAILY_OPTIONS = [
  { key: "under1h", label: "1시간 이하" },
  { key: "1to3h", label: "1 - 3시간" },
  { key: "over3h", label: "3시간 이상" },
] as const;

export const WEEKLY_OPTIONS = [
  { key: "under10h", label: "10시간 이하" },
  { key: "10to20h", label: "10 - 20시간" },
  { key: "over20h", label: "20시간 이상" },
] as const;

export const DAILY_OPTION_LABELS = DAILY_OPTIONS.map((opt) => opt.label);
export const WEEKLY_OPTION_LABELS = WEEKLY_OPTIONS.map((opt) => opt.label);

export type DailyAvailabilityKey = (typeof DAILY_OPTIONS)[number]["key"];
export type WeeklyAvailabilityKey = (typeof WEEKLY_OPTIONS)[number]["key"];

interface BasePortfolioFormProps {
  title: string;
  experienceSummary: string;
  strengths: string;
  github?: string; // 깃허브 URL
  dailyAvailability: DailyAvailabilityKey | null;
  weeklyAvailability: WeeklyAvailabilityKey | null;
  experiencePlaceholder?: string;
  strengthsPlaceholder?: string;
  onExperienceChange: (value: string) => void;
  onStrengthsChange: (value: string) => void;
  onGithubChange?: (value: string) => void; // 깃허브 변경 핸들러
  onDailyAvailabilityChange: (key: DailyAvailabilityKey) => void;
  onWeeklyAvailabilityChange: (key: WeeklyAvailabilityKey) => void;
  isFormValid?: boolean; // 폼 유효성 검사 결과
  onRegister?: (isNewcomer: boolean) => void; // 등록 버튼 클릭 시 호출 (isNewcomer 전달)
  children?: ReactNode; // 파트별 특화 섹션들
  initialIsNewcomer?: boolean; // 초기 신입 여부
  showTimeAvailability?: boolean; // 할애할 수 있는 시간 섹션 표시 여부 (기본값: true)
  showGithub?: boolean; // 깃허브 필드 표시 여부 (기본값: false)
}

export default function BasePortfolioForm({
  title,
  experienceSummary,
  strengths,
  github = "",
  dailyAvailability,
  weeklyAvailability,
  experiencePlaceholder,
  strengthsPlaceholder,
  onExperienceChange,
  onStrengthsChange,
  onGithubChange,
  onDailyAvailabilityChange,
  onWeeklyAvailabilityChange,
  isFormValid = false,
  onRegister,
  children,
  initialIsNewcomer = false,
  showTimeAvailability = true,
  showGithub = false,
}: BasePortfolioFormProps) {
  const [isNewcomer, setIsNewcomer] = useState(initialIsNewcomer);
  const isNewcomerRef = useRef(false);

  // isNewcomer를 외부에서 접근할 수 있도록 ref에 저장
  useEffect(() => {
    isNewcomerRef.current = isNewcomer;
  }, [isNewcomer]);

  // 신입 체크 시 경력 내용 초기화
  const handleNewcomerChange = (checked: boolean) => {
    setIsNewcomer(checked);
    isNewcomerRef.current = checked;
    if (checked) {
      // 신입 체크 시 경력 내용 초기화
      onExperienceChange("");
    }
  };

  // 경력 입력 시 신입 버튼 자동 해제
  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    onExperienceChange(value);
    // 경력 입력이 시작되면 신입 버튼 해제
    if (isNewcomerRef.current && value.trim() !== "") {
      setIsNewcomer(false);
      isNewcomerRef.current = false;
    }
  };

  // 강점 입력
  const handleStrengthsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    onStrengthsChange(value);
  };

  // 깃허브 입력
  const handleGithubChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    onGithubChange?.(value);
  };

  const toggleDailyAvailability = (key: DailyAvailabilityKey) => {
    onDailyAvailabilityChange(key);
  };

  const toggleWeeklyAvailability = (key: WeeklyAvailabilityKey) => {
    onWeeklyAvailabilityChange(key);
  };

  // SegmentControlTight를 위한 값 변환
  const dailySelectedLabel = useMemo(() => {
    const selected = DAILY_OPTIONS.find((opt) => opt.key === dailyAvailability);
    return selected?.label || undefined;
  }, [dailyAvailability]);

  const weeklySelectedLabel = useMemo(() => {
    const selected = WEEKLY_OPTIONS.find((opt) => opt.key === weeklyAvailability);
    return selected?.label || undefined;
  }, [weeklyAvailability]);

  const handleDailyChange = (label: string) => {
    const option = DAILY_OPTIONS.find((opt) => opt.label === label);
    if (option) {
      toggleDailyAvailability(option.key);
    }
  };

  const handleWeeklyChange = (label: string) => {
    const option = WEEKLY_OPTIONS.find((opt) => opt.label === label);
    if (option) {
      toggleWeeklyAvailability(option.key);
    }
  };

  const handleRegister = () => {
    if (!isFormValid) return;
    onRegister?.(isNewcomer);
  };

  // 기본 유효성 검사: 경력사항(또는 신입 체크), 강점, 시간 선택 (showTimeAvailability가 true일 때만)
  const baseValidation = 
    (experienceSummary.trim() !== "" || isNewcomer) &&
    strengths.trim() !== "" &&
    (!showTimeAvailability || (dailyAvailability !== null && weeklyAvailability !== null));

  // 전체 유효성 검사: 기본 검사 + 파트별 특화 검사
  const isValid = baseValidation && isFormValid;

  // 타블렛에서 포트폴리오 제목을 두 줄로 나누기
  const isTablet = useMediaQuery('(min-width: 45rem) and (max-width: 89.9375rem)');
  const renderTitle = () => {
    if (title === "디자인 포트폴리오") {
      // 타블렛일 때만 두 줄로 나누기
      if (isTablet) {
        return (
          <S.PortfolioTitle $isDesignPortfolio={true}>
            <S.PortfolioTitleLine>디자인</S.PortfolioTitleLine>
            <S.PortfolioTitleLine>포트폴리오</S.PortfolioTitleLine>
          </S.PortfolioTitle>
        );
      }
      // 타블렛이 아닐 때는 원래 텍스트 사용
      return <S.PortfolioTitle>{title}</S.PortfolioTitle>;
    }
    
    if (title === "프론트엔드 포트폴리오") {
      // 타블렛일 때만 두 줄로 나누기
      if (isTablet) {
        return (
          <S.PortfolioTitle>
            <S.PortfolioTitleLine>프론트엔드</S.PortfolioTitleLine>
            <S.PortfolioTitleLine>포트폴리오</S.PortfolioTitleLine>
          </S.PortfolioTitle>
        );
      }
      return <S.PortfolioTitle>{title}</S.PortfolioTitle>;
    }
    
    if (title === "백엔드 포트폴리오") {
      // 타블렛일 때만 두 줄로 나누기
      if (isTablet) {
        return (
          <S.PortfolioTitle>
            <S.PortfolioTitleLine>백엔드</S.PortfolioTitleLine>
            <S.PortfolioTitleLine>포트폴리오</S.PortfolioTitleLine>
          </S.PortfolioTitle>
        );
      }
      return <S.PortfolioTitle>{title}</S.PortfolioTitle>;
    }
    
    return <S.PortfolioTitle>{title}</S.PortfolioTitle>;
  };

  return (
    <S.Wrapper>
      <S.Header>
        {renderTitle()}
        <S.RegisterButtonWrapper>
          <BkMTextButton onClick={handleRegister} disabled={!isValid}>
            등록
          </BkMTextButton>
        </S.RegisterButtonWrapper>
      </S.Header>

      <S.ContentFrame>
        {/* 경력사항 */}
        <S.ExperienceSection>
          <S.SectionTitle>경력사항</S.SectionTitle>
          <InputField
            multiline={true}
            rows={1}
            value={experienceSummary}
            onChange={handleExperienceChange}
            disabled={isNewcomer}
          />
          <S.CheckboxWrapper>
            <CheckboxButton
              checked={isNewcomer}
              onChange={handleNewcomerChange}
            >
              신입
            </CheckboxButton>
          </S.CheckboxWrapper>
        </S.ExperienceSection>

        {/* 강점 */}
        <S.StrengthsSection>
          <S.SectionTitle>강점</S.SectionTitle>
          <InputField
            multiline={true}
            rows={1}
            value={strengths}
            onChange={handleStrengthsChange}
            disabled={false}
          />
        </S.StrengthsSection>

        {/* 깃허브 */}
        {showGithub && (
          <S.GithubSection>
            <S.SectionTitle>깃허브</S.SectionTitle>
            <InputField
              multiline={false}
              value={github}
              onChange={handleGithubChange}
              disabled={false}
            />
          </S.GithubSection>
        )}

      {/* 할애할 수 있는 시간 */}
      {showTimeAvailability && (
        <S.TimeAvailabilitySection>
          <S.SectionTitle>할애할 수 있는 시간</S.SectionTitle>

          <S.TimeRowContainer>
            <S.TimeFrame $isDaily={true}>
              <S.TimeRowLabel>1일 기준</S.TimeRowLabel>
              <SegmentControlTight
                options={DAILY_OPTION_LABELS}
                value={dailySelectedLabel}
                onChange={handleDailyChange}
              />
            </S.TimeFrame>

            <S.TimeFrame>
              <S.TimeRowLabel>1주 기준</S.TimeRowLabel>
              <SegmentControlTight
                options={WEEKLY_OPTION_LABELS}
                value={weeklySelectedLabel}
                onChange={handleWeeklyChange}
              />
            </S.TimeFrame>
          </S.TimeRowContainer>
        </S.TimeAvailabilitySection>
      )}

        {/* 파트별 특화 섹션들 */}
        {children}
      </S.ContentFrame>
    </S.Wrapper>
  );
}

