// A simple submit button which which submits the form
import React from 'react';
import { Fab } from '@material-ui/core';

const SubmitButton: React.FC<{ sendMail: () => void}> = () => {
    return(
        <Fab variant="extended" aria-label="like">
            Submit
        </Fab>
    );
}

export default SubmitButton;