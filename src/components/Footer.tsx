import { Link } from 'react-router-dom';
import Logo from '../images/logo/notis_dark.png';
const Footer = () => {
  return (
    <>
      <footer className="bg-custom-black">
        <div className="max-w-screen-2xl  xl:max-w-screen-xl 2xl:max-w-screen-2xl px-12 py-8 mx-auto md:px-16  lg:py-16 lg:px-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className=' lg:ml-auto col-span-1'>
              <div className="">
                <img src={Logo} alt="" className="w-36 h-14" />
                {/* <Image src="/AlgoLogo.png" width={120} height={120} alt="" /> */}
              </div>

              <p className="mt-4 max-w-sm text-white font-normal leading-5 text-title-xsm1">
                Discover the best job and rental listings in your city. Notis
                aggregates and summarizes ads from various sources so you can
                easily find what you're looking for. Customize your searches and
                receive instant notifications of new opportunities. 
              </p>
              <div className="text-xs  text-gray-500 border-t mt-8 pt-5 ">
                <ul className="mt-6  text-sm flex gap-10">
                  <li>
                    <Link
                      to={'/privacy-policy'}
                      className="text-title-xsm1 font-semibold text-white transition hover:opacity-75"
                    >
                      Privacy Policy
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={'/term-use'}
                      className="text-title-xsm1 font-semibold text-white transition hover:opacity-75"
                    >
                      Terms of Use
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={'/contact-us'}
                      className="text-title-xsm1 font-semibold text-white transition hover:opacity-75"
                    >
                      Copyright Claims
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1  gap-4 sm:grid-cols-2  lg:col-span-2 lg:grid-cols-2 ">
              <div className="lg:ml-auto">
                <p className="text-title-xsm font-semibold text-white transition hover:opacity-75">
                  {' '}
                  Quick Links
                </p>

                <ul className="mt-6 space-y-4 text-sm ">
                  <li>
                    <Link
                      to="/"
                      className="text-title-xsm1 font-normal text-white transition hover:opacity-75"
                    >
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/about-us"
                      className="text-title-xsm1 font-normal text-white transition hover:opacity-75"
                    >
                      About Us
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/contact-us"
                      className="text-title-xsm1 font-normal text-white transition hover:opacity-75"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="lg:ml-auto">
                <p className="text-title-xsm font-semibold text-white transition hover:opacity-75">
                  Contact
                </p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-title-xsm1 font-normal text-white transition hover:opacity-75"
                    >
                      La Rioja 1235 7B, Mar del <br /> Plata, Provincia de
                      Buenos <br /> Aires, CP 7600, Argentina.
                    </a>
                  </li>

                  <li>
                    <a
                      href="mailto:support@appnotis.com"
                      className="text-title-xsm1 font-normal text-white transition hover:opacity-75"
                    >
                      support@appnotis.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
