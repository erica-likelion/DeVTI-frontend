import React from 'react';
import * as S from './CenterSheet.styles';
import WtMIconButton from '@/components/ButtonStatic/WtMIconButton';
import ArrowLeftTextButton from '@/components/ButtonDynamic/ArrowLeftTextButton';
import ArrowRightTextButton from '@/components/ButtonDynamic/ArrowRightTextButton';
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
  isPreviousDisabled = false
}: CenterSheetProps) {
  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.Container onClick={(e) => e.stopPropagation()}>
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
            {onPrevious && (
              <ArrowLeftTextButton onClick={onPrevious} disabled={isPreviousDisabled}>이전</ArrowLeftTextButton>
            )}
            {onNext && (
              <ArrowRightTextButton onClick={onNext} disabled={!hasAnswer}>다음</ArrowRightTextButton>
            )}
          </S.BottomFrame>
        )}

      </S.Container>
      
    </S.Overlay>
  );
}