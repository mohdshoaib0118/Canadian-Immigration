import React, { useEffect } from 'react';
import UserTable from './ContactDetails/ContactDetails';
import Transaction from './Transactions/Transaction';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRecentRegistrationsForDashboardActions } from '../../../redux/actions';

const UserDetails = () => {
    const store = useSelector((state) => state);
    const { id } = useParams();
    const usersData = store?.getRecentRegistrationsForDashboardReducer?.dashboardData?.allUsers;
    const specificUserData = usersData?.find((ele) => ele?._id == id);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRecentRegistrationsForDashboardActions({}));
    }, []);
    return (
        <div>
            <h3>User Details</h3>
            {/* Contact Details */}
            <UserTable specificUserData={specificUserData} />
            {/* Transactions */}
            <h3>Transactions</h3>
            <Transaction specificUserData={specificUserData} />
        </div>
    );
};

export default UserDetails;
