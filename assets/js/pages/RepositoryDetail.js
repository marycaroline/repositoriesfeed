import React, { Component } from 'react';
import { connect } from "react-redux";
import { FETCH_REPOSITORIES_REQUEST } from 'constants/repositories';
import { FETCH_COMMITS_BY_REPOSITORY_REQUEST } from 'constants/commits';
import RepositoryCard from 'app/repositories/components/RepositoryCard';
import CommitsList from 'app/repositories/components/CommitsList';

class RepositoriesDetail extends Component {

    componentDidMount() {
        if (!this.props.repositories.count) {
            this.props.fetchRepositories();
        }
        if(this.props.match.params.id){
            this.props.fetchCommitsByRepository(this.props.match.params.id);
        }
    }

    fetchFiltered(){
        const { id } = this.props.match.params;
        const { fetchCommitsByRepository, commits } = this.props;
        fetchCommitsByRepository(id, commits.next);
    }

    getFilteredCommits(repository) {
        const { commits } = this.props;
        const filtered_commits = {
            ...commits,
            results: commits.results.filter(commit => commit.repository == repository)
        }
        return filtered_commits
    }

    getRepositoryById(id) {
        return this.props.repositories.results.find(repository => repository.id == id)
    }


    render() {
        const { id } = this.props.match.params;
        return (
            <div>
                <RepositoryCard repository={this.getRepositoryById(id)} />
                <CommitsList 
                    commits={this.getFilteredCommits(id)} 
                    selectedRepository={this.getRepositoryById(id)} 
                    onFetch={this.fetchFiltered.bind(this)}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        fetching: state.commits.fetching,
        commits: state.commits,
        repositories: state.repositories
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchRepositories: () => dispatch({ type: FETCH_REPOSITORIES_REQUEST }),
        fetchCommitsByRepository: (id, url) => dispatch({ type: FETCH_COMMITS_BY_REPOSITORY_REQUEST, id, url }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesDetail);
