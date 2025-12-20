import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';



const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://devti.site',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // FormData인 경우 Content-Type을 제거 (브라우저가 자동으로 boundary 포함하여 설정)
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    // 로컬 스토리지에서 토큰 가져오기
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 401 에러 시 토큰 제거하고 로그인 페이지로 이동
    if (error.response?.status === 401) {
      console.error('인증 실패: 토큰이 유효하지 않습니다.');
      localStorage.removeItem('access_token');
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);

export const getAuthToken = () =>
  localStorage.getItem('access_token') || `150207ea9e570dd9fd7199614f81195ac124c1f4`;

  axiosInstance.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;