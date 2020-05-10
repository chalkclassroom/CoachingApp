import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import { MenuOptions } from './MessagingTypes';
import AddIcon from '@material-ui/icons/Add';
import DraftsIcon from '@material-ui/icons/Drafts';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

interface MessagingMenuProps {
  currentOption: MenuOptions;
  changeOption: (newOption: MenuOptions) => void;
};

const MessagingMenu: React.FC<MessagingMenuProps> = (props: MessagingMenuProps) => {

	const getIcon = (option: MenuOptions) => {
	  if(option === MenuOptions.NEW_MESSAGE) {
      return <AddIcon />;
    } else if (option === MenuOptions.DRAFTS) {
      return <DraftsIcon />;
    } else {
      return <MailOutlineIcon />;
    }
  };

  return (
    <List style={{height: '100vh', backgroundColor: '#D8ECFF'}}>
      {
        Object.keys(MenuOptions).map((option, _) => (
          <ListItem 
            button 
            key={option} 
            onClick={() => props.changeOption(option)} 
            style={{marginBottom: '10px'}}
          >
            <ListItemAvatar>
              {getIcon(MenuOptions[option])}
            </ListItemAvatar>
            <ListItemText primary={MenuOptions[option]} />
          </ListItem>
        ))
      }
    </List>
  );
};

export default MessagingMenu;

