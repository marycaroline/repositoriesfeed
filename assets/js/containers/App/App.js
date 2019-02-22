import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import NavLink from 'app/repositories/components/NavLink';
import Home from 'pages/Home';
import RepositoryDetail from 'pages/RepositoryDetail';
import Cookies from 'js-cookie';
import './style.scss';


const navItems = [{
  exact: true,
  label: 'Home',
  to: '/repositories/',
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
              navItems={navItems.map(props => <NavLink {...props} key={props.to} />)}
            >
              <Switch key={location.key}>
                <Route exact path="/repositories/" location={location} component={Home} />
                <Route path="/repositories/:id" location={location} component={RepositoryDetail} />
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

