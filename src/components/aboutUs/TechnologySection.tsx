import Image from '../../images/about/about4.png';
const TechnologySection = () => {
  return (
    <>
      <section className="Our-work-section relative ">
        <div className="max-w-screen-2xl  xl:max-w-screen-xl 2xl:max-w-screen-2xl px-12 py-8 mx-auto md:px-16  lg:px-20">
          <div className="lg:grid grid-cols-2 gap-27">
            <div className="col-span-1">
              <div className='pt-15'>

              <h2 className="font-medium text-title-sm  text-custom-black leading-3">
                Our Technology
              </h2>

              <p className="mt-6 font-normal text-title-xsm1  text-custom-black leading-6">
                <strong>Android Exclusive:</strong> Notis is available
                exclusively on Android, ensuring a <br />
                seamless and optimized user experience on this platform.
              </p>
              <p className="mt-6 font-normal text-title-xsm1  text-custom-black leading-6">
                <strong> User-Friendly Interface:</strong> Our app is designed
                with simplicity and ease of use <br /> in mind, making both the
                job and rental search processes straightforward <br /> and
                efficient.
              </p>
              <p className="mt-6 font-normal text-title-xsm1 text-custom-black leading-6">
                <strong> Data Privacy:</strong> We prioritize the security and
                privacy of our users' data, <br /> implementing robust measures
                to protect sensitive information.
              </p>
              </div>
            </div>
            <div className="col-span-1 ">
              <div className="w-full h-full md:w-1/2 md:h-1/2 lg:h-full lg:w-full mt-[-20px] m-auto">
                <img src={Image} className="w-full h-full" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TechnologySection;
