import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import AdBanner from "../components/AdBanner/AdBanner";
import { serverPost } from "../utils/api";

const RootLayout = () => {
  const { pathname } = useLocation();
  const [adData, setAddata] = useState(null);
  const token = JSON.parse(localStorage.getItem("token") || "{}");

  // Scroll to top on page change
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  const loadAd = async () => {
    const data = await serverPost("POST", "get-ad", token);
    if (data) {
      setAddata({title: data[1], href: data[2]});
    }
  };

  useEffect(() => {
    loadAd();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      {adData && <AdBanner {...adData} />}
    </div>
  );
};

export default RootLayout;
