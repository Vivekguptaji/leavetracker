import React from 'react';
import { Route, Redirect } from 'react-router-dom'; 

const PrivateRoute = ({ component: Component, ...rest }) => {
    let isLoggedIn = sessionStorage.getItem('isLoggedIn'); 
    sessionStorage.setItem('title', rest.title); 
    return (
        <Route {...rest} render={props => (
            isLoggedIn ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;