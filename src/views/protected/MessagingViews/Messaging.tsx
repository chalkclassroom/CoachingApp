// View where Messaging Components are composed to make the final view
import React from 'react';
import ChooseIntent from '../../../components/MesssagingComponents/ChooseIntent';
import EmailBody from '../../../components/MesssagingComponents/EmailBody';
import RecipientAddress from '../../../components/MesssagingComponents/RecipientAddress';
import SubmitButton from '../../../components/MesssagingComponents/SubmitButton';

type MessagingViewState = {
    intent: string;
}


type MessagingViewProps = {
    
}

export default class MessagingView extends React.Component<MessagingViewProps, MessagingViewState> {
    state: MessagingViewState = {
        intent: ""
    }

    selectIntent = (newIntent) => {
        this.setState({
            intent: newIntent
        })
    }

    sendMail = () => {

    }

    render() {
        return (
            <div>
                <ChooseIntent onClick={this.selectIntent}/>
                <EmailBody intent={this.state.intent}/>
                <RecipientAddress />
                <SubmitButton onClick={this.sendMail}/>
            </div>
        );
    }
}