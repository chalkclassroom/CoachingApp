import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Item,
  Input,
  InputLabel,
  Typography,
  withStyles,
  MenuItem,
  Select,
  TextField,
  Checkbox,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Radio,
  RadioGroup
} from '@material-ui/core'

import CalendarIcon from '../../assets/icons/CalendarIcon.png';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import * as React from 'react';
import { Component } from 'react';
import Firebase, { FirebaseContext } from '../../components/Firebase'
import ProgramProfileResults from './ProgramProfileResults';


const centerRow = {
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  marginBottom: 8
}
const startRow = {
  display:'flex',
  alignItems:'center',
  justifyContent:'flex-start',
  marginBottom: 8
}
const endRow = {
  display:'flex',
  alignItems:'center',
  justifyContent:'flex-end',
  marginBottom: 8
}

const datePickerStyle = {

}


/*
* Set the styles used by our custom form items
*/

const StyledSelect = withStyles({
root: {
  padding: '11px 14px',
  width: '200px',
},
disabled: {
  opacity: 0.3
}
})(Select);


class ProgramProfile extends React.Component {

constructor(props){
    super(props);
    this.state = {
        selectedProgram: "",
        allPrograms: [],
        siteOptions: [],
        checkboxes: [],
        checked: [],
        error: false,
        selectedSite: "",
        view: 1,
        startDate: new Date(),
        endDate: new Date()
    }
}

componentDidMount(): void {
  // Sets sites for dropdown
  this.setPrograms();
}

/**
 * Set the sites for the dropdown
 */
 async setPrograms(){
   const firebase = this.context;
   firebase.getPrograms()
    .then((data)=>{

      // Sort array in alphabetical order
      data.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

      this.setState({allPrograms: data});
    });
 }

 setSites = async (programId) => {
   const firebase = this.context;

   // Get the program information so we can see what sites it's affiliated with
   firebase.getUserProgramOrSite({programId: programId})
    .then( async data => {

      const siteIds = data.sites;

      let siteRes = [];

      // Fetch each siteId and get the name for each
      for(var tempIndex in siteIds)
      {
        var siteId = siteIds[tempIndex];

        var siteData = await firebase.getUserProgramOrSite({siteId: siteId});

        siteRes.push({id:siteId, name: siteData.name});

      }

      // Sort array in alphabetical order
      siteRes.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

      // Save site options to state
      this.setState({siteOptions: siteRes});

    });
 }


// When the 'Program' or 'Site' dropdown is changed
handleChangeDropdown = (event: SelectChangeEvent) => {
  this.setState({[event.target.name]: event.target.value});

  // If program was selected, we need to generate options to put in site dropdown
  if(event.target.name == "selectedProgram")
  {
    this.setSites(event.target.value);
  }

  // If it's a site, we need to save the site name to pass to the results page
  if(event.target.name == "selectedSite")
  {

      const siteName = this.state.siteOptions.find(x => x.id === event.target.value).name;
      console.log("Site selected " + siteName);
      this.setState({selectedSiteName: siteName});
  }

};

// When any of the checkboxes are checked or unchecked
handleCheckboxChange = (event: SelectChangeEvent) => {

  // If we're checking it, add to array
  if(event.target.checked)
  {
    this.setState({checked:[...this.state.checked, event.target.name]});
  }
  // If we're unchecking it, we need to take it out of the array.
  else
  {
    this.setState({checked: this.state.checked.filter(function(item) {
      return item !== event.target.name;
    })});
  }

};

// When any of the date dropdowns are changed
handleDateChange = (event: SelectChangeEvent) => {
  const dateVal = new Date(event.target.value);
  this.setState({[event.target.name]: dateVal});
};

// Function to switch between Form and Results page
handlePageChange = (pageNumber) => {
  this.setState({view: pageNumber});
}


