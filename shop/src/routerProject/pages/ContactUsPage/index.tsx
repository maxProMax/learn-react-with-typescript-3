import { ContactUs } from './ContactUs';
import { IValues, ISubmitResult } from '../../pageStructure/Form';

export const ContactUsPage = () => {
    const handleSubmit = (values: IValues): Promise<ISubmitResult> =>
        new Promise((res) => {
            res({
                error: {
                    email: ['Some is wrong with this'],
                },
                success: false,
            });
        });
    return (
        <div className="page-container">
            <h1>Contact Us Page</h1>
            <p>
                If you enter your details we'll get back to you as soon as we
                can.
            </p>
            <ContactUs onSubmit={handleSubmit} />
        </div>
    );
};
