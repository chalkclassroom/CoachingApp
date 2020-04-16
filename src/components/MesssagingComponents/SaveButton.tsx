import React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const SaveButton: React.FC<{ saveDraft: () => void}> = (props) => {
    return(
        <Button 
          variant="extended" 
          color="primary"
          aria-label="save"
          component="label"
          onClick={() => props.saveDraft()}
        >
          <SaveIcon style={{marginRight: "0.2em"}}/>
          Save  
        </Button>
    );
}

export default SaveButton;
