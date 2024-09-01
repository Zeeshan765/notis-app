import FilterSearch from '../FilterSearch';
import Sorting from '../Sorting';
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Spinner,
} from '@material-tailwind/react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { IconButton, Tooltip } from '@material-tailwind/react';
import { Key, useState } from 'react';
import CustomLoader from '../../common/CustomLoader';
import apiService from '../../services/ApiService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SelectBarInput from '../SelectBarInput';
import { useTranslation } from 'react-i18next';

interface Props {
  userData: any;
  handleChange: any;
  handleSort: any;
  handleTypeChange: any;
  handleClear: any;
  handlePopup: any;
  open: any;
  search: any;
  sortedInfo: any;
  loading: boolean;
  debouncedCallApi: any;
  getApiData: any;
  getPaginatedData: any;
  debouncedDefaultPageOneCallApi: any;
}

const AdmobTable: React.FC<Props> = ({
  userData,
  handleChange,
  handleSort,
  handlePopup,
  handleTypeChange,
  handleClear,
  open,
  sortedInfo,
  loading,
  search,
  debouncedCallApi,
  getApiData,
  getPaginatedData,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isDelete, setIsDelete] = useState<boolean>(false);

  //Delete the User
  const handleDelete = async (id: any) => {
    try {
      setIsDelete(true);
      const response = await apiService.delete(`api/v1/admin/adMob/${id}`);

      if (response.data.success) {
        toast.success(`${response.data.message}`);
        getApiData();
        getPaginatedData();
        debouncedCallApi();

        // debouncedDefaultPageOneCallApi();
      }
      setIsDelete(false);
    } catch (error) {
      setIsDelete(false);
      console.log(error);
    }
  };

  //Navigate to Update User
  const handleEdit = (id: string) => {
    navigate(`/panel/admob/edit-admob/${id}`);
  };

  return (
    <>
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white dark:bg-meta-4 bg-opacity-75 z-50 flex items-center justify-center">
            <CustomLoader />
          </div>
        )}
        <div className={`relative ${loading ? 'blur-max' : ''}`}>
          <table className="w-full table-auto ">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white pl-8 cursor-pointer relative">
                  <div>
                    <div>{t('AdType')} </div>
                    <div className="flex items-center -ml-2 mt-1">
                      <SelectBarInput
                        search={search}
                        handleTypeChange={handleTypeChange}
                        handleClear={handleClear}
                      />
                      <Sorting
                        handleSort={handleSort}
                        name={'adType'}
                        sort={sortedInfo?.sort}
                        sortAs={sortedInfo?.sortAs}
                      />
                    </div>
                  </div>
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white pl-8 cursor-pointer relative">
                  <div>
                    <div>{t('Code')}</div>
                    <div className="flex items-center -ml-2 mt-1">
                      <FilterSearch
                        name={'code'}
                        handleChange={handleChange}
                        isSubdomain={true}
                      />
                      <Sorting
                        handleSort={handleSort}
                        name={'code'}
                        sort={sortedInfo?.sort}
                        sortAs={sortedInfo?.sortAs}
                      />
                    </div>
                  </div>
                </th>

                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  {t('Actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {userData.length === 0 ? (
                <tr>
                  <td className="text-center py-5">
                    <p className="text-black text-center dark:text-white text-lg">
                      {t('NoRecord')}
                    </p>
                  </td>
                </tr>
              ) : (
                userData?.map(
                  (
                    user: {
                      _id: any;
                      adType: string;
                      code: string;
                    },
                    index: Key | null | undefined,
                  ) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] py-5 px-4 pl-8 dark:border-strokedark xl:pl-8">
                        <h5 className="font-medium text-black dark:text-white">
                          {user.adType}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-7  dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {user.code}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 pl-1 dark:border-strokedark">
                        <div className="flex items-center ">
                          <Tooltip content={t('EditAdMob')}>
                            <IconButton
                              onClick={() => handleEdit(user?._id)}
                              variant="text"
                            >
                              <PencilSquareIcon className="h-4 w-4 text-primary" />
                            </IconButton>
                          </Tooltip>

                          <Popover
                            placement="left"
                            animate={{
                              mount: { scale: 1, y: 0 },
                              unmount: { scale: 0, y: 25 },
                            }}
                            open={open ? true : false}
                          >
                            <PopoverHandler>
                              <Tooltip content={t('DeleteAdMob')}>
                                <IconButton
                                  onClick={() => handlePopup(user?._id)}
                                  variant="text"
                                >
                                  <TrashIcon className="h-4 w-4 text-[#DC3545]" />
                                </IconButton>
                              </Tooltip>
                            </PopoverHandler>
                            {open === user?._id && (
                              <PopoverContent>
                                <h3 className="text-[16px] text-black">
                                  {' '}
                                  {t('Sure')}
                                </h3>
                                .
                                <div className="flex justify-end">
                                  <button
                                    onClick={() => handlePopup('')}
                                    className="text-[16px] text-white p-2 w-[30%] rounded-md bg-[red] mr-7"
                                  >
                                    {t('No')}
                                  </button>
                                  <button
                                    onClick={() => handleDelete(user?._id)}
                                    className="text-[16px] text-white p-2 w-[30%] rounded-md bg-[green] flex justify-center items-center"
                                  >
                                    {isDelete ? (
                                      <Spinner className="h-6 w-6" />
                                    ) : (
                                      `${t('Yes')}`
                                    )}
                                  </button>
                                </div>
                              </PopoverContent>
                            )}
                          </Popover>
                        </div>
                      </td>
                    </tr>
                  ),
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdmobTable;
