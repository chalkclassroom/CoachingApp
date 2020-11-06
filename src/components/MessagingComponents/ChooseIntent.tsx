// Sidebar to help user choose what is the intent for sending the email. 
// Based on the intent, the EmailBody component fills up with rendered HTML.
import * as React from 'react';
import * as PropTypes from 'prop-types';
import List from '@material-ui/core/List';
// import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import actionPlanIcon from '../../assets/icons/talk.svg';
import feedbackIcon from '../../assets/icons/check-mark.svg';
import newMessageIcon from '../../assets/icons/files-and-folders.svg';
import thankYouIcon from '../../assets/icons/chat-bubbles.svg';
const drawerWidth = `15em`;

/* const options = [
  { value: 'baibhav.vatsa@vanderbilt.edu', label: 'Baibhav Vatsa' },
  { value: 'deanna.n.meador@vanderbilt.edu', label: 'Deanna Meador' },
  { value: 'caroline.h.christopher@vanderbilt.edu', label: 'Caroline Christopher' },
]; */

interface ChooseIntentProps {
  changeIntent(text: string): void
}


const getIcon = (text: string): string | undefined => {
	if(text === "Thank You") {
		return thankYouIcon;
	} else if (text === "Feedback") {
		return feedbackIcon;
	} else if (text === "Action Plan") {
		return actionPlanIcon;
	} else if (text === "New Message") {
		return newMessageIcon;
	} else {
		return undefined;
	}
};

const ChooseIntent: React.FC<ChooseIntentProps> = (props: ChooseIntentProps) => {
	return (
    <List style={{width: drawerWidth, height: '80vh'}}>
      {['Thank You', 'Feedback', 'Action Plan', 'New Message'].map((text, index) => (
		    <ListItem
          key={index}
          button
          onClick={(): void => props.changeIntent(text)}
          style={{marginBottom: "10px"}}
        >
          <ListItemAvatar>
            <img src={getIcon(text)} style={{width: "40px", height: "40px"}}/>
          </ListItemAvatar>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );
};

ChooseIntent.propTypes = {
  changeIntent: PropTypes.func.isRequired
}

export default ChooseIntent;
