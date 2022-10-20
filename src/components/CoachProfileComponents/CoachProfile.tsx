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

import CoachProfileResults from './CoachProfileResults'

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


class CoachProfile extends React.Component {

  constructor(props){
      super(props);
      const date = new Date();
      date.setMonth(date.getMonth()-1)
      this.state = {
          selectedProgram: "",

          allPrograms: [],
          allSites: [],

          siteOptions: [],
          coachOptions: [],
          teacherOptions: [],

          checkboxes: [],
          checked: [],
          error: false,

          selectedProgram: "",
          selectedSite: "",
          selectedCoach: "",
          selectedTeacher: "",

          view: 1,
          startDate: date,
          endDate: new Date(),
          error: {
            program: false,
            site: false,
            coach: false,
            teacher: false,
            startDate: false,
            endDate: false,
          },
          errorMessages: {
            program: "",
            site: "",
            coach: "",
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

    return siteOptions;

   }


   /*
    * Change the coach options we can choose from once a site is chosen
    */
    setCoaches = async (site) => {
      const firebase = this.context;

      // Get a list of the coaches for the chosen site.
      // Get all coaches that has this site in their document
      var siteCoachIds = [];
      var tempCoaches = await firebase.fetchSiteCoaches(site.id);

      if(tempCoaches)
      {
        siteCoachIds = tempCoaches.map(coach => {return coach.id});
      }

      // Add all the coaches this site has listed. (fetchSiteCoaches only grabs users with the role of 'coach'. This is a minor failsafe in case we need more than that)
      if(site.coaches)
      {
        siteCoachIds = siteCoachIds.concat(site.coaches);
      }

      // Remove any duplicates
      siteCoachIds = siteCoachIds.filter((v,i,a)=>a.findIndex(v2=>(v2 === v ))===i)

      // Snag documents from firestore for each coach
      return firebase.getMultipleUserProgramOrSite({userIds: siteCoachIds}).then( (data) => {

        data.sort((a, b) => a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase()));

        this.setState({coachOptions: data});

        return data;
      });

    }

    /*
     * Change the teacher options we can choose from once a coach is chosen
     */
     setTeachers = async (coachId) => {
       const firebase = this.context;

       // Grab the teacher ID's for the coaches
       let teacherIds = await firebase.getTeacherListFromUser({userId: coachId});

       // Grab all the teachers' info
       var teacherOptions = await firebase.getMultipleUserProgramOrSite({userIds: teacherIds});

       // Grab all the users from the archives
       let allArchivedUsers = await firebase.getArchives();

       // Filter out teachers that are affiliated with this user
       var archivedTeachersForThisCoach = allArchivedUsers.filter(o => o.coach === coachId);

       // Add archives to list of teachers
       teacherOptions = teacherOptions.concat(archivedTeachersForThisCoach);

       // Set the names for the teachers (better to do it here than in the actual form, in case you were wondering)
       teacherOptions.forEach((value, index) => {
         value.name = value.lastName + ", " + value.firstName;
       });

       // Remove duplicates because that's apparently a problem now
       teacherOptions = teacherOptions.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i)

       // Sort the teachers by name
       teacherOptions.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

       // Add the "All teachers" selection
       teacherOptions.unshift({id: "all", name: "All Teachers"});

       // Remove Practice teacher
       teacherOptions = teacherOptions.filter( o => o.id !== "rJxNhJmzjRZP7xg29Ko6" );

       this.setState({teacherOptions: teacherOptions});

       return teacherOptions;
     }


