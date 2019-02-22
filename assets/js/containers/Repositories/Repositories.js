import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {
  Avatar,
  Divider,
  FontIcon,
  List,
  ListItem,
  Subheader,
  Button,
} from 'react-md';
import { FETCH_REPOSITORIES_REQUEST } from 'constants/repositories';

class RepositoriesContainer extends Component {

  componentDidMount() {
    this.props.fetchRepositories();
  }
  
  render() {
    const { fetching, repositories } = this.props;
    return (
          <List className="md-cell md-cell--12">
            <Subheader primaryText="Saved repositories" primary />
            {repositories.map(repository => 
             <ListItem
                key={repository.id}
                to={`${repository.id}`}
                component={Link}
                leftAvatar={<Avatar suffix="deep-purple">{repository.name.slice(0,1).toUpperCase()}</Avatar>}
                primaryText={repository.name}
                secondaryText={repository.owner}
             /> 
            )}
          </List>    
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.repositories.fetching,
    repositories: state.repositories.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRepositories: () => dispatch({ type: FETCH_REPOSITORIES_REQUEST })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesContainer);
