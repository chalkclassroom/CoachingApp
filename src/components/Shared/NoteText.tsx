import React, {FunctionComponent, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import CreateIcon from '@material-ui/icons/Create';
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

interface OwnProps {
  text: string
  id: string
  handleUpdate: (text: string) => void
}

type Props = OwnProps;

const NoteText: FunctionComponent<Props> = (props) => {
  let [isEditing, setIsEditing] = useState(false)
  let [editText, setEditText] = useState(props.text)
  let {text, id, handleUpdate} = props


  const handleSubmit = () => {
    handleUpdate(editText)
    setIsEditing(false)
  }
  const handleEdit = (e) => {
    setEditText(e.target.value)
  }
  const handleDiscard = (e) => {
    setEditText(text)
    setIsEditing(false)
  }
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      text-align="left"
    >
      {!isEditing ?
        <>
          <Grid
            container
            item
            xs={10}
            alignItems={"center"}
            justify={"center"}
            style={{fontFamily: 'Arimo'}}
          >
            <p style={{textAlign: 'justify'}}>{text}</p>
          </Grid>
          <Grid item xs={2}>
            <CreateIcon onClick={() => setIsEditing(!isEditing)}/>
          </Grid>
        </>
        :
        <>
          <Grid
            container
            item
            xs={9}
            alignItems={"center"}
            justify={"center"}
            style={{}}
          >
              <TextField fullWidth multiline InputProps={{style:{fontFamily: 'Arimo', fontSize: '0.875rem'}}} id={'note-text'} value={editText} onChange={handleEdit}/>
          </Grid>
          <Grid item xs={3}>
            {
              !isEditing ? <CreateIcon onClick={() => setIsEditing(!isEditing)}/>
              : <Grid container item>
                <Button style={{fontFamily: 'Arimo', fontSize: '0.875rem'}} onClick={handleSubmit}>Save</Button>
                <Button style={{fontFamily: 'Arimo', fontSize: '0.875rem'}} onClick={handleDiscard}>Discard</Button>
            </Grid>
            }
          </Grid>
        </>
      }

    </Grid>
  );
};

export default NoteText;
