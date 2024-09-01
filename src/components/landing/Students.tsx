import Student2 from '../../images/student/Student2.png';
import Rectangle2 from '../../images/student/Rectangle2.png';
import CheckIcon from '../../images/notissection/Check_blue.png';
const Students = () => {
  return (
    <section className="Our-work-section relative">
      <div className="max-w-screen-2xl  xl:max-w-screen-xl 2xl:max-w-screen-2xl px-12 py-8 mx-auto md:px-16  lg:py-16 lg:px-20">
        <div className="lg:grid grid-cols-2 gap-27">
          <div className="col-span-1 bg-white z-1 rounded-l-3xl">
            <div className="w-full h-full md:w-1/2 md:h-1/2 lg:h-full lg:w-3/4 m-auto">
              <img src={Student2} className="w-full h-full" alt="" />
            </div>
          </div>
          <div className="col-span-1">
            <h1 className="text-custom-black text-title-md md:text-title-xl font-bold leading-[50px]">
              A Simple, Approved Platform <br /> for Your Needs
            </h1>

            <p className="mt-4 font-normal text-title-xsm1  text-custom-black leading-7">
              Notis centralizes all your searches in one place. No more endless{' '}
              <br />
              navigation between different websites. With Notis, everything is
              at <br /> your fingertips quickly and efficiently.
            </p>
            <div className="max-w-2xl flex  mt-6 mb-4 font-normal text-custom-black text-title-xsm1  md:text-title-sm lg:text-title-xsm dark:text-gray-400 ">
              <div className="w-[28px] sm:w-[25px] h-[25px] mr-2 sm:mr-3">
                <img
                  src={CheckIcon}
                  alt=""
                  className=" mt-1  w-full h-full object-cover h-title-xxl"
                />
              </div>
              <div>
              <p className='font-bold text-title-sm text-custom-blue-full'>Intuitive Interface</p>
              <p className='text-title-xsm text-custom-black font-medium'>Simple and easy to use design</p>
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
              <p className='font-bold text-title-sm text-custom-blue-full'>Updated Data</p>
              <p className='text-title-xsm text-custom-black font-medium'>Real-time information so you don't miss any opportunity</p>
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
              <p className='font-bold text-title-sm text-custom-blue-full'>Optimized Memory</p>
              <p className='text-title-xsm text-custom-black font-medium'>Save your preferences and favorite offers efficiently</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Background image in right top corner */}
      <div
        className="xl:absolute xl:top-0 xl:left-0 xl:w-1/4 xl:h-full xl:bg-cover xl:bg-center"
        style={{
          backgroundImage: `url(${Rectangle2})`,
        }}
      ></div>
    </section>
  );
};

export default Students;
