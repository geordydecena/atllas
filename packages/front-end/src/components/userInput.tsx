import React from 'react';
import { EDITABLE_FIELDS, REQUIRED_FIELDS } from '../constants/constants';
import { displayFieldValue } from '../utils/utils';

const UserInput = ({ field, inputData, setInputData }) => {
    return (
        <input
            id={field}
            type="text"
            name={field}
            readOnly={!EDITABLE_FIELDS.includes(field)}
            required={REQUIRED_FIELDS.includes(field)}
            value={displayFieldValue(field, inputData[field], true, true)}
            onChange={(e) => {
                inputData[field] = e.target.value;
                setInputData({ ...inputData });
            }}
            className="border-b-2 bg-white outline-none rounded p-2 w-full h-full"
        />
    );
};

export default UserInput;