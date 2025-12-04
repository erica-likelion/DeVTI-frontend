import styled from 'styled-components';

interface ContainerProps {
  $isLoginPage: boolean;
  $isProfileRoute: boolean;
  $isProfileOnly?: boolean;
  $isProfileEditPart?: boolean;
}

interface CopyrightTextProps {
  $isLoginPage: boolean;
}

export const Container = styled.footer<ContainerProps>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  height: 4.5rem;
  background: ${({ $isProfileRoute, $isProfileOnly, $isProfileEditPart, theme }) => {
    if ($isProfileOnly) return 'transparent'; // /profile → 투명
    if ($isProfileEditPart) return theme.colors.grayScale.white; // /profile/edit/pm, /profile/edit/design 등 → 흰색
    if ($isProfileRoute) return theme.colors.grayScale.gray50; // 나머지 프로필 페이지 → 회색
    return 'transparent';
  }};
  
  ${({ theme }) => theme.media.mobile} {
    display: flex;
    width: 100vw;
    height: 3.75rem;
    padding: 0.75rem 1rem;
    align-items: flex-start;
    gap: 0.625rem;
    flex-shrink: 0;
    background: ${({ $isProfileRoute, $isProfileOnly, $isProfileEditPart, theme }) => {
      if ($isProfileOnly) return 'transparent';
      if ($isProfileEditPart) return theme.colors.grayScale.white;
      if ($isProfileRoute) return theme.colors.grayScale.gray50;
      return 'transparent';
    }};
  }
`;

export const Content = styled.div`
  padding: 0.75rem 2.5rem 1.5rem;
  display: flex;
  justify-content: left;
  align-items: left;
  
  ${({ theme }) => theme.media.tablet} {
    padding: 0.75rem 2rem 1.5rem;
  }
  
  ${({ theme }) => theme.media.desktop} {
    padding: 0.75rem 2rem 1.5rem;
  }
  
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
