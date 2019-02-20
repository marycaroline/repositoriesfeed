import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import NavLink from 'app/repositories/components/NavLink';
import './style.scss';
import Home from 'pages/Home';

const navItems = [{
  exact: true,
  label: 'Home',
  to: '/home',
  icon: 'home',
}];

class App extends Component {
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
              <Route exact path="home" location={location} component={Home} />
              <Route path="/page-1" location={location} component={Home} />
            </Switch>
            {this.props.children}
          </NavigationDrawer>
        )}
      />
    );
  }
}

export default App;