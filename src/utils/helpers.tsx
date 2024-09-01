import { APPS } from './constants';

export const getApp = () => {
    console.log('main domain : ' + window.location);
    const subDomain = getSubdomain(window.location.hostname);
    console.log('sub domain : ' + subDomain);
    const main = APPS.find((app) => app.main);
    if (!main) {
        throw new Error('Must have main App');
    }
    if (subDomain === '') {
        return { app: main.app, subDomain: subDomain };
    } else {
        const app = APPS.find((app) => '*' === app.subdomain);
        if (app) {
            return { app: app.app, subDomain: subDomain };
        } else {
            throw new Error('App not found');
        }
    }
};

const getSubdomain = (location: any) => {
  const locationParts = location.split('.');
  let sliceTill = -2;

  //for localhost //appnotis    //ars.appnotis
  const isLocalHost = locationParts.slice(-1)[0] === 'localhost';
  if (isLocalHost) {
    sliceTill = -1;
  }

  console.log('locationParts', locationParts);

  return locationParts.slice(0, sliceTill).join('');
};
