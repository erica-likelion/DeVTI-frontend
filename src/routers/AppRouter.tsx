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
            <p>더미더미더미 에러 페이지 확인을 위한 더미 텍스트</p>
          </div>
        ),
      },
    ],
  },
]);