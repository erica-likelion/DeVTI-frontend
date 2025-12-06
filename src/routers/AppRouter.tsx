/**가을 축제 에서는 main.tsx에서 전체 관리를 했었는데,
 * 이번 프로젝트에서는 더 모듈화 시키고 유지보수가 편하게
 * 라우터들을 별도 파일에 분리하는게 어떨까해서
 * 파일을 main.tsx랑 AppRouter.tsx로 분리해놨습니다! **/

import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layouts/Layout";
// TODO: 페이지가 많아지면 lazy loading을 고려해보는거 어떨까요..?
// import { lazy, Suspense } from 'react';
// const HomePage = lazy(() => import('@/pages/HomePage'));

// TODO: 실제 페이지 컴포넌트로 교체
import HomePage from "@/pages/home/HomePageDefault";
import HomePageNone from "@/pages/home/HomePageNone";
import LandingPage from "@/pages/landing/LandingPage";
import LoginPage from "@/pages/login/LoginPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import PMPortfolioViewPage from "@/pages/profile/PMPortfolioViewPage";
import DesignPortfolioViewPage from "@/pages/profile/DesignPortfolioViewPage";
import ProfileDefaultPage from "@/pages/profile/ProfileDefaultPage";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import JoinRoom from "@/pages/joinroom/JoinRoom";
import NewRoom from "@/pages/newroom/NewRoom";
import NewRoomCode from "@/pages/newroom/NewRoomCode";
import JoinRoomPR from "@/pages/joinroom/JoinRoomPR";
import TestPage from "@/pages/test/TestPage";
import DBTIEditPage from "@/pages/profile/edit/DBTI/DBTIEditPage";
import ProfileEditPage from "@/pages/profile/edit/DBTI/ProfileEditPage";
// import DBTIResultPage from "@/pages/profile/edit/DBTI/DBTIResultPage";
import DBTIPage from "@/pages/profile/DBTI/DBTIPage";
import Room from "@/pages/room/Room";
import DashboardPage from "@/pages/manageroom/dashboard/DashboardPage";
import ManageJoinPage from "@/pages/manageroom/ManageJoinPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "home/none",
        element: <HomePageNone />,
      },
      {
        path: "landing",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/edit",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/edit/:part",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/pm/view",
        element: (
          <ProtectedRoute>
            <PMPortfolioViewPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/design/view",
        element: (
          <ProtectedRoute>
            <DesignPortfolioViewPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/Default",
        element: (
          <ProtectedRoute>
            <ProfileDefaultPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "join-room",
        element: (
          <JoinRoom />
        ),
      },
      {
        path: "join-room/pr",
        element: (
          <JoinRoomPR />
        ),
      },
      {
        path: "room",
        element: (
          <Room />
        ),
      },
      {
        path: "new-room",
        element: (
          <NewRoom />
        ),
      },
      {
        path: "new-room/code",
        element: (
          <NewRoomCode />
        ),
      },
      {
        path: "test",
        element: (
          <TestPage />
        ),
      },
      {
        path: "profile/edit",
        element: (
          <ProfileEditPage />
        ),
      },
      {
        path: "profile/edit/DBTI",
        element: (
          <DBTIEditPage />
        ),
      },
      {
        path: "profile/DBTI",
        element: (
          <DBTIPage />
        ),
      },
      {
        path: "manage/dashboard",
        element: (
          <DashboardPage />
        ),
      },
      {
        path: "manage/join",
        element: (
          <ManageJoinPage />
        ),
      },
      {
        path: "*",
        element: (
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <p>페이지 제작 중</p>
          </div>
        ),
      },
    ],
  },
]);