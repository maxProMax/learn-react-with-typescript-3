import { Validator, IValues } from './types';

export const required: Validator = (
    fieldName: string,
    values: IValues,
    args?: any
): string =>
    values[fieldName] === null ||
    values[fieldName] === undefined ||
    values[fieldName] === ''
        ? 'This must be populated'
        : '';

export const minLength: Validator = (
    fieldName: string,
    values: IValues,
    length: number
): string =>
    values[fieldName]?.length < length
        ? `This must be at least ${length} characters`
        : '';
