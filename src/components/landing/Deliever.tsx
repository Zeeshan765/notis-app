import RightArrow from '../../images/icon/rightArrow.png';
import DelieverImage from '../../images/deliever/deliverImage.png';
import Rectangle from '../../images/deliever/Rectangle.png';

const Deliever = () => {
  return (
    <>
      <section className="relative mt-1">
        <div className=" max-w-screen-2xl   px-4 py-8 mx-auto md:px-12 lg:py-16  ">
          <div className="grid grid-cols-12 relative">
            <div className="col-start-10 ">
              <div className="sm:w-40 sm:h-40 w-30 h-30">
                <img className="w-full h-full" src={DelieverImage} alt="" />
              </div>
            </div>

            <div className="col-span-12 mt-8 mb-8 text-center relative ">
              <h2 className="text-title-lg md:text-title-xl text-custom-black font-bold">
                What We Deliver
              </h2>
              <p className="text-custom-black text-title-xsm1 md:text-title-sm mt-5 leading-8">
                Increased awareness of and access to positive school experiences
                and resources that students <br /> actively use, resulting in
                engaged students who stay in school and thrive in their
                communities.
              </p>
              <button className="mt-10 tracking-[2px] inline-block rounded-lg px-6 py-4 text-title-xsm   border border-custom-blue-full text-custom-blue-full font-bold">
                {' '}
                Available on Android
              </button>

              <br />
              <a
                href="https://play.google.com/store/apps/dev?id=8794817605257080354"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="inline-flex mt-15 gap-3  text-title-xsm1 md:text-title-xsm rounded-3xl bg-custom-blue-dark items-center justify-center px-7 py-3 font-medium text-center  text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                  Get Notis Now
                  {/* <img src={RightArrow} alt="" /> */}
                </button>
              </a>

              <div></div>

              <div className="col-start-4 col-span-7 ">
                <div className="sm:w-40 sm:h-40 w-25 h-25">
                  <img className="w-full h-full" src={DelieverImage} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background image in right top corner */}
        <div
          className="xl:absolute xl:top-0 xl:left-0 xl:w-1/4 xl:h-[350px] xl:bg-cover xl:bg-center"
          style={{
            backgroundImage: `url(${Rectangle})`,
          }}
        ></div>
      </section>
    </>
  );
};

export default Deliever;
