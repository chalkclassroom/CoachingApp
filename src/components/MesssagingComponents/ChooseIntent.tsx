// Sidebar to help user choose what is the intent for sending the email. 
// Based on the intent, the EmailBody component fills up with rendered HTML.

import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

/*
 style={{width: drawerWidth, flexShrink: 0,}}
          variant="permanent"
          anchor="left"
          <Divider />
        
*/
/*
const useStyles = makeStyles({
	paper: {
		top: 'auto',
	}
});
const st = useStyles;

<Drawer
BackdropProps={{invisible: true}}
 style={{width: drawerWidth, top: 'auto', paper: paperStyle}}
classes={{paper: st.paper}}
          variant="permanent"
              >
                </Drawer>
const useStyles = makeStyles(theme => ({
  root: {
    width: drawerWidth,
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
*/

const drawerWidth = `12em`;

const ChooseIntent: React.FC<{}> = () => {
	
	return (<List style={{width: drawerWidth, height: '80vh'}}>
            {['Custom', 'Thank you', 'Feedback', 'Action Plan'].map((text, index) => (
              <ListItem button key={text}>
		<ListItemAvatar>
			<Avatar>
				<AccountCircleIcon />
			</Avatar>
		</ListItemAvatar>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>);
}

export default ChooseIntent;
