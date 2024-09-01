
import ParentApp  from '../apps/parentApp';
import ChildApp from '../apps/childApp'

export const APPS = [
  {
    subdomain: 'www',
    app: ParentApp,
    main: true,
  },
  {
    subdomain: '*',
    app: ChildApp,
    main: false,
  },
];
