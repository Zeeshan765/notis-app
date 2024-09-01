import Image from '../../images/about/about2.png';
const AboutSection = () => {
  return (
    <>
      <section className="Our-work-section relative ">
        <div className="max-w-screen-2xl  xl:max-w-screen-xl 2xl:max-w-screen-2xl px-12 py-8 mx-auto md:px-16  lg:px-20">
          <div className="lg:grid grid-cols-2 gap-27">
            <div className="col-span-1">

          <h2 className='font-medium text-title-sm  text-custom-black leading-3'>
            About Us
          </h2>

              <p className="mt-6 font-normal text-title-xsm1  text-custom-black leading-6">
                At Notis, we are dedicated to streamlining both the job search
                and rental <br /> search processes, providing users with the
                most relevant opportunities <br /> tailored to their
                preferences. Our app aggregates job and rental listings from{' '}
                <br />
                various websites, allowing users to filter by their interests,
                receive <br />
                personalized notifications, and save their favorite offers for
                easy access.
              </p>
              <p className="mt-6 font-normal text-title-xsm1  text-custom-black leading-6">
                <strong>Our Vision </strong>To revolutionize the search
                experience for both jobs and rentals by <br /> making it
                efficient, personalized, and user-friendly.
              </p>
              <p className="mt-6 font-normal text-title-xsm1 text-custom-black leading-6">
                <strong>Our Mission </strong> To connect job seekers and renters
                with the best opportunities <br /> through a comprehensive and
                intuitive platform that simplifies the search <br /> process and
                enhances user engagement.
              </p>
            </div>
            <div className="col-span-1">
              <div className="w-full h-full md:w-1/2 md:h-1/2 lg:h-full lg:w-full m-auto">
                <img src={Image} className="w-full h-full" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
