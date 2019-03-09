import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, Card, CardText } from 'react-md';

const RepositorySearch = ({ userRepositories, onChange, onAutocomplete }) => (
  <Card className="md-cell md-cell--12">
    <CardText>
      <Autocomplete
        id="repositories-search"
        label="Search Your GitHub Repositories"
        data={userRepositories}
        dataValue="name"
        filter={Autocomplete.caseInsensitiveFilter}
        dataLabel="full_name"
        onChange={value => onChange(value)}
        onAutocomplete={
          (value, index, matches) => onAutocomplete(value, index, matches)
        }
      />
    </CardText>
  </Card>
);

RepositorySearch.propTypes = {
  userRepositories: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  onAutocomplete: PropTypes.func.isRequired,
};

export default RepositorySearch;
