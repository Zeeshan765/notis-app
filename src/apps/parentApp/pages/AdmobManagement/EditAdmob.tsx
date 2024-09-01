import Breadcrumb from '../../../../components/Breadcrumb';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { Spinner } from '@material-tailwind/react';
import apiService from '../../../../services/ApiService';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const EditAdmob = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validation
  const validationSchema = yup.object({
    adType: yup.string().required(`${t('ErrorAdType')}`),
    code: yup.string().required(`${t('ErrorCode')}`),
  });
  // Initial Values
  const [initialValues, setInitialValues] = useState({
    adType: '',
    code: '',
  });

  const { id } = useParams();
  console.log(setInitialValues);
  //OnSubmit

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const response = await apiService.put(`api/v1/admin/adMob/${id}`, values);
      if (response.data.success) {
        toast.success(`${response.data.message}`);

        navigate('/panel/admob');
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
    navigate('/panel/admob');
  };

  const getAppData = async () => {
    try {
      const response = await apiService.get(`api/v1/admin/adMOb/${id}`, {});
      const { adType, code } = response.data.data.adMob;
      setInitialValues({
        adType,
        code,
      });
      formik.setValues({ adType, code });
    } catch (error) {
      console.log('Fetching Error', error);
    }
  };

  useEffect(() => {
    getAppData();
  }, [id]);

  return (
    <>
      <Breadcrumb pageName={t('EditAdMob')} parentName={t('AdMobManagement')} />

      <div className="grid grid-cols-1  xl:grid-cols-2">
        <div className="flex flex-col ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {t('EditAdMob')}
              </h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {t('AdType')}
                  </label>
                  <select
                    name="adType"
                    className={`w-full rounded border ${
                      formik.touched.adType && formik.errors.adType
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.adType}
                  >
                    <option selected disabled value="">
                      Select the Type
                    </option>
                    <option value="Interstitial">Interstitial</option>
                    <option value="Native">Native</option>
                    <option value="Rewarded">Rewarded</option>
                    <option value="OpenAd">OpenAd</option>
                  </select>
                  {formik.touched.adType && formik.errors.adType && (
                    <div className="mt-2 text-red-500">
                      {formik.errors.adType}
                    </div>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {t('Code')}
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={formik.values.code}
                    placeholder={t('EnterCode')}
                    className={`w-full rounded-lg border ${
                      formik.touched.code && formik.errors.code
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.code && formik.errors.code && (
                    <div className="mt-2 text-red-500">
                      {formik.errors.code}
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
                      `${t('UpdateAdMob')}`
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

export default EditAdmob;
