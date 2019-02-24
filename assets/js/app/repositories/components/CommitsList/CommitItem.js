import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    ListItem
} from 'react-md';
import './style.scss';

const CommitItem = ({ commit, repository, showLink }) => {
  return (
    <ListItem
      leftAvatar={<Avatar src={`https://github.com/${commit.author}.png`} />}
      primaryText={commit.message}
      secondaryText={
        showLink ?
          <Link to={`/rfeed/repositories/${commit.repository}`} className="repository-link">{repository ? repository.name : null}</Link>
          : commit.sha
      }
      inkDisabled
      className="commit-item"
      role={null}
      tabIndex={null}
      activeClassName=""
      activeBoxClassName=""
    ></ListItem>
  )
}

CommitItem.propTypes = {
  
}

export default CommitItem;