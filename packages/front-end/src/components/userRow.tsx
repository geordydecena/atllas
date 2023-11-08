import React, { useState } from 'react';
import axios from 'axios';
import { ALL_FIELDS } from '../constants/constants';
import { getErrorMessage, removeObjEmptyValues } from '../utils/utils';
import UserEditDetails from './userEditDetails';
import UserDetails from './userDetails';
import ActionMenu from './actionMenu';

const UserRow = ({ user, setUsers, menuOpenId, setMenuOpenId, setUserCount, fields, setMessageModalData }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [editUserData, setEditUserData] = useState(null);
    const [userDetails, setUserDetails] = useState(user);

    const getUserDetails = async () => {
        try {
            const { data: details } = await axios.post('/api/getUserDetails', { id: user.id, attributes: ALL_FIELDS });
            setEditUserData({ ...details.data });
            setUserDetails({ ...details.data });
        } catch (e) {
            setMessageModalData({
                message: getErrorMessage(e),
                isSuccess: false
            });
        }
    };

    const handleShowEdit = async (show) => {
        await getUserDetails();
        setShowEdit(show);
    };

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

    const updateUser = async () => {
        try {
            await axios.post('/api/updateUser', removeObjEmptyValues(editUserData));
            setUserDetails(editUserData);
            setShowEdit(false);
            setMessageModalData({
                message: 'User updated!',
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
            {showEdit ? (
                <UserEditDetails
                    fields={fields}
                    editUserData={editUserData}
                    setEditUserData={setEditUserData}
                    saveUser={updateUser}
                    showEdit={handleShowEdit}
                />
            ) : (
                <div className="relative mb-1">
                    <UserDetails
                        user={user}
                        fields={fields}
                        userDetails={userDetails}
                        setEditUserData={setEditUserData}
                        setUserDetails={setUserDetails}
                        setMessageModalData={setMessageModalData}
                    />
                    <ActionMenu
                        menuOpenId={menuOpenId}
                        setMenuOpenId={setMenuOpenId}
                        user={user}
                        showEdit={handleShowEdit}
                        deleteUser={deleteUser}
                    />
                </div>
            )}
        </td>
    );
};

export default UserRow;
