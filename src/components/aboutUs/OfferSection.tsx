import Image from '../../images/about/about3.png';
const OfferSection = () => {
  return (
    <>
      <section className="Our-work-section relative ">
        <div className="max-w-screen-2xl  xl:max-w-screen-xl 2xl:max-w-screen-2xl px-12 py-8 mx-auto md:px-16  lg:px-20">
          <div className="lg:grid grid-cols-2 gap-27">
            <div className="col-span-1">
              <div className="w-full h-full md:w-1/2 md:h-1/2 lg:h-full lg:w-full ">
                <img src={Image} className="w-full h-full" alt="" />
              </div>
            </div>
            <div className="col-span-1">
              <h2 className="font-medium text-title-sm  text-custom-black leading-6">
                What We Offer
              </h2>

              <p className="mt-6 font-normal text-title-xsm1  text-custom-black leading-6">
                <strong>Aggregated Listings:</strong> Notis compiles job and
                rental offers from multiple <br /> websites, providing a
                centralized platform for users to find various <br />{' '}
                opportunities in one place.
              </p>
              <p className="mt-6 font-normal text-title-xsm1  text-custom-black leading-6">
                <strong> Personalized Filters:</strong> Users can set their
                preferences to filter job and rental <br /> listings based on
                criteria such as location, industry, job type, and rental <br />{' '}
                specifications, ensuring they see the most relevant
                opportunities.
              </p>
              <p className="mt-6 font-normal text-title-xsm1 text-custom-black leading-6">
                <strong>Notifications: </strong>Stay updated with the latest job
                and rental offers that match <br />
                your preferences through real-time notifications.
              </p>
              <p className="mt-6 font-normal text-title-xsm1 text-custom-black leading-6">
                <strong> Favorites:</strong> Save and organize your favorite job
                and rental listings for easy  <br/>access and future reference.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OfferSection;
