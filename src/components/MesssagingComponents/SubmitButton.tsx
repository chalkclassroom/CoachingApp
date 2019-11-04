// A simple submit button which which submits the form
import React from 'react';
import { Fab } from '@material-ui/core';

export class SubmitButton extends React.Component<{}, {}> {
    render() {
        return(
            <Fab variant="extended" aria-label="like">
                Submit
            </Fab>
        );
    }
}