import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import RootLayout from "./pages/RootLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import TrainerPage from "./pages/TrainerPage/TrainerPage";
import RegisterPage from "./pages/LoginPage/RegisterPage";
import ContentPage from "./pages/ContentPage/ContentPage";
import NotificationsPage from "./pages/NotificationsPage/NotificationsPage";
import PlansPage from "./pages/PlansPage/PlansPage";
import ProgressPage from "./pages/ProgressPage/ProgressPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "content", element: <ContentPage /> },
      { path: "register", element: <RegisterPage />},
      { path: "notifications", element: <NotificationsPage />},
      { path: "trainer-dashboard", element: <TrainerPage /> },
      { path: "plans", element: <PlansPage/> },
      { path: "progress", element: <ProgressPage />},
    ],
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
