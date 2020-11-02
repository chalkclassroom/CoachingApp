import * as React from 'react';
import Button from '@material-ui/core/Button';
import AttachFileIcon from '@material-ui/icons/AttachFile';

interface AttachButtonProps { 
  acceptAttachment: () => void;
  disabled: boolean;
}

const AttachButton: React.FC<AttachButtonProps> = (props: AttachButtonProps) => {
    return(
        <Button
          color='primary'
          aria-label='attach'
          component='label'
          onClick={props.acceptAttachment}
          disabled={props.disabled}
        >
          <AttachFileIcon style={{marginRight: "0.2em"}}/>
          Attach
        </Button>
    );
}

export default AttachButton;
