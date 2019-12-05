// A simple submit button which which submits the form
import React from 'react';
import { Fab } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const SubmitButton: React.FC<{ sendMail: () => void}> = (props) => {
    return(
        <Fab 
            variant="extended" 
            color="primary" 
            aria-label="send"
            onClick={props.sendMail}
        >
            Send <SendIcon style={{marginLeft: '0.4em'}}/>
        </Fab>
    );
}

export default SubmitButton;