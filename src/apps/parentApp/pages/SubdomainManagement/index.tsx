import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../../../components/Breadcrumb';
import SubdomainList from '../../../../components/subdomains/SubdomainList';
import { useTranslation } from 'react-i18next';
const SubdomainManagement = () => {
  const {t} = useTranslation()
    const navigate = useNavigate();

    const handleNavigate = () =>{
      navigate('/panel/subdomains/add-subdomain')
    }
  return (
    <>
    <Breadcrumb pageName={t('Sub domains')} parentName={t('SubDomainManagement')}/>
    <div className="m-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold"></h2>
          <button
          onClick={handleNavigate}
            className="inline-flex items-center justify-center rounded-md bg-primary py-3 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
          >
            {t('AddSubDomain')}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-10">
     <SubdomainList/>
     </div>
    
    </>
  )
}

export default SubdomainManagement