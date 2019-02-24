import React from 'react';
import {
    List,
    Subheader
} from 'react-md';
import RepositoryItem from './RepositoryItem';

const RepositoriesList = ({ repositories }) => {
    return (
        <List className="md-cell md-cell--12">
            <Subheader primaryText="Saved Repositories" primary />
            {repositories.map(repository =>
                <RepositoryItem
                    key={repository.id}
                    repository={repository}
                />
            )}
        </List>
    )
}

export default RepositoriesList;