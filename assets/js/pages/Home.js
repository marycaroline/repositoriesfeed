import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CommitsList, RepositoryCard, RepositorySearch, AppBar } from 'app/repositories';
import { FETCH_COMMITS_BY_REPOSITORY_REQUEST, FETCH_COMMITS_REQUEST } from 'constants/commits';
import { FETCH_REPOSITORIES_REQUEST, FETCH_USER_REPOSITORIES_REQUEST, FOLLOW_REPOSITORY_REQUEST } from 'constants/repositories';
import { LOGOUT } from 'constants/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CircularProgress } from 'react-md';
import Cookies from 'js-cookie';

class Home extends Component {
  componentDidMount() {
    const {
      repositories,
      userRepositories,
      commits,
      fetchRepositories,
      fetchUserRepositories,
    } = this.props;
    if (!userRepositories.length) fetchUserRepositories();
    if (!repositories.count || !commits.count) {
      fetchRepositories();
    }
    this.fetchPageCommits();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.repositoryId !== this.props.match.params.repositoryId) {
      this.fetchPageCommits();
    }
  }


  getRepositoryById(id) {
    return this.props.repositories.results.find(repository => repository.id === id);
  }

  fetchPageCommits(url) {
    const { repositoryId } = this.props.match.params;
    const { fetchCommitsByRepository, fetchCommits } = this.props;
    if (repositoryId) fetchCommitsByRepository(repositoryId, url);
    else fetchCommits(url);
  }

  search(query) {
    return this.props.userRepositories.filter(repository => repository.full_name.includes(query));
  }

  handleSearch(value) {
    return this.search(value);
  }

  handleAutocomplete(value, index, matches) {
    const repository = matches[index].full_name;
    this.props.followRepository(repository);
  }


  render() {
    const {
      commits, repositories, userRepositories, logout,
    } = this.props;
    const { repositoryId } = this.props.match.params;
    const progress = repositories.fetching || commits.fetching;
    const repository = repositoryId ? this.getRepositoryById(repositoryId) : null;
    if (!Cookies.get('rfeedtoken')) {
      logout();
      return <Redirect to="/rfeed/login" />;
    }


    return (
      <AppBar onLogout={logout}>
        {repository ?
          <RepositoryCard repository={repository} />
          :
          <RepositorySearch
            userRepositories={userRepositories}
            onChange={
              value => this.handleSearch(value)
            }
            onAutocomplete={
              (value, index, matches) =>
                this.handleAutocomplete(value, index, matches)
            }
          />
        }
        {progress ?
          <CircularProgress id="loading" />
          : <CommitsList
            commits={commits}
            selectedRepository={repositoryId}
            getRepositoryById={id => this.getRepositoryById(id)}
            onFetch={url => this.fetchPageCommits(url)}
          />}
      </AppBar>
    );
  }
}

Home.propTypes = {
  commits: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    results: PropTypes.array.isRequired,
  }).isRequired,
  repositories: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    results: PropTypes.array.isRequired,
  }).isRequired,
  userRepositories: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      repositoryId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  fetchCommits: PropTypes.func.isRequired,
  fetchRepositories: PropTypes.func.isRequired,
  fetchUserRepositories: PropTypes.func.isRequired,
  followRepository: PropTypes.func.isRequired,
  fetchCommitsByRepository: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  commits: state.commits,
  repositories: state.repositories,
  userRepositories: state.userRepositories.results,
});

const mapDispatchToProps = dispatch => ({
  fetchCommits: url => dispatch({ type: FETCH_COMMITS_REQUEST, url }),
  fetchRepositories: () => dispatch({ type: FETCH_REPOSITORIES_REQUEST }),
  fetchUserRepositories: () => dispatch({ type: FETCH_USER_REPOSITORIES_REQUEST }),
  followRepository: fullName => dispatch({ type: FOLLOW_REPOSITORY_REQUEST, fullName }),
  fetchCommitsByRepository: (id, url) =>
    dispatch({ type: FETCH_COMMITS_BY_REPOSITORY_REQUEST, id, url }),
  logout: () => dispatch({ type: LOGOUT }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
