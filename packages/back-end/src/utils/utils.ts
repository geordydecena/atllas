import { UNIQUE_VIOLATION, UNIQUE_VIOLATION_MESSAGE, NOT_NULL_VIOLATION, NOT_NULL_VIOLATION_MESSAGE, DEFAULT_ERROR_MESSAGE } from '../constants/config';

export const getErrorMessage = (error): string => {
    if (error.type === UNIQUE_VIOLATION) {
        return UNIQUE_VIOLATION_MESSAGE;
    } else if (error.type === NOT_NULL_VIOLATION) {
        return NOT_NULL_VIOLATION_MESSAGE;
    } else {
        return DEFAULT_ERROR_MESSAGE;
    }
};
