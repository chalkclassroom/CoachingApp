// Shows the rendered HTML output depending on what the used chose from the ChooseIntent component.
// Allows editing of the contents to customise the outgoing email.
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

const EmailBody: React.FC<{ intent: string; text: string }> = (props) => {
    const textVal = useRef<HTMLParagraphElement>(null);

    const handleClick = () => {
        if (textVal && textVal.current){
            let emailText = textVal.current.textContent;
            // TODO best approach?
            props.text = emailText !== null ? emailText : props.text;
        }
    }

    const renderBody = () => {
        const intent = props.intent;
        if (intent === "") {
            return <h1 contentEditable={true} ref={textVal} onClick={handleClick}>Choose intent</h1>;
        } else if (intent === "custom") {
            return <h2 contentEditable={true}>Woohoo! Custom content!</h2>;
        } else if (intent === "thank_you") {
            return <h2 contentEditable={true}>Thank you!</h2>;
        } else if (intent === "action_plan") {
            return <h2 contentEditable={true}>Action Plan!</h2>;
        } else if (intent === "schedule_meeting") {
            return <h2 contentEditable={true}>Let's meet!</h2>;
        } else {
            return <h2 contentEditable={true}>WTF</h2>;
        }
    }
    
    return (
        <Paper>
            {renderBody()}
        </Paper>
    );
}

EmailBody.propTypes = {
    intent: PropTypes.string.isRequired
}

export default EmailBody;