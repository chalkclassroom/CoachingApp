import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import AppBar from '../../../components/AppBar';
import Grid from '@material-ui/core/Grid';
import FirebaseContext from '../../../components/Firebase/FirebaseContext'; 
import MessagingMenu from '../../../components/MessagingComponents/MessagingMenu';
import NewMessageView from '../../../components/MessagingComponents/NewMessageView';
import DraftView from '../../../components/MessagingComponents/DraftView';
import SentView from '../../../components/MessagingComponents/SentView';
import { MenuOptions, MenuOptionsKey, Email } from '../../../components/MessagingComponents/MessagingTypes';
import * as Types from '../../../constants/Types';
import Firebase from '../../../components/Firebase'

// No props to maintain API with other major views
const MessagingView: React.FC<{}> = () => {

  // State to record which option the user chose: New Message, Draft, or Sent
  const [menuOption, setMenuOption] = useState<MenuOptionsKey>('SENT');
  const [drafts, setDrafts] = useState<Array<Email>>([]);
  const [noDrafts, setNoDrafts] = useState(false);
  const [sentEmails, setSentEmails] = useState<Array<Email>>([]);
  const [noSentEmails, setNoSentEmails] = useState(false);
  // Using Firebase
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    if (drafts.length === 0 && !noDrafts) {
      firebase.getAllEmails().then((result: Array<Email>) => {
        const draftsList: Array<Email> = [];
        const sentEmailsList: Array<Email> = [];
        if (result.length === 0) {
          setNoDrafts(true);
          setNoSentEmails(true);
        } else {
          result.forEach((email: Email) => {
            if (email.type === 'draft') {
              draftsList.push(email)
            } else {
              sentEmailsList.push(email)
            }
          })
          setDrafts(draftsList);
          setSentEmails(sentEmailsList);
        }
      })
    }
  })

  const updateDrafts = (email: Email): void => {
    const updatedDraftIndex = drafts.map(function(e) { return e.id; }).indexOf(email.id);
    const newDraftsArray = drafts;
    if (updatedDraftIndex === -1) {
      const initialDrafts = drafts;
      initialDrafts.push({
        id: email.id,
        emailContent: email.emailContent,
        subject: email.subject,
        recipientId: email.recipientId,
        recipientFirstName: email.recipientFirstName,
        recipientName: email.recipientName,
        recipientEmail: email.recipientEmail,
        dateCreated: email.dateCreated,
        dateModified: email.dateModified,
        type: email.type,
        user: email.user
      });
      setDrafts(initialDrafts);
    } else {
      const initialDraft = drafts[updatedDraftIndex];
      initialDraft.emailContent = email.emailContent;
      initialDraft.subject = email.subject;
      initialDraft.recipientId = email.recipientId;
      initialDraft.recipientFirstName = email.recipientFirstName;
      initialDraft.recipientName = email.recipientName;
      initialDraft.recipientEmail = email.recipientEmail;
      newDraftsArray[updatedDraftIndex] = initialDraft;
      setDrafts(newDraftsArray);
    }
  }

  const moveDraftToSent = (email: Email): void => {
    const draftIndex = drafts.map(function(e) { return e.id; }).indexOf(email.id);
    const sentEmail = drafts[draftIndex];
    const allSentEmails = [...sentEmails];
    setDrafts(drafts.filter(item => item.id !== sentEmail.id));
    allSentEmails.push(email);
    setSentEmails(allSentEmails);
  }

  const removeFromDrafts = (emailId: string): void => {
    setDrafts(drafts.filter(item => item.id !== emailId));
  }

  // Update right pane of the page according to what the user chose on the left pane
  const getBody = (): JSX.Element => {
    if(MenuOptions[menuOption] === MenuOptions.NEW_MESSAGE) {
      return (<NewMessageView updateDrafts={updateDrafts} moveDraftToSent={moveDraftToSent} setMenuOption={setMenuOption} removeFromDrafts={removeFromDrafts} firebase={firebase} />);
    } else if(MenuOptions[menuOption] === MenuOptions.DRAFTS) {
      return (<DraftView drafts={drafts} noDrafts={noDrafts} updateDrafts={updateDrafts} moveDraftToSent={moveDraftToSent} setMenuOption={setMenuOption} removeFromDrafts={removeFromDrafts} firebase={firebase} />);
    } else {
      return (<SentView emails={sentEmails} noEmails={noSentEmails} setMenuOption={setMenuOption} firebase={firebase}/>);
    }
  };

  return (
    <Grid container direction="column" style={{height: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'auto'}}>
      <Grid item style={{width: '100%'}}>
        <FirebaseContext.Consumer>
          {(firebase: Firebase): React.ReactNode => (
            <AppBar firebase={firebase} />
          )}
        </FirebaseContext.Consumer>
      </Grid>
      <Grid item style={{flexGrow: 1, height: '90vh'}}>
        <Grid container direction="row" justify="center" alignItems="flex-start" style={{height: '100%'}}>
          <Grid item xs={3} style={{paddingRight: '1.5em', height: '100%'}}>
            <MessagingMenu
              currentOption={menuOption}
              changeOption={(newOption: MenuOptionsKey): void => { setMenuOption(newOption);}}
            />
          </Grid>
          <Grid item xs={9} style={{paddingRight: '1.5em', height: '100%'}}>
            <Grid container direction="column" justify="flex-start" alignItems="center" style={{width: '100%', height: '100%', paddingTop: '1.5em', paddingBottom: '1.5em'}}>
              <Grid item style={{width: '100%'}}>
                {getBody()}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MessagingView;
