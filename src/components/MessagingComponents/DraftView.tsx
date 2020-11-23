import React from 'react';
import { Email } from './MessagingTypes';
import DraftList from './DraftList';
import Typography from '@material-ui/core/Typography';

interface DraftViewProps {
  drafts: Array<Email>;
  noDrafts: boolean;
};

const DraftView: React.FC<DraftViewProps> = (props: DraftViewProps) => {
  return (
    <div>
      {props.noDrafts ? (
        <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
          You do not have any drafts.
        </Typography>
      ) : (
        <DraftList drafts={props.drafts} />
      )}
    </div>
  );
};

export default DraftView;
