import { Suspense, lazy, useContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import SignIn from './pages/Authentication/SignIn';

import Loader from '../../common/Loader';

import NotFound from './pages/NotFound';
import apiService from '../../services/ApiService';
import { getRoutes } from './routes';
import { Helmet } from 'react-helmet';
import { SubDomainContext } from '../../contexts/subDomainContext';
import faviconIcon from '../../../public/favicon.jpg';
import RentalIcon from '../../../public/Rental.jpg';

const DefaultLayout = lazy(() => import('../../layout/DefaultLayout'));

const ChildApp = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  let isAdmin = apiService.isLoggedIn();
  // let isAdmin = true
  const SubdomainTitle = useContext(SubDomainContext);

  useEffect(() => {
    if (!isAdmin) {
      return navigate('/admin/login');
    }
  }, [isAdmin]);

  useEffect(() => {
    // @ts-ignore
    const CurrentAppType = localStorage.getItem('AppType');
    // @ts-ignore
    SubdomainTitle.setAppType(CurrentAppType);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  function capitalizeFirstLetterofEachWord(string: string) {
    return string.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  // @ts-ignore
  let title = `${SubdomainTitle?.sub} Notis - Jobs and Rentals.`;
  return loading ? (
    <Loader />
  ) : (
    <>
      {' '}
      <link rel="icon" type="image/svg+xml" href="/favicon.jpg" />
      <Helmet>
        hello
        <meta charSet="utf-8" />
        <title>{capitalizeFirstLetterofEachWord(title)}</title>
        <link rel="canonical" href="http://mysite.com/example" />
        {
          // @ts-ignore
          SubdomainTitle?.appType === 'Job' ? (
            <link rel="icon" type="image/svg+xml" href={faviconIcon} />
          ) : (
            <link rel="icon" type="image/svg+xml" href={RentalIcon} />
          )
        }
      </Helmet>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/admin/login" element={<SignIn />} />

        {isAdmin && (
          <Route element={<DefaultLayout />}>
            {/* @ts-ignore */}
            {getRoutes(SubdomainTitle?.appType).map((routes, index) => {
              const { path, component: Component } = routes;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            })}
            <Route
              path="*"
              element={
                <Navigate
                  to={
                    SubdomainTitle?.appType === 'Rental'
                      ? '/panel/rentals'
                      : '/panel/jobs'
                  }
                />
              }
            />
          </Route>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default ChildApp;
