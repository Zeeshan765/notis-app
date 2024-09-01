import { Outlet } from 'react-router-dom';
import LandingHeader from '../components/LandingHeader';
import Footer from '../components/Footer';

const LandingLayout = () => {
  return (
    <>
    <div className='bg-white'>
    <LandingHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
     
    </>
  );
};

export default LandingLayout;
