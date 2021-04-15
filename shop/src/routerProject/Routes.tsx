import React, { useState, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    RouteComponentProps,
} from 'react-router-dom';

import { Header } from './pageStructure/Header';

// import { AdminPage } from './pages/admin';
import { ProductsPage, ProductPage } from './pages/products';
import { NotFound } from './pages/NotFound';
import { LoginPage } from './pages/LoginPage';
import { ContactUsPage } from './pages/ContactUsPage';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './index.css';

const AdminPage = React.lazy(() => import('./pages/admin'));

const Routes: React.FunctionComponent<RouteComponentProps> = (props) => {
    const [loggedIn] = useState(true);

    return (
        <div>
            <Header />
            <TransitionGroup>
                <CSSTransition
                    key={props.location.key}
                    timeout={500}
                    classNames="animate"
                >
                    <Switch>
                        <Redirect exact from="/" to="/products" />
                        <Route
                            exact
                            path="/products"
                            component={ProductsPage}
                        />
                        <Route path="/products/:id" component={ProductPage} />
                        <Route path="/contact-us" component={ContactUsPage} />
                        <Route path="/admin">
                            {loggedIn ? (
                                <Suspense
                                    fallback={
                                        <div className="page-container">
                                            Loading...
                                        </div>
                                    }
                                >
                                    <AdminPage />
                                </Suspense>
                            ) : (
                                <Redirect to="/login" />
                            )}
                        </Route>
                        <Route path="/login" component={LoginPage} />
                        <Route component={NotFound} />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
};

const RoutersWrap: React.FunctionComponent = () => {
    return (
        <Router>
            <Route component={Routes} />
        </Router>
    );
};

export default RoutersWrap;
