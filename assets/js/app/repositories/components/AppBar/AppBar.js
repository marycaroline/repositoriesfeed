import React from 'react'
import { NavLink } from 'app/repositories';
import { NavigationDrawer, Button } from 'react-md';
import { logout } from 'sagas/auth';


const navItems = [{
  exact: true,
  label: 'Home',
  to: '/rfeed/',
  icon: 'home',
}];
const AppBar = ({ children }) => (
  <NavigationDrawer
    drawerTitle="Menu"
    toolbarTitle="Repositories Feed"
    toolbarActions={<Button icon onClick={() => logout()} >exit_to_app</Button>}
    navItems={navItems.map(props => <NavLink {...props} key={props.to} />)}
  >
  {children}
  </NavigationDrawer>
)

export default AppBar;
