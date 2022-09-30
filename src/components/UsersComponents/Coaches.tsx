import React, { Component } from 'react'
import AddIcon from '@material-ui/icons/Add'
import ForwardIcon from '@material-ui/icons/Forward';
import {
  FormControl,
  FormHelperText,
  Grid,
  Typography,
  withStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'

const StyledSelect = withStyles({
  root: {
    padding: '11px 14px',
    width: '250px',
  },
  disabled: {
    opacity: 0.3
  }
})(Select);

export default class Coaches extends Component {
  componentDidMount(): void {
      console.log(this.props.coachData)
  }
  render() {
    return (<>
    {this.props.coachData ? (
      <Grid container direction='row'>
        <Grid item xs={3}>
            <Grid container direction='column' style={{ marginLeft:'30px'}}>
                <Grid item xs={6}>
                    <Grid container direction='row' >
                        <Grid item>
                            <AddIcon style={{fill: 'green', fontSize:'40', marginTop:'15px'}}/>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" gutterBottom style={{marginTop:'20px' }}>
                                Add
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                <Grid container direction='row'>
                        <Grid item>
                            <ForwardIcon style={{fill: 'blue', fontSize:'40', marginTop:'15px',}}/>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" gutterBottom style={{marginTop:'20px',}}>
                                Transfer
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
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
                      // value={this.state.selectedCoach}
                      // onChange={this.handleChangeDropdown}
                      name="selectedCoach"
                      // disabled={!(this.state.coachOptions.length > 0) /* Disable if there are no site options */}
                    >
                      {this.props.coachData.map(
                        (coach, index)=>{
                          return <MenuItem value={coach.id} key={index}>
                                {coach.lastName + ", " + coach.firstName}
                              </MenuItem>
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
            style={{ width: '100%', height: '38vh', border: '2px solid #0988ec', borderRadius: '0.5em', marginTop:'60px' }}
            >
            <table style={{borderCollapse: 'collapse', width: '100%' }}>
              <thead>
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
                
              </tbody>


            </table>
            </Grid>
          </Grid>
      </Grid>
      ) : (
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
    </>)
  }
}
