import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { Email } from './MessagingTypes';
import NewMessageView from './NewMessageView';
import DraftList from './DraftList';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

interface DraftViewProps {
  drafts: Array<Email>;
  noDrafts: boolean;
  updateDrafts(email: Email): void;
  firebase: any;
};

const DraftView: React.FC<DraftViewProps> = (props: DraftViewProps) => {
  const [selectedDraft, setSelectedDraft] = useState<Email>();
  const onClick = (draft: Email): void => {
    setSelectedDraft(draft);
    console.log('this is the draft', draft);
  }

  return (
    <div>
      {props.noDrafts ? (
        <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
          You do not have any drafts.
        </Typography>
      ) : selectedDraft ? (
        <Grid container direction="column" justify="center" alignItems="stretch">
          <Grid item>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                <IconButton onClick={(): void => setSelectedDraft(undefined)} style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                  <ChevronLeftIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <NewMessageView draft={selectedDraft} updateDrafts={props.updateDrafts} firebase={props.firebase} />
          </Grid>
        </Grid>
      ) : (
        <DraftList drafts={props.drafts} onClick={onClick} />
      )}
    </div>
  );
};

DraftView.propTypes = {
  drafts: PropTypes.array.isRequired,
  noDrafts: PropTypes.bool.isRequired,
  updateDrafts: PropTypes.func.isRequired
}

export default DraftView;
