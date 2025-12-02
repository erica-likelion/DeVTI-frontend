import React from 'react';
import * as S from './CenterSheet.styles';
import WtMIconButton from '@/components/ButtonStatic/WtMIconButton';
import ArrowLeftTextButton from '@/components/ButtonDynamic/ArrowLeftTextButton';
import ArrowRightTextButton from '@/components/ButtonDynamic/ArrowRightTextButton';
import BlackMTextButton from '@/components/ButtonStatic/BkMTextButton';
import ProgressBar from '@/components/Progress/ProgressBar';
import Xblack from '@/assets/icons/Xblack.svg';

interface CenterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showNavigation?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  hasAnswer?: boolean;
  isPreviousDisabled?: boolean;
  currentPage?: number;
  isLastPage?: boolean;
}

export default function CenterSheet({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  showNavigation = false,
  onPrevious,
  onNext,
  hasAnswer = false,
  isPreviousDisabled = false,
  currentPage,
  isLastPage = false
}: CenterSheetProps) {
  if (!isOpen) return null;

  return (
    <S.Overlay>
      <S.Container>
        <S.ButtonFrame>
          <WtMIconButton onClick={onClose} disabled={false}>
            <img src={Xblack} alt="close" />
          </WtMIconButton>
        </S.ButtonFrame>
        <S.ContentFrame>
          {title && <S.Title>{title}</S.Title>}
          <S.Content>
            {children}
          </S.Content>
        </S.ContentFrame>
        {showNavigation && (
          <S.BottomFrame>
            <S.LeftSection>
              {onPrevious && (
                <ArrowLeftTextButton onClick={onPrevious} disabled={isPreviousDisabled}>이전</ArrowLeftTextButton>
              )}
              {currentPage !== undefined && (
                <ProgressBar currentPage={currentPage} />
              )}
            </S.LeftSection>
            <S.RightSection>
              {onNext && (
                isLastPage ? (
                  <BlackMTextButton onClick={onNext} disabled={!hasAnswer}>제출</BlackMTextButton>
                ) : (
                  <ArrowRightTextButton onClick={onNext} disabled={!hasAnswer}>다음</ArrowRightTextButton>
                )
              )}
            </S.RightSection>
          </S.BottomFrame>
        )}

      </S.Container>
      
    </S.Overlay>
  );
}