import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardTitle,
  CardText,
} from 'react-md';

const RepositoryCard = ({ repository }) => (
  <Card className="md-cell md-cell--12">
    <CardTitle title={`${repository.owner.toLowerCase()}/${repository.name.toLowerCase()}`} />
    <CardText>
      <p>{repository.description}</p>
    </CardText>
  </Card>
);

RepositoryCard.propTypes = {
  repository: PropTypes.shape({
    owner: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default RepositoryCard;
