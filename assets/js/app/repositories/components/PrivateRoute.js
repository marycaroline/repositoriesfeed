import React from 'react';
import Cookies from 'js-cookie';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Comp, ...rest }) => {
  console.log(rest)
  return (
  <Route
    {...rest}
    render={ ({ location, ...props }) =>
      Cookies.get('rfeedtoken') ? (
        <Comp {...props} location={location} />
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
  )};


export default PrivateRoute;
