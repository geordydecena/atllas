import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getErrorMessage, removeObjEmptyValues } from '../utils/utils';
import { HEADER_FIELDS, MAX_SCROLL_THRESHOLD, NUM_ROWS } from '../constants/constants';
import UserHeaderRow from './userHeaderRow';
import UserRow from './userRow';
import UserDetails from './userDetails';
import UserEditDetails from './userEditDetails';
import UserCount from './userCount';
import SearchBar from './searchBar';
import MessageModal from './messageModal';
import Spinner from './spinner';

const UserList = () => {
    const [index, setIndex] = useState(0);
    const [scrollThreshold, setScrollThreshold] = useState(0);
    const [users, setUsers] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [userDetails, setUserDetails] = useState(null);
    const [userEditDetails, setUserEditDetails] = useState(null);
    const [showSpinner, setShowSpinner] = useState(true);
    const [searchQuery, setSearchQuery] = useState({
        asc: false,
        field: 'id',
        search: '',
    });
    const [headerFields, setHeaderFields] = useState(HEADER_FIELDS);
    const [messageModalData, setMessageModalData] = useState({
        message: '',
        isSuccess: false
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                const newHeaderFields = HEADER_FIELDS.slice(0, Math.max(1, Math.min(HEADER_FIELDS.length, Math.floor(window.innerWidth / 350))));
                setHeaderFields(newHeaderFields)
            };

            handleResize();
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    useEffect(() => {
        const handleSearchAllUsers = async () => {
            await getUsers(0, true);
            setIndex(0);
        }
        handleSearchAllUsers()
    }, [searchQuery]);

    useEffect(() => {
        setTimeout(() => {
            setMessageModalData({ ...messageModalData, message: '' });
        }, 2000);
    }, [messageModalData.message]);

    const handleScroll = async (e) => {
        if (e.deltaY > 0) {
            if (scrollThreshold < MAX_SCROLL_THRESHOLD) {
                setScrollThreshold(scrollThreshold + 1);
            } else {
                await getUsers(index, false)
                setIndex((prevIndex) => (prevIndex + 1 >= userCount ? prevIndex : prevIndex + 1));
                setScrollThreshold(0);
            }
        } else {
            if (scrollThreshold > -MAX_SCROLL_THRESHOLD) {
                setScrollThreshold(scrollThreshold - 1);
            } else {
                await getUsers(index, false)
                setIndex((prevIndex) => (prevIndex - 1 < 0 ? prevIndex : prevIndex - 1));
                setScrollThreshold(0);
            }
        }
    };

    const getUsers = async (index, updateCache) => {
        try {
            const { data: searchedUsers } = await axios.post('/api/searchUser', { ...searchQuery, attributes: headerFields, index, updateCache });
            setUsers(searchedUsers.users);
            if (updateCache) {
                setUserCount(searchedUsers.count);
            }

            setShowSpinner(false);
        } catch (e) {
            setMessageModalData({
                message: getErrorMessage(e),
                isSuccess: false
            });
        }
    };

    const deleteUser = async () => {
        try {
            await axios.post('/api/deleteUser', { id: userDetails.id });
            setUserCount((prev) => (prev - 1));

            await getUsers(index, true);
            setUserDetails(null)

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

    const saveUser = async () => {
        try {
            const filteredUserDetails = removeObjEmptyValues(userEditDetails);
            if (userEditDetails.id) {
                await axios.post('/api/updateUser', removeObjEmptyValues(filteredUserDetails));
            } else {
                await axios.post('/api/addUser', removeObjEmptyValues(filteredUserDetails));
            }

            await getUsers(index, true);
            setUserDetails(filteredUserDetails)
            setUserEditDetails(null)

            setMessageModalData({
                message: 'User saved!',
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
        <div className="relative h-[100vh]" onWheel={handleScroll}>
            {messageModalData.message && (
                <MessageModal
                    message={messageModalData.message}
                    isSuccess={messageModalData.isSuccess}
                />
            )}
            <div className="py-2 mx-4 flex">
                <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    setShowSpinner={setShowSpinner}
                />
                {showSpinner ? <Spinner /> : <UserCount userCount={userCount} />}
            </div>
            <UserHeaderRow
                headerFields={headerFields}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setHeaderFields={setHeaderFields}
                setShowSpinner={setShowSpinner}
                setUserEditData={setUserEditDetails}
            />
            {userEditDetails && (
                <UserEditDetails
                    user={userEditDetails}
                    headerFields={headerFields}
                    saveUser={saveUser}
                    setUserEditDetails={setUserEditDetails}
                />
            )}
            {userDetails && (
                <UserDetails
                    user={userDetails}
                    headerFields={headerFields}
                    setUserDetails={setUserDetails}
                    setUserEditDetails={setUserEditDetails}
                    deleteUser={deleteUser}
                />
            )}
            {!showSpinner && (
                <table className="w-full">
                    <tbody>
                        {Array.from({ length: Math.min(NUM_ROWS, users.length) }, (_, i) => i).map((index =>
                            <tr key={users[index].id}>
                                {users[index].id && (
                                    <UserRow
                                        user={users[index]}
                                        headerFields={headerFields}
                                        setUserDetails={setUserDetails}
                                    />
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserList;
