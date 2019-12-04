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
    fontSize: 14,
    fontFamily: 'Arimo',
    letterSpacing: '0.03em'
  },
  titleText: {
    fontSize: 22,
    color: '#2f4b65',
    //paddingRight: '20%',
    fontFamily: 'Arimo'
  },
  bodyText: {
    fontSize: 18,
    color: '#2f4b65',
    //paddingRight: '20%',
    fontFamily: 'Arimo'
  }
};

class LandingDetailMobile extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const { classes } = this.props;
    return(
      <Grid container direction="column">
        <Grid item>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={3}>
              <Grid container direction="row" justify="flex-end" alignItems="flex-start" style={{height: '100%'}}>
                <img alt={this.props.iconAlt} src={this.props.icon} width="70%"/>
              </Grid>
            </Grid>
            <Grid item xs={9} style={{paddingLeft: '1em', paddingRight: '1em'}}>
              <Typography className={classes.titleText}>
                {this.props.title}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{paddingTop: '1em'}}>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
            <Grid item xs={3} />
            <Grid item xs={9} style={{paddingLeft: '1em', paddingRight: '1em'}}>
              <Typography className={classes.bodyText}>
                {this.props.text}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {this.props.button ? (
          <Grid item style={{paddingTop: '1em', paddingBottom: '2em'}}>
            <Grid container direction="row" justify="flex-start" alignItems="flex-start">
              <Grid item xs={4} />
              <Grid item xs={8}>
                <Fab variant="extended" onClick={this.props.onClick} className={classes.button}>
                  <strong>{this.props.button}</strong>
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          null
        )}
      </Grid>
    );
  }
}

export default withStyles(styles)(LandingDetailMobile);