  // When the 'Program', 'Site', 'Coach', or 'Teacher' dropdown is changed
  handleChangeDropdown = async (event: SelectChangeEvent) => {
    this.setState({[event.target.name]: event.target.value});

    var error = this.state.error;
    var errorMessages = this.state.errorMessages;

    // If program was selected, we need to generate options to put in site dropdown
    if(event.target.name == "selectedProgram")
    {
      const program = this.state.allPrograms.find(x => x.id === event.target.value);
      this.setState({selectedProgramName: program.name});


      var siteOptions = await this.setSites(event.target.value);

      // Reset Error
      error['program'] = false;
      errorMessages['program'] = "";

      // Set errors if there are no sites in this program
      if(siteOptions.length <= 0)
      {
        error['program'] = true;
        errorMessages['program'] = "There are no sites in this program!";
      }

    }

    // If it's a site, we need to save the site name to pass to the results page
    if(event.target.name == "selectedSite")
    {

        const site = this.state.siteOptions.find(x => x.id === event.target.value);
        this.setState({selectedSiteName: site.name});

        // Set the coach options
        var coachOptions = await this.setCoaches(site);

        // Reset Error
        error['site'] = false;
        errorMessages['site'] = "";

        // Set errors if there are no coaches in this program
        if(coachOptions.length <= 0)
        {
          error['site'] = true;
          errorMessages['site'] = "There are no coaches in this site!";
        }

    }


    // If it's a coach, we need to save the coach name to pass to the results page
    if(event.target.name == "selectedCoach")
    {

        const coach = this.state.coachOptions.find(x => x.id === event.target.value);

        var coachName = coach.firstName + " " + coach.lastName;
        this.setState({selectedCoachName: coachName});

        // Reset Error
        error['coach'] = false;
        errorMessages['coach'] = "";

        // Set the teacher options
        var teacherOptions = await this.setTeachers(event.target.value);

        // Set errors if there are no coaches in this program
        if(teacherOptions.length <= 1)
        {
          error['coach'] = true;
          errorMessages['coach'] = "This coach doesn't have any teachers!";
        }
    }


    // If it's a teacher, we need to save the teacher name to pass to the results page
    if(event.target.name == "selectedTeacher")
    {

        const teacher = this.state.teacherOptions.find(x => x.id === event.target.value);

        var teacherName;
        if(event.target.value === "all")
          teacherName = "All Teachers";
        else
          teacherName = teacher.firstName + " " + teacher.lastName;

        this.setState({selectedTeacherName: teacherName});

        // Reset Error
        error['teacher'] = false;
        errorMessages['teacher'] = "";

    }



    this.setState({error: error, errorMessages: errorMessages});

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
      this.props.changePage("CoachProfile");
    }
    if(pageNumber == 2)
    {
      this.props.changePage("CoachResults");
    }
  }


  // When View Report is clicked
  handleViewReport = () => {
    var error = {
      program: false,
      site: false,
      coach: false,
      teacher: false,
      startDate: false,
      endDate: false,
    };

    var errorMessages = {
        program: "",
        site: "",
        coach: "",
        teacher: "",
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
    if(this.state.selectedCoach == "")
    {
      error['coach'] = true;
      errorMessages['coach'] = "Please select a coach";
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
        <Grid container style={{paddingLeft: '30px', marginBottom: '30px'}}>
            <Grid container>
                <Grid item xs={12}>
                    <h2>Coach Profile</h2>
                </Grid>

                {/*
                  Dropdown Section
                */}

                {/* Program Dropdown */}
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



                  {/* Site Dropdown */}
                  <Grid container xs={12} style={centerRow}>

                    <Grid container xs={3} style={endRow}>
                      <label style={{marginRight: 30}}>Site</label>
                    </Grid>

                    <Grid container xs={6} style={startRow}>
                      <FormControl variant="outlined" error={this.state.error['site']}>
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


                  {/* Coach Dropdown */}
                  <Grid container xs={12} style={centerRow}>

                    <Grid container xs={3} style={endRow}>
                      <label style={{marginRight: 30}}>Coach</label>
                    </Grid>

                    <Grid container xs={6} style={startRow}>
                      <FormControl variant="outlined" error={this.state.error['coach']}>
                        <StyledSelect
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={this.state.selectedCoach}
                          onChange={this.handleChangeDropdown}
                          name="selectedCoach"
                          disabled={!(this.state.coachOptions.length > 0) /* Disable if there are no site options */}
                        >
                          {this.state.coachOptions.map(
                            (coach, index)=>{
                              return <MenuItem value={coach.id} key={coach.id}>
                                    {coach.lastName + ", " + coach.firstName}
                                  </MenuItem>
                              })}
                        </StyledSelect>
                        <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText>
                      </FormControl>
                    </Grid>

                  </Grid>


                  {/* Teacher Dropdown */}
                  <Grid container xs={12} style={centerRow}>

                    <Grid container xs={3} style={endRow}>
                      <label style={{marginRight: 30}}>Teacher</label>
                    </Grid>

                    <Grid container xs={6} style={startRow}>
                      <FormControl variant="outlined" error={this.state.error['teacher']}>
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
        <CoachProfileResults
          handlePageChange={(val) => this.handlePageChange(val)}
          selectedProgramName={this.state.selectedProgramName}
          selectedSiteName={this.state.selectedSiteName}
          selectedCoach={this.state.selectedCoach}
          selectedCoachName={this.state.selectedCoachName}
          selectedTeacherName={this.state.selectedTeacherName}
          selectedTeacher={this.state.selectedTeacher}

          teacherOptions={this.state.teacherOptions}

          startDate={this.state.startDate}
          endDate={this.state.endDate}

         />
      ) : null)}

        </>
        )
    }
  }

CoachProfile.contextType = FirebaseContext

export default CoachProfile;
