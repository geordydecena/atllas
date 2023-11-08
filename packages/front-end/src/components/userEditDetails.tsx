import React, { useState, useEffect } from 'react';
import { UserInput } from './userInput';
import { displayFieldName, groupFields } from '../utils/utils';

const EditUserDetails = ({ fields, editUserData, setEditUserData, saveUser, showEdit }) => {
    const [groupedFields, setGroupedFields] = useState([]);

    useEffect(() => {
        setGroupedFields(groupFields(fields.additional, fields.header.length));
    }, [fields]);

    const handleSaveUser = (e) => {
        e.preventDefault();
        saveUser();
    };

    return (
        <form onSubmit={(e) => handleSaveUser(e)} className="mb-1">
            <table className="table-fixed w-full h-full border">
                <tbody>
                    <tr>
                        {fields.header.map((field, index) =>
                            <td key={index} className={`p-4 align-top w-1/${fields.header.length}`}>
                                <div className="p-2 w-full">
                                    <UserInput
                                        field={field}
                                        inputData={editUserData}
                                        setInputData={setEditUserData}
                                    />
                                </div>
                            </td>
                        )}
                    </tr>
                    {groupedFields.map((group, index) =>
                        <tr key={index}>
                            {group.map((field, index) =>
                                <td key={index} className={`p-4 align-top w-1/${fields.header.length}`}>
                                    {field !== '' && (
                                        <div className="rounded p-2 w-full">
                                            <p className="p-2 font-semibold text-gray-600 rounded bg-gray-100">{displayFieldName(field)}</p>
                                            <UserInput
                                                field={field}
                                                inputData={editUserData}
                                                setInputData={setEditUserData}
                                            />
                                        </div>
                                    )}
                                </td>
                            )}
                        </tr>
                    )}
                    <tr>
                        <td colSpan={fields.header.length}>
                            <div className="float-right m-4 flex">
                                <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded ml-2">
                                    Save
                                </button>
                                <div onClick={() => showEdit(false)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                                    Cancel
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form >
    );
};

export default EditUserDetails;