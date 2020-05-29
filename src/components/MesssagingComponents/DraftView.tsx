import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Message } from './MessagingTypes'; 

interface DraftViewProps {
  // called when a draft is chosen to be edited
  editDraft: (msg: Message) => void;
  firebase: any;
};

const DraftView: React.FC<DraftViewProps> = (props: DraftViewProps) => {
  // state to store the list of draft emails
  const [draftList, setDraftList] = useState([]);
  useEffect((): void => {
    props.firebase.getDraftEmailList()
      .then((res: any): void => {
        if(draftList !== res) {
          setDraftList(res);
        }
      })
      .catch((err: any): void => {
        console.log(err);
        console.log(draftList);
      });
  });


  return (
    <List>
      {
        draftList.map((draft: Message) => (
          <ListItem 
            button 
            key={draft.id} 
            onClick={(): void => props.editDraft(draft)} 
            style={{marginBottom: "10px"}}
          >
            <ListItemText 
              primary={draft.to} 
              secondary={draft.subject}
            />
          </ListItem>
        ))
      }
    </List>
  );
};

export default DraftView;
