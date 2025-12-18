import * as S from './Footer.styles';

interface FooterProps {
  pathname?: string;
}

const Footer = ({ pathname }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const isLoginPage = pathname === '/login';
  const isProfileRoute = pathname?.includes('/profile') || false;
  const isProfileOnly = pathname === '/profile';
  const isProfileEditPart = pathname?.startsWith('/profile/edit/') || false; // /profile/edit/pm, /profile/edit/design 등

  return (
    <S.Container 
      $isLoginPage={isLoginPage} 
      $isProfileRoute={isProfileRoute} 
      $isProfileOnly={isProfileOnly} 
      $isProfileEditPart={isProfileEditPart}
      $pathname={pathname}
    >
      <S.Content>
        <S.CopyrightText $isLoginPage={isLoginPage}>
          Copyright © {currentYear} Team DevTI. All rights reserved.
        </S.CopyrightText>
      </S.Content>
    </S.Container>
  );
};

export default Footer;
