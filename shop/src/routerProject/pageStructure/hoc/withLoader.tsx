import { ComponentType, FC } from 'react';
import './index.css';

interface IProps {
    loading: boolean;
}

export const withLoader = <P extends object>(
    Component: ComponentType<P>
): FC<P & IProps> => ({ loading, ...props }: IProps) =>
    loading ? (
        <div className="loader-overlay">
            <div className="loader-circle-wrap">
                <div className="loader-circle" />
            </div>
        </div>
    ) : (
        <Component {...(props as P)} />
    );
