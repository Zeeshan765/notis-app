import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../../../components/Breadcrumb';
import AdmobList from '../../../../components/admob/AdmobList';
import { useTranslation } from 'react-i18next';
const AddmobManagement = () => {
  const {t} = useTranslation()
    const navigate = useNavigate();

    const handleNavigate = () =>{
      navigate('/panel/admob/add-admob')
    }
  return (
    <>
    <Breadcrumb pageName= {t('AdMob')} parentName={t('AdMobManagement')} />
    <div className="m-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold"></h2>
          <button
          onClick={handleNavigate}
            className="inline-flex items-center justify-center rounded-md bg-primary py-3 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
          >
            {t('AddAdMob')}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-10">
     <AdmobList/>
     </div>
    
    </>
  )
}

export default AddmobManagement