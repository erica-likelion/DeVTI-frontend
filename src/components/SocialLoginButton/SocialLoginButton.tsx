import { type ReactNode } from 'react';
import * as S from './SocialLoginButton.styles';

interface SocialLoginButtonProps {
  provider: 'kakao';
  onClick: () => void;
  children: ReactNode;
}

const SocialLoginButton = ({
  provider,
  onClick,
  children
}: SocialLoginButtonProps) => {
  const renderIcon = () => {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M12 3C7.03 3 3 6.15 3 10.13c0 2.57 1.68 4.83 4.22 6.23L6.36 20.4c-.12.31.12.66.46.52l4.65-2.71c.35.05.7.08 1.06.08C16.97 18.28 21 15.13 21 11.15 21 7.17 16.97 4.02 12 4.02z" fill="#FFCD00"/>
      </svg>
    );
  };

  return (
    <S.Button onClick={onClick} $provider={provider}>
      <S.Icon>
        {renderIcon()}
      </S.Icon>
      {children}
    </S.Button>
  );
};

export default SocialLoginButton;