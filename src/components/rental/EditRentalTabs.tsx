import React from 'react';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import EditImageSelect from '../EditImageSelect';
import { useTranslation } from 'react-i18next';
import EditUrlInput from '../EditUrlInput';

interface Props {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  handleUrlChange: any;
  handleFileChange: any;
  setUrlData:any;
  urlData:any;
  parentId:any;
  setFileData:any;
  fileData:any;
}

const EditRentalTabs: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  handleUrlChange,
  handleFileChange,
  setUrlData,
  urlData,
  parentId,
  setFileData,
  fileData
}) => {


const {t} = useTranslation()

  const data = [
    {
      label: `${t('URL')}`,
      value: 'url',
      desc: <EditUrlInput  parentId ={parentId} onChange={handleUrlChange} setUrlData={setUrlData} urlData={urlData} />,
    },
    {
      label: `${t('File')}`,
      value: 'file',
      desc: <EditImageSelect  parentId ={parentId} onChange={handleFileChange} setFileData={setFileData} fileData={fileData}/>,
    },
  ];
  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
        indicatorProps={{
          className:
            'bg-transparent border-b-2 border-gray-900 shadow-none rounded-none',
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={activeTab === value ? 'text-gray-900' : ''}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {activeTab === value && desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default EditRentalTabs;
