import React, { useState, useEffect } from 'react';
import { ALL_FIELDS } from '../constants/constants';
import { displayFieldName, displayFieldValue, groupFields } from '../utils/utils';

const UserDetails = ({ user, headerFields, setUserDetails, setUserEditDetails, deleteUser }) => {
    const [groupedFields, setGroupedFields] = useState([]);

    useEffect(() => {
        setGroupedFields(groupFields(ALL_FIELDS, headerFields.length));
    }, [headerFields]);

    return (
        <div className='pb-[40vh] h-full w-full overflow-y-auto bg-gray-100 z-10'>
            <table className='table-fixed w-full'>
                <tbody>
                    {groupedFields.map((group, index) =>
                        <tr key={index}>
                            {group.map((field, index) =>
                                <td key={index} className={`p-4 align-top w-1/${headerFields.length}`}>
                                    {field !== '' && (
                                        <div className='my-4'>
                                            <p className="p-2 font-semibold text-gray-600">{displayFieldName(field)}</p>
                                            <p className="p-2 rounded bg-white border-b-2 bg-white text-gray-800 whitespace-normal break-words">{displayFieldValue(field, user[field], true, false)}</p>
                                        </div>
                                    )}
                                </td>
                            )}
                        </tr>
                    )}
                    <tr>
                        <td colSpan={headerFields.length}>
                            <div className="float-right m-4 flex">
                                <div className="bg-blue-500 text-white px-2 py-1 rounded ml-2" onClick={() => setUserEditDetails(user)}>
                                    Edit
                                </div>
                                <div className="bg-red-500 text-white px-2 py-1 rounded ml-2" onClick={() => deleteUser()}>
                                    Delete
                                </div>
                                <div className="bg-gray-400 text-white px-2 py-1 rounded ml-2" onClick={() => setUserDetails(null)}>
                                    Return
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table >
        </div>
    );
};

export default UserDetails;
