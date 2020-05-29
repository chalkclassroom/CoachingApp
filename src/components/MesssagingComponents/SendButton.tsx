// A simple submit button which which submits the form
import React from 'react';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

interface SendButtonProps {
    sendMail: () => void
}

const SendButton: React.FC<SendButtonProps> = (props: SendButtonProps) => {
    return(
        <Button
            color='primary' 
            aria-label='send'
            onClick={props.sendMail}
        >
            Send <SendIcon style={{marginLeft: '0.4em'}}/>
        </Button>
    );
}

export default SendButton;
