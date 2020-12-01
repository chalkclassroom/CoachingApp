import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { Email } from './MessagingTypes';
import NewMessageView from './NewMessageView';
import DraftList from './DraftList';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

interface SentViewProps {
  emails: Array<Email>;
  noEmails: boolean;
  firebase: any;
};

const SentView: React.FC<SentViewProps> = (props: SentViewProps) => {
  const [selectedEmail, setSelectedEmail] = useState<Email>();
  const onClick = (email: Email): void => {
    setSelectedEmail(email);
    console.log('this is the email', email);
  }

  return (
    <div>
      {props.noEmails ? (
        <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
          You have not sent any emails.
        </Typography>
      ) : selectedEmail ? (
        <Grid container direction="column" justify="center" alignItems="stretch">
          <Grid item>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                <IconButton onClick={(): void => setSelectedEmail(undefined)} style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                  <ChevronLeftIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <NewMessageView draft={selectedEmail} firebase={props.firebase} readOnly={true} />
          </Grid>
        </Grid>
      ) : (
        <DraftList emails={props.emails} onClick={onClick} sent={true} />
      )}
    </div>
  );
};

SentView.propTypes = {
  emails: PropTypes.array.isRequired,
  noEmails: PropTypes.bool.isRequired
}

export default SentView;
