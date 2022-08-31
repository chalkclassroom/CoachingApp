import * as React from 'react';
import { useState, useEffect } from 'react';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Input,
  InputLabel,
  TextField,
  Select,
  FormControl,
  MenuItem
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

interface Props {
  adding: boolean,
  editing: boolean,
  handleCloseModal(): void,
  handleAddText(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void,
  inputFirstName: string,
  inputLastName: string,
  inputEmail: string,
  inputSchool: string,
  inputPhone: string,
  inputNotes: string,
  fnErrorText: string,
  lnErrorText: string,
  schoolErrorText: string,
  emailErrorText: string,
  phoneErrorText: string,
  notesErrorText: string,
  handleComplete(): void
}

const StyledFormControl = withStyles(() => ({
    root: {
        marginBottom: '1.3rem',
    },
}))(FormControl)

// For the 'select sites' component
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}


export default function EditProgramDialog(props: Props): React.ReactElement {
  //const [selectedProgramLeaders, setSelectedProgramLeaders] = useState([])

  const dropdownOnChange = (data) => {
    console.log('change');

  }

  const {
    adding,
    editing,
    handleCloseModal,
    handleAddText,
    inputFirstName,
    inputLastName,
    inputEmail,
    inputSchool,
    inputPhone,
    inputNotes,
    fnErrorText,
    lnErrorText,
    schoolErrorText,
    emailErrorText,
    phoneErrorText,
    notesErrorText,
    handleComplete,
    classes,
    selectedProgram,
    selectedSites,
    handleSitesChange,
    sitesOptions,
    leadersOptions,
    selectedProgramLeaders,
    handleLeaderChange
  } = props;


  const [selectedLeaders, setSelectedLeaders] = useState([]);
  useEffect(() => {
    let tempArray = [];
    for(var leader in selectedProgramLeaders)
    {
        tempArray.push(leader.id);
    }
    setSelectedLeaders(tempArray);
  }, []);

  return (
    <Dialog
      open={adding || editing}
      onClose={handleCloseModal}
      aria-labelledby="add-teacher-title"
    >
      <DialogTitle id="add-teacher-title">
        {adding ? 'Add a New Teacher' : 'Edit ' + selectedProgram.name + ' Information'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {adding ? (
            'Make edits to the form below and confirm to add a teacher to your My Teachers list.'
          ) : (
            'Make edits to the form below and confirm to update this teacher\'s information.'
          )}
        </DialogContentText>
        <TextField
          autoFocus
          required
          defaultValue={selectedProgram.name}
          onChange={handleAddText}
          margin="dense"
          id="first-name"
          name="inputProgramName"
          label="Program Name"
          helperText={fnErrorText}
          error={!!fnErrorText}
          type="text"
          fullWidth
        />

        {/*
          Leaders dropdown
          */}
        <StyledFormControl className={classes.formControl} fullWidth>
            <InputLabel id="role-select-label">Site Leaders</InputLabel>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              multiple
              className={classes.select}
              autoWidth={true}
              value={selectedProgram.leaders}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>{
                handleLeaderChange(event.target.value)}
              }
              input={<Input />}
              MenuProps={MenuProps}
              autoWidth={true}
            >
              {leadersOptions.map(
                (option, index)=>{

                  return <MenuItem value={option.id}>
                    {option.firstName}
                  </MenuItem>

              })}
            </Select>
        </StyledFormControl>

        {/*
          Sites dropdown
          */}
        <StyledFormControl className={classes.formControl} fullWidth>
            <InputLabel id="role-select-label">Sites</InputLabel>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              multiple
              className={classes.select}
              autoWidth={true}
              value={selectedProgram.sites}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>{
                handleSitesChange(event.target.value)}
              }
              input={<Input />}
              MenuProps={MenuProps}
              autoWidth={true}
            >
              {sitesOptions.map(
                (option, index)=>{

                  return <MenuItem value={option.id}>
                    {option.name}
                  </MenuItem>

              })}
            </Select>
        </StyledFormControl>




      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseModal}
          style={{ color: "#F1231C" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleComplete}
          style={{ color: "#2196F3" }}
        >
          {adding ? 'Add New Teacher' : 'Confirm Edits'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
