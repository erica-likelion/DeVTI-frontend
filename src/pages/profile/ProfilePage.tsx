import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { BlackMButton } from "@/components/Button";
import * as S from "./ProfilePage.styles";
import PMPortfolioForm from "./components/PMPortfolioForm";

const PART_OPTIONS = ["PM", "디자인", "프론트엔드", "백엔드"] as const;
type PartOption = (typeof PART_OPTIONS)[number];

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPartDropdownOpen, setIsPartDropdownOpen] = useState(false);
  const [selectedParts, setSelectedParts] = useState<PartOption[]>([]);
  const [activePart, setActivePart] = useState<PartOption | null>(null);
  const partSelectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPartDropdownOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        partSelectorRef.current &&
        !partSelectorRef.current.contains(event.target as Node)
      ) {
        setIsPartDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPartDropdownOpen]);

  const handleRegisterProfile = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    // TODO: 프로필 저장 로직
    console.log("프로필 저장");
    setIsEditMode(false);
  };

  // 편집 모드가 아닐 때 (기본 프로필 보기)
  if (!isEditMode) {
    return (
      <S.Container>
        <S.ProfileSection>
          <S.ProfileImageWrapper>
            {user?.profileImage ? (
              <S.ProfileImage src={user.profileImage} alt={user.name} />
            ) : (
              <S.ProfileImagePlaceholder />
            )}
          </S.ProfileImageWrapper>
          <S.UserName>{user?.name || "사용자"}</S.UserName>
          <S.ButtonWrapper>
            <BlackMButton onClick={handleRegisterProfile}>
              프로필 등록
            </BlackMButton>
          </S.ButtonWrapper>
        </S.ProfileSection>
      </S.Container>
    );
  }

  // 편집 모드
  return (
    <S.EditContainer>
      <S.LeftPanel>
        <S.EditProfileSection>
          <S.EditProfileImageWrapper>
            {user?.profileImage ? (
              <S.EditProfileImage src={user.profileImage} alt={user.name} />
            ) : (
              <S.EditProfileImagePlaceholder />
            )}
          </S.EditProfileImageWrapper>
          <S.EditUserName>{user?.name || "사용자"}</S.EditUserName>

          <S.FormSection>
            <S.FormLabel>한 줄 소개</S.FormLabel>
            <S.IntroInputWrapper>
              <S.IntroInput placeholder="미래 팀원들에게" />
              <S.CalendarIcon src="/calendar.svg" alt="Calendar" />
            </S.IntroInputWrapper>
          </S.FormSection>

          <S.FormSection>
            <S.FormLabel>개BTI</S.FormLabel>
            <S.DevBTIButton>
              <S.DevBTIIcon />
              <S.DevBTIText>개발 성향 테스트</S.DevBTIText>
            </S.DevBTIButton>
          </S.FormSection>

          <S.FormSection>
            <S.FormLabel>파트</S.FormLabel>
            <S.PartSelectorWrapper ref={partSelectorRef}>
              {selectedParts.length > 0 && (
                <S.SelectedPartList>
                  {selectedParts.map((part) => (
                    <S.SelectedPartChip
                      key={part}
                      type="button"
                      $active={part === activePart}
                      onClick={() => setActivePart(part)}
                    >
                      {part}
                    </S.SelectedPartChip>
                  ))}
                </S.SelectedPartList>
              )}

              <S.PartAddField
                type="button"
                onClick={() => setIsPartDropdownOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={isPartDropdownOpen}
              >
                <S.PartAddText>
                  {selectedParts.length === 0 ? "파트 추가" : "다른 파트 추가"}
                </S.PartAddText>
                <S.PartAddIcon />
              </S.PartAddField>

              {isPartDropdownOpen && (
                <S.PartDropdown role="listbox">
                  {PART_OPTIONS.map((part) => {
                    const isSelected = selectedParts.includes(part);
                    return (
                      <S.PartDropdownItem
                        key={part}
                        type="button"
                        onClick={() => {
                          setSelectedParts((prev) => {
                            if (prev.includes(part)) {
                              return prev;
                            }
                            return [...prev, part];
                          });
                          setActivePart(part);
                          setIsPartDropdownOpen(false);
                        }}
                        disabled={isSelected}
                        aria-selected={activePart === part}
                      >
                        {part}
                      </S.PartDropdownItem>
                    );
                  })}
                </S.PartDropdown>
              )}
            </S.PartSelectorWrapper>
          </S.FormSection>

          <S.SaveButtonWrapper>
            <S.SaveButton onClick={handleSave}>저장</S.SaveButton>
          </S.SaveButtonWrapper>
        </S.EditProfileSection>
      </S.LeftPanel>

      <S.RightPanel>
        {!activePart && (
          <S.EmptyMessage>
            파트를 추가하고
            <br />
            포트폴리오를 작성해봐요.
          </S.EmptyMessage>
        )}

        {activePart === "PM" && <PMPortfolioForm />}

        {activePart &&
          activePart !== "PM" && (
            <S.NotReadyMessage>
              해당 파트 포트폴리오는 준비 중이에요.
            </S.NotReadyMessage>
          )}
      </S.RightPanel>
    </S.EditContainer>
  );
}
