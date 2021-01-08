import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { renderToStaticMarkup } from 'react-dom/server';
import ChooseTheme from './ChooseTheme';
import EmailBody from './EmailBody';
import SubjectLine from './SubjectLine';
import RecipientAddress from './RecipientAddress';
import SendButton from './SendButton';
import DeleteButton from './DeleteButton';
import SaveButton from './SaveButton';
import AttachButton from './AttachButton';
// import AlertDialog from './AlertDialog';
// import ChooseActionPlanDialog from './ChooseActionPlanDialog';
import AttachmentDialog from './AttachmentDialog';
import { Alerts, ThemeOptions, Message, Attachment, SelectOption, TemplateOption, Email } from './MessagingTypes';
import * as CryptoJS from 'crypto-js';
import ActionPlanForm from '../ActionPlanForm';


interface NewMessageViewProps {
  firebase: any;
  // the initial message loaded
  // is a prop as it allows editing drafts to be easier
  // DraftView just modifies two states in the parent component: initialMsg and menuOption
  // and the NewMessageView is loaded with that draft as content
  draft?: Email;
  /* email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  emailId: string;
  setEmailId: React.Dispatch<React.SetStateAction<string>>;
  subject: string;
  setSubject: React.Dispatch<React.SetStateAction<string>>;
  recipient: {value: string, id: string, label: string};
  setRecipient: React.Dispatch<React.SetStateAction<{value: string, id: string, label: string}>> */
  updateDrafts?(email: Email): void;
  readOnly?: boolean;
  moveDraftToSent?(email: Email): void;
};

interface ResultType {
  summary: boolean,
  details: boolean,
  trends: boolean
}

