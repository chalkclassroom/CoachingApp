import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Arimo'
  },
  bodyText: {
    fontSize: 20,
    color: '#2f4b65',
    fontFamily: 'Arimo'
  }
};

class ImpactMobile extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const { classes } = this.props;
    return(
      <Grid container direction="row" justify="flex-start" alignItems={this.props.position}>
        <Grid item xs={4}>
          <Grid container direction="row" justify="flex-end" alignItems="center">
            <Grid container direction="column" justify="center" alignItems="center">
              <Grid item>
                <img alt="School" src={this.props.icon} width="95%" style={{paddingTop:this.props.paddingTop}}/>
              </Grid>
              <Grid item>
                <Typography className={classes.titleText} style={{color: this.props.color}}>
                  <strong>{this.props.title}</strong>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8} style={{paddingLeft: '1em'}}>
          <Grid container direction="row" justify="flex-start" alignItems="center">
            <Typography className={classes.bodyText}>
              {this.props.text}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ImpactMobile);