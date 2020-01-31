// View where Messaging Components are composed to make the final view
import React, { useState, useRef } from 'react';
import ChooseIntent from '../../../components/MesssagingComponents/ChooseIntent';
import EmailBody from '../../../components/MesssagingComponents/EmailBody';
import RecipientAddress from '../../../components/MesssagingComponents/RecipientAddress';
import SubmitButton from '../../../components/MesssagingComponents/SubmitButton';
import './Messaging.css';

type MessagingViewProps = {
    
}

const drawerWidth = 240;

const MessagingView: React.FC<MessagingViewProps> = () => {
    // const [intent, setIntent] = useState(DEFAULT);
    const textRef = useRef();
    // const sendMail = () => {}

    const emailContent: JSX.Element = <div style={{fontFamily: "Raleway, Arial"}}>
    <h4>Hi Mingli,</h4>
    Thanks for meeting today and creating this action plan. I think it looks great, and I look forward to working on these goals with you!
    <br />
    Please reach out with questions or ideas anytime.
    <br />
    <br />
    Best,
    <br />
    <br />
    Katherine
    </div>;

    return (
        <div className="grid-container">
            <div className='intent'>
              <ChooseIntent />
            </div>
            <div className='non-intent'>
              <div className='recipient'>
                <RecipientAddress />
              </div>
              {/* <main style={{marginTop: `80px`, marginLeft: drawerWidth}}> */}
              <div className='emailbody'>
                <EmailBody emailText={emailContent} emailTextRef={textRef} />
              </div>
              {/* </main> */}
              {/* <div style={{position: "fixed", bottom: "16px", right: "16px"}}> */}
              <div className='submit'>
                <SubmitButton sendMail={(): void => console.log('hello')}/>
              </div>
          </div>
        </div>
    );
}

export default MessagingView;