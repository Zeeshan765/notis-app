import { useContext, useEffect, useState } from 'react';
import { SubDomainContext } from './contexts/subDomainContext';
import { getApp } from './utils/helpers';
import axiosInstance from './services/axiosInstance';
import './App.css';

const App = () => {
  const [sub, setSub] = useState(null);
  const [appType,setAppType] = useState(null)
  const [appInfo,setAppInfo] = useState(null)
  const [userData,setUserData] = useState<any>(null)
  const CurrentAppData = getApp();
  const subDomainValue = useContext(SubDomainContext);
  const { app, subDomain } = CurrentAppData;
  const CurrentApp = app;








  useEffect(() => {
    if (subDomain) {
      setSub(subDomain);
      let baseURL = `https://${subDomain}.appnotis.com:${process.env.REACT_APP_URL_PORT}`;
      axiosInstance.defaults.baseURL = baseURL;
    } else {
      axiosInstance.defaults.baseURL = process.env.REACT_APP_BASE_URL;
    }
  }, [subDomainValue]);

  return (
    // @ts-ignore
    <SubDomainContext.Provider value={{ sub, setSub ,setAppType,appType,userData,setUserData,appInfo,setAppInfo}}>
      {/* @ts-ignore */}
      <CurrentApp sub={sub} />
    </SubDomainContext.Provider>
  );
};

export default App;
