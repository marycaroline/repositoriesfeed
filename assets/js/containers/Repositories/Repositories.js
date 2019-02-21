import React, { Component } from 'react';
import { connect } from "react-redux";
import { FETCH_REPOSITORIES_REQUEST } from 'constants/repositories';

class RepositoriesContainer extends Component {

  render() {
    const { fetching, repositories } = this.props;
    return (
      <div>
        {repositories.map(repository => {
          <h1>{repository.name}</h1>
        })}

      </div>
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
    onFetch: () => dispatch({ type: FETCH_REPOSITORIES_REQUEST })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesContainer);
