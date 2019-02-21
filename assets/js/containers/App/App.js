import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import NavLink from 'app/repositories/components/NavLink';
import { FETCH_TOKEN_REQUEST } from 'constants/auth';
import { connect } from "react-redux";
import Home from 'pages/Home';
import './style.scss';


const navItems = [{
  exact: true,
  label: 'Home',
  to: '/home',
  icon: 'home',
}];


class App extends Component {

  
  componentDidMount() {
    this.props.getToken()
  }
  
  render() {
    return (
      <Route
        render={({ location }) => (
          <NavigationDrawer
            drawerTitle="react-md with CRA"
            toolbarTitle="Welcome to react-md"
            navItems={navItems.map(props => <NavLink {...props} key={props.to} />)}
          >
            <Switch key={location.key}>
              <Route exact path="/home" location={location} component={Home} />
              <Route path="/page-1" location={location} component={Home} />
            </Switch>
            {this.props.children}
          </NavigationDrawer>
        )}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getToken: () => dispatch({ type: FETCH_TOKEN_REQUEST })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

