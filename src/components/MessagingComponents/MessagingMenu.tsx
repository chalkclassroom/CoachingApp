import * as React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Grid } from '@material-ui/core';
import { MenuOptions, MenuOptionsKey } from './MessagingTypes';
import AddIcon from '@material-ui/icons/Add';
import DraftsIcon from '@material-ui/icons/Drafts';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

interface MessagingMenuProps {
  currentOption: MenuOptionsKey;
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
    <List style={{height: '100%', backgroundColor: '#D8ECFF', margin: 0, padding: 0, paddingTop: '1em'}}>
      {
        Object.keys(MenuOptions).map((option, index) => (
          <ListItem 
            button
            key={index}
            onClick={(): void => props.changeOption(option as MenuOptionsKey)}
            alignItems='center'
            style={{
              marginBottom: '1em',
              width: (option as MenuOptionsKey) === props.currentOption ? '100%' : '90%',
              paddingTop: '0.5em',
              paddingBottom: '0.5em',
              paddingLeft: '0.5em',
              paddingRight: '0.5em',
              backgroundColor: (option as MenuOptionsKey) === props.currentOption ? 'white' : undefined,
              marginRight: (option as MenuOptionsKey) === props.currentOption ? undefined : '0.5em',
              borderRadius: (option as MenuOptionsKey) === props.currentOption ? undefined : '1.5em' ,
              boxShadow: (option as MenuOptionsKey) === props.currentOption ? '-10px 0px 4px rgba(0, 0, 0, 0.25)' : '0px 4px 4px rgba(0, 0, 0, 0.25)'
            }}
          >
            <Grid container direction='row' style={{height: '100%', width: '100%'}}>
              <ListItemAvatar>
                <Grid container direction='row' justify='center' alignItems='center' style={{height: '100%', width: '100%'}}>
                  {getIcon(MenuOptions[option as MenuOptionsKey])}
                </Grid>
              </ListItemAvatar>
              <ListItemText primary={MenuOptions[option as MenuOptionsKey]} />
            </Grid>
          </ListItem>
        ))
      }
    </List>
  );
};

export default MessagingMenu;

