import * as S from "./Modal.styles";
import React from "react";
import Xblack from "../../assets/icons/Xblack.svg";
import { BkMTextButton } from "../ButtonStatic";

interface BaseModalProps {
  isOpen: boolean;
  children: React.ReactNode;    // "입장 코드가 일치하지 않습니다..." 같은 내용
  buttonLabel: string;         // 확인 버튼 문구
  onClose: () => void;          // X 버튼 / 바깥 클릭
  onPrimary?: () => void;       // 확인 버튼 클릭 
}

export default function Modal({
  isOpen,
  children,
  buttonLabel,
  onClose,
  onPrimary,
}: BaseModalProps) {
  if (!isOpen) return null;

  const handleButton = () => {
    if (onPrimary) onPrimary();
    else onClose();
  };


  return (
    <S.Dimmed>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>

        <S.Header>
            <S.CloseButton type="button" onClick={onClose}>
            <img src={Xblack} alt="Close" />
            </S.CloseButton>
        </S.Header>

        <S.ContentWrapper>
          <S.Body>{children}</S.Body>
        </S.ContentWrapper>

        <S.Footer>
          <BkMTextButton type="button" onClick={handleButton}>
            {buttonLabel}
          </BkMTextButton>
        </S.Footer>
      </S.ModalContainer>
    </S.Dimmed>
  );
}
