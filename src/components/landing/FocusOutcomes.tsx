import Student1 from '../../images/student/Student1.png';
import Rectangle from '../../images/student/Rectangle.png';
const FocusOutcomes = () => {
  return (
    <section className="Our-work-section relative">
      <div className=" max-w-screen-2xl  xl:max-w-screen-xl 2xl:max-w-screen-2xl px-12 py-8 mx-auto md:px-16  lg:py-16 lg:px-20  ">
        <div className="lg:grid grid-cols-2 gap-20">
          <div className="col-span-1 pt-0 md:pt-4 xl:pt-8 ">
            <h1 className="text-custom-black text-title-md md:text-title-xl font-bold md:leading-[50px]">
              Notis in a Nutshell
            </h1>
            <h2 className='font-normal text-custom-black text-title-md'>
              By Users, For Users
            </h2>
            <p className="mt-6 font-normal text-title-xsm1 md:text-title-xsm text-custom-black leading-8">
              Notis was developed with you in mind, focusing on making job or
              <br />
              rental searches easier.
            </p>
            <p className="mt-6 font-normal text-title-xsm1 md:text-title-xsm text-custom-black leading-6">
              Created by a passionate team, Notis uses advanced technology to{' '}
              <br /> offer you an optimized and personalized user experience.
            </p>
          </div>
          <div className="col-span-1  px-5">
            <div className="w-full h-full md:w-1/2 md:h-1/2 lg:h-full lg:w-full  xl:h-[400px] xl:w-[550px] m-auto mt-2 lg:mt-[-14px] lg:ml-auto">
              <img src={Student1} className="w-full h-full" alt="" />
            </div>
          </div>
        </div>
      </div>
      {/* Background image in right top corner */}
      <div
        className="xl:absolute xl:-top-17 xl:right-0 xl:w-[23%] xl:h-[550px] xl:bg-cover xl:bg-center"
        style={{
          backgroundImage: `url(${Rectangle})`,
        }}
      ></div>
    </section>
  );
};

export default FocusOutcomes;
