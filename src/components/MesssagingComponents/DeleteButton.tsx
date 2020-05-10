import React from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

interface DeleteButtonProps {
  deleteDraft: () => void
}

const DeleteButton: React.FC<DeleteButtonProps> = (props: DeleteButtonProps) => {
    return(
        <Button
          color='primary'
          aria-label='delete'
          component='label'
          onClick={props.deleteDraft}
        >
          <CloseIcon style={{marginRight: "0.2em"}} />
        </Button>
    );
}

export default DeleteButton;
