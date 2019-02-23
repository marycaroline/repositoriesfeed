import React from 'react';
import {
    Card,
    CardTitle,
    CardText
} from 'react-md';

const RepositoryCard = ({ repository }) => {
    return (
        repository?
        <Card className="md-cell md-cell--12">
                <CardTitle title={`${repository.owner.toLowerCase()}/${repository.name.toLowerCase()}`} />
            <CardText>
                <p>{repository.description}</p>
            </CardText>
        </Card>
        : null
    )
}

export default RepositoryCard;