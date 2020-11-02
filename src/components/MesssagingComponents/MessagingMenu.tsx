import * as React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import { MenuOptions, MenuOptionsKey } from './MessagingTypes';
import AddIcon from '@material-ui/icons/Add';
import DraftsIcon from '@material-ui/icons/Drafts';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

interface MessagingMenuProps {
  currentOption: MenuOptions;
  changeOption: (newOption: MenuOptionsKey) => void;
};

const MessagingMenu: React.FC<MessagingMenuProps> = (props: MessagingMenuProps) => {

	const getIcon = (option: MenuOptions): React.ReactElement => {
	  if(option === MenuOptions.NEW_MESSAGE) {
      return <AddIcon />;
    } else if (option === MenuOptions.DRAFTS) {
      return <DraftsIcon />;
    } else {
      return <MailOutlineIcon />;
    }
  };

  return (
    <List style={{height: '100%', backgroundColor: '#D8ECFF'}}>
      {
        Object.keys(MenuOptions).map((option, index) => (
          <ListItem 
            button
            key={index}
            onClick={(): void => props.changeOption(option as MenuOptionsKey)}
            style={{marginBottom: '10px'}}
          >
            <ListItemAvatar>
              {getIcon(MenuOptions[option as MenuOptionsKey])}
            </ListItemAvatar>
            <ListItemText primary={MenuOptions[option as MenuOptionsKey]} />
          </ListItem>
        ))
      }
    </List>
  );
};

export default MessagingMenu;

