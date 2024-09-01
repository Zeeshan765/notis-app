import React, { useEffect, useState } from 'react';

import _ from 'lodash';

// import { useNavigate } from 'react-router-dom';
import apiService from '../../services/ApiService';
import Pagination from '../Pagination';
import DataTable from './JobTable';

type PostData = {
  title: string;
  entity: string;
  type: string;
  location: string;
  url: string;
};

const JobList: React.FC = () => {
  // const navigate = useNavigate();
  const [open, setOpen] = React.useState('');
  const [userData, setUserData] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<any>({
    title: '',
    entity: '',
    type: '',
    location: '',
    url: '',
  });
  const [page, setPage] = useState(() => 1);
  const [resultPerPage, setResultPerPage] = useState(() => 10);
  const [totalRecord, setTotalRecord] = useState(() => 0);

  const [req, setReq] = useState(false);

  const [defaultPageOneReq, setDefaultPageOneReq] = useState(false);
  const [sortedInfo, setSortedInfo] = useState<any>({});

  //Function to handle change in Search Input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearch((prev: any) => ({
      ...prev,
      [name]: value,
    }));
    debouncedDefaultPageOneCallApi();
  };

  // Function to handle change in role select
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSearch((prev: any) => ({
      ...prev,
      type: value,
    }));
    debouncedDefaultPageOneCallApi();
  };

  // Function to handle clear button click
  const handleClear = () => {
    setSearch((prevState: any) => ({
      ...prevState,
      type: '',
    }));
    debouncedDefaultPageOneCallApi();
  };

  //Api Call For Data
  const getApiData = async (params: any) => {
    try {
      setLoading(true);
      const response = await apiService.get(`api/v1/admin/jobs`, params);
      console.log('response', response)
      const { records } = response.data.data.jobs;
      setUserData(records);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (page && resultPerPage && page > 0 && resultPerPage > 0) {
      //function to call api for data
      let searchObj = {
        ...search,
        page,
        perPage: resultPerPage,
        ...sortedInfo,
      };
      Object.keys(searchObj).forEach((el: any) => {
        !searchObj[el] && delete searchObj[el];
      });
      getApiData(searchObj);
    }
  }, [req]);

  useEffect(() => {
    debouncedCallApi();
  }, [search]);

  //Pagination Logic here
  const getPaginatedData = async (params: any) => {
    try {
      setLoading(true);
      const response = await apiService.get(`api/v1/admin/jobs`, params);
      const { records, metadata } = response.data.data.jobs;
      setTotalRecord(metadata?.count);
      setUserData(records);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  useEffect(() => {
    let paramsPage = 1;
    if (paramsPage && resultPerPage && paramsPage > 0 && resultPerPage > 0) {
      let searchObj = {
        ...search,
        page: paramsPage,
        perPage: resultPerPage,
        ...sortedInfo,
      };
      Object.keys(searchObj).forEach((el: any) => {
        !searchObj[el] && delete searchObj[el];
      });
      getPaginatedData(searchObj);
      setPage(1);
    }
  }, [defaultPageOneReq]);

  //Debounce call for simple api
  const [debouncedCallApi] = useState(() =>
    _.debounce(() => setReq((prev) => !prev), 1000),
  );

  //Debounce call for default page  api
  const [debouncedDefaultPageOneCallApi] = useState(() =>
    _.debounce(() => setDefaultPageOneReq((prev) => !prev), 1000),
  );

  useEffect(() => {
    debouncedCallApi();
  }, [sortedInfo]);

  // Sorting Functionality
  const handleSort = (column: keyof PostData) => {
    let direction: any = 'asc';
    if (sortedInfo?.sort === column) {
      direction = sortedInfo?.sortAs === 'asc' ? 'desc' : '';
    }
    setSortedInfo({ sort: direction ? column : '', sortAs: direction });
  };

  //PopOver Open
  const handlePopup = (id: string) => {
    setOpen(id);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <DataTable
          handleChange={handleChange}
          userData={userData}
          handleClear={handleClear}
          handleRoleChange={handleRoleChange}
          handlePopup={handlePopup}
          handleSort={handleSort}
          search={search}
          open={open}
          sortedInfo={sortedInfo}
          loading={loading}
          getApiData={getApiData}
          getPaginatedData={getPaginatedData}
          debouncedCallApi={debouncedCallApi}
          debouncedDefaultPageOneCallApi={debouncedDefaultPageOneCallApi}
        />
      </div>
      {/* Pagination controls */}
      <Pagination
        page={page}
        setPage={setPage}
        resultPerPage={resultPerPage}
        debouncedCallApi={debouncedCallApi}
        setResultPerPage={setResultPerPage}
        totalRecord={totalRecord}
      />
    </div>
  );
};

export default JobList;
