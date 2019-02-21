import React, { Component } from 'react';
import { connect } from "react-redux";
import { FETCH_REPOSITORIES_REQUEST } from 'constants/index.js';

class RepositoriesContainer extends Component {

  render() {
    const { fetching, repositories } = this.props;
    return (
      <div>


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
