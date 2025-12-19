import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 로그인 전 후 상태관리 (Zustand)
interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  dbti?: number; // DBTI 결과 ID (예: 1, 2, 3...)
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  setLoggedIn: (value: boolean) => void; 
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      login: (user: User) => set({ isLoggedIn: true, user }),
      logout: () => set({ isLoggedIn: false, user: null }),
      updateUser: (userData: Partial<User>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
      setLoggedIn: (value: boolean) => set({ isLoggedIn: value }),
    }),
    { name: 'auth-storage' }
  )
);
