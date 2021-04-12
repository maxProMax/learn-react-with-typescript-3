import { ChangeEvent, FC } from 'react';
import {
    Form,
    Field,
    required,
    minLength,
    IValues,
    ISubmitResult,
} from '../../pageStructure/Form';

interface IProps {
    onSubmit: (values: IValues) => Promise<ISubmitResult>;
}

export const ContactUs: FC<IProps> = ({ onSubmit }) => {
    const handleSubmit = async (values: IValues): Promise<ISubmitResult> => {
        const result = await onSubmit(values);
        return result;
    };
    return (
        <Form
            defaultValues={{
                name: '',
                email: '',
                reason: 'Support',
                notes: '',
            }}
            validationRules={{
                name: [
                    { validator: required },
                    { validator: minLength, args: 2 },
                ],
                email: { validator: required },
            }}
            onSubmit={handleSubmit}
        >
            <Field name="name" label="Your name" />
            <Field name="email" label="Your email" type="Email" />
            <Field
                name="reason"
                label="Reason you need to contact us"
                type="Select"
                options={['Marketing', 'Support', 'Feedback', 'Jobs', 'Other']}
            />
            <Field name="notes" label="Additional note" type="TextArea" />
        </Form>
    );
};
