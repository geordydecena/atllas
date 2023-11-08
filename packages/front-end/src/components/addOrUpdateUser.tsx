import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HEADER_FIELDS, ALL_FIELDS } from '../constants/constants';
import { getErrorMessage, removeObjEmptyValues } from '../utils/utils';
import { useRouter } from 'next/router'
import UserEditDetails from './userEditDetails';
import MessageModal from './messageModal';

const AddUser = () => {
    const router = useRouter()
    const [newUserData, setNewUserData] = useState({
        id: null,
        firstName: null,
        middleName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        address: null,
        adminNotes: null,
        registered: new Date()
    });
    const [fields, setFields] = useState({
        header: HEADER_FIELDS,
        additional: ALL_FIELDS
    });
    const [messageModalData, setMessageModalData] = useState({
        message: '',
        isSuccess: false
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {

            const handleResize = () => {
                const newHeaderFields = HEADER_FIELDS.slice(0, Math.max(1, Math.min(HEADER_FIELDS.length, Math.floor(window.innerWidth / 350))));
                const newAdditionalFields = ALL_FIELDS.filter(field => !newHeaderFields.includes(field));

                setFields({
                    header: newHeaderFields,
                    additional: newAdditionalFields,
                })
            };

            handleResize();
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    useEffect(() => {
        const handleGetUserDetails = async (id) => {
            await getUserDetails(id);
        };
        const data = router.query;
        if (data.id) {
            handleGetUserDetails(data.id)
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setMessageModalData({ ...messageModalData, message: '' });
        }, 2000);
    }, [messageModalData.message]);

    const getUserDetails = async (id) => {
        try {
            const { data: details } = await axios.post('/api/getUserDetails', { id, attributes: ALL_FIELDS });
            setNewUserData({ ...details.data });
        } catch (e) {
            setMessageModalData({
                message: getErrorMessage(e),
                isSuccess: false
            });
        }
    };

    const addOrUpdateUser = async () => {
        try {
            if (newUserData.id) {
                await axios.post('/api/updateUser', removeObjEmptyValues(newUserData));
            } else {
                await axios.post('/api/addUser', removeObjEmptyValues(newUserData));
            }
            router.push({
                pathname: '/',
            })
        } catch (e) {
            setMessageModalData({
                message: getErrorMessage(e),
                isSuccess: false
            });
        }
    }

    return (
        <div className='relative'>
            {messageModalData.message && (
                <MessageModal
                    message={messageModalData.message}
                    isSuccess={messageModalData.isSuccess}
                />
            )}
            <UserEditDetails
                fields={fields}
                editUserData={newUserData}
                setEditUserData={setNewUserData}
                saveUser={addOrUpdateUser}
            />
        </div>
    );
};

export default AddUser;
