/**가을 축제 에서는 main.tsx에서 전체 관리를 했었는데, 
 * 이번 프로젝트에서는 더 모듈화 시키고 유지보수가 편하게
 * 라우터들을 별도 파일에 분리하는게 어떨까해서 
 * 파일을 main.tsx랑 AppRouter.tsx로 분리해놨습니다! **/

import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layouts/Layout';
// TODO: 페이지가 많아지면 lazy loading을 고려해보는거 어떨까요..?
// import { lazy, Suspense } from 'react';
// const HomePage = lazy(() => import('@/pages/HomePage'));

// TODO: 실제 페이지 컴포넌트로 교체
import HomePage from '@/pages/home/HomePageDefault';
import HomePageNone from '@/pages/home/HomePageNone';
import LandingPage from '@/pages/landing/LandingPage';
import LoginPage from '@/pages/login/LoginPage';



export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'home/none',
        element: <HomePageNone />,
      },
      {
        path: 'landing',
        element: <LandingPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      
      {
        path: '*',
        element: (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <p>페이지 제작 중</p>
          </div>
        ),
      },
    ],
  },
]);