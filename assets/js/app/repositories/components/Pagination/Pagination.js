import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-md';
import './style.scss';

const Pagination = ({
  next, previous, current, onFetch,
}) => (
  <div className="paginator">
    <div className="wrapper">
      <Button className="paginator-previous" raised disabled={!previous} onClick={() => onFetch(previous)}>previous</Button>
      <span className="pagination-current"> Page {current} </span>
      <Button className="paginator-next" raised disabled={!next} onClick={() => onFetch(next)}>next</Button>
    </div>
  </div>
);

Pagination.propTypes = {
  next: PropTypes.string,
  previous: PropTypes.string,
  current: PropTypes.number.isRequired,
  onFetch: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  next: undefined,
  previous: undefined,
};

export default Pagination;
