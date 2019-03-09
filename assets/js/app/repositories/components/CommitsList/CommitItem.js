import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListItem } from 'react-md';
import './style.scss';

const CommitItem = ({ commit, repository, showLink }) => (
  <ListItem
    primaryText={commit.message}
    secondaryText={
      showLink && repository ?
        <Link to={`/rfeed/${commit.repository}`} className="repository-link">{repository.name}</Link>
        : commit.sha
    }
    inkDisabled
    className="commit-item"
    tabIndex={null}
    activeClassName=""
    activeBoxClassName=""
  />
);

CommitItem.propTypes = {
  commit: PropTypes.shape({
    message: PropTypes.string,
    repository: PropTypes.number,
  }).isRequired,
  repository: PropTypes.shape({
    name: PropTypes.string,
  }),
  showLink: PropTypes.bool.isRequired,
};

CommitItem.defaultProps = {
  repository: {},
};

export default CommitItem;
