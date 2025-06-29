import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../pages/user/DashboardPage";
import MissionOverviewPage from "../pages/mission/MissionOverviewPage";
import QuestPage from "../pages/Quest/QuestPage";
import LogoutPage from "../pages/user/LogoutPage";
import MyInfoPage from "../pages/user/MyInfoPage";

// 배움일기 관련 페이지들
import StudyDiaryListPage from "../pages/studyDiary/StudyDiaryListPage";
import StudyDiaryWritePage from "../pages/studyDiary/StudyDiaryWritePage";
import StudyDiaryViewPage from "../pages/studyDiary/StudyDiaryViewPage";
import StudyDiaryEditPage from "../pages/studyDiary/StudyDiaryEditPage";
import MyStudyDiaryActivity from "../pages/studyDiary/MyStudyDiaryActivity";

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
      // 배움일기 관련 라우트
      {
        path: "/study-diary",
        element: <StudyDiaryListPage />,
      },
      {
        path: "/study-diary/write",
        element: <StudyDiaryWritePage />,
      },
      {
        path: "/study-diary/:id",
        element: <StudyDiaryViewPage />,
      },
      {
        path: "/study-diary/edit/:id",
        element: <StudyDiaryEditPage />,
      },
      // 나의 활동 페이지
      {
        path: "/my-activity",
        element: <MyStudyDiaryActivity />,
      },
      // { path: "/settings", element: <SettingsPage /> },
      // ... 추가 사용자 경로
    ],
  },
];
