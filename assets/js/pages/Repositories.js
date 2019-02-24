import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    List,
    Subheader
} from 'react-md';
import { FETCH_COMMITS_REQUEST } from 'constants/commits';
import { FETCH_REPOSITORIES_REQUEST, FOLLOW_REPOSITORY_REQUEST } from 'constants/repositories';
import RepositoriesForm from 'app/repositories/components/RepositoriesForm';
import RepositoriesList from 'app/repositories/components/RepositoriesList/RepositoriesList';

class Repositories extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            owner: ''
        }

        this.onChangeOwnerName = this.onChangeOwnerName.bind(this);
        this.onChangeRepositoryName = this.onChangeRepositoryName.bind(this);
    }

    componentDidMount() {
        if (!this.props.repositories.length) {
            this.props.fetchRepositories();
        }
    }

    onChangeOwnerName(e) {
        this.setState({ owner: e })
    }

    onChangeRepositoryName(e) {
        this.setState({ repository: e })
    }

    followRepository() {
        if (this.state.repository.length && this.state.owner.length) {
            this.props.followRepository(this.state);
        }
    }

    render() {
        const { repositories } = this.props;
        return (
            <div>
                <RepositoriesForm
                    changeOwner={this.onChangeOwnerName}
                    changeRepositoryName={this.onChangeRepositoryName}
                    onSubmit={(e) => this.followRepository()}
                />
                {repositories.length ?
                    <RepositoriesList repositories={repositories} />
                    : null
                }
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
        fetchRepositories: () => dispatch({ type: FETCH_REPOSITORIES_REQUEST }),
        followRepository: (params) => dispatch({ type: FOLLOW_REPOSITORY_REQUEST, params })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Repositories);
