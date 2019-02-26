import { CommitsList, RepositoryCard, RepositorySearch } from 'app/repositories';
import { FETCH_COMMITS_BY_REPOSITORY_REQUEST, FETCH_COMMITS_REQUEST } from 'constants/commits';
import { FETCH_REPOSITORIES_REQUEST, FETCH_USER_REPOSITORIES_REQUEST, FOLLOW_REPOSITORY_REQUEST } from 'constants/repositories';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRepositoryName: '',
    };
  }

  componentDidMount() {
    const {
      repositories,
      commits,
      match,
      fetchRepositories,
      fetchCommits,
      fetchCommitsByRepository,
      fetchUserRepositories,
    } = this.props;
    fetchUserRepositories();
    if (!repositories.count || !commits.count) {
      fetchRepositories();
    }
    if (match.params.repositoryId) {
      fetchCommitsByRepository(match.params.repositoryId);
    } else {
      fetchCommits();
    }
  }


  getRepositoryById(id) {
    return this.props.repositories.results.find(repository => repository.id == id);
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
    if (value) {
      return this.search(value);
    } // else {
    //   //clear
    // }
  }

  handleAutocomplete(value, index, matches) {
    const repository = matches[index].full_name;
    this.props.followRepository(repository);
  }


  render() {
    const { commits, repositories, userRepositories } = this.props;
    const { repositoryId } = this.props.match.params;
    return (
      <div>
        {repositoryId ?
          <RepositoryCard repository={this.getRepositoryById(repositoryId)} />
          :
          <RepositorySearch
            userRepositories={userRepositories}
            onChange={(value) => this.handleSearch(value)}
            onAutocomplete={(value, index, matches) => this.handleAutocomplete(value, index, matches)}
          />
        }
        {commits.count && repositories.count ?
          <CommitsList
            commits={commits}
            selectedRepository={repositoryId}
            getRepositoryById={(id) => this.getRepositoryById(id)}
            onFetch={(url) => this.fetchPageCommits(url)}
          />
          : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetching: state.commits.fetching,
  commits: state.commits,
  repositories: state.repositories,
  userRepositories: state.userRepositories.results,
});

const mapDispatchToProps = dispatch => ({
  fetchCommits: url => dispatch({ type: FETCH_COMMITS_REQUEST, url }),
  fetchRepositories: () => dispatch({ type: FETCH_REPOSITORIES_REQUEST }),
  fetchUserRepositories: () => dispatch({ type: FETCH_USER_REPOSITORIES_REQUEST }),
  followRepository: full_name => dispatch({ type: FOLLOW_REPOSITORY_REQUEST, full_name }),
  fetchCommitsByRepository: (id, url) => dispatch({ type: FETCH_COMMITS_BY_REPOSITORY_REQUEST, id, url }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
