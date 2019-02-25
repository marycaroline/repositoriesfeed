import React, { Component } from 'react';
import { connect } from "react-redux";
import { FETCH_COMMITS_REQUEST } from 'constants/commits';
import { FETCH_REPOSITORIES_REQUEST, FOLLOW_REPOSITORY_REQUEST } from 'constants/repositories';
import CommitsList from 'app/repositories/components/CommitsList';
import RepositoriesForm from 'app/repositories/components/RepositoriesForm';

class Home extends Component {
    
    constructor(props){
        super(props);
        
    }
    
    componentDidMount () {
        if(!this.props.repositories.count || !this.props.commits.count){
            this.props.fetchRepositories();
            this.props.fetchCommits();
        }
    }

    getRepositoryById(id){
        return this.props.repositories.results.find(repository => repository.id == id)
    }

    // handleSearch = (value) => {
    //     if (value) {
    //         if (this.state.repositories) {
    //             this.setState({ username: '' });
    //         }
    //         this.search(value);
    //     } else {
    //         //clear
    //     }
    // };

    // handleAutocomplete = (value, index, matches) => {
    //     //const username = matches[index].primaryText;
    //     //clear
    //     //search here
    //     this.setState({ username });
    // };

    // followRepository(){
    //     if(this.state.repository.length && this.state.owner.length){
    //         this.props.followRepository(this.state); 
    //     }
    // }

    render() {
        const { commits, repositories, fetchCommits } = this.props;
        return (
        <div>
            {/* <Autocomplete
                id="github-search"
                label="Search Your GitHub Repositories"
                data={data}
                filter={null}
                onChange={this.handleSearch}
                onAutocomplete={this.handleAutocomplete}
                clearOnAutocomplete
            /> */}
            {commits.count && repositories.count?
                    <CommitsList 
                        key={1}
                        commits={commits}  
                        getRepositoryById={this.getRepositoryById.bind(this)} 
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
