import React from 'react';
import Button from '@material-ui/core/Button';
import AttachFileIcon from '@material-ui/icons/AttachFile';

const AttachButton: React.FC<{ acceptAttachment: () => void}> = (props) => {
    return(
        <Button 
          variant="extended" 
          color="primary"
          aria-label="attach"
          component="label"
          onClick={() => props.acceptAttachment()}
        >
          <AttachFileIcon style={{marginRight: "0.2em"}}/>
          Attach
        </Button>
    );
}

export default AttachButton;
