import RightArrow from '../../images/icon/rightArrow.png';
import GooglePlay from '../../images/contact/googlePlay.png';
import General from './General';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Spinner } from '@material-tailwind/react';

const Contact = () => {
  const generalArray = [
    {
      id: 1,
      title: 'Claims and Reports',
      description: `We're here to answer your questions\n
     remove@appnotis.com`,
    },
    {
      id: 2,
      title: 'IT Support',
      description: `Our friendly team is here to help\n
    support@appnotis.com`,
    },
  ];

  // Validation
  const validationSchema = yup.object({
    first_name: yup.string().required('First Name is required'),
    last_name: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    message: yup.string().required('Message is required'),
  });
  // Initial Values
  const [initialValues, setInitialValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    message: '',
  });
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(setInitialValues);
  const onSubmit = async (values: any, { resetForm }: any) => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://appnotis.com:3002/api/v1/admin/contact',
        values,
      );

      const { success, message } = response.data;

      if (success) {
        toast.success(message);
        resetForm();
        setIsVerified(false);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error);
    }
  };

  //Formik
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });
  return (
    <section className="Our-work-section relative">
      <div className=" max-w-screen-2xl  xl:max-w-screen-xl 2xl:max-w-screen-2xl px-12 py-8 mx-auto md:px-16  lg:py-16 lg:px-20">
        <h1 className="mb-9 text-title-md md:text-title-xl text-center text-custom-black font-extrabold ">
          Contact Us
        </h1>
        <div className="lg:grid grid-cols-2 gap-27">
          <form onSubmit={formik.handleSubmit}>
            <div className=" xl:flex    xl:flex-wrap xl:gap-[6%] justify-between    ">
              <div className=" xl:w-[45%]  mt-2 ">
                <label className="text-title-xsm1 text-custom-black font-normal">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="Michael"
                  className={`w-full rounded-lg border ${
                    formik.touched.first_name && formik.errors.first_name
                      ? 'border-red-500'
                      : 'border-stroke'
                  } bg-transparent py-4 pl-6 mt-2 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.first_name}
                />
                {formik.touched.first_name && formik.errors.first_name && (
                  <div className="mt-2 text-red-500">
                    {formik.errors.first_name}
                  </div>
                )}
              </div>
              <div className="xl:w-[45%] mt-2 ">
                <label className="text-title-xsm1 text-custom-black font-normal">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Smith"
                  className={`w-full rounded-lg border ${
                    formik.touched.last_name && formik.errors.last_name
                      ? 'border-red-500'
                      : 'border-stroke'
                  } bg-transparent py-4 pl-6 pr-10 mt-2 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.last_name}
                />
                {formik.touched.last_name && formik.errors.last_name && (
                  <div className="mt-2 text-red-500">
                    {formik.errors.last_name}
                  </div>
                )}
              </div>
            </div>
            <div className="pt-3">
              <label className="text-title-xsm1 text-custom-black font-normal">
                Email
              </label>
              <input
                type="text"
                name="email"
                placeholder="michael_smith@gmail.com"
                className={`w-full rounded-lg border ${
                  formik.touched.email && formik.errors.email
                    ? 'border-red-500'
                    : 'border-stroke'
                } bg-transparent py-4 pl-6 pr-10 mt-2 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="mt-2 text-red-500">{formik.errors.email}</div>
              )}
            </div>
            <div className="pt-3">
              <label className="text-title-xsm1 text-custom-black font-normal">
                Message
              </label>
              <textarea
                rows={5}
                name="message"
                placeholder="Write your comments here!"
                className={`w-full rounded-lg border mt-2 ${
                  formik.touched.message && formik.errors.message
                    ? 'border-red-500'
                    : 'border-stroke'
                } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
              />
              {formik.touched.message && formik.errors.message && (
                <div className="mt-2 text-red-500">{formik.errors.message}</div>
              )}
            </div>
            <div className="pt-4">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  onChange={() => setIsVerified(true)}
                  className="form-checkbox border-input-border bg-custom-blue-dark h-5 w-5 text-blue-500"
                />
                <span className="ml-2 text-black">
                  You agree to our friendly{' '}
                  <Link
                    to="/privacy-policy"
                    target="_blank"
                    className="text-blue-500 hover:underline"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy*
                  </Link>
                </span>
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={!isVerified}
                className={`inline-flex gap-3 w-full rounded-3xl
                ${
                  isVerified
                    ? 'bg-custom-blue-full hover:bg-opacity-90'
                    : 'bg-custom-blue-dark cursor-not-allowed'
                } 
                  items-center justify-center px-6 py-2 mr-3 text-lg font-medium text-center  text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900`}
              >
                {loading ? <Spinner className="h-6 w-6" /> : 'Submit'}
                {loading ? '' : <img src={RightArrow} alt="" />}
              </button>
            </div>
          </form>
          <div className="col-span-1   ">
            {generalArray.map((el, idx) => (
              <General key={idx} items={el} />
            ))}
            <div className="p-8 ">
              <h1 className="text-title-md text-custom-black font-semibold">
                Download Notis
              </h1>
              <div className="xl:flex  xl:gap-4 mt-6">
                <img className=" mt-2 xl:mt-0" src={GooglePlay} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
