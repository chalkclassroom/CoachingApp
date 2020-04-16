import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import thankYouIcon from '../../assets/icons/chat-bubbles.svg';

const ChooseActionPlanDialog: React.FC<{open: boolean, handleClose: (value: string) => void}> = (props) => {
  const [value, setValue] = useState(null);
  const radioGroupRef = useRef<HTMLElement>(null);
  const [option, setOption] = useState('All');
  const [rightOptions, setRightOptions] = useState([]); 

  const leftOptions = [
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

  const updateRightOptions = () => {
    const newOptions = ['None', 'Atria', 'Callisto', 'Dione', 'Ganymede', 'Hangouts Call', 'Luna'];
    setRightOptions(newOptions);
  };

  const getIcon = (text: string) => {
    return thankYouIcon;  
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth='md'
      fullWidth={true}
      open={props.open}
    >
      <DialogContent>
        <div>
          <List>
            {leftOptions.map((text, _) => (
              <ListItem button key={text} onClick={() => { setOption(text); updateRightOptions(); }} style={{marginBottom: "10px"}}>
                <ListItemAvatar>
                  <img src={getIcon(text)} style={{width: "40px", height: "40px"}}/>
                </ListItemAvatar>
                <ListItemText primary={text}/>
              </ListItem>
            ))}
          </List>
        </div>
        <div>
          <RadioGroup
            ref={radioGroupRef}
            value={value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setValue((event.target as HTMLInputElement).value);
            }}
          >
            {rightOptions.map((option: string) => 
              <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
            )}
          </RadioGroup>           
        </div>
      </DialogContent>
      <DialogActions>
        <Button 
          variant="contained" 
          onClick={() => {
            console.log(value);
            console.log(value === null);
            if (value !== null) {
              props.handleClose(value);
            }
          }} 
          color="primary"
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );

};

export default ChooseActionPlanDialog;
