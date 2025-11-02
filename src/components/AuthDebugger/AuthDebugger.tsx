import { useAuthStore } from '@/stores/authStore';
import * as S from './AuthDebugger.styles';

export default function AuthDebugger() {
  const { isLoggedIn, user, login, logout } = useAuthStore();

  const handleLogin = () => {
    login({
      id: '1',
      name: '테스트 사용자',
      email: 'test@example.com',
      profileImage: 'https://via.placeholder.com/32'
    });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <S.Container>
      <S.Title>로그인 상태 디버거</S.Title>
      <S.Status>
        상태: {isLoggedIn ? '로그인됨' : '로그아웃됨'}
      </S.Status>
      {user && (
        <S.UserInfo>
          <div>이름: {user.name}</div>
          <div>이메일: {user.email}</div>
        </S.UserInfo>
      )}
      <S.ButtonGroup>
        <S.Button onClick={handleLogin} disabled={isLoggedIn}>
          테스트 로그인
        </S.Button>
        <S.Button onClick={handleLogout} disabled={!isLoggedIn}>
          로그아웃
        </S.Button>
      </S.ButtonGroup>
    </S.Container>
  );
}