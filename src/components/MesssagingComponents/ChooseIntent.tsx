// Sidebar to help user choose what is the intent for sending the email. 
// Based on the intent, the EmailBody component fills up with rendered HTML.

import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const drawerWidth = 240;

const ChooseIntent: React.FC<{}> = () => {
return (<Drawer
        style={{width: drawerWidth, flexShrink: 0,}}
          variant="permanent"
          anchor="left"
        >
          <div style={{width: drawerWidth}} />
          <Divider />
          <List>
            {['Custom', 'Thank you', 'Feedback', 'Action Plan'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>);
}

export default ChooseIntent;