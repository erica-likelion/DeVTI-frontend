/**가을 축제 에서는 main.tsx에서 전체 관리를 했었는데, 
 * 이번 프로젝트에서는 더 모듈화 시키고 유지보수가 편하게
 * 라우터들을 별도 파일에 분리하는게 어떨까해서 
 * 파일을 main.tsx랑 AppRouter.tsx로 분리해놨습니다! **/

import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '@/layouts/Layout';
// TODO: 페이지가 많아지면 lazy loading을 고려해보는거 어떨까요..?
// import { lazy, Suspense } from 'react';
// const HomePage = lazy(() => import('@/pages/HomePage'));

// TODO: 실제 페이지 컴포넌트로 교체
import HomePage from '@/pages/HomePage';



export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      // TODO: 추가 라우트 정의
      // { path: 'about', element: <AboutPage /> },
      // { path: 'contact', element: <ContactPage /> },
      {
        path: '*',
        element: (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>비상 ! 에러</h2>
            <p>더미더미더미 에러 페이지 확인을 위한 더미 텍스트 - 실제로는 페이지 생성해서 스타일 추가 하는게 좋을 것 같음</p>
          </div>
        ),
      },
    ],
  },
]);