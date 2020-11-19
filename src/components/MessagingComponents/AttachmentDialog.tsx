import * as React from 'react';
import { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ResultsIcon from "@material-ui/icons/PieChart";
import ActionPlansIcon from "@material-ui/icons/CastForEducation";
import {
  Typography,
  IconButton,
  Grid,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import ActionPlanList from '../ActionPlanList';

interface AttachmentDialogProps {
  recipientId: string;
  open: boolean;
  handleAdd: (value: string) => void;
  handleDelete: (value: string) => void;
  actionPlans: Array<{id: string, date: {seconds: number, nanoseconds: number}, practice: string, achieveBy: firebase.firestore.Timestamp}>;
  attachmentList: Array<{id: string, date: {seconds: number, nanoseconds: number}, practice: string, achieveBy: firebase.firestore.Timestamp}>;
  handleClose: () => void;
  recipientName: string;
}

const AttachmentDialog: React.FC<AttachmentDialogProps> = (props: AttachmentDialogProps) => {
  const [view, setView] = useState('options');

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth='md'
      fullWidth={true}
      open={props.open}
    >
      <div style={{minHeight: '90vh', maxHeight: '90vh'}}>
        <DialogContent>
          <Grid container direction="column" justify="center" alignItems="stretch">
            <Grid item>
              <Grid container direction="row" justify={view === 'options' ? "flex-end" : "space-between"} alignItems="center">
                {view !== 'options' ? (
                  <Grid item xs={3}>
                    <IconButton onClick={(): void => setView('options')} style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                      <ChevronLeftIcon />
                    </IconButton>
                  </Grid>
                ) : (null)}
                <Grid item>
                  <IconButton onClick={props.handleClose} style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" justify="center" alignItems="center">
                <div style={{width: '100%'}}>
                  {view === 'options' ? (
                    <Grid container direction="row" justify="space-around" alignItems="center" style={{paddingTop: '3em'}}>
                      <Grid item xs={5}>
                        <Card onClick={(): void => { setView('actionPlans'); }}>
                          <CardContent>
                            <Grid
                              container
                              alignItems="center"
                              direction="column"
                              justify="flex-start"
                            >
                              <Grid item>
                                <ActionPlansIcon style={{ fill: "#e55529", width: '12vw', height: '12vh' }} />
                              </Grid>
                              <Grid item>
                                <Typography variant="h5" component="h2" style={{fontFamily: 'Arimo'}}>
                                  Action Plans
                                </Typography>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={5}>
                        <Card onClick={(): void => { setView('results'); }}>
                          <CardContent>
                            <Grid
                              container
                              alignItems="center"
                              direction="column"
                              justify="flex-start"
                            >
                              <Grid item>
                                <ResultsIcon style={{ fill: "#4fd9b3", width: '12vw', height: '12vh' }} />
                              </Grid>
                              <Grid item>
                                <Typography variant="h5" component="h2" style={{fontFamily: 'Arimo'}}>
                                  Results
                                </Typography>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  ) : view === 'actionPlans' ? (
                    <Grid container direction="column" justify="flex-start" alignItems="center">
                      <Grid item>
                        <Typography variant="h4" style={{fontFamily: 'Arimo'}}>
                          {props.recipientName}&apos;s Action Plans
                        </Typography>
                      </Grid>
                      <Grid item style={{paddingTop: '1em'}}>
                        <ActionPlanList
                          actionPlans={props.actionPlans}
                          // need to add onClick function
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    <Typography>
                      Results options will be listed here.
                    </Typography>
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {view !== 'options' ? (
            <Button
              variant='contained'
              color='primary'
            >
              Attach
            </Button>
          ) : (null)}
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default AttachmentDialog;