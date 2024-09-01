import { lazy } from 'react';

const JobManagement = lazy(() => import('../pages/JobManagement'));
const RentalManagement = lazy(()=> import('../pages/RentalManagement'))
const AddJob = lazy(() => import('../pages/JobManagement/AddJob'));
const AddRental = lazy(()=> import('../pages/RentalManagement/AddRental'))
const EditRental = lazy(()=> import('../pages/RentalManagement/EditRental'))
const EditJob = lazy(()=> import('../pages/JobManagement/EditJob'))

const NotFound = lazy(() => import('../pages/NotFound'));



const jobRoutes =[
  {
    path: '/panel/jobs',
    title: 'Jobs Management',
    component: JobManagement,
  },
  {
    path: '/panel/jobs/add-job',
    title: 'Add Job',
    component: AddJob,
  },
  {
    path: '/panel/jobs/edit-job/:id',
    title: 'Edit Job',
    component: EditJob,
  },
  {
    path: '/not-found',
    title: 'Not Found',
    component: NotFound,
  },
]
const rentalRoutes =[
  {
    path: '/panel/rentals',
    title: 'Rental Management',
    component: RentalManagement,
  },
  {
    path: '/panel/rentals/add-rental',
    title: 'Add Rental',
    component: AddRental,
  },
  {
    path: '/panel/rentals/edit-rental/:id',
    title: 'Edit Rental',
    component: EditRental,
  },

  {
    path: '/not-found',
    title: 'Not Found',
    component: NotFound,
  },
]



function getRoutes(type:any){

 if(type ==='Rental')
  {
    return rentalRoutes
  }
  else{
    return jobRoutes
  }


}
export {getRoutes};
