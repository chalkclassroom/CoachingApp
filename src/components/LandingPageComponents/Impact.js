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
  }
};

class Impact extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const { classes } = this.props;
    return(
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={4}>
          <Grid container direction="row" justify="flex-end" alignItems="center">
            <Grid container direction="column" justify="center" alignItems="center">
              <Grid item>
                <img alt="School" src={this.props.icon} />
              </Grid>
              <Grid item>
                <Typography style={{color: this.props.color, fontSize: 24, textAlign: 'center', fontFamily: 'Arimo'}}>
                  <strong>{this.props.title}</strong>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Grid container direction="row" justify="flex-start" alignItems="center">
            <Typography style={{fontSize: 20, color: '#2f4b65', fontFamily: 'Arimo'}}>
              {this.props.text}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Impact);