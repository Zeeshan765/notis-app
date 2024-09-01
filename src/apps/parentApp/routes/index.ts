import { lazy } from 'react';

const UserManagement = lazy(() => import('../pages/UserManagement'));
const AddUser = lazy(() => import('../pages/UserManagement/AddUser'));
const UpdateUser = lazy(() => import('../pages/UserManagement/UpdateUser'));
const SubdomainManagement = lazy(() => import('../pages/SubdomainManagement'));
const AddSubdomain = lazy(
  () => import('../pages/SubdomainManagement/AddSubdomain'),
);
const EditSubdomain = lazy(
  () => import('../pages/SubdomainManagement/UpdateSubdomain'),
);
const AddApp = lazy(() => import('../pages/AppManagement/AddApp'));
const EditApp = lazy(() => import('../pages/AppManagement/EditApp'));
const AddmobManagement = lazy(() => import('../pages/AdmobManagement'));
const Addmob = lazy(() => import('../pages/AdmobManagement/AddAdmob'));
const EditAdmob = lazy(() => import('../pages/AdmobManagement/EditAdmob'));

const NotFound = lazy(() => import('../pages/NotFound'));

const coreRoutes = [
  {
    path: '/panel/users',
    title: 'User Management',
    component: UserManagement,
  },
  {
    path: '/panel/users/add-user',
    title: 'Add User',
    component: AddUser,
  },
  {
    path: '/panel/users/edit-user/:id',
    title: 'Update User',
    component: UpdateUser,
  },
  {
    path: '/panel/subdomains',
    title: 'Subdomain Management',
    component: SubdomainManagement,
  },
  {
    path: '/panel/subdomains/add-subdomain',
    title: 'Add Subdomain',
    component: AddSubdomain,
  },
  {
    path: '/panel/subdomains/edit-subdomain/:id',
    title: 'Edit Subdomain',
    component: EditSubdomain,
  },
  {
    path: '/panel/apps/create-app',
    title: 'Create App',
    component: AddApp,
  },
  {
    path: '/panel/apps/edit-app/:id',
    title: 'Edit App',
    component: EditApp,
  },
  {
    path: '/panel/admob',
    title: 'Admob Management',
    component: AddmobManagement,
  },
  {
    path: '/panel/admob/add-admob',
    title: 'Add Admob',
    component: Addmob,
  },
  {
    path: '/panel/admob/edit-admob/:id',
    title: 'Edit Admob',
    component: EditAdmob,
  },

  {
    path: '/not-found',
    title: 'Not Found',
    component: NotFound,
  },
];

const routes = [...coreRoutes];
export default routes;
