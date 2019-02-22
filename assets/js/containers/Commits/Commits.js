import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    List,
    Subheader,
    Card, 
    CardTitle, 
    CardText
} from 'react-md';
import { FETCH_COMMITS_REQUEST, FETCH_ALL_COMMITS_REQUEST } from 'constants/commits';
import { FETCH_REPOSITORIES_REQUEST } from 'constants/repositories';
import CommitItem from 'app/repositories/components/CommitItem';

class CommitsContainer extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
            pageRepository: {}
        }
    }
    
    componentDidMount() {
        const { repositoryId } = this.props;
        if (!this.props.repositories.length) {
            this.props.fetchRepositories();
        }
        if(repositoryId){
            this.props.fetchCommits(repositoryId);
            if(this.props.repositories.length){
                this.setState({ pageRepository: this.getRepositoryFromId(repositoryId) })
            }
        }
        else{ this.props.fetchAllCommits()}
    }
    

    getRepositoryFromId(id){
        const repository = this.props.repositories.find(repository => repository.id == id);
        return repository;
    }
    

    render() {
        const { fetching, commits, repositoryId, repositories } = this.props;
        const { pageRepository } = this.state;
        return (
            <div>
                {repositoryId ?
                <Card className="md-cell md-cell--12">
                        <CardTitle title={`${pageRepository.owner} / ${pageRepository.name}`} />
                        <CardText>
                            <p>{pageRepository.description}</p>
                        </CardText>
                </Card>
                : null}
                {commits?
                    <List className="md-cell md-cell--12">
                        <Subheader primaryText="Commits" primary />
                        {commits.map((commit, i) =>
                            <CommitItem key={i} repository={this.getRepositoryFromId(commit.repository)} showLink={!repositoryId} commit={commit} />
                        )}
                    </List>
                : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        fetching: state.commits.fetching,
        commits: state.commits.data,
        repositories: state.repositories.data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCommits: (repository) => dispatch({ type: FETCH_COMMITS_REQUEST, repository }),
        fetchRepositories: () => dispatch({ type: FETCH_REPOSITORIES_REQUEST }),
        fetchAllCommits: () => dispatch({ type: FETCH_ALL_COMMITS_REQUEST })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommitsContainer);
