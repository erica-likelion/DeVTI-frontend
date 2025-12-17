import { useAuthStore } from '@/stores/authStore';
import axiosInstance from '@/lib/AxiosInstance';


const handleAuthError = (error: any, defaultMessage: string) => {
  const data = error?.response?.data;
  if (data) {
    const msg =
      data.message ||
      data.detail?.non_field_errors?.[0] ||
      data.detail ||
      defaultMessage;
    return typeof msg === 'string' ? msg : defaultMessage;
  }
  return error?.message || defaultMessage;
};


// 구글 로그인
export const googleLogin = async (accessToken: string) => {
  try {
    const response = await axiosInstance.post('/api/auth/google/', { 
      access_token: accessToken 
    });

  
    if (response.data?.status === 'success' && response.data?.data?.key) {
      localStorage.setItem('access_token', response.data.data.key);
      useAuthStore.getState().setLoggedIn(true);

      if (response.data.data.user) {
        // 백엔드 응답 구조에 맞게 매핑
        const userInfo = {
          id: response.data.data.user.pk,
          name: response.data.data.user.username,
          email: response.data.data.user.email,
          profileImage: response.data.data.user.profileImage || undefined
        };
        useAuthStore.getState().login(userInfo);
      }
      return { success: true, data: response.data.data };
    }
    return { success: false, error: '인증 키를 받지 못했습니다.' };
  } catch (error: any) {
    return { success: false, error: handleAuthError(error, 'Google login failed') };
  }
};



// 카카오
export const kakaoLogin = async (accessToken: string) => {
  try {
    const response = await axiosInstance.post('/api/auth/kakao/', { 
      access_token: accessToken 
    });

    if (response.data?.status === 'success' && response.data?.data?.key) {
      localStorage.setItem('access_token', response.data.data.key);
      useAuthStore.getState().setLoggedIn(true);

      if (response.data.data.user) {
        // 백엔드 응답 구조에 맞게 매핑
        const userInfo = {
          id: response.data.data.user.pk,
          name: response.data.data.user.username,
          email: response.data.data.user.email,
          profileImage: response.data.data.user.profileImage || undefined
        };
        useAuthStore.getState().login(userInfo);
      }
      return { success: true, data: response.data.data };
    }
    return { success: false, error: '인증 실패' };
  } catch (error: any) {
    return { success: false, error: '백엔드 인증 에러' };
  }
};


export const logout = async () => {
  try {
    const response = await axiosInstance.post('/api/auth/logout/');
    if (response.data?.status === 'success') {
      localStorage.removeItem('access_token');
      useAuthStore.getState().logout();
      return { success: true, data: response.data.data };
    }
    return { success: false, error: 'Logout failed' };
  } catch (error: any) {
    localStorage.removeItem('access_token');
    useAuthStore.getState().logout();
    return { success: false, error: handleAuthError(error, 'Logout failed') };
  }
};