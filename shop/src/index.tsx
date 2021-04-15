import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { configStore, IApplicationState } from './routerProject/products';
import './playground';

import Routes from './routerProject/Routes';

import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

interface IProps {
    store: Store<IApplicationState>;
}

const Root: FC<IProps> = ({ store }) => {
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    );
};

const store = configStore();

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root') as HTMLElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/// test
