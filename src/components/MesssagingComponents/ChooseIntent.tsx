// Sidebar to help user choose what is the intent for sending the email. 
// Based on the intent, the EmailBody component fills up with rendered HTML.

import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import actionPlanIcon from '../../assets/icons/talk.svg';
import feedbackIcon from '../../assets/icons/check-mark.svg';
import newMessageIcon from '../../assets/icons/files-and-folders.svg';
import thankYouIcon from '../../assets/icons/chat-bubbles.svg';
const drawerWidth = `15em`;

const getIcon = (text: string) => {
	if(text === "Thank You") {
		return thankYouIcon;
	} else if (text === "Feedback") {
		return feedbackIcon;
	} else if (text === "Action Plan") {
		return actionPlanIcon;
	} else if (text === "New Message") {
		return newMessageIcon;
	} else {
		return null;
	}
};

const ChooseIntent: React.FC<{changeIntent: any, chosenIntent: string}> = (props: {changeIntent: any, chosenIntent: string}) => {
	return (<List style={{width: drawerWidth, height: '80vh'}}>
            {['Thank You', 'Feedback', 'Action Plan', 'New Message'].map((text, index) => (
		    <ListItem button key={text} onClick={() => props.changeIntent(text)} style={{marginBottom: "10px"}}>
		<ListItemAvatar>
			<img src={getIcon(text)} style={{width: "40px", height: "40px"}}/>
		</ListItemAvatar>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>);
};

export default ChooseIntent;
