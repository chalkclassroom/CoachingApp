// View where Messaging Components are composed to make the final view
import React, { useState } from 'react';
import ChooseIntent from '../../../components/MesssagingComponents/ChooseIntent';
import EmailBody from '../../../components/MesssagingComponents/EmailBody';
import RecipientAddress from '../../../components/MesssagingComponents/RecipientAddress';
import SubmitButton from '../../../components/MesssagingComponents/SubmitButton';

type MessagingViewProps = {
    
}

const DEFAULT: string = 'Thank you';

const MessagingView: React.FC<MessagingViewProps> = () => {
    const [intent, setIntent] = useState(DEFAULT);
    
    const sendMail = () => {}

    return (
        <div>
            <ChooseIntent changeIntent={setIntent}/>
            <RecipientAddress />
            {/* FIXME get the value of text from EmailBody */}
            <EmailBody chosenIntent={intent}/>
            {/* TODO Discuss if SubmitButton is better as a component by itself or part of this */}
            <SubmitButton sendMail={sendMail}/>
        </div>
    );
}

export default MessagingView;