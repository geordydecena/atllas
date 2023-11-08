import { FIELD_KEY_TO_FIELD_DISPLAY, REQUIRED_FIELDS, MAX_DISPLAY_LENGTH } from '../constants/constants';

export const getErrorMessage = (error) => {
    return error.response?.data?.message || error.message;
};

export const displayFieldName = (field) => {
    return FIELD_KEY_TO_FIELD_DISPLAY[field] || field;
};

export const displayFieldValue = (field, value, showDetails, isInput) => {
    if (!value && isInput) {
        return '';
    } else if (!value) {
        return 'None';
    } else if (field === 'registered') {
        const date = new Date(value);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month}-${day}`;
    } else if (value.length >= MAX_DISPLAY_LENGTH && !showDetails) {
        return value.slice(0, MAX_DISPLAY_LENGTH) + '...'
    } else {
        return value;
    }
};

export const getPlaceHolder = (field) => {
    return displayFieldName(field) + (REQUIRED_FIELDS.includes(field) ? ' *' : '');
};

export const groupFields = (fields, groupSize) => {
    const groups = fields.reduce((result, field, index) => {
        const chunkIndex = Math.floor(index / groupSize);

        if (!result[chunkIndex]) {
            result[chunkIndex] = Array(groupSize).fill('');
        }

        result[chunkIndex][index % groupSize] = field;
        return result;
    }, []);
    return groups;
};