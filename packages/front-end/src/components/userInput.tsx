import React from 'react';
import { EDITABLE_FIELDS, REQUIRED_FIELDS } from '../constants/constants';
import { getPlaceHolder, displayFieldValue } from '../utils/utils';

export const UserInput = ({ field, inputData, setInputData }) => {
    return (
        <input
            type="text"
            name={field}
            readOnly={!EDITABLE_FIELDS.includes(field)}
            placeholder={getPlaceHolder(field)}
            required={REQUIRED_FIELDS.includes(field)}
            value={displayFieldValue(field, inputData[field], true, true)}
            onChange={(e) => {
                inputData[field] = e.target.value;
                setInputData({ ...inputData });
            }}
            className="border-b outline-none rounded p-2 w-full inline-block"
        />
    );
};