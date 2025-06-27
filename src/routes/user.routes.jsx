import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../pages/User/DashboardPage";
import MissionOverviewPage from "../pages/Mission/MissionOverviewPage";
import QuestPage from "../pages/Quest/QuestPage";
import LogoutPage from "../pages/User/LogoutPage";
import MyInfoPage from "../pages/User/MyInfoPage";

export default [
  {
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
        // loader: dashboardLoader, // 데이터 로더
        // errorElement: <DashboardErrorPage />, // 에러 바운더리
      },
      {
        path: "/missions",
        element: <MissionOverviewPage />,
      },
      {
        path: "/quest",
        element: <QuestPage />,
      },
      {
        path: "/logout",
        element: <LogoutPage />,
      },
      {
        path: "/profile",
        element: <MyInfoPage />
      },
      // { path: "/settings", element: <SettingsPage /> },
      // ... 추가 사용자 경로
    ],
  },
];
