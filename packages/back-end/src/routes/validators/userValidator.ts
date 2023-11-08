import { checkSchema } from 'express-validator';

export const searchSchema = checkSchema({
    search: {
        in: ['body'],
        isString: true,
        optional: false,
    },
    field: {
        in: ['body'],
        isString: true,
        optional: false,
    },
    asc: {
        in: ['body'],
        isBoolean: true,
        optional: false,
    },
    attributes: {
        in: ['body'],
        isArray: true,
        optional: false,
    },
});

export const addSchema = checkSchema({
    firstName: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        optional: false,
    },
    middleName: {
        in: ['body'],
        isString: true,
        optional: true,
    },
    lastName: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        optional: false,
    },
    email: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        optional: false,
    },
    phoneNumber: {
        in: ['body'],
        isString: true,
        optional: true,
    },
    address: {
        in: ['body'],
        isString: true,
        optional: true,
    },
    adminNotes: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        optional: false,
    },
    registered: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        optional: true,
    },
});

export const updateSchema = checkSchema({
    id: {
        in: ['body'],
        isInt: true,
        optional: false,
    },
    firstName: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        optional: false,
    },
    middleName: {
        in: ['body'],
        isString: true,
        optional: true,
    },
    lastName: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        optional: false,
    },
    email: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        optional: false,
    },
    phoneNumber: {
        in: ['body'],
        isString: true,
        optional: true,
    },
    address: {
        in: ['body'],
        isString: true,
        optional: true,
    },
    adminNotes: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        optional: false,
    },
});

export const deleteSchema = checkSchema({
    id: {
        in: ['body'],
        isInt: true,
        optional: false,
    },
});

export const detailsSchema = checkSchema({
    id: {
        in: ['body'],
        isInt: true,
        optional: false,
    },
    attributes: {
        in: ['body'],
        isArray: true,
        optional: true,
    },
});
