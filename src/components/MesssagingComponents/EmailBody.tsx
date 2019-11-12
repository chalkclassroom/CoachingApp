// Shows the rendered HTML output depending on what the used chose from the ChooseIntent component.
// Allows editing of the contents to customise the outgoing email.
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

const EmailBody: React.FC<{ chosenIntent: string }> = (props) => {
    const textVal = useRef<HTMLParagraphElement>(null);

    // TODO: Replace with appropriate text
    let text = props.chosenIntent;

    const handleClick = () => {
        if (textVal && textVal.current){
            let emailText = textVal.current.textContent;
            // TODO best approach?
            text = emailText !== null ? emailText : text;
            // rn for debugging purposes
            alert(text);
        }
    }

    const renderBody = () => {
        const intent = props.chosenIntent;
        return (
            <p contentEditable={true} ref={textVal} onClick={handleClick}>{text}</p>
        );
    }
    
    return (
        <Paper>
            {renderBody()}
        </Paper>
    );
}

EmailBody.propTypes = {
    chosenIntent: PropTypes.string.isRequired
}

export default EmailBody;