import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, Route } from 'react-router-dom';
import { FontIcon, ListItem } from 'react-md';

const NavLink = ({
  label, to, exact, icon,
}) => (
  <Route path={to} exact={exact}>
    {({ match }) => {
        let leftIcon;
        if (icon) {
          leftIcon = <FontIcon>{icon}</FontIcon>;
        }

        return (
          <ListItem
            component={RouterLink}
            active={!!match}
            to={to}
            primaryText={label}
            leftIcon={leftIcon}
          />
        );
      }}
  </Route>
);

NavLink.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
};

export default NavLink;
