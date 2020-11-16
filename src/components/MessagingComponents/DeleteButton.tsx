import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

interface DeleteButtonProps {
  // saveDraft: () => void
}

const DeleteButton: React.FC<DeleteButtonProps> = (props: DeleteButtonProps) => {
    return(
        <Button
          color='primary'
          aria-label='save'
          component='label'
          // onClick={props.saveDraft}
        >
          <DeleteIcon style={{marginRight: "0.2em"}}/>
          Delete  
        </Button>
    );
}

export default DeleteButton;