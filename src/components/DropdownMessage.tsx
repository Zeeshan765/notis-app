import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { i18n } = useTranslation();

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    axios.defaults.headers.common['Accept-Language'] = language;
    setDropdownOpen(false)
  };
  return (
    <li className="relative" x-data="{ dropdownOpen: false, notifying: true }">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        to="#"
      >
        <GlobeAltIcon className="h-7 w-7 text-gray-700" />
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-16 mt-2.5 flex h-36 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2">
            Choose Language
          </h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          <li >
            <div  onClick={() => handleChangeLanguage('en')} className="flex gap-4.5 cursor-pointer border-t items-center border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 ">
              <h6 className="text-title-xsm font-medium text-black dark:text-white">
                English
              </h6>
            </div>
          </li>
          <li>
            <div onClick={() => handleChangeLanguage('es')}  className="flex gap-4.5 cursor-pointer border-t items-center border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4">
              <h6 className="text-title-xsm font-medium text-black dark:text-white">
                Spanish
              </h6>
            </div>
          </li>
        </ul>
      </div>
      {/* <!-- Dropdown End --> */}
    </li>
  );
};

export default DropdownMessage;
