import React, { forwardRef } from 'react';
import * as S from './TextAreaField.styles';

interface TextAreaFieldProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
  // error?: boolean;
  // errorMessage?: string;
  label?: string;
  rows?: number;
  cols?: number;
  maxLength?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  (
    {
      placeholder,
      value,
      defaultValue,
      onChange,
      disabled = false,
      readOnly = false,
      required = false,
      name,
      id,
      className,
      // error = false,
      // errorMessage,
      label,
      rows = 3,
      cols,
      maxLength,
      resize = 'vertical',
      ...rest
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
        <S.StyledTextArea
          ref={ref}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          name={name}
          id={id}
          rows={rows}
          cols={cols}
          maxLength={maxLength}
          // $error={error}
          $resize={resize}
          {...rest}
        />
        {/* {error && errorMessage && (
          <S.ErrorMessage>{errorMessage}</S.ErrorMessage>
        )} */}
      </S.Container>
    );
  }
);

TextAreaField.displayName = 'TextAreaField';

export default TextAreaField;