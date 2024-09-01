import React from 'react';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import UrlInput from '../UrlInput';
import ImageSelect from '../ImageSelect';
import { useTranslation } from 'react-i18next';

interface Props {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  handleUrlChange: any;
  handleFileChange: any;
}

const RentalTabs: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  handleUrlChange,
  handleFileChange,
}) => {


const {t} = useTranslation()

  const data = [
    {
      label: `${t('URL')}`,
      value: 'url',
      desc: <UrlInput onChange={handleUrlChange} />,
    },
    {
      label: `${t('File')}`,
      value: 'file',
      desc: <ImageSelect onChange={handleFileChange} />,
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

export default RentalTabs;
