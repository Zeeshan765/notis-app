import { Key, useEffect, useState, useMemo } from 'react';
import apiService from '../services/ApiService';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
interface CountryProps {
  countryId: string;
  setCountryId: (countryId: string) => void;
}

const CountrySelection: React.FC<CountryProps> = ({
  countryId,
  setCountryId,
}) => {
  const {t} = useTranslation()
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountryData = async () => {
      try {
        const response = await apiService.get('api/v1/admin/countries', {});
        const { countries } = response?.data?.data || {};
        setCountries(countries || []);
      } catch (error) {
        console.error('Failed to fetch country data:', error);
      }
    };

    getCountryData();
  }, []);

  const memoizedCountries = useMemo(() => countries, [countries]);

  const handleCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setCountryId(value);
  };

  return (
    <>
      <label className="mb-3 block text-black dark:text-white">{t('Country')}</label>
      <div
      //  className="relative z-20 bg-white dark:bg-form-input"
      >
        {/* Country select */}
        <select
          onChange={handleCountry}
          className=" w-full rounded-lg border border-stroke  bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          value={countryId} // Set the selected value
        >
          <option disabled value="">
            Select Country
          </option>
          {memoizedCountries.map(
            (
              country: {
                _id: any;
                name: string;
              },
              index: Key | null | undefined,
            ) => (
              <option key={index} value={country._id}>
                {country.name}
              </option>
            ),
          )}
        </select>
        {/* Country select arrow */}
        <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill="#637381"
              ></path>
            </g>
          </svg>
        </span>
      </div>
      {/* <div className="md:w-1/2 flex-1 md:flex-none w-full md:mb-0 mb-4.5">
        <label className="mb-3 mt-4.5 md:mt-0 block text-black dark:text-white">
          City
        </label>
        <div className="relative z-20 bg-white dark:bg-form-input">
          <select
            onChange={handleCity}
            required
            value={cityId}
            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
          >
            <option selected disabled value="">
              Select City
            </option>
            {memoizedCities.map(
              (
                city: {
                  _id: any;
                  name: string;
                },
                index: Key | null | undefined,
              ) => (
                <option key={index} value={city._id}>
                  {city.name}
                </option>
              ),
            )}
          </select>
          <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.8">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                  fill="#637381"
                ></path>
              </g>
            </svg>
          </span>
        </div>
      </div> */}
    </>
  );
};

export default CountrySelection;

// const getCitiesData = async (params: any) => {
//   try {
//     setLoading(true);
//     const response = await apiService.get('api/v1/admin/cities', params);
//     const { cities } = response?.data?.data;
//     setCities(cities);
//     setLoading(false);
//   } catch (error) {
//     setLoading(false);
//     console.log(error);
//   }
// };

// useEffect(() => {
//   let searchObj: { country_id?: string } = {
//     country_id: countryId, // Change to country_id
//   };
//   Object.keys(searchObj).forEach((el) => {
//     !searchObj[el as keyof typeof searchObj] &&
//       delete searchObj[el as keyof typeof searchObj];
//   });
//   if (countryId) {
//     getCitiesData(searchObj);
//   }
// }, [req]);

// useEffect(() => {
//   debouncedCallApi();
// }, [countryId]);
