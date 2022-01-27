import * as React from 'react';
import { useState } from 'react';
import * as PropTypes from 'prop-types';
import { Email, Attachment } from './MessagingTypes';
import NewMessageView from './NewMessageView';
import EmailList from './EmailList';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

interface SentViewProps {
  emails: Array<Email>;
  noEmails: boolean;
  setMenuOption(value: React.SetStateAction<"SENT" | "DRAFTS" | "NEW_MESSAGE">): void;
  firebase: any;
};

const SentView: React.FC<SentViewProps> = (props: SentViewProps) => {
  const [selectedEmail, setSelectedEmail] = useState<Email>();
  const [selectedAttachments, setSelectedAttachments] = useState<Array<Attachment>>();
  const {emails, noEmails, setMenuOption} = props;
  const firebase = props.firebase;

  const onClick = (email: Email): void => {
    setSelectedEmail(email);
    firebase.getAttachments(email.id).then((attachmentArray: Array<Attachment>) => {
      setSelectedAttachments(attachmentArray)
    })
  }

  return (
    <div>
      {noEmails ? (
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
            <NewMessageView draft={selectedEmail} attachments={selectedAttachments} setMenuOption={setMenuOption} firebase={firebase} readOnly={true} />
          </Grid>
        </Grid>
      ) : (
        <EmailList emails={emails} onClick={onClick} sent={true} />
      )}
    </div>
  );
};

SentView.propTypes = {
  emails: PropTypes.array.isRequired,
  noEmails: PropTypes.bool.isRequired,
  setMenuOption: PropTypes.func.isRequired
}

export default SentView;
