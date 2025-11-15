import * as S from './Footer.styles';

interface FooterProps {
  pathname?: string;
}

const Footer = ({ pathname }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const isLoginPage = pathname === '/login';

  return (
    <S.Container $isLoginPage={isLoginPage}>
      <S.Content>
        <S.CopyrightText $isLoginPage={isLoginPage}>
          Copyright © {currentYear} Team DevTI. All rights reserved.
        </S.CopyrightText>
      </S.Content>
    </S.Container>
  );
};

export default Footer;