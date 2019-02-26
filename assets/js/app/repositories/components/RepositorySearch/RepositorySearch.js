import React from 'react';
import { Autocomplete, Card, CardText } from 'react-md';

const RepositorySearch = ({ userRepositories, onChange, onAutocomplete }) => {
  return (
    <Card className="md-cell md-cell--12">
      <CardText>
        <Autocomplete
          id="repositories-search"
          label="Search Your GitHub Repositories"
          data={userRepositories}
          dataValue="name"
          filter={Autocomplete.caseInsensitiveFilter}
          dataLabel="full_name"
          onChange={(value) => onChange(value)}
          onAutocomplete={
            (value, index, matches) => onAutocomplete(value, index, matches)
          }
        />
      </CardText>
    </Card>
  )
}

export default RepositorySearch;