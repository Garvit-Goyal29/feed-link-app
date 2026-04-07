import { useEffect } from "react";
import { useLocation } from "react-router-dom";
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.startsWith("/donate/current")) return;
    if (pathname.startsWith("/donate/history")) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
export default ScrollToTop;