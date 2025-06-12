import PublicLayout from "../layouts/PublicLayout";
import HomePage from "../pages/home/HomePage";
export default [
  {
    element: <PublicLayout />,
    children: [{ path: "/", element: <HomePage /> }],
  },
];
