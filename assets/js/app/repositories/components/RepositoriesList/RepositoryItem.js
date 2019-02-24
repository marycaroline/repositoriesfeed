import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    ListItem
} from 'react-md';

const RepositoryItem = ({ repository }) => {
    return (
        <ListItem
            leftAvatar={<Avatar>{repository.name.slice(0,1)}</Avatar>}
            primaryText={repository.name}
            to={`/rfeed/repositories/${repository.id}`}
            component={Link}
        ></ListItem>
    )
}

RepositoryItem.propTypes = {

}

export default RepositoryItem;