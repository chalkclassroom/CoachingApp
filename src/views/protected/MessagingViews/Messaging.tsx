// View where Messaging Components are composed to make the final view
import React, { useState, useRef } from 'react';
import ChooseIntent from '../../../components/MesssagingComponents/ChooseIntent';
import EmailBody from '../../../components/MesssagingComponents/EmailBody';
import RecipientAddress from '../../../components/MesssagingComponents/RecipientAddress';
import SubmitButton from '../../../components/MesssagingComponents/SubmitButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';


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
        <div>
        <div style={{padding: "5px"}} >
        <ChooseIntent/>
        {/* <AppBar style={{width: `calc(100% - ${drawerWidth}px)`, height: `80px`, marginLeft: drawerWidth, position: "fixed"}}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Send to
            </Typography>
            <TextField id="standard-basic" label="search email here" style={{width: "100%"}} />
          </Toolbar>
        </AppBar> */}
        <RecipientAddress />
        <main style={{marginTop: `80px`, marginLeft: drawerWidth}}>
        <EmailBody emailText={emailContent}
            emailTextRef={textRef}
        />
        </main>
        </div>
        <div style={{position: "fixed", bottom: "16px", right: "16px"}}>
        <SubmitButton sendMail={(): void => console.log('hello')}/>
        </div>
      </div>
    );
}

export default MessagingView;