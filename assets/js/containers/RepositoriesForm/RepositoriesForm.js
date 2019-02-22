import React, { Component } from 'react';
import {
    Card,
    CardText,
    TextField,
    Button
} from 'react-md';
import './style.scss';

export default class RepositoriesForm extends Component {
    render() {
        return (
            <div>
                <Card className="md-cell md-cell--12">
                    <CardText className="repo-form">
                        <h5>Follow a Github repository</h5>
                    
                        <TextField
                            label="Owner"
                            type="text"
                            id="owner"
                            className="md-cell"
                            fullWidth={false} />
                        <h2 className="slash-separator">/</h2>
                        <TextField
                            label="Repository"
                            type="text"
                            id="repository"
                            className="md-cell"
                            fullWidth={false} />
                        <Button flat primary swapTheming>Follow</Button>
                    </CardText>
                </Card>
            </div>
        )
    }
}
