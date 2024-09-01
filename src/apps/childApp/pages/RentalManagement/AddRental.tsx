import Breadcrumb from '../../../../components/Breadcrumb';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Spinner } from '@material-tailwind/react';
import axiosInstance from '../../../../services/axiosInstance';
import toast from 'react-hot-toast';
import RentalTabs from '../../../../components/rental/RentalTabs';
import { useTranslation } from 'react-i18next';

const AddRental = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validation
  const validationSchema = yup.object({
    title: yup.string().required(`${t('ErrorTitle')}`),
    description: yup.string().required(`${t('ErrorDescription')}`),
    entity: yup.string().required(`${t('ErrorEntity')}`),
    url: yup
      .string()
      .required(`${t('ErrorUrl')}`)
      .matches(
        /^(?:https?:\/\/)?(?:www\.)?[\w.-]+(?:\.[a-zA-Z]{2,})+(?::\d{1,5})?(?:\/[\w.-]*)*\/?$/,
        `${t('InvalidUrl')}`,
      ),
    price: yup
      .number()
      .typeError('Price must be a number')
      .positive('Price must be greater than 0')
      .required(`${t('ErrorPrice')}`),
    summary: yup.string().required(`${t('ErrorSummary')}`),
    location: yup.string().required(`${t('ErrorLocation')}`),
    propertyType: yup.string().required('Property Type is required'),
  });

  // Initial Values
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    entity: '',
    url: '',
    price: '',
    summary: '',
    location: '',
    propertyType: '',
  });

  const [activeTab, setActiveTab] = useState('url');
  const [urlData, setUrlData] = useState([]);
  const [createdOn, setCreatedOn] = useState('');
  const [fileData, setFileData] = useState([]);
  const handleUrlChange = (data: any) => {
    setUrlData(data);
  };

  const handleFileChange = (data: any) => {
    setFileData(data);
  };
  const handlePosted = (e: any) => {
    setCreatedOn(e.target.value);
  };

  console.log(setInitialValues);
  //OnSubmit

  const onSubmit = async (values: any) => {
    console.log('createdOn', createdOn)
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('entity', values.entity);
      formData.append('url', values.url);
      formData.append('price', values.price);
      formData.append('location', values.location);
      formData.append('summary', values.summary);
      formData.append('propertyType', values.propertyType);
      formData.append(' createdOn', createdOn);
      // Append thumbnails data
      if (activeTab === 'url' && Array.isArray(urlData)) {
        urlData.forEach((url: any, index: number) => {
          formData.append(`thumbnails[${index}][action]`, 'add');
          formData.append(`thumbnails[${index}][file]`, url);
        });
      }
      if (activeTab === 'file' && Array.isArray(fileData)) {
        fileData.forEach((file: any, index: number) => {
          formData.append(`thumbnails[${index}][action]`, 'add');
          formData.append(`thumbnails[${index}][file]`, file);
        });
      }

      const response = await axiosInstance.post(
        'api/v1/admin/rentals',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response.data.success) {
        toast.success(`${response.data.message}`);
        navigate('/panel/rentals');
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  //Formik
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  //handle Cancel
  const handleCancel = () => {
    navigate('/panel/rentals');
  };


  useEffect(() => {
    // Function to format the date and time as YYYY-MM-DDTHH:MM:SS
    const formatDateTime = (date:any) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

    // Set the max date and time value
    const now = new Date();
    setCreatedOn(formatDateTime(now));
  }, []);



    // Handle date input change
    const handleDateChange = (e:any) => {
      const selectedDate = new Date(e.target.value);
      const now = new Date();
      const combinedDateTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
      ).toISOString(); // Combine selected date with current time
      setCreatedOn(combinedDateTime);
    };
  

  return (
    <>
      <Breadcrumb
        pageName={t('AddRental')}
        parentName={t('RentalManagement')}
      />

      <div className="grid grid-cols-1  xl:grid-cols-2">
        <div className="flex flex-col ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {t('NewRental')}
              </h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {t('Title')}
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder={t('RentalTitle')}
                    className={`w-full rounded-lg border ${
                      formik.touched.title && formik.errors.title
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.title && formik.errors.title && (
                    <div className="mt-2 text-red-500">
                      {formik.errors.title}
                    </div>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {t('Entity')}
                  </label>
                  <input
                    type="text"
                    name="entity"
                    placeholder={t('RentalEntity')}
                    className={`w-full rounded-lg border ${
                      formik.touched.entity && formik.errors.entity
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.entity && formik.errors.entity && (
                    <div className="mt-2 text-red-500">
                      {formik.errors.entity}
                    </div>
                  )}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {t('URL')}
                  </label>
                  <input
                    type="text"
                    name="url"
                    placeholder={t('RentalUrl')}
                    className={`w-full rounded-lg border ${
                      formik.touched.url && formik.errors.url
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.url && formik.errors.url && (
                    <div className="mt-2 text-red-500">{formik.errors.url}</div>
                  )}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {t('Price')}
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder={t('RentalPrice')}
                    className={`w-full rounded-lg border ${
                      formik.touched.price && formik.errors.price
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.price && formik.errors.price && (
                    <div className="mt-2 text-red-500">
                      {formik.errors.price}
                    </div>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {t('PropertyType')}
                  </label>
                  <input
                    type="text"
                    name="propertyType"
                    placeholder={t('Enter propertyType ')}
                    className={`w-full rounded-lg border ${
                      formik.touched.propertyType && formik.errors.propertyType
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.propertyType &&
                    formik.errors.propertyType && (
                      <div className="mt-2 text-red-500">
                        {formik.errors.propertyType}
                      </div>
                    )}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {t('Location')}
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder={t('RentalLocation')}
                    className={`w-full rounded-lg border ${
                      formik.touched.location && formik.errors.location
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.location && formik.errors.location && (
                    <div className="mt-2 text-red-500">
                      {formik.errors.location}
                    </div>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {t('Summary')}
                  </label>
                  <textarea
                    rows={6}
                    placeholder={t('RentalSummary')}
                    name="summary"
                    className={`w-full rounded-lg border ${
                      formik.touched.summary && formik.errors.summary
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.summary && formik.errors.summary && (
                    <div className="mt-2 text-red-500">
                      {formik.errors.summary}
                    </div>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-4 block text-black dark:text-white">
                    {t('Thumbnail')}
                  </label>
                  <RentalTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    handleUrlChange={handleUrlChange}
                    handleFileChange={handleFileChange}
                  />
                </div>


                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {t('Published Date')}
                  </label>
                  <input
                    type="date"
                    name="createdOn"
                    max={new Date().toISOString().split('T')[0]}
                    className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={handleDateChange}
                    value={createdOn.split('T')[0]}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {t('Description')}
                  </label>
                  <textarea
                    rows={6}
                    placeholder={t('RentalDescription')}
                    name="description"
                    className={`w-full rounded-lg border ${
                      formik.touched.description && formik.errors.description
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="mt-2 text-red-500">
                      {formik.errors.description}
                    </div>
                  )}
                </div>

                <div className="flex flex-col md:flex-row">
                  <button
                    type="submit"
                    className="flex-1 md:flex-none md:w-auto w-full cursor-pointer justify-center rounded bg-primary p-3 font-medium text-gray mb-2 md:mb-0 md:mr-2"
                  >
                    {loading ? (
                      <Spinner className="h-6 w-6" />
                    ) : (
                      `${t('CreateRental')}`
                    )}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 md:flex-none md:w-auto w-full cursor-pointer justify-center rounded bg-primary p-3 font-medium text-gray"
                  >
                    {t('Cancel')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRental;
