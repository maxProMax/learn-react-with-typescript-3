export interface IValues {
    [key: string]: any;
}

export interface IFormProps {
    defaultValues: IValues;
    validationRules: IValidationProps;
    onSubmit: (values: IValues) => Promise<ISubmitResult>;
}

export interface IFormContext {
    values: IValues;
    errors: IErrors;
    setValue?: (fieldName: string, value: string) => void;
    validate?: (fieldName: string, value: string) => void;
}

export interface IFormState {
    values: IValues;
    errors: IErrors;
    submitting: boolean;
    submitted: boolean;
}
export interface IFieldProps {
    name: string;
    label: string;
    type?: 'Text' | 'Email' | 'Select' | 'TextArea';
    options?: string[];
}

export type Validator = (
    fieldName: string,
    values: IValues,
    args?: any
) => string;

export interface IValidation {
    validator: Validator;
    args?: any;
}

export interface IValidationProps {
    [key: string]: IValidation | IValidation[];
}

export interface IErrors {
    [key: string]: string[];
}

export interface ISubmitResult {
    success: boolean;
    error?: IErrors;
}
