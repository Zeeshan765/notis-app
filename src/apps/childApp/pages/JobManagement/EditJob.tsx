import Breadcrumb from '../../../../components/Breadcrumb';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
// import apiService from '../../services/ApiService';
// import toast from 'react-hot-toast';
import { Spinner } from '@material-tailwind/react';
import apiService from '../../../../services/ApiService';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const EditJob = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { id } = useParams();
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
    salary: yup
      .number()
      .typeError('Salary must be a number')
      .required('Salary is required'),
    jobType: yup.string().required(`${t('JobType is required')}`),
    workplaceType: yup.string().required(`${t('Workplace Type is required')}`),
    location: yup.string().required(`${t('ErrorLocation')}`),
  });
  const [createdOn, setCreatedOn] = useState('');

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
  });
  console.log(setInitialValues);
  const handlePosted = (e: any) => {
    const selectedDate = e.target.value;
    const now = new Date();
    if (selectedDate) {
      setCreatedOn(
        new Date(
          `${selectedDate}T${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
        ).toISOString(),
      );
    } else {
      setCreatedOn(createdOn);
    }
  };

  const getData = async () => {
    try {
      const response = await apiService.get(`api/v1/admin/jobs/${id}`, {});
      const {
        title,
        location,
        entity,
        url,
        description,
        salary,
        jobType,
        workplaceType,
        createdOn,
      } = response.data.data.job;
      setInitialValues({
        title,
        location,
        entity,
        url,
        description,
        salary,
        jobType,
        workplaceType,
      });
      formik.setValues({
        title,
        location,
        entity,
        url,
        description,
        salary,
        jobType,
        workplaceType,
      });
      setCreatedOn(createdOn);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  //OnSubmit

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      let updatedValues = {
        ...values,
        createdOn,
      };
      const response = await apiService.put(
        `api/v1/admin/jobs/${id}`,
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

  //handle Cancel
  const handleCancel = () => {
    navigate('/panel/jobs');
  };

  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <>
      <Breadcrumb pageName={t('EditJob')} parentName={t('JobManagement')} />

      <div className="grid grid-cols-1  xl:grid-cols-2">
        <div className="flex flex-col ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {t('EditJob')}
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
                    value={formik.values.title}
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
                    value={formik.values.entity}
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
                    value={formik.values.url}
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
                    value={formik.values.location}
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
                    {t('JobType')}
                  </label>
                  <input
                    type="text"
                    name="jobType"
                    value={formik.values.jobType}
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
                    value={formik.values.workplaceType}
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
                    placeholder={t('Enter Salary')}
                    value={
                      formik.values.salary === undefined
                        ? 0
                        : formik.values.salary
                    }
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
                    {t('Published Date')}
                  </label>
                  <input
                    type="date"
                    value={createdOn ? formatDateForInput(createdOn) : ''}
                    name="createdOn"
                    className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={handlePosted}
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
                    value={formik.values.description}
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
                      `${t('UpdateJob')}`
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

export default EditJob;
