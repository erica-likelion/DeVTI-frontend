import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
`;

export const Label = styled.label<{ required?: boolean }>`
  ${theme.fonts.heading.h2}
  color: ${theme.colors.grayScale.black};
  width: 8.25rem;
  flex-shrink: 0;
  padding-top: 0.5rem;
  
  ${theme.media.tablet} {
    width: 8rem;
  }
  
  ${theme.media.mobile} {
    width: 6.0625rem;
    flex-shrink: 0;
  }

  ${({ required }) =>
    required &&
    `
    &::after {
      content: ' *';
      color: ${theme.colors.primary.MT500};
    }
  `} 
`;

export const StyledTextArea = styled.textarea<{ 
  $error?: boolean; 
  $resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}>`
  ${theme.fonts.body.l500}
  min-height: 5rem;
  display: flex;
  padding: 1rem;
  align-items: flex-start;
  color: ${theme.colors.grayScale.black};
  background: ${theme.colors.grayScale.white};
  resize: ${({ $resize }) => $resize || 'vertical'};
  font-family: inherit;
  line-height: 1.5;

  border-radius: ${theme.borders.sharp};
  border: 0.06px solid ${({ $error }) => 
    $error ? theme.colors.systems.error : theme.colors.grayScale.gray300};
  
  &::placeholder {
    color: ${theme.colors.grayScale.gray500};
  }
  
  &:disabled {
    background: ${theme.colors.grayScale.gray100};
    color: ${theme.colors.grayScale.gray500};
    cursor: not-allowed;
    resize: none;
  }
  
  &:read-only {
    background: ${theme.colors.grayScale.gray50};
    cursor: default;
  }
  
  // 반응형 상세값 추후 조절 (AI 값 출력 - 읽기 전용 사용 예정)
  ${theme.media.mobile} {
    width: 11.4rem !important;
    min-height: 4rem;
    padding: 0.875rem;
  }

  ${theme.media.tablet} {
    width: 31.3rem;
    min-height: 5rem;
  }
  
  ${theme.media.desktop} {
    width: 31.3rem;
    min-height: 5rem;
  }

  ${theme.media.wide} {
    width: 31.3rem;
    min-height: 5rem;
  }
`;

export const ErrorMessage = styled.span`
  ${theme.fonts.body.s400}
  color: ${theme.colors.systems.error};
  margin-top: 0.25rem;
  margin-left: calc(8.25rem + 1rem);
  
  ${theme.media.tablet} {
    margin-left: calc(8rem + 1rem);
  }
  
  ${theme.media.mobile} {
    margin-left: calc(6.0625rem + 1rem);
  }
`;