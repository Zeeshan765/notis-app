import React, { useEffect, useState } from 'react';

import _ from 'lodash';

import apiService from '../../services/ApiService';
import Pagination from '../Pagination';
import SubdomainTable from './SubdomainTable';

type SubdomainData = {
  host: string;
  searchEngineURLs: number;
  country: string;
  appType: string;
  answer: string;
  status: string;
  title: string;
};

const SubdomainList: React.FC = () => {
  const [open, setOpen] = React.useState('');
  const [userData, setUserData] = useState<SubdomainData[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<SubdomainData>({
    host: '',
    searchEngineURLs: 0,
    country: '',
    appType: '',
    answer: '',
    status: '',
    title: '',
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
      [name]: name === 'searchEngineURLs' ? Number(value) : value,
    }));
    debouncedDefaultPageOneCallApi();
  };

  // Function to handle change in role select
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSearch((prev: any) => ({
      ...prev,
      appType: value,
    }));
    debouncedDefaultPageOneCallApi();
  };

  // Function to handle clear button click
  const handleClear = () => {
    setSearch((prevState: any) => ({
      ...prevState,
      appType: '',
    }));
    debouncedDefaultPageOneCallApi();
  };

  // Function to handle change in role select
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    console.log('value', value, typeof value, value === 'false');
    let obj: any = {};

    console.log('obj', obj);

    if (value === 'true') {
      obj['status'] = true;
    }

    if (value === 'false') {
      obj['status'] = false;
    }

    setSearch((prev: any) => ({
      ...prev,
      ...obj,
    }));
    debouncedDefaultPageOneCallApi();
  };


  // Function to handle clear button click
  const handleStatusClear = () => {
    setSearch((prevState: any) => ({
      ...prevState,
      status: '',
    }));
    debouncedDefaultPageOneCallApi();
  };

  //Api Call For Data
  const getApiData = async (params: any) => {
    try {
      setLoading(true);
      const response = await apiService.get(`api/v1/admin/subdomains`, params);
      const { records } = response.data.data.subDomains;
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
        if (el !== 'status') {
          !searchObj[el] && delete searchObj[el];
        }

        if (el === 'status') {
          searchObj[el] === null ||
            (searchObj[el]?.length < 1 && delete searchObj[el]);
        }
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
      const response = await apiService.get(`api/v1/admin/subdomains`, params);
      const { records, metadata } = response.data.data.subDomains;
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
  const handleSort = (column: keyof SubdomainData) => {
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
        <SubdomainTable
          handleChange={handleChange}
          userData={userData}
          handleTypeChange={handleTypeChange}
          handleClear={handleClear}
          search={search}
          handleStatusChange={handleStatusChange}
          handleStatusClear={handleStatusClear}
          handlePopup={handlePopup}
          handleSort={handleSort}
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

export default SubdomainList;
