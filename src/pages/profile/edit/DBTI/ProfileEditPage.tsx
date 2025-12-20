import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import * as S from './ProfileEditPage.styles';
import { BkMTextButton } from '@/components/ButtonStatic';
import InputField from '@/components/Input/InputField';
import DropBox from '@/components/DropBox/DropBox';
import WtMIconButton from '@/components/ButtonStatic/WtMIconButton';
import Upload from '@/assets/icons/Upload.svg';
import { WtLPawButton } from '@/components/ButtonDynamic';
import { getDBTIResult } from '@/constants/DBTIResults';
import { getProfile, updateProfile } from '@/services/profile';
import { handleError } from '@/utils/errorHandler';

interface ProfileEditPageProps {
  onMoveToDBTIResult?: () => void;
}

export default function ProfileEditPage({ onMoveToDBTIResult }: ProfileEditPageProps) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [selectedPart, setSelectedPart] = useState<string>('');
  const [isDropBoxOpen, setIsDropBoxOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>(user?.name || '');
  const [intro, setIntro] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(user?.profileImage || null);
  const [hasAvailableParts, setHasAvailableParts] = useState<boolean>(false);

  const partOptions = ['PM', '디자인', '프론트엔드', '백엔드'];
  
  // 파트 slug 매핑
  const partToSlug: Record<string, string> = {
    'PM': 'pm',
    '디자인': 'design',
    '프론트엔드': 'frontend',
    '백엔드': 'backend'
  };

  useEffect(() => {
    let isMounted = true;
    const loadProfile = async () => {
      try {
        const result = await getProfile();
        if (!isMounted) return;
        if (result.success && result.data) {
          setName(result.data.username || user?.name || '');
          setIntro(result.data.comment || '');
          
          if (result.data.available_parts?.length) {
            setHasAvailableParts(true);
            const partMap: Record<string, string> = {
              PM: 'PM',
              FE: '프론트엔드',
              BE: '백엔드',
              DE: '디자인',
            };
            const mappedParts = result.data.available_parts
              .map((part) => partMap[part])
              .filter((part): part is string => Boolean(part));
            if (mappedParts[0]) {
              setSelectedPart(mappedParts[0]);
            }
          } else {
            setHasAvailableParts(false);
          }
        }
      } catch (error) {
        handleError(error, { navigate });
      }
    };
    
    loadProfile();
    return () => {
      isMounted = false;
    };
  }, [user?.name]);
  
  // DBTI 결과 가져오기
  const userDBTIResult = user?.dbti ? getDBTIResult(user.dbti) : null;

  const handleSave = async () => {
    try {
      const result = await updateProfile({
        username: name.trim(),
        comment: intro.trim(),
      });
      
      if (!result.success) {
        console.error('프로필 저장 실패:', result.error);
        return;
      }
      
      navigate('/profile/default');
    } catch (error) {
      handleError(error, { navigate });
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMoveToDBTIResult = () => {
    onMoveToDBTIResult?.();
  };

  return (
    <S.Container>
      <S.InfoSection>
        <S.ImageButtonFrame>
          <S.Image>
            <img src={profileImage || "/DefaultIMG_Profile.webp"} alt="프로필 이미지" />
          </S.Image>
          <S.EditIconButton>
            <WtMIconButton disabled={false} onClick={handleImageUpload}>
              <img src={Upload} alt="업로드" />
            </WtMIconButton>
          </S.EditIconButton>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </S.ImageButtonFrame>
        <S.DBTIFrame>
          <S.label>이름</S.label>
          <InputField 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력해주세요"
          />
        </S.DBTIFrame>
        <S.DBTIFrame>
          <S.label>한 줄 소개</S.label>
          <InputField 
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            placeholder="미래의 팀원들에게"
          />
        </S.DBTIFrame>
        <S.DBTIFrame>
          <S.label>DBTI (프로젝트 성향 테스트)</S.label>
          <WtLPawButton onClick={handleMoveToDBTIResult} isActive={!!userDBTIResult} isToggle={true}>
            {userDBTIResult ? userDBTIResult.name.split(', ')[1] || userDBTIResult.name : '테스트'}
          </WtLPawButton>
        </S.DBTIFrame>
        <S.PartFrame>
          <S.label>파트</S.label>
          <DropBox
            value={selectedPart}
            placeholder="파트를 선택해주세요"
            isOpen={isDropBoxOpen}
            options={partOptions}
            onClick={() => setIsDropBoxOpen(!isDropBoxOpen)}
            onSelectOption={(option) => {
              setSelectedPart(option);
              setIsDropBoxOpen(false);
              // 파트 선택 시 해당 포트폴리오 편집 페이지로 이동 (이름과 한줄소개 유지)
              const partSlug = partToSlug[option];
              if (partSlug) {
                navigate(`/profile/edit/${partSlug}`, {
                  state: {
                    name: name.trim(),
                    intro: intro.trim(),
                    profileImage
                  }
                });
              }
            }}
          />
        </S.PartFrame>
      </S.InfoSection>
      <S.ButtonFrame>
        <BkMTextButton onClick={handleSave} disabled={!selectedPart.trim() && !hasAvailableParts}>저장</BkMTextButton>
      </S.ButtonFrame>
    </S.Container>
  );
}
