import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";

/* const theme = createMuiTheme({
  palette: {
    primary: '#459aeb'
  }
}) */

const styles = {
  button: {
    color: '#ffffff',
    backgroundColor: '#459aeb',
    fontSize: 14
  }
};

class HowEmpowers extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const { classes } = this.props;
    return(
      <Grid container direction="column">
        <Grid item>
          <Grid container direction="row">
            <Grid item xs={2} />
            <Grid item xs={2}>
              <Grid container direction="row" justify="flex-end" alignContent="center">
                <img alt={this.props.iconAlt} src={this.props.icon} width="50%" style={{paddingRight: 10}}/>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Typography style={{fontFamily: 'Avenir', fontSize: 20, color: '#2f4b65'}}>
                {this.props.title}
              </Typography>
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row">
            <Grid item xs={2} />
            <Grid item xs={2} />
            <Grid item xs={6}>
              <Typography style={{fontFamily: 'Avenir', fontSize: 16, color: '#2f4b65'}}>
                {this.props.text}
              </Typography>
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </Grid>
        {this.props.button ? (
          <Grid item style={{paddingTop: 10, paddingBottom: 10}}>
          <Grid container direction="row">
            <Grid item xs={2} />
            <Grid item xs={2} />
            <Grid item xs={6}>
              <Fab variant="extended" className={classes.button}>
                <strong>{this.props.button}</strong>
              </Fab>
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </Grid>
        ) : (
          null
        )}
      </Grid>
    );
  }
}

export default withStyles(styles)(HowEmpowers);
