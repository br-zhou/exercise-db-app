import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import RootLayout from "./pages/RootLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import TrainerPage from "./pages/TrainerPage/TrainerPage";
import RegisterPage from "./pages/LoginPage/RegisterPage";
import PlansPage from "./pages/PlansPage/PlansPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage />},
      { path: "trainer-dashboard", element: <TrainerPage /> },
      { path: "plans", element: <PlansPage/> },
    ],
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
