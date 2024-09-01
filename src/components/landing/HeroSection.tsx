import HeroImage from '../../images/hero/hero1.png';
import CheckIcon from '../../images/hero/Check_ring.png';
import RightArrow from '../../images/icon/rightArrow.png';
const HeroSection = () => {
  return (
    <>
      <section className="rounded-b-[3rem] bg-gradient-to-r from-custom-blue-light to-custom-blue-dark dark:bg-gray-900">
        <div className="grid max-w-screen-2xl  xl:max-w-screen-xl 2xl:max-w-screen-2xl px-12 py-8 mx-auto md:px-16  lg:py-16 lg:px-20  lg:grid-cols-12">
          <div className="mr-auto place-self-center  lg:col-span-7 ">
            {/* Heading Start */}
            <h2 className="max-w-2xl mb-4 lg:mb-0 text-title-lg md:text-4xl text-white font-bold tracking-tight leading-none  lg:text-title-xl dark:text-blue-gray-400">
              Engaged Users
            </h2>
            <h1 className="max-w-2xl mb-4 lg:mb-0 text-title-lg md:text-4xl text-white font-extrabold tracking-tight leading-none  lg:text-title-xxl2 dark:text-blue-gray-400">
              Tailored Job Offers
            </h1>
            <h1 className="max-w-2xl mb-6  text-title-lg md:text-4xl text-white font-bold tracking-tight leading-none  lg:text-title-xl dark:text-blue-gray-400">
              Effortless Job Search
            </h1>
            {/* Heading End */}

            <div className="max-w-2xl flex  mb-4 font-medium text-white md:text-lg lg:text-xl dark:text-gray-400 ">
              <div className="w-[28px] sm:w-[25px] h-[25px] mr-3">
                <img
                  src={CheckIcon}
                  alt=""
                  className=" w-full h-full object-cover h-title-xxl"
                />
              </div>
              <span>
                Receive personalized notifications according to your job
                preferences
              </span>
            </div>

            <div className="max-w-2xl flex  mb-4 font-medium text-white md:text-lg lg:text-xl dark:text-gray-400 ">
              <div className="w-[28px] sm:w-[25px] h-[25px] mr-3">
                <img
                  src={CheckIcon}
                  alt=""
                  className=" w-full h-full object-cover h-title-xxl"
                />
              </div>
              <span>
                Filter job offers by category, location, salary, and more
              </span>
            </div>
            <div className="max-w-2xl flex  mb-8 font-medium text-white md:text-lg lg:text-xl dark:text-gray-400 ">
              <div className="w-[28px] sm:w-[25px] h-[25px] mr-3">
                <img
                  src={CheckIcon}
                  alt=""
                  className=" w-full h-full object-cover h-title-xxl"
                />
              </div>
              <span>Save your favorite job offers to review them later</span>
            </div>

            {/* Button GetStarted */}
            {/* <a
              href="#"
              className="inline-flex  gap-3 rounded-3xl bg-black items-center justify-center px-6 py-4 mr-3 text-lg font-medium text-center  text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Get started
             
            </a> */}
            {/* Button GetStarted End */}
          </div>
          {/* Image */}
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src={HeroImage} alt="mockup" />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
