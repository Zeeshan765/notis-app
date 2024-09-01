import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import SignIn from './pages/Authentication/SignIn';
import Landing from './pages/LandingPage';
import Loader from '../../common/Loader';
import routes from './routes';
import apiService from '../../services/ApiService';
import NotFound from './pages/NotFound';
import { Helmet } from 'react-helmet';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import LandingLayout from '../../layout/LandingLayout';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermOfUse from './pages/TermOfUse';

const DefaultLayout = lazy(() => import('../../layout/DefaultLayout'));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const ParentApp = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let isAdmin = apiService.isLoggedIn();

  useEffect(() => {
    if (!isAdmin) {
      return navigate('/');
    }
  }, [isAdmin]);

  useEffect(() => {
    if (
      pathname === '/admin' ||
      pathname === '/admin/' ||
      pathname === '/admin/login'
    ) {
      let url = '/admin/login';
      navigate(url);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <ScrollToTop />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Notis - Jobs and Rentals.</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <Toaster
        position="top-center"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/admin/login" element={<SignIn />} />

        <Route element={<LandingLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/term-use" element={<TermOfUse />} />
          <Route path="*" element={<NotFound isLanding={true} />} />
        </Route>

        {isAdmin && (
          <Route element={<DefaultLayout />}>
            {routes.map((routes, index) => {
              const { path, component: Component } = routes;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <Component isLanding={false} />
                    </Suspense>
                  }
                />
              );
            })}
            <Route path="*" element={<NotFound isLanding={false} />} />
          </Route>
        )}
        <Route path="*" element={<NotFound isLanding={false} />} />
      </Routes>
    </>
  );
};

export default ParentApp;
