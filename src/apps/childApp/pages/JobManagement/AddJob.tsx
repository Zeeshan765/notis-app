import Breadcrumb from '../../../../components/Breadcrumb';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Spinner } from '@material-tailwind/react';
import apiService from '../../../../services/ApiService';
import toast from 'react-hot-toast';
// import Select from 'react-select';
import { t } from 'i18next';

const AddJob = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const [selectedOption, setSelectedOption] = useState([]);
  // const [workOption, setWorkOption] = useState([]);
  const [createdOn, setCreatedOn] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  //handle MultiSelect Value
  // const handleSelectedChange = (option: any) => {
  //   const newValues = option.map((opt: any) => opt.value);
  //   setSelectedOption(newValues);
  // };
  // handle workplace
  // const handleWorkPlaceChange = (option: any) => {
  //   const newValues = option.map((opt: any) => opt.value);
  //   setWorkOption(newValues);
  // };

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
    location: yup.string().required(`${t('ErrorLocation')}`),
    salary: yup
      .number()
      .typeError('Salary must be a number')
      // .positive('Salary must be greater than 0')
      .required('Salary is required'),
    jobType: yup.string().required(`${t('JobType is required')}`),
    workplaceType: yup.string().required(`${t('Workplace Type is required')}`),
    salaryCurrencySymbol: yup.string().required(`${t('Currency is required')}`),
  });

  // Initial Values
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    entity: '',
    url: '',
    location: '',
    salary: 0,
    jobType: '',
    workplaceType: '',
    salaryCurrencySymbol: '',
  });
  console.log(setInitialValues);

  const handlePosted = (e: any) => {
    setCreatedOn(e.target.value);
  };

  //OnSubmit

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      let updatedValues = {
        ...values,
        createdOn,
      };
      const response = await apiService.post(
        'api/v1/admin/jobs',
        updatedValues,
      );
      if (response.data.success) {
        toast.success(`${response.data.message}`);

        navigate('/panel/jobs');
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

  //handle Cancel
  const handleCancel = () => {
    navigate('/panel/jobs');
  };
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
      <Breadcrumb pageName={t('AddJob')} parentName={t('JobManagement')} />

      <div className="grid grid-cols-1  xl:grid-cols-2">
        <div className="flex flex-col ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add New Job
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
                    placeholder={t('JobTitle')}
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
                    placeholder={t('JobEntity')}
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
                    placeholder={t('JobUrl')}
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
                    {t('Location')}
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder={t('JobLocation')}
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

                {/* <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {t('Job Type ')}
                  </label>
                  <Select
                    options={JobTypeOption}
                    // @ts-ignore
                    value={selectedOption?.value}
                    onChange={handleSelectedChange}
                    isMulti
                  />
                </div> */}
                {/* <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {t('Workplace')}
                  </label>
                  <Select
                    options={WorkPlaceOption}
                    // @ts-ignore
                    value={workOption?.value}
                    onChange={handleWorkPlaceChange}
                    isMulti
                  />
                </div> */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {t('JobType')}
                  </label>
                  <input
                    type="text"
                    name="jobType"
                    placeholder={t('Enter Job Type')}
                    className={`w-full rounded-lg border ${
                      formik.touched.jobType && formik.errors.jobType
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.jobType && formik.errors.jobType && (
                    <div className="mt-2 text-red-500">
                      {formik.errors.jobType}
                    </div>
                  )}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {t('WorkPlace Type')}
                  </label>
                  <input
                    type="text"
                    name="workplaceType"
                    placeholder={t('Enter Workplace Type')}
                    className={`w-full rounded-lg border ${
                      formik.touched.workplaceType &&
                      formik.errors.workplaceType
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.workplaceType &&
                    formik.errors.workplaceType && (
                      <div className="mt-2 text-red-500">
                        {formik.errors.workplaceType}
                      </div>
                    )}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {t('Salary')}
                  </label>
                  <input
                    type="number"
                    name="salary"
                    min={1}
                    placeholder={t('Enter Salary')}
                    className={`w-full rounded-lg border ${
                      formik.touched.salary && formik.errors.salary
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.salary && formik.errors.salary && (
                    <div className="mt-2 text-red-500">
                      {formik.errors.salary}
                    </div>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {t('Currency')}
                  </label>
                  <input
                    type="text"
                    name="salaryCurrencySymbol"
                    placeholder={t('Enter Currency')}
                    className={`w-full rounded-lg border ${
                      formik.touched.salaryCurrencySymbol &&
                      formik.errors.salaryCurrencySymbol
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.salaryCurrencySymbol &&
                    formik.errors.salaryCurrencySymbol && (
                      <div className="mt-2 text-red-500">
                        {formik.errors.salaryCurrencySymbol}
                      </div>
                    )}
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
                    placeholder={t('JobDescription')}
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
                      `${t('CreateJob')}`
                    )}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 md:flex-none md:w-auto w-full cursor-pointer justify-center rounded bg-primary p-3 font-medium text-gray"
                  >
                    Cancel
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

export default AddJob;
