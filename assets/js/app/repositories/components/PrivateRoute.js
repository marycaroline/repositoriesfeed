import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={ ({ location, ...props }) =>
      Cookies.get('rfeedtoken') ? (
        <Component {...props} location={location} />
      ) : (
        <Redirect
          to={{
            pathname: "/rfeed/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);


export default PrivateRoute;
