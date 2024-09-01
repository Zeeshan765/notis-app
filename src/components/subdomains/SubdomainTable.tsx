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
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SelectCountryInput from '../SelectCountryInput';
import SelectStatusInput from '../SelectStatusInput';

interface Props {
  userData: any;
  handleChange: any;
  handleSort: any;
  handlePopup: any;
  open: any;
  sortedInfo: any;
  loading: boolean;
  handleTypeChange: any;
  handleClear: any;
  search: any;
  debouncedCallApi: any;
  getApiData: any;
  getPaginatedData: any;
  debouncedDefaultPageOneCallApi: any;
  handleStatusChange: any;
  handleStatusClear: any;
}

const SubdomainTable: React.FC<Props> = ({
  userData,
  handleChange,
  handleSort,
  handlePopup,
  open,
  handleTypeChange,
  handleClear,
  handleStatusChange,
  handleStatusClear,
  search,
  sortedInfo,
  loading,
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
      const response = await apiService.delete(`api/v1/admin/subdomains/${id}`);

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
    navigate(`/panel/subdomains/edit-subdomain/${id}`);
  };

  //Navigate to Add App
  const handleAddApp = (subDomain: string) => {
    navigate(`/panel/apps/create-app`, { state: { subDomain } });
  };

  const handleEditApp = (id: string) => {
    navigate(`/panel/apps/edit-app/${id}`);
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
                    <div>{t('Host')}</div>
                    <div className="flex items-center -ml-2 mt-1">
                      <FilterSearch
                        name={'host'}
                        handleChange={handleChange}
                        isSubdomain={true}
                      />
                      <Sorting
                        handleSort={handleSort}
                        name={'host'}
                        sort={sortedInfo?.sort}
                        sortAs={sortedInfo?.sortAs}
                      />
                    </div>
                  </div>
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white pl-8 cursor-pointer relative">
                  <div>
                    <div>{t('Name')}</div>
                    <div className="flex items-center -ml-2 mt-1">
                      <FilterSearch
                        name={'title'}
                        handleChange={handleChange}
                        isSubdomain={true}
                      />
                      <Sorting
                        handleSort={handleSort}
                        name={'title'}
                        sort={sortedInfo?.sort}
                        sortAs={sortedInfo?.sortAs}
                      />
                    </div>
                  </div>
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white pl-8 cursor-pointer relative">
                  <div>
                    <div> {t('URL Count')}</div>
                    <div className="flex items-center -ml-2 mt-1">
                      <FilterSearch
                        name={'searchEngineURLs'}
                        handleChange={handleChange}
                        isSubdomain={true}
                      />
                      <Sorting
                        handleSort={handleSort}
                        name={'searchEngineURLs'}
                        sort={sortedInfo?.sort}
                        sortAs={sortedInfo?.sortAs}
                      />
                    </div>
                  </div>
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white pl-8 cursor-pointer relative">
                  <div>
                    <div> {t('Country')} </div>
                    <div className="flex items-center -ml-2 mt-1">
                      <FilterSearch
                        name={'country'}
                        handleChange={handleChange}
                        isSubdomain={true}
                      />
                      <Sorting
                        handleSort={handleSort}
                        name={'country'}
                        sort={sortedInfo?.sort}
                        sortAs={sortedInfo?.sortAs}
                      />
                    </div>
                  </div>
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white pl-8 cursor-pointer relative">
                  <div>
                    <div> {t('Type')} </div>
                    <div className="flex items-center -ml-2 mt-1">
                      <SelectCountryInput
                        search={search}
                        handleTypeChange={handleTypeChange}
                        handleClear={handleClear}
                      />
                      <Sorting
                        handleSort={handleSort}
                        name={'appType'}
                        sort={sortedInfo?.sort}
                        sortAs={sortedInfo?.sortAs}
                      />
                    </div>
                  </div>
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white pl-8 cursor-pointer relative">
                  <div>
                    <div> {t('Answers')}</div>
                    <div className="flex items-center -ml-2 mt-1">
                      <FilterSearch
                        name={'answer'}
                        handleChange={handleChange}
                        isSubdomain={true}
                      />
                      <Sorting
                        handleSort={handleSort}
                        name={'answer'}
                        sort={sortedInfo?.sort}
                        sortAs={sortedInfo?.sortAs}
                      />
                    </div>
                  </div>
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white pl-8 cursor-pointer relative">
                  <div>
                    <div> {t('Status')}</div>
                    <div className="flex items-center -ml-2 mt-1">
                      <SelectStatusInput
                        search={search}
                        handleStatusChange={handleStatusChange}
                        handleStatusClear={handleStatusClear}
                      />
                      <Sorting
                        handleSort={handleSort}
                        name={'status'}
                        sort={sortedInfo?.sort}
                        sortAs={sortedInfo?.sortAs}
                      />
                    </div>
                  </div>
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white pl-8 cursor-pointer relative">
                  <div>
                    <div> {t('App')}</div>
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
                    <p className="text-black whitespace-nowrap  text-center dark:text-white text-lg">
                      {t('NoRecord')}
                    </p>
                  </td>
                </tr>
              ) : (
                userData?.map(
                  (
                    user: {
                      app: any;
                      _id: any;
                      host: string;
                      subDomainURL: string;
                      fqdn: string;
                      type: string;
                      answer: string;
                      status: any;
                      title: string;
                      searchEngineURLs: number;
                    },
                    index: Key | null | undefined,
                  ) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] py-5 px-4 pl-8 dark:border-strokedark xl:pl-8">
                        <Link
                          to={`https://${user.host}.appnotis.com`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <h5 className="font-medium text-black dark:text-white">
                            {user.host}
                          </h5>
                        </Link>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-8 dark:border-strokedark xl:pl-8">
                        <h5 className="font-medium text-black dark:text-white">
                          {user.app?.title}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-7  dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {user?.searchEngineURLs}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-7 dark:border-strokedark">
                        {/* <Link
                          to={`https://${user.fqdn.replace(/\.$/, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        > */}
                        <p className="text-black dark:text-white">
                          {user?.app?.country?.name}
                        </p>
                        {/* </Link> */}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-11 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {user?.app?.appType}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-8 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {user.answer}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-11 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {user.status === true ? 'active' : 'Inactive'}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-5 dark:border-strokedark">
                        {user?.app ? (
                          <>
                            <button
                              onClick={() => handleEditApp(user?.app?._id)}
                              className="text-[14px] text-white p-1 w-[80%] font-semibold rounded-lg border  border-primary bg-primary mr-7 hover:bg-opacity-90 transition"
                            >
                              Edit App
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleAddApp(user._id)}
                            className="text-[14px] text-white p-1 w-[80%] font-semibold rounded-lg border  border-primary bg-primary mr-7 hover:bg-opacity-90 transition"
                          >
                            Create App
                          </button>
                        )}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-1 dark:border-strokedark">
                        <div className="flex items-center ">
                          <Tooltip content="Edit Subdomain">
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
                              <Tooltip content="Delete Subdomain">
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
                                  Are you sure you want to delete?
                                </h3>
                                .
                                <div className="flex justify-end">
                                  <button
                                    onClick={() => handlePopup('')}
                                    className="text-[16px] text-white p-2 w-[30%] rounded-md bg-[red] mr-7"
                                  >
                                    No
                                  </button>
                                  <button
                                    onClick={() => handleDelete(user?._id)}
                                    className="text-[16px] text-white p-2 w-[30%] rounded-md bg-[green] flex justify-center items-center"
                                  >
                                    {isDelete ? (
                                      <Spinner className="h-6 w-6" />
                                    ) : (
                                      'Yes'
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

export default SubdomainTable;
