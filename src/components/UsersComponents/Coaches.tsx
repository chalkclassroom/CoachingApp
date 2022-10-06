import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import ForwardIcon from '@material-ui/icons/Forward';
import FolderIcon from '@material-ui/icons/Folder'
import {
  FormControl,
  FormHelperText,
  Grid,
  Typography,
  withStyles,
  MenuItem,
  Select,
  TextField,
  Button,
} from '@material-ui/core'
import CHALKLogoGIF from '../../assets/images/CHALKLogoGIF.gif';
import FirebaseContext from '../Firebase/FirebaseContext'
import SaveImage from '../../assets/images/SaveImage.svg'
import SaveGrayImage from '../../assets/images/SaveGrayImage.svg'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'


const StyledSelect = withStyles({
  root: {
    padding: '11px 14px',
    width: '37vw',
    maxWidth: '430px'
  },
  disabled: {
    opacity: 0.3
  }
})(Select);

const StyledSelectTransfer = withStyles({
  root: {
    padding: '11px 14px',
    width: '25vw',
    // maxWidth: '430px'
  },
  disabled: {
    opacity: 0.3
  }
})(Select);

interface Props {
  changePage(pageName: string): void
  userRole: string
  location: string
  teacherData: Array<Object>
  coachData: Array<Object>
}

interface State {
  coachList: Array<Object>
  coachesTeachers: Array<Object>
  selectedCoach: string
  view: number
  saved: boolean
}

