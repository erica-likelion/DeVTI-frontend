import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn } = useAuthStore();

  // 개발 환경에서는 ProtectedRoute 우회 (개발 편의를 위해)
  const isDevelopment = import.meta.env.DEV;

  if (!isLoggedIn && !isDevelopment) {
    // 로그인하지 않으면 홈으로 리다이렉트 (프로덕션에서만)
    return <Navigate to="/" replace />;
  }

  // 개발 환경이거나 로그인한 경우
  return <>{children}</>;
}

