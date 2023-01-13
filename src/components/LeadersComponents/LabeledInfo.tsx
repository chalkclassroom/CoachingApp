import * as React from "react";
import { useState, useEffect } from 'react';

import * as PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import {
    Button,
    FormControl,
    FormHelperText,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@material-ui/core';

interface Props {
  label: string,
  field: string,
  classes: Style
}

interface Style {
  container: string,
  labelStyle: string,
  fieldStyle: string,
  notesContainer: string
}

const styles: object = {
  container: {
    flexGrow: 1,
    marginRight: "0em"
  },
  labelStyle: {
    fontSize: "0.7em",
    marginBottom: "0.6em",
    marginTop: "0em"
  },
  fieldStyle: {
    marginBottom: "0.6em",
    marginTop: "0em"
  },
  notesContainer: {
    overflowY: "scroll",
    maxHeight: "4.5em",
  },
  select: {
      width: '15em',
  },
};

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


/**
 * @param {Props} props
 * @return {ReactElement}
 */
function LabeledInfo(props: Props): React.ReactElement {
  const { label, field, classes, dropdown, dropdownOptions, selectedOptions, dropdownOnChange, usersList, sitesList } = props;
  const [selectedOptionsList, setSelectedOptionsList] = useState(selectedOptions);

  return (
    <div className={classes.container}>
      <p className={classes.labelStyle}>{label}:</p>
      {label === "Notes" ? (
        <div className={classes.notesContainer}>
          <p className={classes.fieldStyle}>
            {/*
                If there is a fields set, show that
            */}
            {field ? (field.split("\n").map((item, key) => (
              <React.Fragment key={key}>
                {item}
                <br />
              </React.Fragment>
            ))) : (
              <React.Fragment>
                {''}
              </React.Fragment>
            )}




          </p>
        </div>
      ) : (
        <p className={classes.fieldStyle}>
          {field ? (field.split("\n").map((item, key) => (
            <React.Fragment key={key}>
              {item}
              <br />
            </React.Fragment>
          ))) : (
            <React.Fragment>
              {''}
            </React.Fragment>
          )}


          {/*
              If there is a dropdown set, show that

              MODIFYING THIS DROPDOWN.
          */}
          {dropdown ? (dropdown.map((item, key) => (
            <React.Fragment key={key}>
              <StyledFormControl className={classes.formControl}>
                  <InputLabel id="role-select-label">Site Leaders</InputLabel>
                  <Select
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    multiple
                    className={classes.select}
                    autoWidth={true}
                    value={selectedOptions}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>{
                      dropdownOnChange(event.target.value)}
                    }
                    input={<Input />}
                    MenuProps={MenuProps}
                    autoWidth={true}
                  >
                    {dropdownOptions.map(
                      (option, index)=>{

                        return <MenuItem value={option}>
                          {option}
                        </MenuItem>

                    })}
                  </Select>
              </StyledFormControl>
              <br />
            </React.Fragment>
          ))) : (
            <React.Fragment>
              {''}
            </React.Fragment>
          )}


          {/*
              Create a list of users
          */}
          {usersList ? (usersList.map((item, key) => (
            <React.Fragment key={key}>
              {item.lastName}, {item.firstName}
              <br />
            </React.Fragment>
          ))) : (
            <React.Fragment>
              {''}
            </React.Fragment>
          )}

          {/*
              Create a list of users
          */}
          {sitesList ? (sitesList.map((item, key) => (
            <React.Fragment key={key}>
              {item.name}
              <br />
            </React.Fragment>
          ))) : (
            <React.Fragment>
              {''}
            </React.Fragment>
          )}



        </p>
      )}
    </div>
  );
}

LabeledInfo.propTypes = {
  label: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LabeledInfo);
