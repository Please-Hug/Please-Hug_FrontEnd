import PublicLayout from "../layouts/PublicLayout";
import HomePage from "../pages/Home/HomePage";
export default [
  {
    element: <PublicLayout />,
    children: [{ path: "/", element: <HomePage /> }],
  },
];
