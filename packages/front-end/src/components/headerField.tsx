import React, { useState } from 'react';
import { ALL_FIELDS } from '../constants/constants';
import { displayFieldName } from '../utils/utils';


const SortButton = ({ searchQuery, setSearchQuery, initialField, fields, column, setFields, setShowSpinner }) => {
    const [sortDetails, setSortDetails] = useState({ field: initialField, asc: true });

    const handleChangeField = (field, asc) => {
        setShowSpinner(true);
        setSearchQuery({ ...searchQuery, field, asc });
        setSortDetails({ field, asc });

        setFields((prev) => {
            const newHeaderFields = prev.header;
            newHeaderFields[column] = field;
            return {
                header: newHeaderFields,
                additional: ALL_FIELDS.filter(field => !newHeaderFields.includes(field))
            };
        });
    };

    return (
        <div className="py-1 px-2 flex items-center w-50 mr-8 font-bold">
            <select
                value={sortDetails.field}
                onChange={(e) => handleChangeField(e.target.value, true)}
                className="border rounded py-1 px-2 m-1 h-8 w-40 cursor-pointer"
            >
                <option key={initialField} value={initialField}>
                    {displayFieldName(initialField)}
                </option>
                {ALL_FIELDS.filter(field => !fields.header.includes(field)).map((field) => (
                    <option key={field} value={field}>
                        {displayFieldName(field)}
                    </option>
                ))}
            </select>
            <div className={(searchQuery.field === sortDetails.field ? "bg-gray-100" : "") + " border rounded p-1 m-1 w-8 h-8 cursor-pointer"} onClick={() => handleChangeField(sortDetails.field, !sortDetails.asc)}>
                <a className={sortDetails.asc ? "iconSortAsc" : "iconSortDesc"}></a>
            </div>
        </div >
    );
};

export default SortButton;
