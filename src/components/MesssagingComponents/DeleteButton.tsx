import React from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

const DeleteButton: React.FC<{ deleteDraft: () => void}> = (props) => {
    return(
        <Button 
          variant="extended" 
          color="primary"
          aria-label="delete"
          component="label"
          onClick={() => props.deleteDraft()}
        >
          <CloseIcon style={{marginRight: "0.2em"}} />
        </Button>
    );
}

export default DeleteButton;
