import * as S from './Footer.styles';

interface FooterProps {
  pathname?: string;
}

const Footer = ({ pathname }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const isLoginPage = pathname === '/login';
  const isProfileRoute = pathname?.includes('/profile') || false;
  const isProfileDefault = pathname === '/profile' || pathname === '/profile/Default' || pathname === '/profile/default';

  return (
    <S.Container $isLoginPage={isLoginPage} $isProfileRoute={isProfileRoute} $isProfileDefault={isProfileDefault}>
      <S.Content>
        <S.CopyrightText $isLoginPage={isLoginPage}>
          Copyright © {currentYear} Team DevTI. All rights reserved.
        </S.CopyrightText>
      </S.Content>
    </S.Container>
  );
};

export default Footer;
