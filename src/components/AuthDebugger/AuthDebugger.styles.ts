import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: ${({ theme }) => theme.colors.grayScale.white};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray300};
  border-radius: ${({ theme }) => theme.borders.sharp};
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  min-width: 200px;
`;

export const Title = styled.h3`
  ${({ theme }) => theme.fonts.body.m500};
  margin: 0 0 8px 0;
  color: ${({ theme }) => theme.colors.grayScale.gray800};
`;

export const Status = styled.div`
  ${({ theme }) => theme.fonts.body.r400};
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.grayScale.gray700};
`;

export const UserInfo = styled.div`
  ${({ theme }) => theme.fonts.body.s400};
  margin-bottom: 12px;
  padding: 8px;
  background: ${({ theme }) => theme.colors.grayScale.gray50};
  border-radius: 4px;
  
  div {
    margin-bottom: 4px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const Button = styled.button`
  ${({ theme }) => theme.fonts.body.s500};
  padding: 6px 12px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray300};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.grayScale.white};
  cursor: pointer;
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.grayScale.gray50};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;