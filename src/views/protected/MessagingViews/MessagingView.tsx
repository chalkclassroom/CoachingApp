import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import AppBar from '../../../components/AppBar';
import Grid from '@material-ui/core/Grid';
import FirebaseContext from '../../../components/Firebase/FirebaseContext'; 
import MessagingMenu from '../../../components/MessagingComponents/MessagingMenu';
import NewMessageView from '../../../components/MessagingComponents/NewMessageView';
import DraftView from '../../../components/MessagingComponents/DraftView';
import SentView from '../../../components/MessagingComponents/SentView';
import { MenuOptions, MenuOptionsKey, Message, ThemeOptions, Attachment, Email } from '../../../components/MessagingComponents/MessagingTypes';
import * as Types from '../../../constants/Types';

// CSS for the Grid layout
/* const gridContainer = {
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	gridTemplateRows: 'auto 15% 1fr',
	gridGap: '0.2em',
};

const appbar = {
	gridRow: '1',		
	gridColumn: '1 / span 4',
};

const menu = {
	gridRow: '2 / span 3',
	gridColumn: '1',
};

const chosenView = {
	gridRow: '3 / span 4',
	gridColumn: '2 / span 4',
}; */

// No props to maintain API with other major views
const MessagingView: React.FC<{}> = () => {

  // State to record which option the user chose: New Message, Draft, or Sent
  const [menuOption, setMenuOption] = useState<MenuOptionsKey>('NEW_MESSAGE');
  const [drafts, setDrafts] = useState<Array<Email>>([]);
  const [noDrafts, setNoDrafts] = useState(false);
  // Using Firebase
  const firebase = useContext(FirebaseContext);

  const [recipient, setRecipient] = useState({
    value: '',
    id: '',
    label: ''
  });
  const [email, setEmail] = useState('');
  const [emailId, setEmailId] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    if (drafts.length === 0 && !noDrafts) {
      firebase.getAllDrafts().then((result: Array<Email>) => {
        if (result.length === 0) {
          setNoDrafts(true)
        } else {
          setDrafts(result)
        }
      })
    }
  })
  
  // State to record the message input to NewMessage so that if a user is coming from DraftView, this can be updated
  // to be the message from Draft, else a new message
  const initialMsg: Message = {
    id: '',
    from: firebase.auth.currentUser.email,
    to: '',
    subject: '',
    theme: ThemeOptions.CUSTOM,
    textContent: '',
    content: '',
    delivered: false,
    attachments: Array<Attachment>(),
  };
  const [initMessage, setInitMessage] = useState(initialMsg);

  // Update right pane of the page according to what the user chose on the left pane
  const getBody = (): JSX.Element => {
    if(MenuOptions[menuOption] === MenuOptions.NEW_MESSAGE) {
      return (<NewMessageView firebase={firebase} />);
    } else if(MenuOptions[menuOption] === MenuOptions.DRAFTS) {
      return (<DraftView drafts={drafts} noDrafts={noDrafts} firebase={firebase} />);
    } else {
      return (<SentView firebase={firebase}/>);
    }
  };

  return (
    <Grid container direction="column" style={{height: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'auto'}}>
      <Grid item style={{width: '100%'}}>
        <FirebaseContext.Consumer>
          {(firebase: Types.FirebaseAppBar): React.ReactNode => (
            <AppBar firebase={firebase} />
          )}
        </FirebaseContext.Consumer>
      </Grid>
      <Grid item style={{flexGrow: 1}}>
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
