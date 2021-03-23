import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { Email, Attachment } from './MessagingTypes';
import NewMessageView from './NewMessageView';
import EmailList from './EmailList';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

interface DraftViewProps {
  drafts: Array<Email>;
  noDrafts: boolean;
  updateDrafts(email: Email): void;
  moveDraftToSent(email: Email): void;
  setMenuOption(value: React.SetStateAction<"SENT" | "DRAFTS" | "NEW_MESSAGE">): void;
  removeFromDrafts(emailId: string): void;
  firebase: any;
};

const DraftView: React.FC<DraftViewProps> = (props: DraftViewProps) => {
  const [selectedDraft, setSelectedDraft] = useState<Email>();
  const [selectedAttachments, setSelectedAttachments] = useState<Array<Attachment>>();
  const firebase = props.firebase;

  const onClick = (draft: Email): void => {
    setSelectedDraft(draft);
    firebase.getAttachments(draft.id).then((attachmentArray: Array<Attachment>) => {
      setSelectedAttachments(attachmentArray)
    })
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
            <NewMessageView draft={selectedDraft} attachments={selectedAttachments} updateDrafts={props.updateDrafts} setMenuOption={props.setMenuOption} removeFromDrafts={props.removeFromDrafts} moveDraftToSent={props.moveDraftToSent} firebase={props.firebase} />
          </Grid>
        </Grid>
      ) : (
        <EmailList emails={props.drafts} onClick={onClick} />
      )}
    </div>
  );
};

DraftView.propTypes = {
  drafts: PropTypes.array.isRequired,
  noDrafts: PropTypes.bool.isRequired,
  updateDrafts: PropTypes.func.isRequired,
  moveDraftToSent: PropTypes.func.isRequired,
  setMenuOption: PropTypes.func.isRequired,
  removeFromDrafts: PropTypes.func.isRequired
}

export default DraftView;
