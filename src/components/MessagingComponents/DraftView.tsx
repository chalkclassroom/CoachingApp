import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Email } from './MessagingTypes'; 

interface DraftViewProps {
  drafts: Array<Email>;
  // called when a draft is chosen to be edited
  // editDraft: (msg: Message) => void;
  // firebase: any;
};

const DraftView: React.FC<DraftViewProps> = (props: DraftViewProps) => {
  return (
    <List>
      {
        props.drafts.map((draft: Email) => (
          <ListItem 
            button 
            key={draft.id} 
            // onClick={(): void => props.editDraft(draft)} 
            style={{marginBottom: "10px"}}
          >
            <ListItemText 
              primary={draft.recipientId}
              secondary={draft.subject}
            />
          </ListItem>
        ))
      }
    </List>
  );
};

export default DraftView;
