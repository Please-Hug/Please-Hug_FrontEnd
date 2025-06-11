import { createBrowserRouter } from "react-router-dom";
import publicRoutes from "./public.routes";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import adminRoutes from "./admin.routes";
import NotFoundPage from "../pages/error/NotFoundPage";

const router = createBrowserRouter([
  ...publicRoutes,
  ...authRoutes,
  ...userRoutes,
  ...adminRoutes,
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
