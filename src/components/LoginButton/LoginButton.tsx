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
      <S.Icon>🐶</S.Icon>
      로그인
    </S.Container>
  );
}