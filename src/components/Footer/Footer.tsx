import * as S from './Footer.styles';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <S.Container>
      <S.Content>
        <S.CopyrightText>
          Copyright © {currentYear} Team DevTI. All rights reserved.
        </S.CopyrightText>
      </S.Content>
    </S.Container>
  );
};

export default Footer;