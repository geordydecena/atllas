import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ALL_FIELDS } from '../constants/constants';
import { getErrorMessage, displayFieldName, displayFieldValue, groupFields } from '../utils/utils';

const UserDetails = ({ user, fields, userDetails, setEditUserData, setUserDetails, setMessageModalData }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [groupedFields, setGroupedFields] = useState([]);

    useEffect(() => {
        setGroupedFields(groupFields(fields.additional, fields.header.length));
    }, [fields]);

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

    const handleShowDetails = async () => {
        if (!showDetails) {
            await getUserDetails();
        }
        setShowDetails((prev) => !prev);
    };

    return (
        <table className='table-fixed w-full h-full border'>
            <tbody>
                <tr>
                    {fields.header.map((field, index) =>
                        <td key={index} className={`h-12 w-1/${fields.header.length} ${showDetails ? 'px-6 py-4 align-top' : 'px-6 align-center'}`} onClick={() => handleShowDetails()}>
                            <p className="text-gray-800 whitespace-normal break-words whitespace-wrap">{displayFieldValue(field, userDetails[field], showDetails, false)}</p>
                        </td>
                    )}
                </tr>
                {showDetails &&
                    <>
                        {groupedFields.map((group, index) =>
                            <tr key={index}>
                                {group.map((field, index) =>
                                    <td key={index} className={`p-4 align-top w-1/${fields.header.length}`}>
                                        {field !== '' && (
                                            <div>
                                                <p className="p-2 font-semibold text-gray-600 rounded bg-gray-100">{displayFieldName(field)}</p>
                                                <p className="p-2 text-gray-800 whitespace-normal break-words">{displayFieldValue(field, userDetails[field], showDetails, false)}</p>
                                            </div>
                                        )}
                                    </td>
                                )}
                            </tr>
                        )}
                    </>
                }
            </tbody>
        </table>
    );
};

export default UserDetails;
