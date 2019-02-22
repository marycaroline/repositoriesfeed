import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    ListItem
} from 'react-md';
import './style.scss';

class CommitItem extends Component {
  render() {
    const { commit, repository, showLink } = this.props;
    return (
        <ListItem
            leftAvatar={<Avatar src={`https://github.com/${commit.author}.png`} />}
            primaryText={commit.message}
            secondaryText={
              showLink?
                <Link to={`/repositories/${commit.repository}`} className="repository-link">{commit.repository}</Link>
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
}

export default CommitItem;