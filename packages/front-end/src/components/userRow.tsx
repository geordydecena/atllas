import React, { useState } from 'react';
import axios from 'axios';
import { getErrorMessage } from '../utils/utils';
import UserDetails from './userDetails';
import ActionMenu from './actionMenu';

const UserRow = ({ user, setUsers, menuOpenId, setMenuOpenId, setUserCount, fields, setMessageModalData }) => {
    const [userDetails, setUserDetails] = useState(user);

    const deleteUser = async () => {
        try {
            await axios.post('/api/deleteUser', { id: userDetails.id });
            setUserCount((prev) => (prev - 1));
            setUsers((prev) => (prev.filter(user => user.id !== userDetails.id)));
            setMessageModalData({
                message: 'User deleted!',
                isSuccess: true
            });
        } catch (e) {
            setMessageModalData({
                message: getErrorMessage(e),
                isSuccess: false
            });
        }
    };

    return (
        <td colSpan={fields.header.length}>
            <div className="relative mb-1">
                <UserDetails
                    user={user}
                    fields={fields}
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                    setMessageModalData={setMessageModalData}
                />
                <ActionMenu
                    menuOpenId={menuOpenId}
                    setMenuOpenId={setMenuOpenId}
                    user={user}
                    deleteUser={deleteUser}
                />
            </div>
        </td>
    );
};

export default UserRow;
