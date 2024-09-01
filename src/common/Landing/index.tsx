import Contact from '../../components/landing/Contact';
import Deliever from '../../components/landing/Deliever';
import Engaging from '../../components/landing/Engaging';
import FocusOutcomes from '../../components/landing/FocusOutcomes';
import HeroSection from '../../components/landing/HeroSection';
import Platform from '../../components/landing/Platform';
import Students from '../../components/landing/Students';

const Landing = () => {
  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <HeroSection />
        <Engaging />
        <FocusOutcomes />
        <Students />
        <Platform />
        <Deliever />
        <Contact />
      </div>
    </>
  );
};

export default Landing;
