import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import thankYouIcon from '../../assets/icons/chat-bubbles.svg';
import { Attachment, MagicEight } from './MessagingTypes';

interface ChooseActionPlanDialogProps {
  open: boolean;
  // called when the user adds an action plan via the dialog
  handleAdd: (value: string) => void;
  // called when the user removes an action plan via the dialog
  handleDelete: (value: string) => void;
  firebase: any;
  // list of current attachments to the email
  attachmentList: Attachment[];
}

const ChooseActionPlanDialog: React.FC<ChooseActionPlanDialogProps> = (props: ChooseActionPlanDialogProps) => {
  // what the left pane value currently is
  const [value, setValue] = useState(null);
  const radioGroupRef = useRef<HTMLElement>(null);
  // currenltly chosen action plan from the list
  const [option, setOption] = useState('All');
  // options available on the right pane
  const [rightOptions, setRightOptions] = useState([]); 

  // list of options available for the user to choose from
  // "Attached" lists all the current attachments for the user to remove
  const leftOptions = [
    'Attached',
    'All',
    'Transition Time',
    'Classroom Climate',
    'Math Instruction',
    'Student Engagement',
    'Level of Instruction',
    'Listening to Children',
    'Associative and Cooperative Interactions',
    'Sequential Activities'
  ];

  // update the right pane options based on the left pane option user chose
  const updateRightOptions = (): void => {
    let newOptions: Attachment[] = [];
    if (option === 'Attached') {
      newOptions = props.attachmentList;
      setRightOptions(newOptions);
    } else {
      firebase.getActionPlans().then((res): void => {
        res.forEach((r) => {
          // add to the right pane if the the MagicEight matches with the chosen one
          if (r.tool === option) {
            newOptions.push({ 
              id: r.id,
              magicEight: r.tool,
              type: 'Action Plan',
              date: r.date,
            });
          }
        });
        setRightOptions(newOptions);
      })
    }
  };

  return (
    <Dialog
      // disabled so user cannot exit dialog without choosing an option or clicking 
      on the dialog buttons
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth='md'
      fullWidth={true}
      open={props.open}
    >
      <DialogContent>
        <div>
          <List>
            {leftOptions.map((text) => (
              <ListItem 
                  button 
                  key={text} 
                  onClick={(): void => { setOption(text); updateRightOptions(); }} 
                  style={{marginBottom: '10px'}}
              >
                <ListItemText primary={text}/>
              </ListItem>
            ))}
          </List>
        </div>
        <div>
        <RadioGroup
          ref={radioGroupRef}
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setValue((event.target as HTMLInputElement).value);
          }}
        >
          {rightOptions.map((opt: Attachment) => 
            <FormControlLabel 
              value={opt.id} 
              key={opt.id} 
              control={<Radio />} 
              // label is MagicEight + date of the action plan
              label={opt.type + ' ' + opt.date.toString()} 
            />
          )}
        </RadioGroup>        
        </div>
      </DialogContent>
      <DialogActions>
        <Button 
          variant='contained' 
          onClick={(): void => {
            console.log(value);
            if (value !== null) {
              // if the user is seeing the list of current attachments, show the
              // option to remove an attachment. else, the option to add the selected one
              if (option === 'Attached') {
                props.handleDelete(value);
              } else {
                props.handleAdd(value);
              }
            }
          }} 
          color='primary'
        >
          {(option === 'Attached') ? 
            'Delete'
            :
            'Attach'
          }
        </Button>
      </DialogActions>
    </Dialog>
  );

};

export default ChooseActionPlanDialog;
