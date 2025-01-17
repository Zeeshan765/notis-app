import React, { useRef, useState, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  onChange: (files: File[]) => void;
}

const ImageSelect: React.FC<Props> = ({ onChange }) => {


  const {t} = useTranslation()
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files);
      setSelectedImages((prevImages) => [
        ...prevImages,
        ...filesArray.map((file) => URL.createObjectURL(file)),
      ]);
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
      onChange([...selectedFiles, ...filesArray]);
    }
  };

  // Remove Image
  const handleRemoveImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    setSelectedFiles(updatedFiles);
    onChange(updatedFiles);
  };

  return (
    <div className="flex items-center mt-1">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <label htmlFor="imageInput" className="cursor-pointer">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-500 text-white px-2 py-2 rounded-md mr-4"
        >
          {selectedImages.length > 0 ? `${t('AddMore')}` : `${t('UploadImage')}`}
        </button>
      </label>
      {selectedImages.length > 0 ? (
        selectedImages.map((image, index) => (
          <div key={index} className="relative m-2">
            <img
              src={image}
              alt={`Selected ${index}`}
              className="w-15 h-15 rounded-lg"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 bg-white text-black rounded-full w-6 hover:bg-red-500 hover:text-white "
            >
              &times;
            </button>
          </div>
        ))
      ) : (
        <img
          src="data:image/jpeg;base64,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"
          alt=""
          className="w-15 h-15 rounded-lg"
        />
      )}
    </div>
  );
};

export default ImageSelect;
