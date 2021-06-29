import * as React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

interface SaveButtonProps {
  saveDraft: () => void,
  saveEmail: () => void,
  disabled: boolean
}

const SaveButton: React.FC<SaveButtonProps> = (props: SaveButtonProps) => {
  return(
    <Button
      color='primary'
      aria-label='save'
      component='label'
      onClick={props.saveEmail}
      disabled={props.disabled}
    >
      <SaveIcon style={{marginRight: "0.2em"}}/>
      Save  
    </Button>
  );
}

export default SaveButton;
