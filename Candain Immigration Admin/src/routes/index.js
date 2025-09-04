import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import Root from './Root';
import * as layoutConstants from '../constants/layout';

// All layouts/containers
import DefaultLayout from '../layouts/Default';
import VerticalLayout from '../layouts/Vertical';
import DetachedLayout from '../layouts/Detached';
import HorizontalLayout from '../layouts/Horizontal';
import FullLayout from '../layouts/Full';

// lazy load all the views

// auth
const Login = React.lazy(() => import('../pages/account/Login'));
const Logout = React.lazy(() => import('../pages/account/Logout'));
const Register = React.lazy(() => import('../pages/account/Register'));
const Confirm = React.lazy(() => import('../pages/account/Confirm'));
const ForgetPassword = React.lazy(() => import('../pages/account/ForgetPassword'));
const LockScreen = React.lazy(() => import('../pages/account/LockScreen'));
const PageDetails = React.lazy(() => import('../pages/bmg/products/ProductDetails/ProductDetails'));
const Dashboard = React.lazy(() => import('../pages/bmg/dashboard/Dashboard'));

//BMG pages
const AuctionLead = React.lazy(() => import('../pages/bmg/auctionLead/AuctionLead'));
const Category = React.lazy(() => import('../pages/bmg/categories/Categories'));
const Products = React.lazy(() => import('../pages/bmg/products/Products'));
// const Buyer_Seller = React.lazy(() => import('../pages/bmg/buyer-seller/Buyer_Seller'));
const Seller = React.lazy(() => import('../pages/bmg/Seller/Seller'));
const Buyer = React.lazy(() => import('../pages/bmg/Buyer/Buyer'));
const BuyerDetails = React.lazy(() => import('../pages/bmg/Buyer/BuyerDetails/BuyerDetails'));

const Faq = React.lazy(() => import('../pages/bmg/faq/Faq'));
const Orders = React.lazy(() => import('../pages/bmg/orders/Orders'));
const Enquiry = React.lazy(() => import('../pages/bmg/enquiry/Enquiry'));
const Notification = React.lazy(() => import('../pages/bmg/notification/Notification'));
const Comission = React.lazy(() => import('../pages/bmg/comission/Comission'));
const SoldProducts = React.lazy(() => import('../pages/bmg/soldProducts/SoldProducts'));
const LiveBids = React.lazy(() => import('../pages/bmg/liveBids/LiveBidMonitoring'));
const LiveBidsMonitoring = React.lazy(() => import('../pages/bmg/liveBids/liveBidsMonitoring/LiveBidsMonitoring'));
const Transactions = React.lazy(() => import('../pages/bmg/transactions/Transactions'));
const BidPercentage = React.lazy(() => import('../pages/bmg/bidPercentage/BidPercentage'));
const UserDetails = React.lazy(() => import('../pages/bmg/UserDetails/UserDetails'));
const HelpAndSupport = React.lazy(() => import('../pages/bmg/help&support/Helpandsupport'));
const TicketDetails = React.lazy(() => import('../pages/bmg/help&support/Tickets'));
const States = React.lazy(() => import('../pages/bmg/location/States'));
const Cities = React.lazy(() => import('../pages/bmg/location/Cities'));

// error handlers
const ErrorPageNotFound = React.lazy(() => import('../pages/error/PageNotFound'));
const ErrorPageNotFoundAlt = React.lazy(() => import('../pages/error/PageNotFoundAlt'));
const ServerError = React.lazy(() => import('../pages/error/ServerError'));

const loading = () => <div className=""></div>;

type LoadComponentProps = {
    component: React.LazyExoticComponent<() => JSX.Element>,
};

const LoadComponent = ({ component: Component }: LoadComponentProps) => (
    <Suspense fallback={loading()}>
        <Component />
    </Suspense>
);

