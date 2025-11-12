import { useNavigate } from 'react-router-dom';
import * as S from './LoginButton.styles';

interface LoginButtonProps {
  className?: string;
}

export default function LoginButton({ className }: LoginButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <S.Container className={className} onClick={handleClick}>
      <S.Icon>
        <img src="/DefaultIMG_Login.webp" alt="Login" />
      </S.Icon>
      로그인
    </S.Container>
  );
}