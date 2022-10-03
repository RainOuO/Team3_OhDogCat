import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  function scrollTop() {
    window.scrollTo(0, 0);
  }
  useEffect(() => {
    scrollTop();
  }, [pathname]);

  return null;
}
