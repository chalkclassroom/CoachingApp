import * as React from 'react';
import { useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { renderToStaticMarkup } from 'react-dom/server';
import ChooseTheme from './ChooseTheme';
import EmailBody from './EmailBody';
import RecipientAddress from './RecipientAddress';
import SendButton from './SendButton';
// import DeleteButton from './DeleteButton';
import SaveButton from './SaveButton';
import AttachButton from './AttachButton';
// import AlertDialog from './AlertDialog';
// import ChooseActionPlanDialog from './ChooseActionPlanDialog';
import { Alerts, ThemeOptions, Message, Attachment, SelectOption, TemplateOption } from './MessagingTypes';
import * as CryptoJS from 'crypto-js';
import ActionPlanForm from '../ActionPlanForm';


interface NewMessageViewProps {
  firebase: any;
  // the initial message loaded
  // is a prop as it allows editing drafts to be easier
  // DraftView just modifies two states in the parent component: initialMsg and menuOption
  // and the NewMessageView is loaded with that draft as content
  draft: Message;
};

/* const gridContainer = {
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	gridTemplateRows: 'auto 15% 15% 1fr',
	gridGap: '0.1em',
};

const themeClass = {
  gridColumn: '2 / span 4',
  gridRow: '2 / 2', 
};
const recipientClass = {
		gridColumn: '2 / span 4',
		gridRow: '3 / 3', 
};

const emailbodyClass = {
		gridRow: '4 / span 5',
		gridColumn: '2 / span 4',
};

const submitButtonClass = {
    position: 'fixed',
    bottom: '4em',
    right: '1em',
};

const attachButtonClass = {
    position: 'fixed',
    bottom: '4em',
    right: '1em',
}; */

const NewMessageView: React.FC<NewMessageViewProps> = (props: NewMessageViewProps) => {
  // state to store the message theme
  // const [theme, setTheme] = useState(props.draft.theme);
  const [theme, setTheme] = useState({
    id: '0',
    value: 'None',
    label: 'None'
  });
  // state to store the current alert
  const [alertEnum, setAlertEnum] = useState(Alerts.NO_ERROR);
  // state to store the current recipient
  const [recipient, setRecipient] = useState({
    value: '',
    id: '',
    label: ''
  });
  const [recipientName, setRecipientName] = useState("Katherine");
  // ref to get value from EmailBody
	const textRef = useRef();
  // state to store the current list of attachments
  const [attachments, setAttachments] = useState(props.draft.attachments);
  const [actionPlanDisplay, setActionPlanDisplay] = useState(false);
  const firebase = props.firebase;
  // const userEmail = firebase.auth.currentUser.email;
  // state to store the current username
  const [userName, setUserName] = useState('');

  // get the user's name
  if (userName === '') {
    firebase.getCoachFirstName()
      .then((name: string): void => {
        setUserName(name);
      });
  }

  const sendMail = (): void => {
    if (recipient === null) {
      setAlertEnum(Alerts.NO_RECIPIENT);	
    } else {

      // tries to get the html version of all the action plans
      // doesn't convert to pdf but required so
      const sendAttachments = attachments.map((attach: Attachment) => {
        const staticMarkup = renderToStaticMarkup(<ActionPlanForm 
            firebase={props.firebase} 
            actionPlanId={attach.id}
            readOnly={true}
            actionPlanExists={true}
            teacherId={recipient.id}
          />);
        
        // convert staticMarkup to pdf here
        
        // encodes the pdf in a base64 string
        const attachContent: string = btoa(staticMarkup);

        // returns in the format sendgrid requires
        return {
          content: attachContent,
          filename: (attach.type + ' ' + attach.date.toString()),
          type: 'application/pdf',
          disposition: 'attachment',
        }
      });

      // create the message object to send to funcSendEmail
      const msg: Message = {
        // id: props.draft.id,
        // from: userEmail,
        // to: (props.draft.to !== '' ? props.draft.to : recipient.value),
        // subject: theme,
        // theme: theme,
        // textContent: textRef.current.textContent,
        // content: textRef.current.innerHTML,
        id: '0000001',
        from: 'clare.e.speer@vanderbilt.edu',
        to: 'clare.e.speer@vanderbilt.edu',
        subject: 'idk',
        theme: ThemeOptions.FEEDBACK,
        // html: textRef.current,
        textContent: 'test',
        content: 'testing this',
        delivered: false,
        // attachments: sendAttachments,
        attachments: [{
          id: 'action plan',
          date: new Date(),
        }]
      };
     
      // encrypted with the user's uid from firebase
      const encryptedMsg = CryptoJS.AES
                          .encrypt(JSON.stringify(msg), firebase.auth.currentUser.uid)
                          // .encrypt('test', firebase.auth.currentUser.uid)
                          .toString();

      firebase.sendEmail(encryptedMsg)
        .then((res: {data: string}): void => {
          console.log(JSON.stringify(res));
          if(res.data === '200') {
            setAlertEnum(Alerts.EMAIL_SEND_SUCCESS);
          } else {
            setAlertEnum(Alerts.EMAIL_SEND_FAIL);
          }
        })
        .catch((err: Error): void => {
          console.log(JSON.stringify(err));
          setAlertEnum(Alerts.EMAIL_SEND_FAIL);
        });
    }
  };

  const createAddAttachment = (newActionPlan: string): void => {
    // the values in this should be updated according to how the action plan
    // is stored in the firestore and therefore is very much a placeholder info
    const newAttachment: Attachment = {
      id: newActionPlan,
      type: 'action_plan',
      date: new Date()
    }

    const updatedAttachments = attachments;
    attachments.push(newAttachment);
    setAttachments(updatedAttachments);
  }

  /* const removeAttachment = (actionPlanId: string): void => {
    const updatedAttachments = attachments.map((attach: Attachment): Attachment => {
      if (attach.id !== actionPlanId) {
        return attach;
      }
    });
    console.log(updatedAttachments);
    setAttachments(updatedAttachments);
  } */

  const thankYou = (name: string | null): JSX.Element => (<div style={{padding: "1em"}}>
  <h4>Hi {name || ""},</h4>
  Thanks for welcoming me into your classroom today. I really enjoyed my visit and look forward to chatting with you soon about CHALK practice.
  <br />
  <br />
  Best wishes,
  <br />
    {userName}
  </div>);

  const custom = (name: string | null): JSX.Element => <div style={{padding: "1em"}}>
    <h4>Hi {name || ""},</h4>
  <strong>Create your new message here</strong>
  <br />
  <br />
  Best,
  <br />
    {userName}
  </div>;

  const feedback = (name: string | null): JSX.Element => <div style={{padding: "1em"}}>
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
 
  const actionPlan = (name: string | null): JSX.Element => <div style={{padding: "1em"}}>
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
  
  const greetingText = "Hi " + recipientName;

  const chooseOptions = (): JSX.Element => <div style={{padding: '5em'}}>
	    <h1>Please choose message topic and the teacher on top</h1>
  </div>;

  // get the text for EmailBody according to the states set
  const getEmailText = (): JSX.Element => {
    // if the theme of the draft matches with the current theme and the textContent is not null
    // it means that the user is editing a draft message and then that is content shown in the email body
    if (theme === props.draft.theme && props.draft.textContent !== null) {
      return props.draft.content;
    } else {
      const recipientName = (props.draft.to !== '' ? props.draft.to : (recipient ? recipient.label : ''));
      if (recipientName !== '') {
        if(theme.label === ThemeOptions.THANK_YOU) {
          return thankYou(recipientName);
        } else if (theme.label === ThemeOptions.ACTION_PLAN){
          return actionPlan(recipientName);
        } else if (theme.label === ThemeOptions.FEEDBACK) {
          return feedback(recipientName);
        } else {
          return custom(recipientName);
        }
      } else {
        return chooseOptions();
      }
    }
  };

  return (
    <div style={{width: '100%', overflowX: 'scroll'}}>
      {/* <div style={gridContainer}>
        <div style={themeClass}>
          <ChooseTheme currentTheme={theme} changeTheme={(newTheme: ThemeOptions): void => setTheme(newTheme)}/>
        </div>
        <div style={recipientClass}>
          <RecipientAddress selectedOption={recipient} setOption={(newOption: object): void => setRecipient(newOption)} firebase={firebase}/>
        </div>
        <div style={emailbodyClass}>
          <EmailBody emailText={getEmailText()} emailTextRef={textRef} />
        </div>
        <div style={submitButtonClass}>
          <SendButton sendMail={sendMail}/>
        </div>
        <div style={attachButtonClass}> */}
          {/* AttachButton only becomes clickable when the user is typing a message of Action Plan theme */}
          {/* <AttachButton 
              acceptAttachment={(): void => setActionPlanDisplay(true)} 
              disabled={theme !== ThemeOptions.ACTION_PLAN || recipient === null}
          />
        </div>
        <div>
          <DeleteButton deleteDraft={(): void => setActionPlanDisplay(true)}/>
        </div>
        <div>
          <SaveButton saveDraft={(): void => setActionPlanDisplay(true)} />
        </div>
        <>
          <AlertDialog open={alertEnum !== Alerts.NO_ERROR} text={alertEnum} handleYes={(): void => setAlertEnum(Alerts.NO_ERROR)}/>
          <ChooseActionPlanDialog 
            open={actionPlanDisplay} 
            handleAdd={(newActionPlan: string): void => { 
              createAddAttachment(newActionPlan);
              setActionPlanDisplay(false);
            }} 
            handleDelete={(existActionPlan: string): void => {
              removeAttachment(existActionPlan);
              setActionPlanDisplay(false);
            }}
            firebase={props.firebase}
            attachmentList={attachments}
          />
        </>
      </div> */}
      <Grid direction="column" justify="center" alignItems="center" style={{width: '100%', height: '80vh'}}>
        <Grid item style={{width: '100%'}}>
          <Grid container direction="row" alignItems="flex-start" justify="center" style={{width: '100%'}}>
            <Grid item xs={6}>
              <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                Write a new message to:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <RecipientAddress
                selectedOption={recipient}
                setOption={(newOption: SelectOption): void => setRecipient(newOption)}
                firebase={firebase}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{paddingTop: '0.5em'}}>
          <Grid container direction="row" alignItems="flex-start" justify="center" style={{width: '100%'}}>
            <Grid item xs={6}>
              <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                Select message template:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <ChooseTheme
                selectedOption={theme}
                setOption={(newTheme: TemplateOption): void => setTheme(newTheme)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{width: '100%', height: '75%', paddingTop: '1em'}}>
          <Paper style={{backgroundColor: '#d8ecff', height: '100%', padding: '1em'}}>
            <Grid container direction="column" justify='space-between' style={{height: '100%'}}>
              <Grid container direction='row' justify='flex-end'>
                <Grid item>
                  X
                </Grid>
              </Grid>
              <Grid item style={{width: '100%', height: '80%'}}>
                <EmailBody emailText={getEmailText()} emailTextRef={textRef} greetingText={greetingText} />
              </Grid>
              <Grid item>
                <Grid container direction="row" justify="space-between" style={{width: '100%'}}>
                  <Grid item>
                    <SendButton sendMail={sendMail}/>
                  </Grid>
                  <Grid item>
                    <Grid container direction="row">
                      <Grid item style={{paddingRight: '1em'}}>
                        <AttachButton 
                          acceptAttachment={(): void => setActionPlanDisplay(true)} 
                          // disabled={theme !== ThemeOptions.ACTION_PLAN || recipient === null}
                        />
                      </Grid>
                      <Grid item>
                        <SaveButton saveDraft={(): void => setActionPlanDisplay(true)} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default NewMessageView;
