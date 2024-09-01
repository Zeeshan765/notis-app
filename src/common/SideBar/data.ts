import {
  UserIcon,
  Cog8ToothIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';

const ParentSidebar = [
  {
    link: '/panel/users',
    name: 'users',
    title:'Users',
    icon: UserIcon,
  },
  {
    link: '/panel/subdomains',
    title:'Sub domains',
    name: 'subdomains',
    icon: Cog8ToothIcon,
  },
  {
    link: '/panel/admob',
    title:'AdMobs',
    name: 'admob',
    icon: ClipboardDocumentIcon,
  },

];





const JobSidebar = [
  {
    link: '/panel/jobs',
    name: 'jobs',
    title:'Jobs',
    icon: ClipboardDocumentIcon,
  },
  
];




const RentalSidebar = [
 
  {
    link: '/panel/rentals',
    name: 'rentals',
    title:'Rentals',
    icon: ClipboardDocumentIcon,
  },
];

export { ParentSidebar, JobSidebar,RentalSidebar};
