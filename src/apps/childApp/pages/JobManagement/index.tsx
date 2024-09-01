import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../../../components/Breadcrumb';
import JobList from '../../../../components/job/JobList';
import { useTranslation } from 'react-i18next';

const JobManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const SubdomainTitle = localStorage.getItem('AppInfo');
  const handleNavigate = () => {
    navigate('/panel/jobs/add-job');
  };
  return (
    <>
      <Breadcrumb
        pageName={`${SubdomainTitle}`}
        parentName={t('JobManagement')}
      />
      <div className="m-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold"></h2>
          <button
            onClick={handleNavigate}
            className="inline-flex items-center justify-center rounded-md bg-primary py-3 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
          >
            {t('AddJob')}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <JobList />
      </div>
    </>
  );
};

export default JobManagement;
