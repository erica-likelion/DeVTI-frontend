import styled from 'styled-components';

// 버튼 반응형 정의 [완료-스타일 수정도 완료됨]
export const StyledButton = styled.button`
  ${({ theme }) => theme.fonts.heading.h3}
  display: flex;
  width: 28rem;
  padding: 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.grayScale.black};
  color: ${({ theme }) => theme.colors.grayScale.white};
  border: none;
  border-radius: ${({ theme }) => theme.borders.sharp};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary.VT500};
  }

  &:active:not(:disabled) {
    background: ${({ theme }) => theme.colors.secondary.VT700};
  }

  &:focus:not(:disabled), &.clicked {
    background: ${({ theme }) => theme.colors.grayScale.black};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.grayScale.gray300};
    cursor: not-allowed;
  }

  
  
  ${({ theme }) => theme.media.wide} {
    display: flex;
    padding: 0.75rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  
  ${({ theme }) => theme.media.desktop} {
    display: flex;
    padding: 0.75rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  
  ${({ theme }) => theme.media.tablet} {
    display: flex;
    width: 20rem;
    padding: 0.75rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  
  ${({ theme }) => theme.media.mobile} {
    display: flex;
    width: 11.375rem;
    padding: 0.75rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
`;