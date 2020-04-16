// View where Messaging Components are composed to make the final view
import React, { useState, useRef, useContext, useEffect } from 'react';
import ChooseIntent from '../../../components/MesssagingComponents/ChooseIntent';
import EmailBody from '../../../components/MesssagingComponents/EmailBody';
import RecipientAddress from '../../../components/MesssagingComponents/RecipientAddress';
import SubmitButton from '../../../components/MesssagingComponents/SubmitButton';
import AttachButton from '../../../components/MesssagingComponents/AttachButton';
import AlertDialog from '../../../components/MesssagingComponents/AlertDialog';
import AppBar from '../../../components/AppBar.js'
import FirebaseContext from '../../../components/Firebase/FirebaseContext'; 
import ChooseActionPlanDialog from '../../../components/MesssagingComponents/ChooseActionPlanDialog';

enum Alerts {
	NO_INTENT = 'Please choose subject of your email on the left!',
	NO_RECIPIENT = 'Please choose the recipient of your email from the box on top!',
	NO_ERROR = '',
	EMAIL_SENT = 'Your email was sent successfully!',
	EMAIL_FAILED = 'Your email could not be sent. Please retry later!',
}

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
const intentClass = {
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

const attach = {
    position: 'fixed',
    bottom: '4em',
    right: '10em',
};

const MessagingView: React.FC<> = () => {
  const [intent, setIntent] = useState(null);
  const [alertEnum, setAlertEnum] = useState(Alerts.NO_ERROR);
  const [selectedOption, setSelectedOption] = useState(null);
	const textRef = useRef();
  const firebase = useContext(FirebaseContext);
  const [chosenActionPlan, setChosenActionPlan] = useState(null);
  const [attatchments, setAttatchments] = useState([]);
  const [actionPlanDisplay, setActionPlanDisplay] = useState(false);
  let userName: string | null = null;
  const userEmail = firebase.auth.currentUser.email;

  useEffect(() => {
    firebase.getCoachFirstName()
      .then(name => {
        userName = name
      });
    if(chosenActionPlan !== null) {
      console.log('Not implemented yet!');
    }
  });	

  const sendMailButton = () => {
    if (intent === null) {
      setAlertEnum(Alerts.NO_INTENT);
      console.log(alertEnum);
    } else if (selectedOption === null) {
      setAlertEnum(Alerts.NO_RECIPIENT);	
    } else {
      const msg = {
        to: selectedOption.value,
        from: userEmail, 
        subject: intent,
        text: textRef.current.textContent,
        html: textRef.current.innerHTML,
    };

    firebase.sendEmail(msg)
      .then(res => {
        console.log(JSON.stringify(res));
        if(res.data === '200') {
          setAlertEnum(Alerts.EMAIL_SENT);
        } else {
          setAlertEnum(Alerts.EMAIL_FAILED);
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err));
        setAlertEnum(Alerts.EMAIL_FAILED);
      });
    
    setAlertEnum(Alerts.EMAIL_SENT);
    }
  };

    const thankYou = (name: string | null): JSX.Element => (<div style={{padding: "5em"}}>
    <h4>Hi {name || ""},</h4>
    Thanks for welcoming me into your classroom today. I really enjoyed my visit and look forward to chatting with you soon about CHALK practice.
    <br />
    <br />
    Best wishes,
    <br />
    	{userName}
    </div>);

    const custom = (name: string | null): JSX.Element => <div style={{padding: "5em"}}>
	    <h4>Hi {name || ""},</h4>
    <strong>Create your new message here</strong>
    <br />
    <br />
    Best,
    <br />
    	{userName}
    </div>;

  const feedback = (name: string | null): JSX.Element => <div style={{padding: "5em"}}>
    <h4>Hi {name || ""},</h4>
    Thanks for welcoming me today in your classroom! 
    <br />
    It was a joy to see the children so engaged in those small 
    groups when you used cotton balls to teach counting. 
    <br />
    <br />
    Please see below for some notes on great teaching strategies I noticed and why they’re effective for children.
    <br />
    <br />
    Best,
    <br />
    	{userName}
	</div>;
 
    const actionPlan = (name: string | null): JSX.Element => <div style={{padding: "5em"}}>
    <h4>Hi {name || ""},</h4>
    Thanks for meeting today and creating this action plan. I think it looks great, and I look forward to working on these goals with you!
    <br />
    <br />
    Please reach out with questions or ideas anytime.
    <br />
    <br />
    Best,
    <br />
	{userName}
    </div>;   

    const chooseOptions = (): JSX.Element => <div style={{padding: "5em"}}>
	    <h1>Please choose message topic and the teacher on top</h1>
    </div>;

    const getEmailText = () => {
	    const recipientName = (selectedOption) ? selectedOption.label : "";
	    if (recipientName !== "") {
        if(intent === "Thank You") {
          return thankYou(recipientName);
        } else if (intent === "Action Plan"){
          return actionPlan(recipientName);
        } else if (intent === "New Message") {
          return custom(recipientName);
        } else if (intent === "Feedback") {
          return feedback(recipientName);
        } else {
          return chooseOptions();
        }
	    } else {
		    return chooseOptions();
	    }
    };

    return (
        <div style={gridContainer}>
	    <div style={appbar}>
	    	<AppBar firebase={firebase} />
	   </div>
            <div style={intentClass}>
              <ChooseIntent chosenIntent={intent} changeIntent={(newIntent: string) => setIntent(newIntent)}/>
            </div>
              <div style={recipient}>
                <RecipientAddress selectedOption={selectedOption} setOption={(newOption) => setSelectedOption(newOption)} firebase={firebase}/>
	                    </div>
              <div style={emailbody}>
		      <EmailBody emailText={getEmailText()} emailTextRef={textRef} />
              </div>
              <div style={submit}>
                <SubmitButton sendMail={sendMailButton}/>
              </div>
          <div>
            {/*            <AttachmentsBox attachments={attachments} /> */}
          </div>
          <div style={attach}>
            <AttachButton acceptAttachment={() => setActionPlanDisplay(true)} disabled={intent !== 'Action Plan' || selectedOption === null}/>
          </div>
	    <>
        <AlertDialog open={alertEnum !== Alerts.NO_ERROR} text={alertEnum} handleClose={() => setAlertEnum(Alerts.NO_ERROR)}/>
        {/**        
addAttachment={(newEl) => { let newAttachments = attachments; newAttachments.push(newEl); setAttachments(newAttachments); }} 
        **/} 
           <ChooseActionPlanDialog 
          open={actionPlanDisplay} 
          handleClose={(newActionPlan: string) => { 
            setChosenActionPlan(newActionPlan); 
            setActionPlanDisplay(false);
          }} 
        />
      </>
	</div>
    );
}


export default MessagingView;
