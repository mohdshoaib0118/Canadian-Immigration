// import { FiSettings } from 'react-icons/fi';

// const MENU_ITEMS = [
//     { key: 'navigation', label: 'Navigation', isTitle: true },
//     {
//         key: 'dashboard',
//         label: 'Dashboard',
//         isTitle: false,
//         icon: 'uil-dashboard',
//         url: '/bmg/dashboard',
//         // children: [
//         //     {
//         //         key: 'ds-analytics',
//         //         label: 'Analytics',
//         //         url: '/dashboard/analytics',
//         //         parentKey: 'dashboards',
//         //     },
//         //     {
//         //         key: 'ds-ecommerce',
//         //         label: 'Ecommerce',
//         //         url: '/dashboard/ecommerce',
//         //         parentKey: 'dashboards',
//         //     },
//         // ],
//     },
//     {
//         key: 'Seller',
//         label: 'Seller',
//         isTitle: false,
//         icon: 'mdi mdi-account-cash',
//         url: '/bmg/dashboard',
//         children: [
//             {
//                 key: 'Auction Leads',
//                 label: 'Settings',
//                 parentKey: 'dashboards',
//                 url: '/bmg/leads',
//             },
//             {
//                 key: 'ds-ecommerce',
//                 label: 'Live Bids',
//                 url: '/dashboard/ecommerce',
//                 parentKey: 'dashboards',
//             },
//         ],
//     },
//     {
//         key: 'Buyer',
//         label: 'Buyer',
//         isTitle: false,
//         icon: 'mdi-store-outline mdi',
//         url: '/bmg/dashboard',
//         children: [
//             {
//                 key: 'ds-analytics',
//                 label: 'Analytics',
//                 url: '/dashboard/analytics',
//                 parentKey: 'dashboards',
//             },
//             {
//                 key: 'ds-ecommerce',
//                 label: 'Ecommerce',
//                 url: '/dashboard/ecommerce',
//                 parentKey: 'dashboards',
//             },
//         ],
//     },

//     {
//         key: 'Settings',
//         label: 'Settings',
//         isTitle: false,
//         icon: 'mdi mdi-cog',
//         url: '/bmg/leads',
//     },
//     // {
//     //     key: 'live-bids',
//     //     label: 'Live Bids',
//     //     isTitle: false,
//     //     icon: 'uil-monitor-heart-rate',
//     //     url: '/bmg/live-bids',
//     // },
//     // {
//     //     key: 'categories',
//     //     label: 'Categories',
//     //     isTitle: false,
//     //     icon: 'uil-cell',
//     //     url: '/bmg/categories',
//     // },
//     // {
//     //     key: 'items',
//     //     label: 'Items',
//     //     isTitle: false,
//     //     icon: 'uil-box',
//     //     url: '/bmg/items',
//     // },
//     // // {
//     // //     key: 'sold-items',
//     // //     label: 'Sold Items',
//     // //     isTitle: false,
//     // //     icon: ' uil-image-broken',
//     // //     url: '/bmg/sold-items',
//     // // },
//     // {
//     //     key: 'users',
//     //     label: 'Users',
//     //     isTitle: false,
//     //     icon: ' uil-users-alt',
//     //     url: '/bmg/users',
//     // },
//     // {
//     //     key: 'orders',
//     //     label: 'Orders',
//     //     isTitle: false,
//     //     icon: 'uil-list-ui-alt',
//     //     url: '/bmg/orders',
//     // },
//     // {
//     //     key: 'transactions',
//     //     label: 'Transactions',
//     //     isTitle: false,
//     //     icon: ' uil-usd-circle',
//     //     url: '/bmg/transactions',
//     // },
//     // {
//     //     key: 'platform-charges',
//     //     label: 'Platform Charges',
//     //     isTitle: false,
//     //     icon: 'uil-bill',
//     //     url: '/bmg/platform-charges',
//     // },
//     // {
//     //     key: 'faq',
//     //     label: 'Faq',
//     //     isTitle: false,
//     //     icon: ' uil-comment-exclamation',
//     //     url: '/bmg/faq',
//     // },
//     // {
//     //     key: 'notification',
//     //     label: 'Notification',
//     //     isTitle: false,
//     //     icon: 'uil-comment-alt-notes',
//     //     url: '/bmg/notification',
//     // },
//     // {
//     //     key: 'enquiry',
//     //     label: 'Enquiry',
//     //     isTitle: false,
//     //     icon: 'uil-comments-alt',
//     //     url: '/bmg/enquiry',
//     // },
// ];

// export default MENU_ITEMS;
const MENU_ITEMS = [
    {
        key: 'Dashboard',
        icon: 'uil-dashboard',
        label: 'Dashboard',
        url: '/admin/dashboard',
    },

    {
        key: 'Content Management',
        label: 'Content Management',
        icon: 'mdi mdi-file-document-multiple',
        children: [
            { key: 'faq', label: 'FAQ Management', url: '/admin/faq', parentKey: 'Content Management' },
            { key: 'teams', label: 'Team Management', url: '/admin/teams', parentKey: 'Content Management' },
            { key: 'services', label: 'Services Management', url: '/admin/services', parentKey: 'Content Management' },
            { key: 'blogs', label: 'Blog Management', url: '/admin/blogs', parentKey: 'Content Management' },
            { key: 'latest-news', label: 'Latest News', url: '/admin/latest-news', parentKey: 'Content Management' },
        ],
    },

    {
        key: 'Immigration Services',
        label: 'Immigration Services',
        icon: 'mdi mdi-passport',
        children: [
            { key: 'enquiry', label: 'Client Enquiries', url: '/admin/enquiry', parentKey: 'Immigration Services' },
            { key: 'notification', label: 'Notifications', url: '/admin/notification', parentKey: 'Immigration Services' },
        ],
    },


];

export default MENU_ITEMS;
