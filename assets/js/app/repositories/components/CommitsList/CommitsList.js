import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  Subheader,
  Card,
  CardText,
} from 'react-md';
import CommitItem from './CommitItem';
import Pagination from '../Pagination';

const CommitsList = ({
  commits, selectedRepository, getRepositoryById, onFetch,
}) => {
  const textEmpty =
    selectedRepository ?
      'Não houveram commits nesse repositório nos ultimos 30 dias'
      : 'Não houveram commits nos ultimos 30 dias';
  return (
    commits.count ?
      <div>
        <List className="md-cell md-cell--12">
          <Subheader primaryText="Commits" primary />
          {commits.results.map(commit => (
            <CommitItem
              key={commit.id}
              repository={
                selectedRepository ?
                  getRepositoryById(selectedRepository) :
                  getRepositoryById(commit.repository)
              }
              showLink={!selectedRepository}
              commit={commit}
            />
            ))}
        </List>
        <Pagination
          next={commits.next}
          current={commits.current}
          previous={commits.previous}
          count={commits.count}
          onFetch={onFetch}
        />
      </div>
      :
      <Card className="md-cell md-cell--12">
        <CardText>{textEmpty}</CardText>
      </Card>
  );
};

CommitsList.propTypes = {
  commits: PropTypes.shape({
    count: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    next: PropTypes.string,
    results: PropTypes.array,
  }).isRequired,
  selectedRepository: PropTypes.string,
  getRepositoryById: PropTypes.func.isRequired,
  onFetch: PropTypes.func.isRequired,
};

CommitsList.defaultProps = {
  selectedRepository: undefined,
};

export default CommitsList;
