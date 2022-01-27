import * as React from 'react';
import * as PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

interface DeleteButtonProps {
  email: string | undefined,
  onClick(): void
}

const DeleteButton: React.FC<DeleteButtonProps> = (props: DeleteButtonProps) => {
  return(
    <Button
      color='primary'
      aria-label='save'
      component='label'
      disabled={props.email === (undefined || '')}
      onClick={(): void => props.onClick()}
    >
      <DeleteIcon style={{marginRight: "0.2em"}}/>
      Delete  
    </Button>
  );
}

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default DeleteButton;