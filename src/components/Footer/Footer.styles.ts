import styled from 'styled-components';

interface ContainerProps {
  $isLoginPage: boolean;
}

interface CopyrightTextProps {
  $isLoginPage: boolean;
}

export const Container = styled.footer<ContainerProps>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  
  ${({ theme }) => theme.media.mobile} {
    display: flex;
    width: 100vw;
    height: 3.75rem;
    padding: 0.75rem 2rem;
    align-items: flex-start;
    gap: 0.625rem;
    flex-shrink: 0;
  }
`;

export const Content = styled.div`
  padding: 1rem 2rem;
  display: flex;
  justify-content: left;
  align-items: left;
  
  ${({ theme }) => theme.media.mobile} {
    padding: 0;
    width: 100%;
  }
`;

export const CopyrightText = styled.p<CopyrightTextProps>`
  ${({ theme }) => theme.fonts.body.m500}
  color: ${({ $isLoginPage, theme }) => 
    $isLoginPage ? theme.colors.grayScale.white : theme.colors.grayScale.gray700};
  margin: 0;
  text-align: left;
`;