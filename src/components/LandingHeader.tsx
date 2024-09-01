// import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo/notis_large.png';
import { useState } from 'react';
import { Bars4Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const LandingHeader = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <header className="bg-white mx-auto max-w-screen-2xl  xl:max-w-screen-xl 2xl:max-w-screen-2xl py-4 px-12 md:px-16 lg:px-20 flex justify-between items-center">
      <div className="flex-shrink-0">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-12" />{' '}
        </Link>
      </div>
      {toggle ? (
        <XMarkIcon
          onClick={() => setToggle(!toggle)}
          className="w-6 h-6 text-custom-black md:hidden block"
        />
      ) : (
        <Bars4Icon
          onClick={() => setToggle(!toggle)}
          className="w-6 h-6  text-custom-black md:hidden block"
        />
      )}

      <ul className=" hidden md:flex gap-6 text-title-xsm text-custom-black font-medium">
        <li>
          <Link to="/about-us">About Us</Link>
        </li>
        <li>
          <Link to="/contact-us">Contact</Link>
        </li>
        <li>
          {' '}
          <Link to="/privacy-policy">Privacy Policy</Link>
        </li>
        <li>
          {' '}
          <Link to="/term-use">Terms of Use</Link>
        </li>
      </ul>

      {/* Responsive Design */}
      <ul
        className={`duration-500 fixed w-full top-[83px] z-1 bg-custom-blue-dark text-white md:hidden ${
          toggle ? 'left-0' : 'left-[-100%]'
        }`}
      >
        <li className="p-3">
          <Link to="/about-us">About Us</Link>
        </li>
        <li className="p-3">
          <Link to="/contact-us">Contact</Link>
        </li>
        <li className="p-3">
          <Link to="/privacy-policy">Privacy Policy</Link>
        </li>
        <li className="p-3">
          {' '}
          <Link to="/term-use">Term of Use</Link>
        </li>
      </ul>
    </header>
  );
};

export default LandingHeader;
