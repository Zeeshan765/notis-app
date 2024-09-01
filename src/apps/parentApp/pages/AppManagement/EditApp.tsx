import Breadcrumb from '../../../../components/Breadcrumb';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @ts-ignore
import * as yup from 'yup';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from 'draft-js';
import CountrySelection from '../../../../components/CountrySelection';
import EditorCmp from '../../../../components/EditorCmp';
import draftToHtml from 'draftjs-to-html';
import ColorPicker from '../../../../components/ColorPicker';
import axiosInstance from '../../../../services/axiosInstance';
import toast from 'react-hot-toast';
import { Spinner, Switch } from '@material-tailwind/react';
import apiService from '../../../../services/ApiService';
import { useTranslation } from 'react-i18next';
const EditApp = () => {
  const { t } = useTranslation();
  const [country, setCountry] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [subDomain, setSubDomain] = useState('');
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [adEnabled, setAdEnabled] = useState<boolean>(false);

  const [editorStates, setEditorStates] = useState<{
    [key: string]: { editorState: EditorState; htmlContent: string };
  }>({
    privacy_policy: { editorState: EditorState.createEmpty(), htmlContent: '' },
    terms_of_use: { editorState: EditorState.createEmpty(), htmlContent: '' },
    copy_right_claim: {
      editorState: EditorState.createEmpty(),
      htmlContent: '',
    },
  });
  console.log('editorStates', editorStates);
  //Function to Extract Only Html
  const getHtmlContentsObject = () => {
    const htmlContentsObject: { [key: string]: string } = {};
    Object.keys(editorStates).forEach((key) => {
      htmlContentsObject[key] = editorStates[key].htmlContent;
    });
    return htmlContentsObject;
  };

  const htmlContentsObject = getHtmlContentsObject();

  // Validation
  const validationSchema = yup.object({
    title: yup.string().required(`${t('ErrorTitle')}`),
    app_type: yup.string().required(`${t('ErrorType')}`),
  });
  // Initial Values
  const [initialValues, setInitialValues] = useState({
    title: '',
    app_type: '',
    description: '',
  });

  const [colorData, setColorData] = useState({
    primary_color: '',
    secondary_color: '',
    text_color: '',
  });

  const handleColorChange = (color: any, key: any) => {
    setColorData({ ...colorData, [key]: color });
  };
  const handleResetColor = () => {
    if (selectedValue === 'Rental') {
      setColorData({
        primary_color: '#41B06E',
        secondary_color: '#C0E390',
        text_color: '#2C2C2C',
      });
    } else if (selectedValue === 'Job') {
      setColorData({
        primary_color: '#3D8CF3',
        secondary_color: '#B1D3FF',
        text_color: '#2C2C2C',
      });
    }
  };
  console.log(setInitialValues);

  const handleImageChange = (event: { target: { files: any[] } }) => {
    const file = event.target.files[0];
    if (!file) {
      return false;
    }
    if (!file.name.match(/\.(jpg|png)$/)) {
      toast.error('Photo should be png or jpg format.');
      return false;
    }
    if (file.size > 5120000) {
      toast.error('Photo size should be less than 5MB.');
      return false;
    }
    setSelectedImage(file);
    setIsUpdate(true);
  };

  //OnSubmit

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('appType', values.app_type);
      formData.append('description', values.description);
      formData.append('subDomain', subDomain);
      formData.append('country', country);
      formData.append('adsEnabled', JSON.stringify(adEnabled));
      formData.append('color[primary]', colorData.primary_color);
      formData.append('color[secondary]', colorData.secondary_color);
      formData.append('color[text]', colorData.text_color);
      formData.append('privacyPolicy', htmlContentsObject.privacy_policy);
      formData.append('termsOfUse', htmlContentsObject.terms_of_use);
      formData.append('copyRightClaim', htmlContentsObject.copy_right_claim);
      if (selectedImage) {
        formData.append('logo', selectedImage);
      }
      const response = await axiosInstance.put(
        `api/v1/admin/apps/${id}`,
        formData,
      );
      console.log('response', response);
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
    // Create EditorState using the ContentState

    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  //handle Cancel
  const handleCancel = () => {
    navigate('/panel/subdomains');
  };

  const handleEditorChange = (key: string, newEditorState: EditorState) => {
    const contentState = newEditorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContentState);

    setEditorStates((prevEditorStates) => ({
      ...prevEditorStates,
      [key]: { editorState: newEditorState, htmlContent: htmlContent },
    }));
  };

  //Convert Html to editor
  const convertHtmlToEditorState = (htmlContent: any) => {
    const blocksFromHTML = convertFromHTML(htmlContent);
    const contentState = blocksFromHTML.contentBlocks
      ? ContentState.createFromBlockArray(blocksFromHTML.contentBlocks)
      : ContentState.createFromText('');
    const editorState = EditorState.createWithContent(contentState);

    return editorState;
  };

  //Get App Data

  const getAppData = async () => {
    try {
      const response = await apiService.get(`api/v1/admin/apps/${id}`, {});
      const {
        appType,
        color,
        copyRightClaim,
        description,
        country,
        privacyPolicy,
        subDomain,
        title,
        logo,
        termsOfUse,
        adsEnabled,
      } = response.data.data.app;
      setInitialValues({
        title,
        app_type: appType,
        description,
      });
      formik.setValues({ title, app_type: appType, description });
      setAdEnabled(adsEnabled);
      setCountry(country?._id);
      setColorData({
        primary_color: color.primary,
        secondary_color: color.secondary,
        text_color: color.text,
      });
      setSelectedValue(appType);
      setSubDomain(subDomain?._id);
      setSelectedImage(logo);
      const updatedPrivacy = convertHtmlToEditorState(privacyPolicy);
      const updatedTerms = convertHtmlToEditorState(termsOfUse);
      const updatedCopyRight = convertHtmlToEditorState(copyRightClaim);
      setEditorStates({
        privacy_policy: {
          editorState: updatedPrivacy,
          htmlContent: privacyPolicy,
        },
        terms_of_use: { editorState: updatedTerms, htmlContent: termsOfUse },
        copy_right_claim: {
          editorState: updatedCopyRight,
          htmlContent: copyRightClaim,
        },
      });
    } catch (error) {
      console.log('Fetching Error', error);
    }
  };

  useEffect(() => {
    getAppData();
  }, []);

  return (
    <>
      <Breadcrumb
        pageName={t('EditApp')}
        parentName={t('SubDomainManagement')}
      />
      <div className="grid grid-cols-1 ">
        <div className="flex flex-col ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {t('EditApp')}
              </h3>
            </div>

            <div className="relative">
              <form onSubmit={formik.handleSubmit}>
                <div className="p-6.5">
                  <div className="flex flex-col md:flex-row mb-4.5">
                    <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                      <label className="mb-2.5 block text-black dark:text-white">
                        {t('Title')}
                      </label>
                      <input
                        type="text"
                        name="title"
                        placeholder={t('EnterTitle')}
                        value={formik.values.title}
                        className={`w-full rounded-lg border ${
                          formik.touched.title && formik.errors.title
                            ? 'border-red-500'
                            : 'value={formik.values.a}border-stroke'
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
                    <div className=" md:w-1/2 flex-1 md:flex-none w-full md:mb-0 mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        {t('Type')}
                      </label>
                      <select
                        name="app_type"
                        className={`w-full rounded-lg border ${
                          formik.touched.app_type && formik.errors.app_type
                            ? 'border-red-500'
                            : 'border-stroke'
                        } bg-transparent py-4.5 px-5  outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                        onChange={(event) => {
                          formik.handleChange(event);
                          setSelectedValue(event.target.value);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.app_type}
                      >
                        <option selected disabled value="">
                          Select the Type
                        </option>
                        <option value="Job">Job</option>
                        <option value="Rental">Rental</option>
                      </select>
                      {formik.touched.app_type && formik.errors.app_type && (
                        <div className="mt-2 text-red-500">
                          {formik.errors.app_type}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row mb-4.5">
                    <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
                      <CountrySelection
                        countryId={country}
                        setCountryId={setCountry}
                      />
                    </div>
                    <div className=" md:w-1/2 flex-1 md:flex-none w-full md:mb-0 mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        {t('Ads Enabled')}
                      </label>
                      <div className="mt-4">
                        <Switch
                          id="custom-switch-component"
                          checked={adEnabled}
                          className="h-full w-full checked:bg-[#2ec946]"
                          containerProps={{
                            className: 'w-11 h-6',
                          }}
                          circleProps={{
                            className: 'before:hidden left-0.5 border-none',
                          }}
                          onChange={() => setAdEnabled(!adEnabled)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-7.5 flex flex-wrap gap-6">
                    <div className="flex flex-col">
                      <label className="mb-2.5 block text-black dark:text-white">
                        {t('Primary')}
                      </label>
                      <ColorPicker
                        onColorChange={handleColorChange}
                        colorKey="primary_color"
                        initialColor={colorData.primary_color}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-2.5 block text-black dark:text-white">
                        {t('Secondary')}
                      </label>
                      <ColorPicker
                        onColorChange={handleColorChange}
                        colorKey="secondary_color"
                        initialColor={colorData.secondary_color}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-2.5 block text-black dark:text-white">
                        {t('Text')}
                      </label>
                      <ColorPicker
                        onColorChange={handleColorChange}
                        colorKey="text_color"
                        initialColor={colorData.text_color}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-2.5 block text-black dark:text-white"></label>
                      <button
                        type="button"
                        onClick={handleResetColor}
                        className="bg-blue-500 text-white px-2 py-2 rounded-md mr-4 ml-6"
                      >
                        {t('Reset')}
                      </button>
                    </div>
                  </div>

                  <div className="mb-7.5 ">
                    <label className="mb-2 block text-black dark:text-white">
                      {t('AppIcon')}
                    </label>
                    <span className="text-[14px] mb-3 italic">
                      {t('IconDetail')}
                    </span>
                    <div className="flex items-center mt-1">
                      <input
                        type="file"
                        accept="image/*"
                        //@ts-ignore
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                      />
                      <label htmlFor="imageInput" className="cursor-pointer">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-blue-500 text-white px-2 py-2 rounded-md mr-4"
                        >
                          {t('Upload')}
                        </button>
                      </label>
                      {selectedImage ? (
                        <img
                          src={
                            isUpdate
                              ? URL.createObjectURL(new Blob([selectedImage]))
                              : process.env.REACT_APP_BASE_URL + selectedImage
                          }
                          // src={}
                          alt="Selected Image"
                          className="w-15 h-15 rounded-lg"
                        />
                      ) : (
                        <img
                          src="data:image/jpeg;base64,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"
                          alt=""
                          className="w-15 h-15 rounded-lg"
                        />
                      )}
                    </div>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-3 block text-black dark:text-white">
                      {t('Description')}
                    </label>
                    <textarea
                      rows={6}
                      placeholder={t('EnterDescription')}
                      name="description"
                      value={formik.values.description}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></textarea>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-3 mt-4.5 md:mt-0 block text-black dark:text-white">
                      {t('Privacy')}
                    </label>
                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <EditorCmp
                        editorState={editorStates.privacy_policy.editorState}
                        setEditorState={(newState: EditorState) =>
                          handleEditorChange('privacy_policy', newState)
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-3 mt-4.5 md:mt-0 block text-black dark:text-white">
                      {t('Term')}
                    </label>
                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <EditorCmp
                        editorState={editorStates.terms_of_use.editorState}
                        setEditorState={(newState: EditorState) =>
                          handleEditorChange('terms_of_use', newState)
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-3 mt-4.5 md:mt-0 block text-black dark:text-white">
                      {t('Copy')}
                    </label>
                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <EditorCmp
                        editorState={editorStates.copy_right_claim.editorState}
                        setEditorState={(newState: EditorState) =>
                          handleEditorChange('copy_right_claim', newState)
                        }
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row">
                    <button
                      type="submit"
                      className="flex-1 md:flex-none md:w-auto w-full cursor-pointer justify-center rounded bg-primary p-3 font-medium text-gray mb-2 md:mb-0 md:mr-2"
                    >
                      {loading ? (
                        <Spinner className="h-6 w-6" />
                      ) : (
                        `${t('UpdateApp')}`
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
      </div>
    </>
  );
};

export default EditApp;
