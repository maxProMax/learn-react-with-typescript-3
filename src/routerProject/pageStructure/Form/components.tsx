import {
    ChangeEvent,
    createContext,
    FC,
    useContext,
    useState,
    FocusEvent,
    FormEvent,
} from 'react';
import {
    IFormContext,
    IFormProps,
    IFormState,
    IFieldProps,
    IValidationProps,
    IErrors,
} from './types';
import './validator';
import './styles.css';

const FormContext = createContext<IFormContext>({ values: {}, errors: {} });

const validate = (
    validationRules: IValidationProps,
    state: IFormState,
    updateState: (a: any) => void
) => (fieldName: string, value: any): string[] => {
    let rules = validationRules[fieldName];
    const errors: string[] = [];

    if (Array.isArray(rules)) {
        rules.forEach((rule) => {
            const error = rule.validator(fieldName, state.values, rule.args);
            if (error) {
                errors.push(error);
            }
        });
    } else {
        if (rules) {
            const error = rules.validator(fieldName, state.values, rules.args);
            if (error) {
                errors.push(error);
            }
        }
    }
    updateState((state: IFormState) => ({
        ...state,
        errors: { ...state.errors, [fieldName]: errors },
    }));
    return errors;
};

export const Form: FC<IFormProps> = ({
    defaultValues,
    validationRules,
    children,
    onSubmit,
}) => {
    const [state, updateState] = useState<IFormState>({
        values: defaultValues,
        submitted: false,
        submitting: false,
        errors: Object.keys(defaultValues).reduce(
            (memo, key) => ({ ...memo, [key]: [] }),
            {}
        ),
    });
    const setValue = (fieldName: string, value: string) => {
        updateState((state) => ({
            ...state,
            values: { ...state.values, [fieldName]: value },
        }));
    };
    const validateForm = () => {
        const errors: IErrors = {};
        let haveErrors: boolean = false;

        Object.keys(defaultValues).forEach((name) => {
            errors[name] = validate(
                validationRules,
                state,
                updateState
            )(name, state.values[name]);

            if (errors[name].length) {
                haveErrors = true;
            }

            updateState((state) => ({ ...state, errors }));
        });

        return haveErrors;
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            updateState((state) => ({ ...state, submitting: true }));
            const result = await onSubmit(state.values);
            updateState((state) => ({
                ...state,
                submitting: false,
                submitted: result.success,
                errors: result.error || {},
            }));
        }
    };
    const context: IFormContext = {
        values: state.values,
        errors: state.errors,
        setValue,
        validate: validate(validationRules, state, updateState),
    };

    return (
        <FormContext.Provider value={context}>
            <form noValidate className="form" onSubmit={handleSubmit}>
                {children}
                <div className="form-group">
                    <button
                        disabled={state.submitted || state.submitting}
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </FormContext.Provider>
    );
};

export const Field: FC<IFieldProps> = (props) => {
    const { name, label, type, options } = props;
    const context = useContext<IFormContext>(FormContext);

    const handleChange = (
        e:
            | ChangeEvent<HTMLInputElement>
            | ChangeEvent<HTMLTextAreaElement>
            | ChangeEvent<HTMLSelectElement>
    ) => {
        context.setValue?.(name, e.currentTarget.value);
    };
    const handleBlur = (
        e:
            | FocusEvent<HTMLInputElement>
            | FocusEvent<HTMLTextAreaElement>
            | FocusEvent<HTMLSelectElement>
    ) => {
        context.validate?.(name, e.currentTarget.value);
    };

    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            {(type === 'Text' || type === 'Email') && (
                <input
                    type={type?.toLowerCase()}
                    id={name}
                    value={context.values[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            )}
            {type === 'TextArea' && (
                <textarea
                    id={name}
                    value={context.values[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            )}
            {type === 'Select' && (
                <select
                    id={name}
                    value={context.values[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                >
                    {options?.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            )}
            {context.errors[name]?.map((error) => (
                <span key={error} className="form-error">
                    {error}
                </span>
            ))}
        </div>
    );
};

Field.defaultProps = {
    type: 'Text',
};
