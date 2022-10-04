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
import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import ForwardIcon from '@material-ui/icons/Forward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import FolderIcon from '@material-ui/icons/Folder'
import CHALKLogoGIF from '../../assets/images/CHALKLogoGIF.gif';
import FirebaseContext from '../Firebase/FirebaseContext'
import SaveImage from '../../assets/images/SaveImage.svg'
import SaveGrayImage from '../../assets/images/SaveGrayImage.svg'

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
}

interface State {
  view: number
  saved: boolean
}

class Teachers extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      view: 1,
      saved: false
    }

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
                                Back to Teachers
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
                                Back to Teachers
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
                                Back to Teachers
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                </>)}
            </Grid>
        </Grid>
        {this.state.view === 1 ? (<>
        <Grid item xs={6}><span></span></Grid>
        <Grid item xs={3}>
        <Grid container direction='column'>
            <Grid item>
                <Grid container direction='row' >
                    <Grid item>
                        <AddIcon style={{fill: 'white', fontSize:'40', marginTop:'15px'}}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
            <Grid container direction='row' justifyContent='flex-end'>
              <Grid item style={{marginRight:'4vw'}}>
                <TextField
                  style={{width:'160px'}}
                  id="teacher-search"
                  label="Search"
                  type="search"
                  // className={classes.search}
                  variant="outlined"
                  // onChange={onChangeText}
                />
              </Grid>
            </Grid>
          </Grid>
      </Grid>
      </Grid>
      <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Grid
          item
          xs={11}
          style={{ 
            width: '100%', 
            // height: '38vh', 
            // border: '2px solid #0988ec', 
            // borderRadius: '0.5em', 
            marginTop: '100px' }}
        >
          {this.props.teacherData.length > 0 ? (
          <table style={{borderCollapse: 'collapse', width: '100%' }}>
            <thead style={{borderBottom:'2px solid #0988ec'}}>
              <tr>
                <th colSpan={2}>
                  <Typography variant="h6" gutterBottom>
                    <strong>Teacher</strong>
                  </Typography>
                </th>
                <th colSpan={2}>
                  <Typography variant="h6" gutterBottom>
                    <strong>Instructional Coach</strong>
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
                <th>
                  <Typography variant="h6" gutterBottom>
                    Last Name
                  </Typography>
                </th>
                <th>
                  <Typography variant="h6" gutterBottom>
                    First Name
                  </Typography>
                </th>
                <th>
                  <Typography variant="h6" gutterBottom>
                    Last Name
                  </Typography>
                </th>
                <th>
                  <Typography variant="h6" gutterBottom>
                    First Name
                  </Typography>
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.teacherData.map((value, index) => {
                return (
                <tr 
                key={index} 
                onClick={() => this.handlePageChange(4)}
                >
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
                      {value.coachLastName}
                    </Typography>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <Typography variant="h6" gutterBottom>
                      {value.coachFirstName}  
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
              )})}
            </tbody>
          </table>
          ) : (
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{height: "100%"}}
            >
              <img src={CHALKLogoGIF} alt="Loading" width="60%" />
            </Grid>
          )}
        </Grid>
      </Grid>
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
              <Grid item>
                <ForwardIcon style={{fill: 'blue', fontSize:'40', marginTop:'0px',  marginBottom:'0px',}}/> 
              </Grid>
              <Grid item>
                <ForwardIcon style={{fill: 'blue', fontSize:'40', marginTop:'0px', marginBottom:'1px',}}/>
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

Teachers.contextType = FirebaseContext
export default Teachers