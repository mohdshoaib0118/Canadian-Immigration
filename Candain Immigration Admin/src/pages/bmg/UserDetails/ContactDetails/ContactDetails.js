import React from 'react';

const UserTable = ({ specificUserData }) => {
    return (
        <table className="table">
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>
                        <span className="text-capitalize">{specificUserData?.name && specificUserData?.name} </span>
                        <span className="text-capitalize">
                            {specificUserData?.lastName && specificUserData?.lastName}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Phone Number</td>
                    <td>{specificUserData?.phoneNumber ? specificUserData?.phoneNumber : '-'}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{specificUserData?.email ? specificUserData?.email : '-'}</td>
                </tr>
                <tr>
                    <td>Role</td>
                    <td className="text-capitalize">{specificUserData?.role ? specificUserData?.role : '-'}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default UserTable;
