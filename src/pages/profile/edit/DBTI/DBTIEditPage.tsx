import { useState, useEffect } from 'react';
import * as S from './DBTIEditPage.styles';
import ProfileEditPage from './ProfileEditPage';
import DBTIResultPage from './DBTIResultPage';
import { useIsMobile } from '../../../../hooks/useMediaQuery';
import { useSearchParams } from 'react-router-dom';

export default function DBTIEditPage() {
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  const [currentSection, setCurrentSection] = useState<'left' | 'right'>('left');

  useEffect(() => {
    const isFromCenterSheet = searchParams.get('from') === 'centersheet';
    setCurrentSection(isMobile && isFromCenterSheet ? 'right' : 'left');
  }, [isMobile, searchParams]);

  const handleMoveToRight = () => {
    setCurrentSection('right');
  };

  const handleMoveToLeft = () => {
    setCurrentSection('left');
  };

  const renderSections = () => {
    const leftSection = (
      <S.LeftSection $isVisible={currentSection === 'left'} key="left">
        <ProfileEditPage onMoveToDBTIResult={handleMoveToRight} />
      </S.LeftSection>
    );
    
    const rightSection = (
      <S.RightSection $isVisible={currentSection === 'right'} key="right">
        <DBTIResultPage onRetakeTest={handleMoveToLeft} />
      </S.RightSection>
    );

    return isMobile ? [rightSection, leftSection] : [leftSection, rightSection];
  };

  return (
    <S.Container>
      {renderSections()}
    </S.Container>
  );
}