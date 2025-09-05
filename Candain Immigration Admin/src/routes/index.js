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

// Canadian Dream Immigration pages
const Dashboard = React.lazy(() => import('../pages/bmg/dashboard/Dashboard'));
const Faq = React.lazy(() => import('../pages/bmg/faq/Faq'));
const Teams = React.lazy(() => import('../pages/bmg/teams/Teams'));
const Services = React.lazy(() => import('../pages/bmg/services/Services'));
const Blogs = React.lazy(() => import('../pages/bmg/blogs/Blogs'));
const LatestNews = React.lazy(() => import('../pages/bmg/latestNews/LatestNews'));
const Enquiry = React.lazy(() => import('../pages/bmg/enquiry/Enquiry'));
const Notification = React.lazy(() => import('../pages/bmg/notification/Notification'));



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
                    path: 'admin',
                    children: [
                        {
                            path: 'dashboard',
                            element: <LoadComponent component={Dashboard} />,
                        },
                        {
                            path: 'faq',
                            element: <LoadComponent component={Faq} />,
                        },
                        {
                            path: 'teams',
                            element: <LoadComponent component={Teams} />,
                        },
                        {
                            path: 'services',
                            element: <LoadComponent component={Services} />,
                        },
                        {
                            path: 'blogs',
                            element: <LoadComponent component={Blogs} />,
                        },
                        {
                            path: 'latest-news',
                            element: <LoadComponent component={LatestNews} />,
                        },
                        {
                            path: 'enquiry',
                            element: <LoadComponent component={Enquiry} />,
                        },
                        {
                            path: 'notification',
                            element: <LoadComponent component={Notification} />,
                        },


                    ],
                },
            ],
        },
    ]);
};

export { AllRoutes };
