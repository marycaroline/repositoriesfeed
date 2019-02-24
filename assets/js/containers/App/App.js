import React, { Component } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import { NavigationDrawer } from 'react-md';
import { NavLink } from 'app/repositories';
import { Home, Repositories, RepositoryDetail } from 'pages';
import Cookies from 'js-cookie';
import './style.scss';


const navItems = [{
  exact: true,
  label: 'Home',
  to: '/rfeed/commits/',
  icon: 'home',
}];


class App extends Component {
  
  render() {
    return (
      <Route path="/rfeed"
        render={({ location }) => (
          Cookies.get('rfeedtoken')?
            <NavigationDrawer
              drawerTitle="Menu"
              toolbarTitle="Repositories Feed"
              toolbarActions={<Link to='/logout' />}
              navItems={navItems.map(props => <NavLink {...props} key={props.to} />)}
            >
              <Switch key={location.key}>
                <Redirect exact from="/rfeed" to="/rfeed/commits/" />
                <Route path="/rfeed/commits/" location={location} component={Home} />
                <Route exact path="/rfeed/repositories/" location={location} component={Repositories} />
                <Route path="/rfeed/repositories/:id" location={location} component={RepositoryDetail} />
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

