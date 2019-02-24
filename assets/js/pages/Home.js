import React, { Component } from 'react';
import { connect } from "react-redux";
import { FETCH_COMMITS_REQUEST } from 'constants/commits';
import { FETCH_REPOSITORIES_REQUEST, FOLLOW_REPOSITORY_REQUEST } from 'constants/repositories';
import CommitsList from 'app/repositories/components/CommitsList';
import RepositoriesForm from 'app/repositories/components/RepositoriesForm';

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
        if(!this.props.repositories.count){
            this.props.fetchRepositories();
        }
        setTimeout(() => {
            this.props.fetchCommits();
        }, 100);
    }

    getFilteredCommits(repository){
        const { commits } = this.props;
        if (repository){
            return commits.results.filter(commit => commit.repository == repository)
        }
         else return commits.results;
    }

    getRepositoryById(id){
        return this.props.repositories.results.find(repository => repository.id == id)
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
        const { commits, repositories, fetchCommits } = this.props;
        return (
        <div>
            <RepositoriesForm 
                changeOwner={this.onChangeOwnerName}
                changeRepositoryName={this.onChangeRepositoryName}
                onSubmit={(e) => this.followRepository()}
                    />
            {commits.count && repositories.count?
                    <CommitsList 
                        commits={commits}  
                        getRepositoryById={(id) => this.getRepositoryById(id)} 
                        onFetch={fetchCommits}
                        />
                : null
            }
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
        fetchCommits: (url) => dispatch({ type: FETCH_COMMITS_REQUEST, url }),
        fetchRepositories: () => dispatch({ type: FETCH_REPOSITORIES_REQUEST }),
        followRepository: (params) => dispatch({ type: FOLLOW_REPOSITORY_REQUEST, params })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
