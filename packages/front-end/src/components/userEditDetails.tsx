import React, { useState, useEffect } from 'react';
import { ALL_FIELDS } from '../constants/constants';
import { groupFields, getLabel } from '../utils/utils';
import UserInput from './userInput';

const UserEditDetails = ({ user, headerFields, setUserEditDetails, saveUser }) => {
    const [groupedFields, setGroupedFields] = useState([]);

    useEffect(() => {
        setGroupedFields(groupFields(ALL_FIELDS, headerFields.length));
    }, [headerFields]);

    const handleSaveUser = async (e) => {
        e.preventDefault()
        await saveUser()
    }

    return (
        <div className='absolute pb-[40vh] h-full w-full overflow-y-auto bg-gray-100 z-20'>
            <form onSubmit={(e) => handleSaveUser(e)} className='flex'>
                <table className='table-fixed w-full'>
                    <tbody>
                        {groupedFields.map((group, index) =>
                            <tr key={index}>
                                {group.map((field, index) =>
                                    <td key={index} className={`p-4 align-top w-1/${headerFields.length}`}>
                                        {field !== '' && (
                                            <div className='my-4'>
                                                <p className="p-2 font-semibold text-gray-600">{getLabel(field)}</p>
                                                <UserInput
                                                    field={field}
                                                    inputData={user}
                                                    setInputData={setUserEditDetails}
                                                />
                                            </div>
                                        )}
                                    </td>
                                )}
                            </tr>
                        )}
                        <tr>
                            <td colSpan={headerFields.length}>
                                <div className="float-right m-4 flex">
                                    <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded ml-2">
                                        Save
                                    </button>
                                    <div className="bg-red-500 text-white px-2 py-1 rounded ml-2" onClick={() => setUserEditDetails(null)}>
                                        Cancel
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table >
            </form>
        </div>
    );
};

export default UserEditDetails;
