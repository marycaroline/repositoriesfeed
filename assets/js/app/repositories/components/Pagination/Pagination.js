import React from 'react'
import { Button } from 'react-md';
import './style.scss';

const Pagination = ({next, previous, count, current, onFetch}) => {
    return (
        <div className="paginator">
            <div className="wrapper">
                <Button className="paginator-previous" raised disabled={!previous} onClick={() => onFetch(previous)}>previous</Button>
                <span className="pagination-current"> Page {current} </span>
                <Button className="paginator-next" raised disabled={!next} onClick={() => onFetch(next)}>next</Button>
            </div>
        </div>
    )
}

export default Pagination;