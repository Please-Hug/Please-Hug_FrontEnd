import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../pages/user/DashboardPage";
import MissionOverviewPage from "../pages/mission/MissionOverviewPage";
// import useAuthStore from "../stores/auth.store";

// 라우트 로더 함수 (데이터 프리페칭)
// const dashboardLoader = async () => {
//   const data = await fetch("/api/user/dashboard");
//   return data.json();
// };

const UserRoutes = () => {
  // const { user, isLoading } = useAuthStore();

  // if (isLoading) return <div>Loading...</div>;
  // if (!user) return <Navigate to="/login" replace />;

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default [
  {
    element: <UserRoutes />,
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
      // { path: "/profile", element: <ProfilePage /> },
      // { path: "/settings", element: <SettingsPage /> },
      // ... 추가 사용자 경로
    ],
  },
];
