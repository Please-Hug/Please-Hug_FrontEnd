import AdminLayout      from '../layouts/AdminLayout';
import AdminUsersList   from '../pages/admin/AdminUsersList';
import AdminUserDetail  from '../pages/admin/AdminUserDetail';
import AdminShopPage from "../pages/Shop/AdminShopPage";
import AdminQuestPage from "../pages/Quest/AdminQuestPage";

export default [
  {
    path: '/admin',
    element: <AdminLayout />,  
    children: [
      { index: true, element: <AdminUsersList /> },
      { path: 'users/:username', element: <AdminUserDetail /> },
      { path: "/adminQuest", element: <AdminQuestPage /> },
      { path: "/adminShop", element: <AdminShopPage /> },
    ],
  },
];