import CheckIcon from '../../images/notissection/Check_blue.png';
import GroupImage from '../../images/notissection/Group.png';
const Engaging = () => {
  return (
    <>
      <section className=" mt-1">
        <div className="grid max-w-screen-lg 2xl:max-w-screen-xl xl:max-w-screen-lg  px-4 py-8 mx-auto md:px-12 lg:py-16   lg:grid-cols-12">
          {/* Heading */}
          <div className="col-span-12  mb-8 text-center">
            <h2 className="uppercase tracking-[3px] inline rounded-lg px-6 py-4   border border-custom-blue-full text-custom-blue-full font-bold">
              {' '}
              What is Notis?
            </h2>
            <h1 className="mt-8 text-title-md md:text-title-xl text-custom-black font-extrabold ">
              Notis is an Engaging Application
            </h1>
            <p className="tracking-wider text-title-xsm1 md:text-title-xsm text-custom-black font-normal mt-5 px-7 ">
              For the discerning user looking for jobs or rentals, Notis is the
              comprehensive solution that helps you <br /> find the best
              opportunities.
            </p>
          </div>
          {/* Heading */}
          {/* Content Start */}

          {/* Image */}
          <div className="hidden lg:mt-4 lg:col-span-5 lg:flex ">
            <img src={GroupImage} alt="mockup" />
          </div>

          {/* Image End */}
          <div className="mr-auto place-self-center col-span-12 lg:col-span-7 mt-6 ">
            {/* Heading Start */}

            <h1 className="max-w-2xl mb-6 text-title-md leading-6 md:text-title-xl tracking-wide text-custom-black font-extrabold   dark:text-blue-gray-400">
              Notis Features
            </h1>
            {/* Heading End */}

            <div className="max-w-2xl flex  mb-4 font-normal text-custom-black text-title-xsm1  md:text-title-sm lg:text-title-xsm dark:text-gray-400 ">
              <div className="w-[28px] sm:w-[25px] h-[25px] mr-2 sm:mr-3">
                <img
                  src={CheckIcon}
                  alt=""
                  className=" mt-1  w-full h-full object-cover h-title-xxl"
                />
              </div>
              <div>
                <p className="font-bold text-title-sm text-custom-blue-full">
                  Personalized Filters
                </p>
                <p className="text-title-xsm text-custom-black font-medium">
                  Filter offers by job type, location, salary, and more
                </p>
              </div>
            </div>
            <div className="max-w-2xl flex  mb-4 font-normal text-custom-black text-title-xsm1  md:text-title-sm lg:text-title-xsm dark:text-gray-400 ">
              <div className="w-[28px] sm:w-[25px] h-[25px] mr-2 sm:mr-3">
                <img
                  src={CheckIcon}
                  alt=""
                  className=" mt-1  w-full h-full object-cover h-title-xxl"
                />
              </div>
              <div>
                <p className="font-bold text-title-sm text-custom-blue-full">
                  Real-Time Notifications
                </p>
                <p className="text-title-xsm text-custom-black font-medium">
                  Get alerts when new offers that match your preferences are
                  published
                </p>
              </div>
            </div>
            <div className="max-w-2xl flex  mb-4 font-normal text-custom-black text-title-xsm1  md:text-title-sm lg:text-title-xsm dark:text-gray-400 ">
              <div className="w-[28px] sm:w-[25px] h-[25px] mr-2 sm:mr-3">
                <img
                  src={CheckIcon}
                  alt=""
                  className=" mt-1  w-full h-full object-cover h-title-xxl"
                />
              </div>
              <div>
                <p className="font-bold text-title-sm text-custom-blue-full">
                  Favorites
                </p>
                <p className="text-title-xsm text-custom-black font-medium">
                  Save the offers you are interested in and access them easily.
                </p>
              </div>
            </div>
          </div>
          {/* Content End */}

          {/* Explore Benfits Start */}
          <div className="col-span-12  mb-8 text-center md:flex md:items-center md:justify-center mt-13">
            <h1 className=" text-title-xsm1 md:text-title-xsm text-custom-black font-medium ">
              These benefits – and many more – are yours with Notis!
            </h1>
            <a
              href="https://play.google.com/store/apps/dev?id=8794817605257080354"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="ml-10 mt-4 md:mt-0 inline-flex gap-3 rounded-3xl bg-custom-blue-full items-center justify-center px-3 py-1 md:px-4 md:py-2 mr-3 text-title-xsm1 md:text-lg font-medium text-center  text-white bg-primary-700 ">
                Explore Benefits
              </button>
            </a>
          </div>
          {/* Explore Benfits End */}
        </div>
      </section>
    </>
  );
};

export default Engaging;
