import React, { Component } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import { NavigationDrawer } from 'react-md';
import { NavLink } from 'app/repositories';
import { Home } from 'pages';
import Cookies from 'js-cookie';
import './style.scss';


const navItems = [{
  exact: true,
  label: 'Home',
  to: '/rfeed/',
  icon: 'home',
}];


class App extends Component {
  
  render() {
    return (
      <Route
        render={({ location }) => (
          Cookies.get('rfeedtoken')?
            <NavigationDrawer
              drawerTitle="Menu"
              toolbarTitle="Repositories Feed"
              toolbarActions={<Link to='/logout' />}
              navItems={navItems.map(props => <NavLink {...props} key={props.to} />)}
            >
              <Switch key={location.key}>
                <Route path="/rfeed/:repositoryId?" location={location} component={Home} />
              </Switch>
              {this.props.children}
            </NavigationDrawer>
            :
            <Redirect to='/login' />
        )}
      />
    );
  }
}

export default App;

