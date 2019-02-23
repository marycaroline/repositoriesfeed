import React, { Component } from 'react';
import RepositoriesForm from 'containers/RepositoriesForm';
import CommitItem from 'app/repositories/components/CommitItem';
import { connect } from "react-redux";
import {
    List,
    Subheader
} from 'react-md';
import { FETCH_COMMITS_REQUEST } from 'constants/commits';
import { FETCH_REPOSITORIES_REQUEST, FOLLOW_REPOSITORY_REQUEST } from 'constants/repositories';
import RepositoryCard from '../../app/repositories/components/RepositoryCard';

class Home extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            name: '',
            owner: ''
        }

        this.onChangeOwnerName = this.onChangeOwnerName.bind(this);
        this.onChangeRepositoryName =this.onChangeRepositoryName.bind(this);
    }
    
    componentDidMount () {
        if(!this.props.repositories.length || !this.props.commits.length){
            this.props.fetchRepositories();
            setTimeout(() => {
                this.props.fetchCommits();
            }, 100);
        }
    }

    getFilteredCommits(repository){
        const { commits } = this.props;
        if (repository){
            return commits.filter(commit => commit.repository == repository)
        }
         else return commits;
    }

    getRepositoryById(id){
        return this.props.repositories.find(repository => repository.id == id)
    }

    onChangeOwnerName(e){
        this.setState({owner: e})
    }

    onChangeRepositoryName(e) {
        this.setState({ repository: e })
    }

    followRepository(){
        if(this.state.repository.length && this.state.owner.length){
            this.props.followRepository(this.state); 
        }
    }

    render() {
        const { repositoryId } = this.props.match.params;
        const { commits, repositories } = this.props;
        return (
        <div>
            {repositoryId ?
                <RepositoryCard repository={this.getRepositoryById(repositoryId)} />
                : 
                <RepositoriesForm 
                    changeOwner={this.onChangeOwnerName}
                    changeRepositoryName={this.onChangeRepositoryName}
                    onSubmit={(e) => this.followRepository()}
                     />
            }
            {commits.length && repositories.length?
                <List className="md-cell md-cell--12">
                    <Subheader primaryText="Commits" primary />
                    {this.getFilteredCommits(repositoryId).map(commit =>
                        <CommitItem key={commit.id} repository={this.getRepositoryById(commit.repository)} showLink={!repositoryId} commit={commit} />
                    )}
                </List>
                : null
            }
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
        fetchCommits: () => dispatch({ type: FETCH_COMMITS_REQUEST }),
        fetchRepositories: () => dispatch({ type: FETCH_REPOSITORIES_REQUEST }),
        followRepository: (params) => dispatch({ type: FOLLOW_REPOSITORY_REQUEST, params })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
