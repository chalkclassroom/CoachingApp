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

import TeacherProfileResults from './TeacherProfileResults'

import CalendarIcon from '../../assets/icons/CalendarIcon.png';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import * as React from 'react';
import { Component } from 'react';
import Firebase, { FirebaseContext } from '../../components/Firebase'

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'


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


class TeacherProfile extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          selectedProgram: "",
          allPrograms: [],
          allSites: [],
          siteOptions: [],
          teacherOptions: [],
          checkboxes: [],
          checked: [],
          error: false,
          selectedProgram: "",
          selectedSite: "",
          selectedTeacher: "",
          selectedTeacherName: "",
          view: 1,
          startDate: new Date('02-02-2022'),
          endDate: new Date(),
          radioValue: "",
          error: {
            program: false,
            site: false,
            teacher: false,
            startDate: false,
            endDate: false,
          },
          errorMessages: {
            program: "",
            site: "",
            teacher: "",
            startDate: "",
            endDate: "",
          }
      }
  }

  componentDidMount(): void {
    // Build all initial dropdown option
    this.setDropdownOptions();
  }

  /*
   * Set dropdown items
   *
   * We're going to put every 'program' and 'site' option in each dropdown initially and filter it as we go through the choises to reduce firestore queries
   */
  setDropdownOptions = async () => {
    const firebase = this.context;

    // Set programs
    firebase.getPrograms()
     .then((data)=>{
       // Sort array in alphabetical order
       data.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
       this.setState({allPrograms: data});

       // Reset selected site just in case we selected it then changed to a program that doesn't have that site
       this.setState({selectedSite: "", selectedSiteName: ""});
     });

    // Set programs
    firebase.getSites()
     .then((data)=>{
       // Sort array in alphabetical order
       data.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
       this.setState({allSites: data});
     });

  }

  /*
   * Change the site options we can choose from once a program is chosen
   */
   setSites = async (programId) => {
     const firebase = this.context;

     // Get the program information so we can see what sites it's affiliated with
     let allPrograms = [...this.state.allPrograms];
     var program = allPrograms.find(obj => {
        return obj.id === programId
      });


    const siteIds = program.sites;
    let allSites = [...this.state.allSites];
    // Filter the site options to only include the ones in our site
    var siteOptions = allSites.filter(site => {
      if(program.sites.includes(site.id))
      {
        return site;
      }
    });

    // Sort array in alphabetical order
    siteOptions.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

    // Save site options to state
    this.setState({siteOptions: siteOptions});

   }



   /*
    * Change the teacher options we can choose from once a site is chosen
    */
    setTeachers = async (siteName) => {
      const firebase = this.context;

      // Grab the teachers in this site
      let teacherOptions = await firebase.getTeacherBySiteName(siteName);

      // Remove duplicates because that's apparently a problem now
      teacherOptions = teacherOptions.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i)

      // Sort the teachers by name
      teacherOptions.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

      this.setState({teacherOptions: teacherOptions});
    }




  // When the 'Program' or 'Site' dropdown is changed
  handleChangeDropdown = (event: SelectChangeEvent) => {
    this.setState({[event.target.name]: event.target.value});

    var error = this.state.error;
    var errorMessages = this.state.errorMessages;

    // If program was selected, we need to generate options to put in site dropdown
    if(event.target.name == "selectedProgram")
    {
      const program = this.state.allPrograms.find(x => x.id === event.target.value);
      this.setState({selectedProgramName: program.name});

      // Set the options for the site dropdowns
      this.setSites(event.target.value);

      // Reset Error
      error['program'] = false;
      errorMessages['program'] = "";
    }

    // If it's a site, we need to save the site name to pass to the results page
    if(event.target.name == "selectedSite")
    {

        const site = this.state.siteOptions.find(x => x.id === event.target.value);
        this.setState({selectedSiteName: site.name});

        // Set the teacher options
        this.setTeachers(site.name);

        // Reset Error
        error['site'] = false;
        errorMessages['site'] = "";
    }

    // If it's a teacher, we need to save the teacher name to pass to the results page
    if(event.target.name == "selectedTeacher")
    {

        const teacher = this.state.teacherOptions.find(x => x.id === event.target.value);

        // Change teacher name from "last, first" to "first last"
        var teacherName = teacher.name.split(", ");
        teacherName = teacherName[1] + " " + teacherName[0];

        this.setState({selectedTeacherName: teacherName});


        // Reset Error
        error['teacher'] = false;
        errorMessages['teacher'] = "";
    }

    this.setState({error: error, errorMessages: errorMessages});

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

    // Error Message Handling
    var error = this.state.error;
    var errorMessages = this.state.errorMessages;

    var startDate = this.state.startDate
    var endDate = this.state.endDate;
    if(event.target.name == "startDate"){
      startDate = dateVal;
    }
    else {
      endDate = dateVal;
    }


    if(startDate > endDate)
    {
      error['startDate'] = true;
      error['endDate'] = true;
      errorMessages['startDate'] = "Start has to be before end";
    }
    else if (startDate > new Date())
    {
      error['startDate'] = true;
      error['endDate'] = true;
      errorMessages['startDate'] = "Start can't be in the future";
    }
    else
    {
      error['startDate'] = false;
      error['endDate'] = false;
      errorMessages['startDate'] = "";
    }

    this.setState({error: error, errorMessages: errorMessages});

  };

  // Function to switch between Form and Results page
  handlePageChange = (pageNumber) => {
    this.setState({view: pageNumber});

    if(pageNumber == 1)
    {
      this.props.changePage("TeacherProfile");
    }
    if(pageNumber == 2)
    {
      this.props.changePage("SiteResults");
    }
  }

  // When any of the checkboxes are checked or unchecked
  handleRadioChange = (event: SelectChangeEvent) => {
    // If we're checking it, add to array
      this.setState({radioValue: event.target.value});
  };

  // When View Report is clicked
  handleViewReport = () => {
    var error = {
      program: false,
      site: false,
      startDate: false,
      endDate: false,
    };

    var errorMessages = {
        program: "",
        site: "",
        startDate: "",
        endDate: "",
    }

    if(this.state.selectedProgram == "")
    {
      error['program'] = true;
      errorMessages['program'] = "Please select a program";
    }
    if(this.state.selectedSite == "")
    {
      error['site'] = true;
      errorMessages['site'] = "Please select a site";
    }
    if(this.state.selectedTeacher == "")
    {
      error['teacher'] = true;
      errorMessages['teacher'] = "Please select a teacher";
    }
    if(this.state.startDate > this.state.endDate)
    {
      error['startDate'] = true;
      error['endDate'] = true;
      errorMessages['startDate'] = "Start has to be before end";
    }
    if(this.state.startDate > new Date())
    {
      error['startDate'] = true;
      error['endDate'] = true;
      errorMessages['startDate'] = "Start can't be in the future";
    }
    if(this.state.radioValue == "")
    {
      alert("Please select a practice.")
    }

    // If there are no errors, change page
    if ( !(Object.values(error).indexOf(true) > -1) ) {
      this.handlePageChange(2);
    }
    else
    {
      this.setState({error: error});
      this.setState({errorMessages: errorMessages});
    }

  }


    render() {

      {/*
        Redirect to the homepage if they're not an admin, program leader, or site leader
      */}
      if(this.props.userRole !== "admin" && this.props.userRole !== "programLeader" && this.props.userRole !== "siteLeader")
      {
        return (
          <Route
            render={ (props) =>
              <Redirect to={{ pathname: '/', state: {from: this.props.location}}} />
            }
            />
        )
      }


      return (
        <>
        {/* Control what we see based on page number */}
        {this.state.view === 1 ? (
        <Grid container style={{paddingLeft: '30px'}}>
            <Grid container>
                <Grid item xs={12}>
                    <h2>Teacher Profile</h2>
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
                      <FormControl variant="outlined" error={this.state.error['program']}>

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
                        <FormHelperText>{this.state.errorMessages['program']}</FormHelperText>
                      </FormControl>
                    </Grid>

                  </Grid>
                  <Grid container xs={12} style={centerRow}>

                    <Grid container xs={3} style={endRow}>
                      <label style={{marginRight: 30}}>Site</label>
                    </Grid>

                    <Grid container xs={6} style={startRow}>
                      <FormControl variant="outlined" error={this.state.error['site']}>
                        <FormHelperText>{this.state.error['site']}</FormHelperText>
                        <StyledSelect
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={this.state.selectedSite}
                          onChange={this.handleChangeDropdown}
                          name="selectedSite"
                          disabled={!(this.state.siteOptions.length > 0) /* Disable if there are no site options */}
                        >
                          {this.state.siteOptions.map(
                            (site, index)=>{
                              return <MenuItem value={site.id} key={site.id}>
                                    {site.name}
                                  </MenuItem>
                              })}
                        </StyledSelect>
                        <FormHelperText>{this.state.errorMessages['site']}</FormHelperText>
                      </FormControl>
                    </Grid>

                  </Grid>


                  <Grid container xs={12} style={centerRow}>

                    <Grid container xs={3} style={endRow}>
                      <label style={{marginRight: 30}}>Teacher</label>
                    </Grid>

                    <Grid container xs={6} style={startRow}>
                      <FormControl variant="outlined" error={this.state.error['teacher']}>
                        <FormHelperText>{this.state.error['teacher']}</FormHelperText>
                        <StyledSelect
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={this.state.selectedTeacher}
                          onChange={this.handleChangeDropdown}
                          name="selectedTeacher"
                          disabled={!(this.state.teacherOptions.length > 0) /* Disable if there are no site options */}
                        >
                          {this.state.teacherOptions.map(
                            (teacher, index)=>{
                              return <MenuItem value={teacher.id} key={teacher.id}>
                                    {teacher.name}
                                  </MenuItem>
                              })}
                        </StyledSelect>
                        <FormHelperText>{this.state.errorMessages['teacher']}</FormHelperText>
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
                          error={this.state.error['startDate']}
                          helperText={this.state.errorMessages['startDate']}
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
                          error={this.state.error['endDate']}
                          helperText={this.state.errorMessages['endDate']}
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

                <RadioGroup aria-label="Practices" name="practices" error={true} value={this.state.radioValue} onChange={this.handleRadioChange} style={{width: '100%'}}>
                  <Grid container style={centerRow}>
                    <Grid item xs={6}>
                      <FormControl required error={true} component="fieldset" className={"checkboxesform"}>
                        <FormGroup>
                          <FormControlLabel
                            control={<Radio />}
                            label="Transition Time"
                            value="transitionTime"
                          />

                          <FormControlLabel
                            control={<Radio />}
                            label="Classroom Climate"
                            value="classroomClimate"
                          />

                          <FormControlLabel
                            control={<Radio />}
                            label="Math Instruction"
                            value="mathInstruction"
                          />

                          <FormControlLabel
                            control={<Radio />}
                            label="Level of Instruction"
                            value="levelOfInstruction"
                          />

                          <FormControlLabel
                            control={<Radio />}
                            label="Student Engagement"
                            value="studentEngagement"
                          />

                          <FormControlLabel
                            control={<Radio />}
                            label="Listening to Children"
                            value="listeningToChildren"
                          />

                        </FormGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl required error={this.state.error} component="fieldset" className={"checkboxesform"}>
                        <FormGroup>
                          <FormControlLabel
                            control={<Radio />}
                            label="Sequential Activities"
                            value="sequentialActivities"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="Foundation Skills"
                            value="foundationSkills"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="Writing"
                            value="writing"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="Book Reading"
                            value="bookReading"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="Language Environment"
                            value="languageEnvironment"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="Associative and Cooperative"
                            value="associativeAndCooperative"
                          />

                        </FormGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </RadioGroup>
                {/*
                  Submit button
                */}
                <Grid item xs={12} style={centerRow}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.handleViewReport()}>
                    View Report
                  </Button>
                </Grid>
            </Grid>
        </Grid>

      ) : (this.state.view === 2 ? (
        <TeacherProfileResults
          handlePageChange={(val) => this.handlePageChange(val)}
          selectedTeacherName={this.state.selectedTeacherName}
          selectedTeacherId={this.state.selectedTeacher}
          selectedSiteId={this.state.selectedSite}
          selectedPractices={this.state.radioValue}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          observationType={this.state.radioValue}
          teacherOptions={this.state.teacherOptions}
         />
      ) : null)}

        </>
        )
    }
  }

TeacherProfile.contextType = FirebaseContext

export default TeacherProfile;
