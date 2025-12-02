import * as S from './DBTIPage.styles';
import DBTIResultPage from '../edit/DBTI/DBTIResultPage';
import ProfileEditPage from '../edit/DBTI/ProfileEditPage';

export default function DBTIPage() {
  return (
    <S.Container>
      <S.LeftSection>
        {/* profile default로 이후 수정 */}
        <ProfileEditPage /> 
      </S.LeftSection>
      
      <S.RightSection>
        <DBTIResultPage />
      </S.RightSection>
    </S.Container>
  );
}