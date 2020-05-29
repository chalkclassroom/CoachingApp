import React, { useState, useContext } from 'react';
import AppBar from '../../../components/AppBar';
import FirebaseContext from '../../../components/Firebase/FirebaseContext'; 
import MessagingMenu from '../../../components/MesssagingComponents/MessagingMenu';
import NewMessageView from '../../../components/MesssagingComponents/NewMessageView';
import DraftView from '../../../components/MesssagingComponents/DraftView';
import SentView from '../../../components/MesssagingComponents/SentView';
import { MenuOptions, Message, ThemeOptions, Attachment } from '../../../components/MesssagingComponents/MessagingTypes';

// CSS for the Grid layout
const gridContainer = {
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
};

// No props to maintain API with other major views
const MessagingView: React.FC<{}> = () => {

  // State to record which option the user chose: New Message, Draft, or Sent
  const [menuOption, setMenuOption] = useState(MenuOptions.NEW_MESSAGE);
  // Using Firebase
  const firebase = useContext(FirebaseContext);
  
  // State to record the message input to NewMessage so that if a user is coming from DraftView, this can be updated
  // to be the message from Draft, else a new message
  const initialMsg: Message = {
    id: '',
    from: firebase.auth.currentUser.email,
    to: '',
    subject: '',
    theme: ThemeOptions.THANK_YOU,
    textContent: '',
    content: <></>,
    delivered: false,
    attachments: Array<Attachment>(),
  };
  const [initMessage, setInitMessage] = useState(initialMsg);

  // Update right pane of the page according to what the user chose on the left pane
  const getBody = (): JSX.Element => {
    if(menuOption === MenuOptions.NEW_MESSAGE) {
      return (<NewMessageView firebase={firebase} draft={initMessage}/>);
    } else if(menuOption === MenuOptions.DRAFTS) {
      return (<DraftView editDraft={(msg: Message): void => setInitMessage(msg)} firebase={firebase}/>);
    } else {
      return (<SentView firebase={firebase}/>);
    }
  };

  return (
    <div style={gridContainer}>
	    <div style={appbar}>
	      <AppBar firebase={firebase} />
	    </div>
      <div style={menu}>
        <MessagingMenu currentOption={menuOption} changeOption={(newOption: MenuOptions): void => { console.log(newOption); setMenuOption(newOption);}} />
      </div>
      <div style={chosenView}>
        {getBody()}
      </div>
    </div>
  );
};

export default MessagingView;
