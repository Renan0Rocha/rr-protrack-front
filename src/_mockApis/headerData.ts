// project imports

import type { notificationType, optionIcon, profileType, quickLinksType, searchType } from '@/types/HeaderTypes';
// 
// Notification
// 
const user1 = '/images/profile/user1.jpg';
const user2 = '/images/profile/user2.jpg';
const user3 = '/images/profile/user3.jpg';
const user4 = '/images/profile/user4.jpg';
const user5 = '/images/profile/user5.jpg';


const notifications:notificationType[] = [
    {
        avatar: user1,
        title: 'Roman Joined the Team!',
        subtitle: 'Congratulate him',
        time:'9.08 AM'
    },
    {
        avatar: user2,
        title: 'New message received',
        subtitle: 'Salma sent you new message',
        time:'9.05 AM'
    },
    {
        avatar: user3,
        title: 'New Payment received',
        subtitle: 'Check your earnings',
        time:'10.08 AM'
    },
    {
        avatar: user4,
        title: 'Jolly completed tasks',
        subtitle: 'Assign her new tasks',
        time:'9.00 AM'
    },
    {
        avatar: user5,
        title: 'New Payment received',
        subtitle: 'Check your earnings',
        time:'9.08 AM'
    },
    {
        avatar: user1,
        title: 'Roman Joined the Team!',
        subtitle: 'Congratulate him',
        time:'9.15 AM'
    }
];

// 
// Profile 
// 

const profileDD: profileType[] = [
    {
        avatar: 'wallet-2-line-duotone',
        bgcolor:'info',
        title: 'My Profile',
        subtitle: 'Account settings',
        href: '/apps/userprofile/one'
    },
    {
        avatar: 'shield-minimalistic-line-duotone',
        bgcolor:'success',
        title: 'My Notes',
        subtitle: 'My Daily Notes',
        href: '/apps/notes'
    },
    {
        avatar: 'card-2-line-duotone',
        bgcolor:'error',
        title: 'My Tasks',
        subtitle: 'To-do and Daily tasks',
        href: '/apps/kanban'
    }
];



// 
// Quick Links
// 
const quickLink: quickLinksType[] = [
    {
        title: 'Pricing Page',
        href: '/pages/pricing'
    },
    {
        title: 'Authentication Design',
        href: '/auth/login'
    },
    {
        title: 'Register Now',
        href: '/auth/register'
    },
    {
        title: '404 Error Page',
        href: '/auth/404'
    },
    {
        title: 'Notes App',
        href: '/apps/notes'
    },
    {
        title: 'User Application',
        href: '/apps/user/profileone'
    },
    {
        title: 'Blog Design',
        href: '/apps/blog/posts'
    },
    {
        title: 'Shopping Cart',
        href: '/ecommerce/checkout'
    }
];

// 
// Search Data
// 
const searchSugg: searchType[] = [
    
    {
        title: 'Contacts',
        href: '/apps/contacts'
    },
    {
        title: 'Shop',
        href: '/ecommerce/products-one'
    },
    {
        title: 'Checkout',
        href: '/ecommerce/checkout'
    },
    {
        title: 'Chats',
        href: '/apps/chats'
    },
    {
        title: 'Notes',
        href: '/apps/notes'
    },
    {
        title: 'Pricing',
        href: '/pages/pricing'
    },
    {
        title: 'Account Setting',
        href: '/pages/account-settings'
    },
];

const optionIconData:optionIcon[] = [
    {
        title: 'Applications',
        iconcolor:'primary'
    },
    {
        title: 'Form Options',
        iconcolor:'error'
    },
    {
        title: 'Table Variations',
        iconcolor:'warning'
    },
    {
        title: 'Charts Selection',
        iconcolor:'success'
    },
    {
        title: 'Widget',
        iconcolor:'indigo'
    },
]

export { notifications, optionIconData, profileDD, quickLink, searchSugg };

