// src/components/Input/InputField.tsx
import React from 'react';
import * as S from './InputFieldL.styles';

interface InputFieldLProps {
  /** 박스 안에 표시할 텍스트 */
  text?: string;
  /** text 대신 children을 직접 넣어서 사용하고 싶을 때 */
  children?: React.ReactNode;
}

const InputFieldL: React.FC<InputFieldLProps> = ({ text, children}) => {
  return (
    <S.Container>
      <S.TextBox>
        {text ?? children}
      </S.TextBox>

    </S.Container>
  );
};

export default InputFieldL;
