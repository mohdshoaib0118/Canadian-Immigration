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
        url: '/bmg/dashboard',
    },

    {
        key: 'Seller',
        label: 'Seller',
        icon: 'mdi mdi-account-cash',
        children: [
            { key: 'leads', label: 'Auction Leads', url: '/bmg/leads', parentKey: 'Seller' },
            { key: 'live-bids', label: 'Live Bids', url: '/bmg/live-bids', parentKey: 'Seller' },
            // { key: 'categories', label: 'Categories', url: '/bmg/categories', parentKey: 'Seller' },
            { key: 'items', label: 'Items', url: '/bmg/items', parentKey: 'Seller' },
            { key: 'sold-items', label: 'Sold Items', url: '/bmg/sold-items', parentKey: 'Seller' },
            { key: 'orders', label: 'Orders', url: '/bmg/orders', parentKey: 'Seller' },
            { key: 'transactions', label: 'Transactions', url: '/bmg/transactions', parentKey: 'Seller' },
            { key: 'seller', label: 'Seller-List', url: '/bmg/sellers', parentKey: 'Seller' },
        ],
    },

    {
        key: 'Buyer',
        label: 'Buyer',
        icon: 'mdi mdi-store-outline',
        children: [
            // { key: 'analytics', label: 'Analytics', url: '/dashboard/analytics', parentKey: 'Buyer' },
            // { key: 'faq', label: 'Faq', url: '/bmg/faq', parentKey: 'Buyer' },
            // { key: 'notification', label: 'Notification', url: '/bmg/notification', parentKey: 'Buyer' },
            // { key: 'enquiry', label: 'Enquiry', url: '/bmg/enquiry', parentKey: 'Buyer' },
            { key: 'buyer', label: 'Buyer-List', url: '/bmg/buyers', parentKey: 'Buyer' },
        ],
    },
    {
        key: 'Handler',
        label: 'Handler',
        icon: 'mdi mdi-account-cash',
        children: [{ key: 'bidPercentage', label: 'Bid Percentage', url: '/bmg/bidPercentage', parentKey: 'Handler' }],
    },

    {
        key: 'Settings',
        label: 'Settings',
        isTitle: false,
        icon: 'mdi mdi-cog',
        url: '/bmg/leads',
        children: [
            { key: 'platform-charges', label: 'Platform Charges', url: '/bmg/platform-charges', parentKey: 'Settings' },
            // { key: 'analytics', label: 'Analytics', url: '/dashboard/analytics', parentKey: 'Buyer' },
            { key: 'faq', label: 'Faq', url: '/bmg/faq', parentKey: 'Settings' },
            { key: 'notification', label: 'Notification', url: '/bmg/notification', parentKey: 'Settings' },
            { key: 'enquiry', label: 'Enquiry', url: '/bmg/enquiry', parentKey: 'Settings' },
            { key: 'categories', label: 'Categories', url: '/bmg/categories', parentKey: 'Settings' },
            { key: 'help-support', label: 'Help & Support', url: '/bmg/help-support', parentKey: 'Settings' },
            { key: 'location', label: 'Location', url: '/bmg/location', parentKey: 'Settings' },
        ],
    },
];

export default MENU_ITEMS;
