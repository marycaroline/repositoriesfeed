import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    Avatar,
    List,
    ListItem,
    Subheader,
    Card, 
    CardTitle, 
    CardText
} from 'react-md';
import { FETCH_COMMITS_REQUEST } from 'constants/commits';

class CommitsContainer extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
            pageRepository: {}
        }
    }
    
    componentDidMount() {
        this.props.fetchCommits(this.props.repository);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.repositories != this.props.repositories){
            let pageRepository = this.props.repositories.find(repository => repository.id == repository);
            this.setState({ pageRepository });
            console.log(this.props.repositories);
        }
    }
    

    render() {
        const { fetching, commits } = this.props;
        const { pageRepository } = this.state;
        return (
            <div>
                {pageRepository ?
                <Card className="md-cell md-cell--12">
                        <CardTitle title={`${pageRepository.name}`} />
                        <CardText>
                            <p>{pageRepository.description}</p>
                        </CardText>
                </Card>
                : null}
                <List className="md-cell md-cell--12">
                    <Subheader primaryText="Commits" primary />
                    {commits.map((commit, i) =>
                        <ListItem
                            key={i}
                            leftAvatar={<Avatar src={`https://github.com/${commit.author}.png`} suffix="deep-purple" />}
                            primaryText={commit.message}
                            secondaryText={commit.sha}
                        />
                    )}
                </List>
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
        fetchCommits: (repository) => dispatch({ type: FETCH_COMMITS_REQUEST, repository })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommitsContainer);
