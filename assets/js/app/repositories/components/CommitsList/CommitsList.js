import React from 'react';
import {
    List,
    Subheader
} from 'react-md';
import CommitItem from './CommitItem';
import Pagination from '../Pagination';

const CommitsList = ({ commits, selectedRepository, getRepositoryById, onFetch }) => {
    return (
        <div>
            <List className="md-cell md-cell--12">
                <Subheader primaryText="Commits" primary />
                {commits.results.map(commit =>
                    <CommitItem 
                        key={commit.id} 
                        repository={selectedRepository ? selectedRepository : getRepositoryById(commit.repository)} 
                        showLink={!selectedRepository} 
                        commit={commit} 
                    />
                )}
            </List>
            <Pagination next={commits.next} current={commits.current} previous={commits.previous} count={commits.count} onFetch={onFetch} />
        </div>
    )
}

export default CommitsList;