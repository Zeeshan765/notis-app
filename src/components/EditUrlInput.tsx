import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../services/axiosInstance';
import toast from 'react-hot-toast';

interface Props {
  onChange: any;
  setUrlData: any;
  urlData: any;
  parentId: any;
}

const EditUrlInput: React.FC<Props> = ({
  onChange,
  urlData,
  setUrlData,
  parentId,
}) => {
  const { t } = useTranslation();
  const [showInput, setShowInput] = useState<boolean>(false);

  useEffect(() => {
    if (urlData.length > 0) {
      setShowInput(true);
    }
  }, [urlData]);
  const handleInputChange = (index: number, value: string) => {
    const newUrls = [...urlData];
    newUrls[index].path = value;
    setUrlData(newUrls);
    onChange(newUrls);
  };

  const handleAddInput = () => {
    setUrlData([
      ...urlData,
      { _id: '', source: 'remote', path: '', action: 'add' },
    ]);
    setShowInput(true);
  };

  const handleRemoveInput = async (index: number) => {
    const urlToRemove = urlData[index];
    if (urlToRemove._id) {
      const formData = new FormData();
      urlData.forEach((url: any, index: number) => {
        formData.append(`thumbnails[${index}][action]`, 'remove');
        formData.append(`thumbnails[${index}][_id]`, urlToRemove._id);
      });

      try {
        const response = await axiosInstance.put(
          `api/v1/admin/rentals/${parentId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        if (response.data.success) {
          toast.success(`${response.data.message}`);
          window.location.reload();
        }
      } catch (error: any) {
        console.log('error', error);
        toast.error(error.response.data.message);
      }
    } else {
      const newUrls = urlData.filter((_: any, i: number) => i !== index);
      setUrlData(newUrls);
      onChange(newUrls);
    }
  };

  return (
    <>
      {showInput &&
        urlData.map((url: any, index: any) => (
          <div key={url._id || index} className="flex items-center mb-2 mt-3">
            <input
              type="text"
              value={url.path}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className={`w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
              placeholder={t('RentalUrl')}
            />

            <button
              type="button"
              onClick={() => handleRemoveInput(index)}
              className="ml-2 bg-red-500 text-white rounded-full w-7"
            >
              &times;
            </button>
          </div>
        ))}

      <button
        type="button"
        onClick={handleAddInput}
        className="flex-1 mt-3 md:flex-none md:w-auto w-full cursor-pointer justify-center rounded bg-primary p-3 font-medium text-gray"
      >
        {urlData.length > 0 ? `${t('AddMore')}` : `${t('AddUrl')}`}
      </button>
    </>
  );
};

export default EditUrlInput;
