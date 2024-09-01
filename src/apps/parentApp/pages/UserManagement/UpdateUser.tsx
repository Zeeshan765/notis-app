import Breadcrumb from '../../../../components/Breadcrumb';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import apiService from '../../../../services/ApiService';
import { Spinner } from '@material-tailwind/react';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

const UpdateUser = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedValue, setSelectedValue] = useState('');
  const [show, setShow] = useState('');
  const [options, setOptions] = useState([]);
  const [newOptions, setNewOptions] = useState([]);
  //handle MultiSelect Value
  const handleSelectedChange = (option: any) => {
    setOptions(option);

    const newValues = option.map((opt: any) => opt.value);
    setSelectedValue(newValues);
  };

  // Validation
  const validationSchema = yup.object({
    name: yup.string().required(`${t('ErrorName')}`),
    email: yup
      .string()
      .email(`${t('InvalidEmail')}`)
      .required(`${t('ErrorEmail')}`),
    password: yup.string().min(6, `${t('PasswordMin')}`),
    // role: yup.string().required(`${t('ErrorRole')}`),
  });
  // Initial Values
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    password: '',
    roles: '',
  });
  let updatedOptions = show === 'creator' ? selectedValue : [];
  //OnSubmit

  const onSubmit = async (values: any) => {
    console.log("sjsdjdsjj")
    Object.keys(values).forEach((el: any) => {
      !values[el] && delete values[el];
    });
    const { roles, ...rest } = values;
    try {
      setLoading(true);
      const response = await apiService.put(`api/v1/admin/users/${id}`, {
        ...rest,
        roles: [roles],
        subDomains: updatedOptions,
      });
      if (response.data.success) {
        toast.success(`${response.data.message}`);

        navigate('/panel/users');
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
      const response = await apiService.get(`api/v1/admin/users/${id}`, {});
      const { name, email, roles, subDomains } = response.data.data.user;

      const extractedOptions = subDomains.map(
        ({ _id, host }: { _id: string; host: string }) => ({
          value: _id,
          label: host,
        }),
      );
      const newValues = extractedOptions.map((opt: any) => opt.value);
      setSelectedValue(newValues);
      setOptions(extractedOptions);
      setShow(roles[0]);
      setInitialValues({ name, email, roles: roles[0], password: '' });
      formik.setValues({ name, email, roles: roles[0], password: '' });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [id]);

  const getSubdomainList = async () => {
    try {
      const response = await apiService.get('api/v1/admin/subdomains', {});
      const { records } = response.data.data.subDomains;
      const extractedOptions = records.map(
        ({ _id, host }: { _id: string; host: string }) => ({
          value: _id,
          label: host,
        }),
      );
      setNewOptions(extractedOptions);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    getSubdomainList();
  }, []);
  //handle Cancel
  const handleCancel = () => {
    navigate('/panel/users');
  };

  return (
    <>
      <Breadcrumb pageName={t('EditUser')} parentName={t('UserManagement')} />

      <div className="grid grid-cols-1  xl:grid-cols-2">
        <div className="flex flex-col ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {t('UpdateUser')}
              </h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {t('Name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder={t('EnterFullName')}
                    value={formik.values.name}
                    className={`w-full rounded-lg border ${
                      formik.touched.name && formik.errors.name
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="mt-2 text-red-500">
                      {formik.errors.name}
                    </div>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {t('Email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder={t('EnterEmail')}
                    value={formik.values.email}
                    className={`w-full rounded-lg border ${
                      formik.touched.email && formik.errors.email
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="mt-2 text-red-500">
                      {formik.errors.email}
                    </div>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {t('Role')}
                  </label>
                  <select
                    name="roles"
                    className={`w-full rounded border ${
                      formik.touched.roles && formik.errors.roles
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={(event) => {
                      formik.handleChange(event);
                      setShow(event.target.value); // Call your other function with the value
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.roles}
                  >
                    <option value="creator">Creator</option>
                    <option value="admin">Admin</option>
                  </select>
                  {/* {formik.touched.roles && formik.errors.roles && (
                    <div className="mt-2 text-red-500">
                      {formik.errors.roles}
                    </div>
                  )} */}
                </div>
                {show === 'creator' && (
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      {t('SubDomain')}
                    </label>
                    <Select
                      // @ts-ignore
                      options={newOptions}
                      defaultValue={options}
                      // @ts-ignore
                      value={options}
                      onChange={handleSelectedChange}
                      isMulti
                    />
                  </div>
                )}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {t('Password')}
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder={t('EnterPassword')}
                    className={`w-full rounded-lg border ${
                      formik.touched.password && formik.errors.password
                        ? 'border-red-500'
                        : 'border-stroke'
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="mt-2 text-red-500">
                      {formik.errors.password}
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
                      `${t('UpdateUser')}`
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

export default UpdateUser;
