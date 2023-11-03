import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import { useEffect } from "react";

const RootLayout = () => {
  const { pathname } = useLocation();

  // Scroll to top on page change
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
