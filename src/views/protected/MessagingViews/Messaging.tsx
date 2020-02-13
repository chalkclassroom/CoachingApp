// View where Messaging Components are composed to make the final view
import React, { useState, useRef } from 'react';
import ChooseIntent from '../../../components/MesssagingComponents/ChooseIntent';
import EmailBody from '../../../components/MesssagingComponents/EmailBody';
import RecipientAddress from '../../../components/MesssagingComponents/RecipientAddress';
import SubmitButton from '../../../components/MesssagingComponents/SubmitButton';
import AppBar from '../../../components/AppBar.js'
import FirebaseContext from '../../../components/Firebase/FirebaseContext'; 

/*const styles = {
	gridContainer: {
		display: 'grid',
		gridTemplateColumns: 'none',
		gridGap: '0px',
	},
	appbar: {
		gridColumn: '1 / span 4',
		gridRow: '1',		
	},
	intent: {
		gridRow: '2 / span 4',
		gridColumn: '1',
	},
	recipient: {
		gridColumn: '2 / span 4',
		gridRow: '2', 
	},
	emailbody: {
		gridRow: '3 / span 4',
		gridColumn: '2 / span 4',
	}
};*/

/*
const appbar = {
	gridArea: 'appbar',
};
const intent = {
	gridArea: 'intent',
};
const recipient = {
	gridArea: 'recipient',
};
const emailbody = {
	gridArea: 'emailbody',
};
const gridContainer = {
	gridTemplateAreas: `
			'appbar appbar appbar appbar'
			'intent recipient recipient recipient'
			'intent emailbody emailbody emailbody'	
			'intent emailbody emailbody emailbody'
		`
};
*/

const gridContainer = {
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	gridTemplateRows: 'auto 15% 1fr',
	gridGap: '0.2em',
};

const appbar = {
		gridColumn: '1 / span 4',
		gridRow: '1',		
};
const intent = {
		gridRow: '2 / span 3',
		gridColumn: '1',
};
const recipient = {
		gridColumn: '2 / span 4',
		gridRow: '2 / 2', 
};
const emailbody = {
		gridRow: '3 / span 4',
		gridColumn: '2 / span 4',
};

const submit = {
    position: 'fixed',
    bottom: '4em',
    right: '1em',
};

const MessagingView: React.FC<MessagingViewProps> = () => {
    //const [intent, setIntent] = useState("thank_you");
    const textRef = useRef();
    //const sendMail = () => {}

    const emailContent: JSX.Element = <div style={{fontFamily: "Raleway, Arial", padding: "5em"}}>
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

/*
    return (
        <div style={gridContainer}>
	    <FirebaseContext.Consumer style={appbar}>
	    	{firebase => <AppBar firebase={firebase} />}
	    </FirebaseContext.Consumer>
            <div style={intent}>
              <ChooseIntent />
            </div>
            <div>
              <div style={recipient}>
                <RecipientAddress />
              </div>
              {/* <main style={{marginTop: `80px`, marginLeft: drawerWidth}}> }
              <div style={emailbody}>
                <EmailBody emailText={emailContent} emailTextRef={textRef} />
              </div>
              {/* </main> }
              {/* <div style={{position: "fixed", bottom: "16px", right: "16px"}}> }
              <div className='submit'>
                <SubmitButton sendMail={(): void => console.log('hello')}/>
              </div>
          </div>
        </div>
    );
*/
    return (
        <div style={gridContainer}>
	    <div style={appbar}>
	    <FirebaseContext.Consumer>
	    	{firebase => <AppBar firebase={firebase} />}
	    </FirebaseContext.Consumer>
	    </div>
            <div style={intent}>
              <ChooseIntent />
            </div>
              <div style={recipient}>
                <RecipientAddress />
              </div>
              {/* <main style={{marginTop: `80px`, marginLeft: drawerWidth}}> */}
              <div style={emailbody}>
                <EmailBody emailText={emailContent} emailTextRef={textRef} />
              </div>
              {/* </main> */}
              {/* <div style={{position: "fixed", bottom: "16px", right: "16px"}}> */}
              <div style={submit}>
                <SubmitButton sendMail={(): void => console.log('hello')}/>
              </div>
        </div>
    );
}

export default MessagingView;
