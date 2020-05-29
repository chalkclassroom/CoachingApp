import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Message } from './MessagingTypes'; 
import ViewEmailDialog from './ViewEmailDialog';

interface SentViewProps {
  firebase: any;
}

const SentView: React.FC<SentViewProps> = (props: SentViewProps) => {
  // state maintaining the list of sent emails
  const [sentList, setSentList] = useState([]);
  const [viewEmail, setViewEmail] = useState(null);
  
  useEffect((): void => {
    props.firebase.getSentEmailList()
      .then((res: any): void => {
        if(res !== sentList) {
          setSentList(res);
        }
      })
      .catch((err: any): void => {
        console.log(err);
      });
  });
  console.log(viewEmail);
  
	return (
    <>
      <List>
        {
          sentList.map((text: Message) => (
            <ListItem 
              button 
              key={text.id} 
              onClick={(): void => setViewEmail(text)} 
              style={{marginBottom: "10px"}}
            >
              <ListItemText 
                primary={text.to} 
                secondary={text.subject}
              />
            </ListItem>
          ))
        }
      </List>
      <ViewEmailDialog 
        open={viewEmail !== null} 
        handleClose={(): void => setViewEmail(null)} 
        email={viewEmail}
      />
    </>
  );
};

export default SentView;
