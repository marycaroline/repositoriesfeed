import React, { Component } from 'react';
import {
    Card,
    CardText,
    TextField,
    Button
} from 'react-md';
import './style.scss';

const RepositoriesForm = ({ ...props }) => {
    return (
        <div>
            <Card className="md-cell md-cell--12">
                <CardText className="repo-form">
                    <h4>Follow a Github repository</h4>
                
                    <TextField
                        label="Owner"
                        type="text"
                        id="owner"
                        className="md-cell"
                        onChange={(e) => props.changeOwner(e)}
                        fullWidth={false} />
                    <h2 className="slash-separator">/</h2>
                    <TextField
                        label="Repository"
                        type="text"
                        id="repository"
                        onChange={(e) => props.changeRepositoryName(e)}
                        className="md-cell"
                        fullWidth={false} />
                    <Button flat primary swapTheming onClick={() => props.onSubmit()}>Follow</Button>
                </CardText>
            </Card>
        </div>
    )
}

export default RepositoriesForm;