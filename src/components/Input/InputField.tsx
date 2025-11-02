import React, { forwardRef } from 'react';
import * as S from './InputField.styles';

//url: 깃허브 주소용
interface InputFieldProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'url';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
  // error?: boolean;
  // errorMessage?: string;
  label?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      type = 'text',
      placeholder,
      value, //제어용 컴포넌트 값
      defaultValue, //비제어 컴포넌트용 값
      onChange,
      disabled = false,
      readOnly = false, // 읽기 전용 상태 (불필요시 삭제 -> 이후 텍스트 버튼에 쓸지 고민)
      required = false,
      name,
      id,
      className, // 추가 스타일용 클래스
      // error = false, // 필수 입력값 부재시 : 에러 상태 및 메시지 표시 (논의 후 제거합시다!)
      // errorMessage,
      label, //입력 필드 라벨 테스트  (반응형 적용)
      ...rest // 확장성 확보용 props
    },
    ref
  ) => {
    return (
      <S.Container className={className}>
        {label && (
          <S.Label htmlFor={id} required={required}> 
            {label}
          </S.Label> 
        )}
        <S.StyledInput
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value} 
          defaultValue={defaultValue} 
          onChange={onChange}
          disabled={disabled} 
          readOnly={readOnly}
          required={required}
          name={name}
          id={id}
          // $error={error}
          {...rest}
        /> 
        {/* {error && errorMessage && (
          <S.ErrorMessage>{errorMessage}</S.ErrorMessage> 
        )} */}
      </S.Container>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;