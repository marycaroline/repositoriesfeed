import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'app/repositories';
import { NavigationDrawer, Button } from 'react-md';


const navItems = [{
  exact: true,
  label: 'Home',
  to: '/rfeed/',
  icon: 'home',
}];

const AppBar = ({ children, onLogout }) => (
  <NavigationDrawer
    drawerTitle="Menu"
    toolbarTitle="Repositories Feed"
    toolbarActions={<Button icon onClick={() => onLogout()} >exit_to_app</Button>}
    navItems={navItems.map(navProps => <NavLink {...navProps} key={navProps.to} />)}
  >
    {children}
  </NavigationDrawer>
);

AppBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default AppBar;
