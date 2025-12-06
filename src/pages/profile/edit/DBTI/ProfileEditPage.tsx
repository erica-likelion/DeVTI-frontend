import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './ProfileEditPage.styles';
import { BkMTextButton } from '@/components/ButtonStatic';
import InputField from '@/components/Input/InputField';
import DropBox from '@/components/DropBox/DropBox';
import WtMIconButton from '@/components/ButtonStatic/WtMIconButton';
import Upload from '@/assets/icons/Upload.svg';
import { WtLPawButton } from '@/components/ButtonDynamic';

interface ProfileEditPageProps {
  onMoveToDBTIResult?: () => void;
}

export default function ProfileEditPage({ onMoveToDBTIResult }: ProfileEditPageProps) {
  const navigate = useNavigate();
  const [selectedPart, setSelectedPart] = useState<string>('');
  const [isDropBoxOpen, setIsDropBoxOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const partOptions = ['PM', '디자인', '프론트엔드', '백엔드'];
  
  // 파트 slug 매핑
  const partToSlug: Record<string, string> = {
    'PM': 'pm',
    '디자인': 'design',
    '프론트엔드': 'frontend',
    '백엔드': 'backend'
  };
  
  const userName = '송재현'; // 기본값, 나중에 props나 상태관리에서 받아올 예정
  const userIntro = '저는 팀장입니다'; // 기본값, 나중에 props나 상태관리에서 받아올 예정

  const handleSave = () => {
    // 로직 확인용으로 임시 추가 (이후 제거 예정) - 이후 profile/default로 변경
    console.log('프로필 정보가 저장되었습니다.');
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 처리 로직 테스트용 임시 추가 (이후 제거 예정)
      console.log('선택된 파일:', file.name);
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
            <img src="/DefaultIMG_Profile.webp" alt="프로필 이미지" />
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
            variant="output" 
            value={userName}
          />
        </S.DBTIFrame>
        <S.DBTIFrame>
          <S.label>한 줄 소개</S.label>
          <InputField 
            variant="output" 
            value={userIntro}
          />
        </S.DBTIFrame>
        <S.DBTIFrame>
          <S.label>DBTI (프로젝트 성향 테스트)</S.label>
          <WtLPawButton onClick={handleMoveToDBTIResult}>골든 리트리버</WtLPawButton>
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
              // 파트 선택 시 해당 포트폴리오 편집 페이지로 이동
              const partSlug = partToSlug[option];
              if (partSlug) {
                navigate(`/profile/edit/${partSlug}`);
              }
            }}
          />
        </S.PartFrame>
      </S.InfoSection>
      <S.ButtonFrame>
        <BkMTextButton onClick={handleSave}>저장</BkMTextButton>
      </S.ButtonFrame>
    </S.Container>
  );
}