const AllRoutes = () => {
    const { layout } = useSelector((state) => ({
        layout: state.Layout,
    }));

    const getLayout = () => {
        let layoutCls = VerticalLayout;

        switch (layout.layoutType) {
            case layoutConstants.LAYOUT_HORIZONTAL:
                layoutCls = HorizontalLayout;
                break;
            case layoutConstants.LAYOUT_DETACHED:
                layoutCls = DetachedLayout;
                break;
            case layoutConstants.LAYOUT_FULL:
                layoutCls = FullLayout;
                break;
            default:
                layoutCls = VerticalLayout;
                break;
        }
        return layoutCls;
    };
    let Layout = getLayout();

    return useRoutes([
        { path: '/', element: <Root /> },
        {
            // public routes
            path: '/',
            element: <DefaultLayout />,
            children: [
                {
                    path: 'account',
                    children: [
                        { path: 'login', element: <LoadComponent component={Login} /> },
                        { path: 'register', element: <LoadComponent component={Register} /> },
                        { path: 'confirm', element: <LoadComponent component={Confirm} /> },
                        { path: 'forget-password', element: <LoadComponent component={ForgetPassword} /> },
                        { path: 'lock-screen', element: <LoadComponent component={LockScreen} /> },
                        { path: 'logout', element: <LoadComponent component={Logout} /> },
                    ],
                },
                {
                    path: 'error-404',
                    element: <LoadComponent component={ErrorPageNotFound} />,
                },
                {
                    path: 'not-found',
                    element: <LoadComponent component={ErrorPageNotFoundAlt} />,
                },
                {
                    path: 'error-500',
                    element: <LoadComponent component={ServerError} />,
                },
            ],
        },
        {
            // auth protected routes
            path: '/',
            element: <PrivateRoute roles={'admin'} component={Layout} />,
            children: [
                {
                    path: 'bmg',
                    children: [
                        {
                            path: 'dashboard',
                            element: <LoadComponent component={Dashboard} />,
                        },
                        {
                            path: 'leads',
                            element: <LoadComponent component={AuctionLead} />,
                        },
                        {
                            path: 'categories',
                            element: <LoadComponent component={Category} />,
                        },
                        {
                            path: 'items',
                            element: <LoadComponent component={Products} />,
                        },
                        {
                            path: 'items/:id',
                            element: <LoadComponent component={PageDetails} />,
                        },
                        // {
                        //     path: 'users',
                        //     element: <LoadComponent component={Buyer_Seller} />,
                        // },
                        {
                            path: 'buyers',
                            element: <LoadComponent component={Buyer} />,
                        },
                        {
                            path: 'buyers/order-history/:id',
                            element: <LoadComponent component={BuyerDetails} />,
                        },
                        {
                            path: 'sellers',
                            element: <LoadComponent component={Seller} />,
                        },
                        {
                            path: 'users/:id',
                            element: <LoadComponent component={UserDetails} />,
                        },
                        {
                            path: 'faq',
                            element: <LoadComponent component={Faq} />,
                        },
                        {
                            path: 'orders',
                            element: <LoadComponent component={Orders} />,
                        },
                        {
                            path: 'enquiry',
                            element: <LoadComponent component={Enquiry} />,
                        },
                        {
                            path: 'notification',
                            element: <LoadComponent component={Notification} />,
                        },
                        {
                            path: 'platform-charges',
                            element: <LoadComponent component={Comission} />,
                        },
                        {
                            path: 'sold-items',
                            element: <LoadComponent component={SoldProducts} />,
                        },
                        {
                            path: 'live-bids',
                            element: <LoadComponent component={LiveBids} />,
                        },
                        {
                            path: 'live-bids/live-monitoring/:id',
                            element: <LoadComponent component={LiveBidsMonitoring} />,
                        },
                        {
                            path: 'transactions',
                            element: <LoadComponent component={Transactions} />,
                        },
                        {
                            path: 'help-support',
                            element: <LoadComponent component={HelpAndSupport} />,
                        },
                        {
                            path: 'ticket/:id',
                            element: <LoadComponent component={TicketDetails} />,
                        },
                        {
                            path: 'bidPercentage',
                            element: <LoadComponent component={BidPercentage} />,
                        },
                        {
                            path: 'location',
                            element: <LoadComponent component={States} />,
                        },
                        {
                            path: 'cities/:id',
                            element: <LoadComponent component={Cities} />,
                        },
                    ],
                },
            ],
        },
    ]);
};

export { AllRoutes };
