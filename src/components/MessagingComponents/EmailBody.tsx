// Shows the rendered HTML output depending on what the used chose from the ChooseIntent component.
// Allows editing of the contents to customise the outgoing email.
import * as React from 'react';
import Paper from '@material-ui/core/Paper';
// import Input from '@material-ui/core/Input';
// import TextField from '@material-ui/core/TextField';

interface EmailBodyProps {
    emailText: JSX.Element, 
    emailTextRef: React.MutableRefObject<HTMLDivElement>,
    // greetingText: string,
    // bodyText: string,
    // goodbyeText: string
}

const EmailBody: React.FC<EmailBodyProps> = (props: EmailBodyProps) => {
    return (
        <Paper style={{height: '100%'}}>
            <div contentEditable={true} style={{height: '100%', outline: '0px solid transparent', overflowY: 'auto'}} ref={props.emailTextRef}>
              {props.emailText}
            </div>
        </Paper>
    );
}

export default EmailBody;
