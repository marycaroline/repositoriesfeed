import React from 'react';
import {
  List,
  Subheader,
  Card,
  CardText
} from 'react-md';
import CommitItem from './CommitItem';
import Pagination from '../Pagination';

const CommitsList = ({ commits, selectedRepository, getRepositoryById, onFetch }) => {
  const textEmpty =
    selectedRepository ?
      'Não houveram commits nesse repositório nos ultimos 30 dias'
      : 'Não houveram commits nos ultimos 30 dias';
  return (
    commits.count ?
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
      :
      <Card className="md-cell md-cell--12">
        <CardText>{textEmpty}</CardText>
      </Card>
  )
}

export default CommitsList;