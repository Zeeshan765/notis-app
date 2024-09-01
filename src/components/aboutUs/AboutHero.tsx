import AboutImage from '../../images/about/about1.png';

const AboutHero = () => {
  return (
    <>
      <section className="Our-work-section relative">
        <div className="bg-gradient-to-r from-custom-blue-light to-custom-blue-dark ">
          <div className="max-w-screen-2xl  xl:max-w-screen-xl 2xl:max-w-screen-2xl px-12 py-8 mx-auto md:px-16  lg:py-16 lg:px-20">
            <div className="rounded-2xl lg:grid grid-cols-2 gap-27 bg-[#B1D3FF33] p-4">
              <div className="col-span-1 ">
                <div className="p-10 place-self-end  ">
                  <h2 className="max-w-2xl lg:mt-7 lg:pl-10 mb-4 lg:mb-0 text-title-lg xl:text-title-lg  text-white font-bold tracking-normal    dark:text-blue-gray-400">
                  Empowering Job Seekers and Renters
                  </h2>
                  <h1 className="max-w-2xl mb-4 mt-1 lg:pl-10 lg:mb-0 text-title-lg xl:text-title-xxl2 text-white font-extrabold tracking-tight leading-10   dark:text-blue-gray-400">
                    Through Connection
                  </h1>
                  <h1 className="max-w-2xl mt-1 mb-6  lg:pl-10 text-title-lg xl:text-title-lg  text-white font-medium tracking-tight leading-10    dark:text-blue-gray-400">
                    and Engagement
                  </h1>
                </div>
              </div>

              <div className="col-span-1 ">
                <div className="hidden lg:mt-0 lg:flex lg:justify-end lg:pr-10">
                  <img src={AboutImage} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutHero;
