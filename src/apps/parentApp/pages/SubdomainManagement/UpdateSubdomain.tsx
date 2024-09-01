import Breadcrumb from '../../../../components/Breadcrumb';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import apiService from '../../../../services/ApiService';
import { Spinner } from '@material-tailwind/react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const UpdateSubdomain = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();
  // Function to check for disallowed keywords
  const disallowedKeywords = ['www', 'admin'];

  // Validation
  const validationSchema = yup.object({
    host: yup
      .string()
      .matches(/^(?=.*[a-z])[a-z0-9]{1,10}(s)?$/, `${t('ErrorInvalid')}`)
      .required(`${t('ErrorHost')}`)
      .test(
        'disallowedKeywords',
        `${t('keywordError')}`,
        (value) =>
          !disallowedKeywords.some((keyword) => value?.includes(keyword)),
      ),
  });
  // Initial Values
  const [initialValues, setInitialValues] = useState({
    host: '',
  });
  //OnSubmit
  const onSubmit = async (values: any) => {
    try {
      const updatedValues = { ...values, status: isChecked };
      setLoading(true);
      const response = await apiService.put(
        `api/v1/admin/subdomains/${id}`,
        updatedValues,
      );
      if (response.data.success) {
        toast.success(`${response.data.message}`);

        navigate('/panel/subdomains');
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
  //get Data from Backend
  const getUserData = async () => {
    try {
      const response = await apiService.get(
        `api/v1/admin/subdomains/${id}`,
        {},
      );
      const { host, status } = response.data.data.subDomain;
      setInitialValues({ host });
      formik.setValues({ host });
      setIsChecked(status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  //handle Cancel
  const handleCancel = () => {
    navigate('/panel/subdomains');
  };

  return (
    <>
      <Breadcrumb
        pageName={t('EditSubDomain')}
        parentName={t('SubDomainManagement')}
      />

      <div className="grid grid-cols-1  xl:grid-cols-2">
        <div className="flex flex-col ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {t('EditSubDomain')}
              </h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {t('Host')}
                  </label>
                  <input
                    type="text"
                    name="host"
                    value={formik.values.host}
                    className={`w-full rounded-lg border ${
                      formik.touched.host && formik.errors.host
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.host && formik.errors.host && (
                    <div className="mt-2 text-red-500">
                      {formik.errors.host}
                    </div>
                  )}
                </div>
                <div className="mb-4.5">
                  <label
                    htmlFor="checkboxLabelOne"
                    className="flex cursor-pointer select-none items-center text-black dark:text-white "
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="checkboxLabelOne"
                        className="sr-only"
                        onChange={() => {
                          setIsChecked(!isChecked);
                        }}
                      />
                      <div
                        className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                          isChecked &&
                          'border-primary bg-gray dark:bg-transparent'
                        }`}
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-sm ${
                            isChecked && 'bg-primary'
                          }`}
                        ></span>
                      </div>
                    </div>
                    Status
                  </label>
                </div>

                <div className="flex flex-col md:flex-row">
                  <button
                    type="submit"
                    className="flex-1 md:flex-none md:w-auto w-full cursor-pointer justify-center rounded bg-primary p-3 font-medium text-gray mb-2 md:mb-0 md:mr-2"
                  >
                    {loading ? (
                      <Spinner className="h-6 w-6" />
                    ) : (
                      `${t('UpdateSubDomain')}`
                    )}
                  </button>
                  <button
                    type="button"
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

export default UpdateSubdomain;