type ResultTypeKey = keyof ResultType;

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
  const [recipient, setRecipient] = useState<{value: string | undefined, id: string | undefined, label: string | undefined}>({
    value: '',
    id: '',
    label: ''
  });
  const [recipientName, setRecipientName] = useState("Katherine");
  // ref to get value from EmailBody
	const textRef = useRef();
  // state to store the current list of attachments
  // const [attachments, setAttachments] = useState<Array<{id: string, date: {seconds: number, nanoseconds: number}, practice: string, achieveBy: firebase.firestore.Timestamp}>>([]);
  const [actionPlans, setActionPlans] = useState<Array<{
    id: string,
    date: {
      seconds: number,
      nanoseconds: number
    },
    practice: string,
    achieveBy: firebase.firestore.Timestamp
  }>>([]);
  const [noActionPlansMessage, setNoActionPlansMessage] = useState<string>('');
  const [observations, setObservations] = useState<Array<{
    id: string,
    date: firebase.firestore.Timestamp,
    practice: string
  }>>([]);
  const [noObservationsMessage, setNoObservationsMessage] = useState<string>('');
  const [actionPlanDisplay, setActionPlanDisplay] = useState(false);
  const [subject, setSubject] = useState<string | undefined>('');
  const firebase = props.firebase;
  // const userEmail = firebase.auth.currentUser.email;
  // state to store the current username
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState<string | undefined>('');
  const [emailId, setEmailId] = useState('');
  const [attachments, setAttachments] = useState<Array<{content: string, filename: string, type: string, disposition: string}>>();
  const [includeAttachments, setIncludeAttachments] = useState(true);
  const [checkedResults, setCheckedResults] = useState<{[id: string]: {
    summary: boolean,
    details: boolean,
    trends: boolean
  }}>({});

  // get the user's name
  useEffect(() => {
    if (userName === '') {
      firebase.getCoachFirstName()
        .then((name: string): void => {
          setUserName(name);
        });
    }
    if (props.draft && emailId === '') {
      setEmailId(props.draft.id);
      setEmail(props.draft.emailContent);
      setSubject(props.draft.subject);
      setRecipient({
        value: props.draft.recipientEmail,
        id: props.draft.recipientId,
        label: props.draft.recipientName
      });
    }
  })
  
  const addAttachment = (content: string, practice: string, date: Date): void => {
    // console.log('this is the content', content);
    console.log('practice and date', practice, date);
    console.log('attachments in addattachment', attachments);
    let newAttachments: Array<{content: string, filename: string, type: string, disposition: string}> = [];
    if (attachments) {
      console.log('attachments is true');
      newAttachments = attachments;
    }
    newAttachments.push({
      content: content,
      filename: practice + 'Action Plan.pdf',
      type: 'application/pdf',
      disposition: 'attachment'
    });
    setAttachments(newAttachments);
    console.log('ehre are the attachments', newAttachments);
    /* setAttachments([{
      content: content,
      filename: 'attachment.pdf',
      type: 'application/pdf',
      disposition: 'attachment'
    }]) */
  }

  const sendMail = async (): Promise<void> => {
    if (recipient === null) {
      setAlertEnum(Alerts.NO_RECIPIENT);	
    } else {
      // console.log('this is attachment being sent', attachments);
      // tries to get the html version of all the action plans
      // doesn't convert to pdf but required so
      /* const sendAttachments = attachments.map((attach: Attachment) => {
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
      }); */

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
        from: 'chalkcoaching@gmail.com',
        to: 'clare.speer@gmail.com',
        subject: subject ? subject : '',
        theme: ThemeOptions.FEEDBACK,
        // html: textRef.current,
        textContent: 'test',
        content: email ? email : '',
        delivered: false,
        // attachments: sendAttachments,
        /* attachments: [{
          id: 'action plan',
          date: new Date(),
        }] */
        // attachments: includeAttachments ? attachments : undefined
        attachments: attachments
      };
      console.log('attachments in msg', msg.attachments);
     
      // encrypted with the user's uid from firebase
      const encryptedMsg = CryptoJS.AES
                          .encrypt(JSON.stringify(msg), firebase.auth.currentUser.uid)
                          // .encrypt('test', firebase.auth.currentUser.uid)
                          .toString();

      console.log('the message is', msg);
      console.log('the encrypted message is', encryptedMsg);
      const bytes  = CryptoJS.AES.decrypt(encryptedMsg, firebase.auth.currentUser.uid);
      console.log('bytes', bytes);
      const decryptedData = JSON.parse(JSON.stringify(CryptoJS.enc.Utf8.stringify(bytes)));
      console.log('decrypted data', decryptedData)
      console.log('json string decrypted', JSON.stringify(decryptedData));
      const messageObj = JSON.parse(decryptedData);
      console.log('message obj', messageObj);
      console.log('attachments', messageObj.attachments)
      if (messageObj.attachments && msg.attachments) {
        console.log('message obj attachment content', messageObj.attachments[0].content);
        console.log('beginning and end are same?', msg.attachments[0].content === messageObj.attachments[0].content);
        console.log('how many are there', messageObj.attachments);
      }
      

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
  {/* <strong>Create your new message here</strong> */}
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

  const chooseOptions = (): JSX.Element => <div style={{padding: '1em'}}>
	    <h3 style={{fontFamily: 'Arimo'}}>Please choose a recipient for your message.</h3>
  </div>;

  // get the text for EmailBody according to the states set
  /* const getEmailText = (): JSX.Element => {
    // if the theme of the draft matches with the current theme and the textContent is not null
    // it means that the user is editing a draft message and then that is content shown in the email body
    // if (theme === props.draft.theme && props.draft.textContent !== null) {
    if (props.draft.theme) {
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
  }; */

  const removeResult = (id: string, type: ResultTypeKey): void => {
    const newCheckedResults = checkedResults;
    if (newCheckedResults) {
      newCheckedResults[id][type] = false;
    }
    setCheckedResults(newCheckedResults);
  }

  const addResult = (id: string, type: ResultTypeKey): void => {
    const newCheckedResults = checkedResults;
    if (newCheckedResults) {
      newCheckedResults[id][type] = true;
    }
    setCheckedResults(newCheckedResults);
  }

  const recipientSelected = (newRecipient: {value: string, id: string, label: string}): void => {
    setRecipient(newRecipient);
    firebase.getAllTeacherActionPlans(newRecipient.id).then((actionPlans: Array<{
      id: string,
      date: {
        seconds: number,
        nanoseconds: number
      },
      practice: string,
      achieveBy: firebase.firestore.Timestamp
    }>) => {
      setActionPlans(actionPlans);
      console.log('aplans', actionPlans)
      if (actionPlans && actionPlans.length > 0) {
        setNoActionPlansMessage('')
      } else {
        setNoActionPlansMessage('You have not created any action plans with ' + newRecipient.label + '.');
      }
    }).catch((error : Error) => {
      console.log('error', error);
      setNoActionPlansMessage('There was an error retrieving ' + newRecipient.label + '\'s action plans.');
    });
    firebase.getAllTeacherObservations(newRecipient.id).then((observations: Array<{
      id: string,
      date: firebase.firestore.Timestamp,
      practice: string
    }>) => {
      setObservations(observations);
      const unchecked: {[id: string]: {summary: boolean, details: boolean, trends: boolean}} = {};
      console.log('observations', observations)
      if (observations && observations.length > 0) {
        observations.forEach(result => {
          unchecked[result.id] = {'summary': false, 'details': false, 'trends': false}
        })
      }
      setCheckedResults(unchecked);
      console.log('observations', observations)
      if (observations && observations.length > 0) {
        setNoObservationsMessage('')
      } else {
        setNoObservationsMessage('You have no observation data for ' + newRecipient.label + '.');
      }
    }).catch((error : Error) => {
      console.log('error', error);
      setNoObservationsMessage('There was an error retrieving ' + newRecipient.label + '\'s results.');
    });
  }

  const saveEmail = async (
    email?: string,
    subject?: string,
    recipient?: {
      id: string,
      name: string,
      email: string
    },
    emailId?: string
  ): Promise<Email> => {
    return firebase.saveEmail(email, subject, recipient, emailId).then((data: Email) => {
      props.updateDrafts(data);
      setEmailId(data.id);
      return data;
    });
  };

  const saveAndSendEmail = (
    email?: string,
    subject?: string,
    recipient?: {
      id: string,
      name: string,
      email: string
    },
    emailId?: string
  ): void => {
    saveEmail(email, subject, recipient, emailId).then((email: Email) => {
      sendMail().then(() => {
        firebase.changeDraftToSent(email.id);
        if (props.moveDraftToSent) {
          props.moveDraftToSent(email)
        }
      })
    })
  }

  return (
    <div style={{width: '100%', overflowY: 'auto'}}>
      <Grid container direction="column" justify="flex-start" alignItems="center" style={{width: '100%'}}>
        <Grid item style={{width: '100%'}}>
          <Grid container direction="row" alignItems="flex-start" justify="center" style={{width: '100%'}}>
            <Grid item xs={3}>
              <Typography variant="h6" align="right" style={{fontFamily: 'Arimo', paddingRight: '1em'}}>
                {/* {props.readOnly ? 'To:' : 'Write a new message to:'} */}
                To:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <RecipientAddress
                selectedOption={recipient}
                setOption={(newOption: SelectOption): void => recipientSelected(newOption)}
                readOnly={props.readOnly}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{paddingTop: '0.5em', width: '100%'}}>
          <Grid container direction="row" alignItems="flex-start" justify="center" style={{width: '100%'}}>
            <Grid item xs={3}>
              <Typography variant="h6" align="right" style={{fontFamily: 'Arimo', paddingRight: '1em'}}>
                {/* {props.readOnly ? 'Message template:' : 'Select message template:'} */}
                Template:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <ChooseTheme
                selectedOption={theme}
                setOption={(newTheme: TemplateOption): void => setTheme(newTheme)}
                readOnly={props.readOnly}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{width: '100%', height: '75%', paddingTop: '1em'}}>
          <Paper style={{backgroundColor: '#d8ecff', height: '100%', padding: '1em'}}>
            <Grid container direction="column" justify={props.readOnly? 'space-around' : 'space-between'} style={{height: '100%'}}>
              <Grid item>
                <Grid container direction='row' justify='flex-start'>
                  <SubjectLine subject={subject} setSubject={setSubject} readOnly={props.readOnly} />
                </Grid>
              </Grid>
              <Grid item style={{width: '100%', height: '50vh', paddingTop: '1em', paddingBottom: '1em'}}>
                <EmailBody email={email} setEmail={setEmail} readOnly={props.readOnly} />
              </Grid>
              {props.readOnly ? (null) : (
                <Grid item>
                  <Grid container direction="row" justify="space-between" style={{width: '100%'}}>
                    <Grid item>
                      <SendButton sendMail={(): void => {saveAndSendEmail(email, subject, {id: recipient.id, name: recipient.label, email: recipient.value}, emailId)}}/>
                    </Grid>
                    <Grid item>
                      <Grid container direction="row">
                        <Grid item style={{paddingRight: '1em'}}>
                          <AttachButton 
                            acceptAttachment={(): void => setActionPlanDisplay(true)} 
                            // disabled={theme !== ThemeOptions.ACTION_PLAN || recipient === null}
                          />
                        </Grid>
                        <Grid item style={{paddingRight: '1em'}}>
                          <SaveButton saveEmail={(): void => {saveEmail(email, subject, {id: recipient.id, name: recipient.label, email: recipient.value}, emailId)}} saveDraft={(): void => setActionPlanDisplay(true)} />
                        </Grid>
                        <Grid item>
                          <DeleteButton />
                        </Grid>
                        <AttachmentDialog
                          recipientId={recipient.id}
                          addAttachment={addAttachment}
                          setIncludeAttachments={(value: boolean): void => {
                            setIncludeAttachments(value)
                          }}
                          actionPlans={actionPlans}
                          noActionPlansMessage={noActionPlansMessage}
                          results={observations}
                          checkedResults={checkedResults}
                          addResult={addResult}
                          removeResult={removeResult}
                          noResultsMessage={noObservationsMessage}
                          open={actionPlanDisplay}
                          recipientName={recipient.label}
                          handleClose={(): void => setActionPlanDisplay(false)}
                          handleAdd={(newActionPlan: string): void => { 
                            createAddAttachment(newActionPlan);
                            setActionPlanDisplay(false);
                          }} 
                          handleDelete={(existActionPlan: string): void => {
                            removeAttachment(existActionPlan);
                            setActionPlanDisplay(false);
                          }}
                          attachmentList={attachments}
                          firebase={firebase}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

NewMessageView.propTypes = {
  updateDrafts: PropTypes.func.isRequired,
  moveDraftToSent: PropTypes.func.isRequired
}

export default NewMessageView;
