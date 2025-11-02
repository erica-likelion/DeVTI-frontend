import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

export const Label = styled.label<{ required?: boolean }>`
  ${theme.fonts.heading.h2}
  color: ${theme.colors.grayScale.black};
  width: 8.25rem;
  flex-shrink: 0;
  
  ${theme.media.tablet} {
    width: 8rem;
  }
  ${theme.media.mobile} {
    width: 6.0625rem;
  }

  // 필수 입력란 * 표시
  ${({ required }) =>
    required &&
    `
    &::after {
      content: ' *';
      color: ${theme.colors.primary.MT500};
    }
  `}  
`;

export const StyledInput = styled.input<{ $error?: boolean }>`
  ${theme.fonts.body.l500}
  height: 1.75rem;
  display: flex;
  padding: 1.5rem 1rem;
  align-items: center;
  color: ${theme.colors.grayScale.black};

  border-radius: ${theme.borders.sharp};
  border: 0.06px solid ${({ $error }) => 
    $error ? theme.colors.systems.error : theme.colors.grayScale.gray300};
  
  
  &::placeholder {
    color: ${theme.colors.grayScale.black};
  }
  
  
  &:focus {
    outline: none;
    border-color: ${({ $error }) => 
      $error ? theme.colors.systems.error : theme.colors.systems.default};
  }
  
  &:disabled {
    background: ${theme.colors.grayScale.gray100};
    color: ${theme.colors.grayScale.gray500};
    cursor: not-allowed;
  }
  
  
  ${theme.media.mobile} {
    width: 11.4rem;
    height: 3rem;
  }

  ${theme.media.tablet} {
    width: 31.3rem;
  }
  
  ${theme.media.desktop} {
    width: 31.3rem;
  }

  ${theme.media.wide} {
    width: 31.3rem;
  }
`;

export const ErrorMessage = styled.span`
  ${theme.fonts.body.s400}
  color: ${theme.colors.systems.error};
  margin-top: 0.25rem;
`;