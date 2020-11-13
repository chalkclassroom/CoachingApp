import * as React from 'react';
import { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Table, TableRow, TableCell, Typography, Grid } from '@material-ui/core';
import * as moment from 'moment';
import ActionPlanList from '../ActionPlanList';
import TransitionTimeIconImage from '../../assets/images/TransitionTimeIconImage.svg';
import ClassroomClimateIconImage from '../../assets/images/ClassroomClimateIconImage.svg';
import MathIconImage from '../../assets/images/MathIconImage.svg';
import EngagementIconImage from '../../assets/images/EngagementIconImage.svg';
import InstructionIconImage from '../../assets/images/InstructionIconImage.svg';
import ListeningIconImage from '../../assets/images/ListeningIconImage.svg';
import SequentialIconImage from '../../assets/images/SequentialIconImage.svg';
import AssocCoopIconImage from '../../assets/images/AssocCoopIconImage.svg';
import FirebaseContext from '../Firebase/FirebaseContext';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import thankYouIcon from '../../assets/icons/chat-bubbles.svg';
import { Attachment, MagicEight } from './MessagingTypes';

interface ChooseActionPlanDialogProps {
  recipientId: string;
  open: boolean;
  // called when the user adds an action plan via the dialog
  handleAdd: (value: string) => void;
  // called when the user removes an action plan via the dialog
  handleDelete: (value: string) => void;
  /* firebase: {
    getCoachActionPlans(): Promise<Array<{
      id: string,
      teacherId: string,
      date: {seconds: number, nanoseconds: number},
      practice: string,
      teacherFirstName: string,
      teacherLastName: string,
      achieveBy: firebase.firestore.Timestamp
    }> | void>
  }; */
  // list of current attachments to the email
  attachmentList: Array<{id: string, date: {seconds: number, nanoseconds: number}, practice: string, achieveBy: firebase.firestore.Timestamp}>;
}

const ChooseActionPlanDialog: React.FC<ChooseActionPlanDialogProps> = (props: ChooseActionPlanDialogProps) => {
  // what the left pane value currently is
  const [value, setValue] = useState<string>('');
  // const radioGroupRef = useRef<HTMLElement>(null);
  // currenltly chosen action plan from the list
  const [option, setOption] = useState('All');
  // options available on the right pane
  const [rightOptions, setRightOptions] = useState<Array<Attachment>>([]);
  const firebase = useContext(FirebaseContext);
  const [selected, setSelected] = useState<string>('');
  // const isSelected = (id: string): boolean => this.state.selected.includes(id);

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
      if (firebase !== null) {
        firebase.getCoachActionPlans().then((res: Array<{
          id: string,
          teacherId: string,
          date: {seconds: number, nanoseconds: number},
          practice: string,
          teacherFirstName: string,
          teacherLastName: string,
          achieveBy: firebase.firestore.Timestamp
        }>): void => {
          res.forEach((r) => {
            // add to the right pane if the the MagicEight matches with the chosen one
            if (r.practice === option) {
              const newDate = new Date(0);
              newDate.setUTCSeconds(r.date.seconds);
              newOptions.push({ 
                id: r.id,
                magicEight: r.practice as MagicEight,
                type: 'Action Plan',
                date: newDate,
              });
            }
          });
          setRightOptions(newOptions);
        })
      }
    }
  };

  return (
    <Dialog
      // disabled so user cannot exit dialog without choosing an option or clicking 
      // on the dialog buttons
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth='md'
      fullWidth={true}
      open={props.open}
    >
      <DialogContent>
        <div>
          {/* <List>
            {props.attachmentList.map((value, index) => (
              <ListItem 
                  button 
                  key={index} 
                  onClick={(): void => { setOption(value.practice); updateRightOptions(); }} 
                  style={{marginBottom: '10px'}}
              >
                <ListItemText primary={value.practice}/>
              </ListItem>
            ))}
          </List> */}
          {/* <ActionPlanList teacher={props.recipientId} /> */}
          <ActionPlanList teacher={props.recipientId} />
          <Table>
            {props.attachmentList.map((value, index) => {
              const achieveBy = (!value.achieveBy || typeof value.achieveBy === 'string')
              ? new Date()
              : value.achieveBy.toDate();
              
            // const isItemSelected = isSelected(value.id);
            const newDate = new Date(0);
            newDate.setUTCSeconds(value.date.seconds);
            const dateModified = newDate;
              return (
                <TableRow
                key={index}
                selected={selected===value.id}
                onClick={(): void => {setSelected(value.id)}}
              >
                <TableCell style={{padding: '0.5em'}}>
                  <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                    {moment(dateModified).format('MM/DD/YYYY')}
                  </Typography>
                </TableCell>
                {/* <TableCell style={{padding: '0.5em'}}>
                  <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                    {row.name}
                  </Typography>
                </TableCell> */} 
                <TableCell style={{padding: '0.5em'}}>
                  <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                    <Grid container direction="row" justify="flex-start" alignItems="center">
                      <Grid item xs={9}>
                        <Typography variant="h6" style={{fontFamily: 'Arimo', paddingRight: '0.2em'}}>
                          {value.practice==='AC' ? 'Associative and Cooperative' : value.practice}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        {value.practice === 'Transition Time' ? (
                          <img
                            src={TransitionTimeIconImage}
                            alt="Magic 8 Icon"
                          />
                        ) : value.practice === 'Classroom Climate' ? (
                          <img
                            src={ClassroomClimateIconImage}
                            alt="Magic 8 Icon"
                          />
                        ) : value.practice === 'Math Instruction' ? (
                          <img
                            src={MathIconImage}
                            alt="Magic 8 Icon"
                          />
                        ) : value.practice === 'Level of Engagement' ? (
                          <img
                            src={EngagementIconImage}
                            alt="Magic 8 Icon"
                          />
                        ) : value.practice === 'Level of Instruction' ? (
                          <img
                            src={InstructionIconImage}
                            alt="Magic 8 Icon"
                          />
                        ) : value.practice === 'Listening to Children' ? (
                          <img
                            src={ListeningIconImage}
                            alt="Magic 8 Icon"
                          />
                        ) : value.practice === 'Sequential Activities' ? (
                          <img
                            src={SequentialIconImage}
                            alt="Magic 8 Icon"
                          />
                        ) : value.practice === 'AC' ? (
                          <img
                            src={AssocCoopIconImage}
                            alt="Magic 8 Icon"
                          />
                        ) : <div />}
                      </Grid>
                    </Grid>
                  </Typography>
                </TableCell>
                <TableCell style={{padding: '0.5em'}}>
                  <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                    {moment(achieveBy).format('MM/DD/YYYY')}
                  </Typography>
                </TableCell>
              </TableRow>
            );
            })}
          </Table>
        </div>
        <div>
        <RadioGroup
          // ref={radioGroupRef}
          value={value}
          onChange={(event: React.ChangeEvent<{}>): void => {
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
