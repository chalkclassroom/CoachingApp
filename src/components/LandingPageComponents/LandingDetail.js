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
  }
};

class LandingDetail extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const { classes } = this.props;
    return(
      <Grid container direction="column">
        <Grid item>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={1} />
            <Grid item xs={1}>
              <Grid container direction="row" justify="flex-end" alignItems="flex-start" style={{height: '100%'}}>
                <img alt={this.props.iconAlt1} src={this.props.icon1} height={100} width={100} style={{paddingRight: 10}}/>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Typography style={{fontSize: 22, color: '#2f4b65', paddingRight: '20%', fontFamily: 'Arimo'}}>
                {this.props.title1}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Grid container direction="row" justify="flex-end" alignContent="center" style={{height: '100%'}}>
                <img alt={this.props.iconAlt2} src={this.props.icon2} height={100} width={100} style={{paddingRight: 10}}/>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Typography style={{fontSize: 22, color: '#2f4b65', paddingRight: '20%', fontFamily: 'Arimo'}}>
                {this.props.title2}
              </Typography>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </Grid>
        <Grid item style={{paddingTop: '1em'}}>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
            <Grid item xs={2} />
            <Grid item xs={4}>
              <Typography style={{fontSize: 18, color: '#2f4b65', paddingRight: '20%', fontFamily: 'Arimo'}}>
                {this.props.text1}
              </Typography>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={4}>
              <Typography style={{fontSize: 18, color: '#2f4b65', paddingRight: '20%', fontFamily: 'Arimo'}}>
                {this.props.text2}
              </Typography>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </Grid>
        {this.props.button1 || this.props.button2 ? (
          <Grid item style={{paddingTop: '1em'}}>
            <Grid container direction="row" justify="flex-start" alignItems="flex-start">
              <Grid item xs={2} />
              <Grid item xs={4}>
                <Fab variant="extended" onClick={this.props.onClick1} className={classes.button}>
                  <strong>{this.props.button1}</strong>
                </Fab>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={4}>
                <Fab variant="extended" onClick={this.props.onClick2} className={classes.button}>
                  <strong>{this.props.button2}</strong>
                </Fab>
              </Grid>
              <Grid item xs={1} />
            </Grid>
          </Grid>
        ) : (
          null
        )}
      </Grid>
    );
  }
}

export default withStyles(styles)(LandingDetail);
