import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  onChange: any;
}

const UrlInput: React.FC<Props> = ({ onChange }) => {
  const { t } = useTranslation();
  const [urlInputs, setUrlInputs] = useState<string[]>([]);
  const [showInput, setShowInput] = useState<boolean>(false);
  const handleInputChange = (index: number, value: string) => {
    const newUrls = [...urlInputs];
    newUrls[index] = value;
    setUrlInputs(newUrls);
    onChange(newUrls);
  };

  const handleAddInput = () => {
    setUrlInputs([...urlInputs, '']);
    setShowInput(true); 
  };

  const handleRemoveInput = (index: number) => {
    const newUrls = urlInputs.filter((_, i) => i !== index);
    setUrlInputs(newUrls);
    onChange(newUrls);
  };

  return (
    <>
     
      <button
        type="button"
        onClick={handleAddInput}
        className="flex-1 md:flex-none md:w-auto w-full cursor-pointer justify-center rounded bg-primary p-3 font-medium text-gray"
      >
       {urlInputs.length > 0 ? `${t('AddMore')}` : `${t('AddUrl')}`}
      </button>

      {showInput &&
        urlInputs.map((url, index) => (
          <div key={index} className="flex items-center mb-2 mt-3">
            <input
              type="text"
              value={url}
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
    </>
  );
};

export default UrlInput;