  render() {

    return (
      <>
      {/* Control what we see based on page number */}
      {this.state.view === 1 ? (
      <Grid container style={{paddingLeft: '30px'}}>
          <Grid container>
              <Grid item xs={12}>
                  <h2>Program Profile</h2>
              </Grid>

              {/*
                Dropdown Section
              */}

              <Grid container item xs={12} style={centerRow}>
                <Grid container style={centerRow}>

                  <Grid container xs={3} style={endRow}>
                    <label style={{marginRight: 30}}>Program</label>
                  </Grid>

                  <Grid container xs={6} style={startRow}>
                    <FormControl variant="outlined" >
                      <StyledSelect
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.selectedProgram}
                        onChange={this.handleChangeDropdown}
                        name="selectedProgram"
                      >
                      {this.state.allPrograms.map(
                        (site, index)=>{
                          return <MenuItem value={site.id} key={site.id}>
                                {site.name}
                              </MenuItem>
                          })}
                      </StyledSelect>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>


              {/*
                Date Section
              */}
              <Grid item xs={12}>
                <Grid container xs={12} style={centerRow}>

                  <Grid container xs={3} style={endRow}>
                    <h2 style={{marginRight: 30}}>Time Period</h2>
                  </Grid>

                  <Grid container xs={6} style={startRow}>
                      <TextField
                        id="date"
                        label="Start"
                        type="date"
                        defaultValue={this.state.startDate.toISOString().slice(0, 10)}
                        name="startDate"
                        className={datePickerStyle}
                        style={{marginRight: 20}}
                        onChange={this.handleDateChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        />
                      <TextField
                        id="date"
                        label="End"
                        type="date"
                        defaultValue={this.state.endDate.toISOString().slice(0, 10)}
                        name="endDate"
                        className={datePickerStyle}
                        onChange={this.handleDateChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>

                </Grid>
              </Grid>

              {/*
                Calendar icons
              */}
              <Grid item xs={12}>
                <Grid container xs={12} style={centerRow}>

                  <Grid container xs={3} style={endRow}>
                  </Grid>

                  <Grid container xs={6} style={startRow}>
                    <img src={CalendarIcon} className="card-icon" style={{width: '135px', marginRight: 20}} />
                    <img src={CalendarIcon} className="card-icon" style={{width: '135px'}} />
                  </Grid>

                </Grid>
              </Grid>
              <Grid item xs={12} style={centerRow}>
                  <h2>CHALK Practice</h2>
              </Grid>

              {/*
                  The checklists
              */}
              <Grid container style={centerRow}>
                <Grid item justifyContent="space-between" xs={12}>
                <RadioGroup aria-label="gender" name="gender1" value={this.state.radioValue} onChange={this.handleRadioChange}>
                  <Grid container style={centerRow}>
                    <Grid item xs={4}>
                      <FormControl required error={this.state.error} component="fieldset" className={"checkboxesform"}>
                        <FormGroup>

                          <FormControlLabel
                            control={<Radio />}
                            label="Transition Time"
                            value="Transition Time"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="Classroom Climate"
                            value="Classroom Climate"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="Math Instruction"
                            value="Math Instruction"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="Level of Instruction"
                            value="Level of Instruction"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="Student Engagement"
                            value="Student Engagement"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="Listening to Children"
                            value="Listening to Children"
                          />
                        </FormGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl required error={this.state.error} component="fieldset" className={"checkboxesform"}>
                        <FormGroup>
                          <FormControlLabel
                            control={<Radio />}
                            label="Sequential Activities"
                            value="Sequential Activities"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="Foundation Skills"
                            value="Foundation Skills"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="Writing"
                            value="Writing"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="Book Reading"
                            value="Book Reading"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="Language Environment"
                            value="Language Environment"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="Associative and Cooperative"
                            value="Associative and Cooperative"
                          />

                        </FormGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </RadioGroup>
                  {/* <FormControl required error={this.state.error} component="fieldset" className={"checkboxesform"}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={this.state.transitionTime} onChange={this.handleCheckboxChange} name="transitionTime" />}
                        label="Transition Time"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={this.state.classroomClimate} onChange={this.handleCheckboxChange} name="classroomClimate" />}
                        label="Classroom Climate"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={this.state.mathInstruction} onChange={this.handleCheckboxChange} name="mathInstruction" />}
                        label="Math Instruction"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={this.state.levelOfInstruction} onChange={this.handleCheckboxChange} name="levelOfInstruction" />}
                        label="Level of Instruction"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={this.state.studentEngagement} onChange={this.handleCheckboxChange} name="studentEngagement" />}
                        label="Student Engagement"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={this.state.listeningToChildren} onChange={this.handleCheckboxChange} name="listeningToChildren" />}
                        label="Listening to Children"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl required error={this.state.error} component="fieldset" className={"checkboxesform"}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={this.state.sequentialActivities} onChange={this.handleCheckboxChange} name="sequentialActivities" />}
                        label="Sequential Activities"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={this.state.foundationSkills} onChange={this.handleCheckboxChange} name="foundationSkills" />}
                        label="Foundation Skills"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={this.state.writing} onChange={this.handleCheckboxChange} name="writing" />}
                        label="Writing"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={this.state.bookReading} onChange={this.handleCheckboxChange} name="bookReading" />}
                        label="Book Reading"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={this.state.languageEnvironment} onChange={this.handleCheckboxChange} name="languageEnvironment" />}
                        label="Language Environment"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={this.state.associativeSndCooperative} onChange={this.handleCheckboxChange} name="associativeSndCooperative" />}
                        label="Associative and Cooperative"
                      />
                    </FormGroup>
                  </FormControl> */}
                </Grid>
              </Grid>

              {/*
                Submit button
              */}
              <Grid item xs={12} style={centerRow}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.handlePageChange(2)}>
                  View Report
                </Button>
              </Grid>
          </Grid>
      </Grid>

    ) : (this.state.view === 2 ? (
      <ProgramProfileResults
        handlePageChange={(val) => this.handlePageChange(val)}
        selectedSiteName={this.state.selectedSiteName}
        selectedSiteId={this.state.selectedSite}
        selectedPractices={this.state.checked}
        startDate={this.state.startDate}
        endDate={this.state.endDate}
       />
    ) : null)}

      </>
      )
  }
}

ProgramProfile.contextType = FirebaseContext

export default ProgramProfile;