class Coaches extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedCoach: "",
      coachList: [],
      coachesTeachers: [],
      view: 1,
      saved: false,
      sortType: "lastName"
    }

  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {
    if (!prevProps.coachData !== this.props.coachData) {

    }
  }

  sortTeachers = (sortType) => {
    var teachersList = this.state.coachesTeachers;

    this.setState({sortType: sortType});

    // Sort the teachers list
    switch (sortType) {
      case "lastName":
        teachersList.sort((a,b) => (a.teacherLastName > b.teacherLastName) ? 1 : ((b.teacherLastName > a.teacherLastName) ? -1 : 0));
        console.log("last name");
        break;
      case "lastNameReverse":
        teachersList.sort((a,b) => (b.teacherLastName > a.teacherLastName) ? 1 : ((a.teacherLastName > b.teacherLastName) ? -1 : 0));
        console.log("reverse last name");
      case "firstName":
        teachersList.sort((a,b) => (a.teacherFirstName > b.teacherFirstName) ? 1 : ((b.teacherFirstName > a.teacherFirstName) ? -1 : 0));
        console.log("last name");
        break;
      case "firstNameReverse":
        teachersList.sort((a,b) => (b.teacherFirstName > a.teacherFirstName) ? 1 : ((a.teacherFirstName > b.teacherFirstName) ? -1 : 0));
        console.log("reverse last name");
        break;
      case "siteName":
        teachersList.sort((a,b) => (a.siteName > b.siteName) ? 1 : ((b.siteName > a.siteName) ? -1 : 0));
        console.log("site name");
        break;
      case "siteNameReverse":
        teachersList.sort((a,b) => (b.siteName > a.siteName) ? 1 : ((a.siteName > b.siteName) ? -1 : 0));
        console.log("reverse site name");
        break;
      case "program":
        teachersList.sort((a,b) => (a.selectedProgramName > b.selectedProgramName) ? 1 : ((b.selectedProgramName > a.selectedProgramName) ? -1 : 0));
        console.log("program name");
        break;
      case "programReverse":
        teachersList.sort((a,b) => (b.selectedProgramName > a.selectedProgramName) ? 1 : ((a.selectedProgramName > b.selectedProgramName) ? -1 : 0));
        console.log("reverse program name");
        break;

      default:
        break;
    }

    this.setState({coachesTeachers: teachersList});

  }

  handlePopulateTable = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let result = []
    this.setState({selectedCoach: event.target.value})
    this.props.teacherData.map((doc) => {
      if (doc.coachId === event.target.value) {
        result.push(doc)
      }
    })
    this.setState({coachesTeachers: result},
      // Sort the data
      function(){
        console.log("Sorting teachers");

          this.sortTeachers("lastName");
      })
    console.log(result)
  }

  handlePageChange = (pageNumber: number) => {
    this.setState({view: pageNumber});

    switch (pageNumber) {
      default : case 1:
        this.props.changePage("Teachers");
        break;
      case 2:
        this.props.changePage("TeachersAdd");
        break;
      case 3:
        this.props.changePage("TeachersTransfer");
        break;
      case 4:
        this.props.changePage("TeachersEdit");
        break;
    }
  }

  render() {
    return (<>
      <Grid container direction='row'>
        <Grid item xs={3}>
        <Grid container direction='column' style={{ marginLeft:'30px'}}>
        {this.state.view !== 4 ? (<>
              {this.state.view === 2 ? (<>
                <Grid item xs={6}>
                    <Grid container direction='row' onClick={() => this.handlePageChange(1)}>
                        <Grid item>
                            <ArrowBackIcon style={{fill: 'green', fontSize:'40', marginTop:'15px'}}/>
                        </Grid>
                        <Grid item>
                            <Typography
                              variant="h6"
                              gutterBottom
                              style={{marginTop:'20px' }}
                              >
                                Back
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
              </>) : (<>
                <Grid item xs={6}>
                    <Grid container direction='row' onClick={() => this.handlePageChange(2)}>
                        <Grid item>
                            <AddIcon style={{fill: 'green', fontSize:'40', marginTop:'15px'}}/>
                        </Grid>
                        <Grid item>
                            <Typography
                              variant="h6"
                              gutterBottom
                              style={{marginTop:'20px' }}
                              >
                                Add
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                </>)}
                {this.state.view === 3 ? (<>
                <Grid item xs={6}>
                  <Grid container direction='row' onClick={() => this.handlePageChange(1)}>
                        <Grid item>
                            <ArrowBackIcon style={{fill: 'blue', fontSize:'40', marginTop:'15px',}}/>
                        </Grid>
                        <Grid item>
                            <Typography
                              variant="h6"
                              gutterBottom
                              style={{marginTop:'20px',}}
                              >
                                Back
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                </>) : (<>
                <Grid item xs={6}>
                <Grid container direction='row' onClick={() => this.handlePageChange(3)}>
                        <Grid item>
                            <ForwardIcon style={{fill: 'blue', fontSize:'40', marginTop:'15px',}}/>
                        </Grid>
                        <Grid item>
                            <Typography
                              variant="h6"
                              gutterBottom
                              style={{marginTop:'20px',}}
                              >
                                Transfer
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                </>)}
                </>) : (<>
                  <Grid item xs={6}>
                    <Grid container direction='row'>
                        <Grid item>
                            <FolderIcon style={{fill: 'Khaki', fontSize:'40', marginTop:'15px'}}/>
                        </Grid>
                        <Grid item>
                            <Typography
                              variant="h6"
                              gutterBottom
                              style={{marginTop:'20px' }}
                              >
                                Archive
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container direction='row' onClick={() => this.handlePageChange(1)}>
                        <Grid item>
                            <ArrowBackIcon style={{fill: 'blue', fontSize:'40', marginTop:'15px'}}/>
                        </Grid>
                        <Grid item>
                            <Typography
                              variant="h6"
                              gutterBottom
                              style={{marginTop:'20px' }}
                              >
                                Back
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                </>)}
            </Grid>
        </Grid>
        {this.state.view === 1 ? (<>
        {this.props.teacherData.length > 0 ? (<>
          <Grid container direction='column'>
            <Grid item xs={12}><span></span></Grid>
            <Grid item xs={12}>
              <Grid container direction='row'>
                <Grid item xs={1}><span></span></Grid>
                <Grid item xs={2}>
                  <Typography variant="h6" gutterBottom style={{marginTop:'5px',}}>
                    Coach
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <FormControl variant="outlined">
                    <StyledSelect
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.selectedCoach}
                      onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                        this.handlePopulateTable(event)
                      }
                      name="selectedCoach"
                      // disabled={!(this.props.coachData.length > 0) /* Disable if there are no site options */}
                    >
                      {this.props.coachData.map(
                        (coach, index)=>{
                          console.log("Coach ID: ", coach.id);

                          if(coach.id !== "") {
                          return (
                              <MenuItem value={coach.id} key={index}>
                                {coach.lastName + ", " + coach.firstName}
                              </MenuItem>
                          )}
                          })}
                    </StyledSelect>
                    {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid
            item
            xs={8}
            style={{
              width: '100%',
              height: '38vh',
              // border: '2px solid #0988ec',
              // borderRadius: '0.5em',
              marginTop:'60px' }}
            >
            <table style={{borderCollapse: 'collapse', width: '100%' }}>
              <thead style={{borderBottom:'2px solid #0988ec'}}>
                <tr>
                  <th colSpan={2}>
                    <Typography variant="h6" gutterBottom>
                      <strong>Teachers Coached</strong>
                    </Typography>
                  </th>
                  <th colSpan={1}>
                    <Typography variant="h6" gutterBottom>
                      <strong>Site</strong>
                    </Typography>
                  </th>
                  <th colSpan={1}>
                    <Typography variant="h6" gutterBottom>
                      <strong>Program</strong>
                    </Typography>
                  </th>
                </tr>
                <tr>
                  <th
                    onClick={
                      () =>{
                        if(this.state.sortType == "lastName")
                        {
                          this.sortTeachers("lastNameReverse")
                        }
                        else
                        {
                          this.sortTeachers("lastName")
                        }
                      }
                    }
                  >
                    <Typography variant="h6" gutterBottom>
                      Last Name
                    </Typography>
                  </th>
                  <th
                    onClick={
                      () =>{
                        if(this.state.sortType == "firstName")
                        {
                          this.sortTeachers("firstNameReverse")
                        }
                        else
                        {
                          this.sortTeachers("firstName")
                        }
                      }
                    }
                  >
                    <Typography variant="h6" gutterBottom>
                      First Name
                    </Typography>
                  </th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.selectedCoach !== "" ? (<>
                {this.state.coachesTeachers.map((value, index) => {
                  return(
                  <tr key={index} onClick={() => this.handlePageChange(4)}>
                    <td style={{textAlign:'center'}}>
                      <Typography variant="h6" gutterBottom>
                        {value.teacherLastName}
                      </Typography>
                    </td>
                    <td style={{textAlign:'center'}}>
                      <Typography variant="h6" gutterBottom>
                        {value.teacherFirstName}
                      </Typography>
                    </td>
                    <td style={{textAlign:'center'}}>
                      <Typography variant="h6" gutterBottom>
                        {value.siteName}
                      </Typography>
                    </td>
                    <td style={{textAlign:'center'}}>
                      <Typography variant="h6" gutterBottom>
                        {value.selectedProgramName}
                      </Typography>
                    </td>
                  </tr>
                  )
                })}
                </>) : (<></>)}
              </tbody>


            </table>
            </Grid>
          </Grid>
      </>) : (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{height: "100%"}}
      >
        <img src={CHALKLogoGIF} alt="Loading" width="60%" style={{maxHeight: '100%'}} />
      </Grid>
      )}
      </>) : (this.state.view === 2 ? (<>
          <Grid item xs={1} style={{marginTop: '45px'}}>

            <Grid container direction='column' justifyContent='center' alignItems='flex-start' spacing={3}>
              <Grid item>
                <Typography variant="h6" gutterBottom style={{marginTop:'10px'}}>
                  Teacher
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom style={{marginTop:'10px'}}>
                  Coach
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom style={{marginTop:'3px'}}>
                  Site
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom style={{marginTop:'2px'}}>
                  Program
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={5} style={{marginTop: '45px'}}>
            <Grid container direction='column' justifyContent='center' alignItems='center' spacing={3}>
              <Grid item>
                <Grid container direction='row' justifyContent='center' spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                    // style={{width:'160px'}}
                    id="teacher-search"
                    label="First Name"
                    type="search"
                    // className={classes.search}
                    variant="outlined"
                    // onChange={onChangeText}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                    // style={{width:'160px'}}
                    id="teacher-search"
                    label="Last Name"
                    type="search"
                    // className={classes.search}
                    variant="outlined"
                    // onChange={onChangeText}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <FormControl variant="outlined">
                  <StyledSelect
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    // value={this.state.selectedCoach}
                    // onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    //   this.setState({selectedCoach: event.target.value})}
                    name="selectedCoach"
                    // disabled={!(this.props.coachData.length > 0) /* Disable if there are no site options */}
                  >
                    {/* {this.props.coachData.map(
                      (coach, index)=>{
                        if(coach.id !== "") {
                        return (
                            <MenuItem value={coach.id} key={index}>
                              {coach.lastName + ", " + coach.firstName}
                            </MenuItem>
                        )}
                        })} */}
                  </StyledSelect>
                {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl variant="outlined">
                  <StyledSelect
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    // value={this.state.selectedCoach}
                    // onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    //   this.setState({selectedCoach: event.target.value})}
                    name="selectedCoach"
                    // disabled={!(this.props.coachData.length > 0) /* Disable if there are no site options */}
                  >
                    {/* {this.props.coachData.map(
                      (coach, index)=>{
                        if(coach.id !== "") {
                        return (
                            <MenuItem value={coach.id} key={index}>
                              {coach.lastName + ", " + coach.firstName}
                            </MenuItem>
                        )}
                        })} */}
                  </StyledSelect>
                {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl variant="outlined">
                  <StyledSelect
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    // value={this.state.selectedCoach}
                    // onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    //   this.setState({selectedCoach: event.target.value})}
                    name="selectedCoach"
                    // disabled={!(this.props.coachData.length > 0) /* Disable if there are no site options */}
                  >
                    {/* {this.props.coachData.map(
                      (coach, index)=>{
                        if(coach.id !== "") {
                        return (
                            <MenuItem value={coach.id} key={index}>
                              {coach.lastName + ", " + coach.firstName}
                            </MenuItem>
                        )}
                        })} */}
                  </StyledSelect>
                {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

            <Grid container direction='row' justifyContent='center' alignItems='center' style={{marginTop:'45px'}}>
            <Grid item xs={1}/>
              <Grid item xs={1}>
                <Button >
                  {this.state.saved ? (
                    <img
                      alt="Save"
                      src={SaveGrayImage}
                      style={{
                        width: '80%',
                        minWidth:'70px'
                      }}
                    />
                  ) : (
                    <img
                      alt="Save"
                      src={SaveImage}
                      style={{
                        width: '80%',
                        minWidth:'70px'
                      }}
                    />
                  )}
                </Button>
              </Grid>
            </Grid>
    </>) : (this.state.view === 3 ? (<>
      <Grid container direction='row' justifyContent='center' alignItems='center' style={{marginTop: '60px'}}>
          <Grid item xs={1} style={{marginTop: '45px'}}>

            <Grid container direction='column' justifyContent='center' alignItems='flex-start' spacing={3}>
              <Grid item>
                <Typography variant="h6" gutterBottom style={{marginTop:'10px'}}>
                  Coach
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom style={{marginTop:'10px'}}>
                  Site
                </Typography>
              </Grid>
            </Grid>
            </Grid>

            <Grid item xs={4} style={{marginTop: '45px'}}>
            <Grid container direction='column' justifyContent='center' alignItems='center' spacing={3}>
              <Grid item>
                <FormControl variant="outlined">
                  <StyledSelectTransfer
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    // value={this.state.selectedCoach}
                    // onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    //   this.setState({selectedCoach: event.target.value})}
                    name="selectedCoach"
                    // disabled={!(this.props.coachData.length > 0) /* Disable if there are no site options */}
                  >
                    {/* {this.props.coachData.map(
                      (coach, index)=>{
                        if(coach.id !== "") {
                        return (
                            <MenuItem value={coach.id} key={index}>
                              {coach.lastName + ", " + coach.firstName}
                            </MenuItem>
                        )}
                        })} */}
                  </StyledSelectTransfer>
                {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl variant="outlined">
                  <StyledSelectTransfer
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    // value={this.state.selectedCoach}
                    // onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    //   this.setState({selectedCoach: event.target.value})}
                    name="selectedCoach"
                    // disabled={!(this.props.coachData.length > 0) /* Disable if there are no site options */}
                  >
                    {/* {this.props.coachData.map(
                      (coach, index)=>{
                        if(coach.id !== "") {
                        return (
                            <MenuItem value={coach.id} key={index}>
                              {coach.lastName + ", " + coach.firstName}
                            </MenuItem>
                        )}
                        })} */}
                  </StyledSelectTransfer>
                {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
                </FormControl>
              </Grid>
            </Grid>
            </Grid>

            <Grid item xs={1} style={{marginTop: '45px'}}>

            <Grid container direction='column' justifyContent='center' alignItems='center' spacing={3}>
              <Grid item>
                <ForwardIcon style={{fill: 'white', fontSize:'40', marginTop:'0px',}}/>
              </Grid>
              <Grid item>
                <ForwardIcon style={{fill: 'blue', fontSize:'40', marginTop:'4px',}}/>
              </Grid>
            </Grid>
            </Grid>

            <Grid item xs={4} style={{marginTop: '45px'}}>
            <Grid container direction='column' justifyContent='center' alignItems='center' spacing={3}>
              <Grid item>
                <ForwardIcon style={{fill: 'white', fontSize:'40', marginTop:'0px',}}/>
              </Grid>
              <Grid item>
                <FormControl variant="outlined">
                  <StyledSelectTransfer
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    // value={this.state.selectedCoach}
                    // onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    //   this.setState({selectedCoach: event.target.value})}
                    name="selectedCoach"
                    // disabled={!(this.props.coachData.length > 0) /* Disable if there are no site options */}
                  >
                    {/* {this.props.coachData.map(
                      (coach, index)=>{
                        if(coach.id !== "") {
                        return (
                            <MenuItem value={coach.id} key={index}>
                              {coach.lastName + ", " + coach.firstName}
                            </MenuItem>
                        )}
                        })} */}
                  </StyledSelectTransfer>
                {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
                </FormControl>
              </Grid>
            </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='center' alignItems='center' style={{marginTop:'45px'}}>
            <Grid item xs={1}/>
              <Grid item xs={1}>
                <Button >
                  {this.state.saved ? (
                    <img
                      alt="Save"
                      src={SaveGrayImage}
                      style={{
                        width: '80%',
                        minWidth:'70px'
                      }}
                    />
                  ) : (
                    <img
                      alt="Save"
                      src={SaveImage}
                      style={{
                        width: '80%',
                        minWidth:'70px'
                      }}
                    />
                  )}
                </Button>
              </Grid>
            </Grid>
      </Grid>
    </>) : (this.state.view === 4 ? (<>
      <Grid item xs={1} style={{marginTop: '45px'}}>

        <Grid container direction='column' justifyContent='center' alignItems='flex-start' spacing={3}>
          <Grid item>
            <Typography variant="h6" gutterBottom style={{marginTop:'5px'}}>
              Teacher
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" gutterBottom style={{marginTop:'0px'}}>
              Coach
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" gutterBottom style={{marginTop:'3px'}}>
              Site
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" gutterBottom style={{marginTop:'2px'}}>
              Program
            </Typography>
          </Grid>
        </Grid>
        </Grid>

        <Grid item xs={5} style={{marginTop: '45px'}}>
        <Grid container direction='column' justifyContent='center' alignItems='center' spacing={3}>
          <Grid item>
            <FormControl variant="outlined">
              <StyledSelect
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                // value={this.state.selectedCoach}
                // onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                //   this.setState({selectedCoach: event.target.value})}
                name="selectedCoach"
                // disabled={!(this.props.coachData.length > 0) /* Disable if there are no site options */}
              >
                {/* {this.props.coachData.map(
                  (coach, index)=>{
                    if(coach.id !== "") {
                    return (
                        <MenuItem value={coach.id} key={index}>
                          {coach.lastName + ", " + coach.firstName}
                        </MenuItem>
                    )}
                    })} */}
              </StyledSelect>
            {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl variant="outlined">
              <StyledSelect
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                // value={this.state.selectedCoach}
                // onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                //   this.setState({selectedCoach: event.target.value})}
                name="selectedCoach"
                // disabled={!(this.props.coachData.length > 0) /* Disable if there are no site options */}
              >
                {/* {this.props.coachData.map(
                  (coach, index)=>{
                    if(coach.id !== "") {
                    return (
                        <MenuItem value={coach.id} key={index}>
                          {coach.lastName + ", " + coach.firstName}
                        </MenuItem>
                    )}
                    })} */}
              </StyledSelect>
            {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl variant="outlined">
              <StyledSelect
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                // value={this.state.selectedCoach}
                // onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                //   this.setState({selectedCoach: event.target.value})}
                name="selectedCoach"
                // disabled={!(this.props.coachData.length > 0) /* Disable if there are no site options */}
              >
                {/* {this.props.coachData.map(
                  (coach, index)=>{
                    if(coach.id !== "") {
                    return (
                        <MenuItem value={coach.id} key={index}>
                          {coach.lastName + ", " + coach.firstName}
                        </MenuItem>
                    )}
                    })} */}
              </StyledSelect>
            {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl variant="outlined">
              <StyledSelect
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                // value={this.state.selectedCoach}
                // onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                //   this.setState({selectedCoach: event.target.value})}
                name="selectedCoach"
                // disabled={!(this.props.coachData.length > 0) /* Disable if there are no site options */}
              >
                {/* {this.props.coachData.map(
                  (coach, index)=>{
                    if(coach.id !== "") {
                    return (
                        <MenuItem value={coach.id} key={index}>
                          {coach.lastName + ", " + coach.firstName}
                        </MenuItem>
                    )}
                    })} */}
              </StyledSelect>
            {/* <FormHelperText>{this.state.errorMessages['coach']}</FormHelperText> */}
            </FormControl>
          </Grid>
        </Grid>
        </Grid>

        <Grid container direction='row' justifyContent='center' alignItems='center' style={{marginTop:'45px'}}>
        <Grid item xs={1}/>
          <Grid item xs={1}>
            <Button >
              {this.state.saved ? (
                <img
                  alt="Save"
                  src={SaveGrayImage}
                  style={{
                    width: '80%',
                    minWidth:'70px'
                  }}
                />
              ) : (
                <img
                  alt="Save"
                  src={SaveImage}
                  style={{
                    width: '80%',
                    minWidth:'70px'
                  }}
                />
              )}
            </Button>
          </Grid>
        </Grid>
    </>) : (null))))}
      </Grid>
    </>)
  }
}

Coaches.contextType = FirebaseContext
export default Coaches
