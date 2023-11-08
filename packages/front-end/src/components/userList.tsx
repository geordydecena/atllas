import React from 'react';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { getErrorMessage } from '../utils/utils';
import { HEADER_FIELDS, ALL_FIELDS } from '../constants/constants';
import HeaderRow from './headerRow';
import UserRow from './userRow';
import SearchBar from './searchBar';
import UserCount from './userCount';
import MessageModal from './messageModal';
import Spinner from './spinner';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [menuOpenId, setMenuOpenId] = useState(null);
    const [showSpinner, setShowSpinner] = useState(true);
    const [searchQuery, setSearchQuery] = useState({
        asc: false,
        field: 'id',
        search: '',
    });
    const [fields, setFields] = useState({
        header: HEADER_FIELDS,
        additional: ALL_FIELDS.filter(field => !HEADER_FIELDS.includes(field))
    });
    const [messageModalData, setMessageModalData] = useState({
        message: '',
        isSuccess: false
    });
    const scrollRef = useRef(null);

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
        getUsers();
    }, [searchQuery]);

    useEffect(() => {
        setTimeout(() => {
            setMessageModalData({ ...messageModalData, message: '' });
        }, 2000);
    }, [messageModalData.message]);

    const getUsers = async () => {
        try {
            const { data: searchedUsers } = await axios.post('/api/searchUser', { ...searchQuery, attributes: fields.header });
            setUsers(searchedUsers.data.users);
            setUserCount(searchedUsers.data.count);
            setShowSpinner(false);
        } catch (e) {
            setMessageModalData({
                message: getErrorMessage(e),
                isSuccess: false
            });
        }
    };

    return (
        <div className="relative">
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
            <table className="w-full border-collapse">
                <thead>
                    <tr className="flex-1">
                        <HeaderRow
                            fields={fields}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            setFields={setFields}
                            setShowSpinner={setShowSpinner}
                        />
                    </tr>
                </thead>
            </table>
            <div className="max-h-[100vh] overflow-y-auto pb-[40vh]" ref={scrollRef}>
                <table className="w-full border-collapse">
                    <tbody>
                        {!showSpinner && users.map((user) =>
                            <tr key={user.id}>
                                <UserRow
                                    user={user}
                                    menuOpenId={menuOpenId}
                                    fields={fields}
                                    setUsers={setUsers}
                                    setUserCount={setUserCount}
                                    setMenuOpenId={setMenuOpenId}
                                    setMessageModalData={setMessageModalData}
                                />
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
