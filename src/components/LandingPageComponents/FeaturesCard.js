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

class FeaturesCard extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const { classes } = this.props;
    return(
      <Card style={{paddingTop: 2, width: '95%', height: '100%', borderRadius: '10px'}}>
        <CardContent>
          <Grid container direction="column">
            <Grid container direction="row" justify="center" alignItems="center" style={{height: '4em'}}>
              <Grid item xs={3}>
                <img alt={this.props.altText} src={this.props.icon} style={{width: '70%', height: '80%'}}/>
              </Grid>
              <Grid item xs={9}>
                <Typography style={{color: '#2f4b65', fontSize: 22, fontFamily: 'Arimo'}}>
                  {this.props.title}
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" style={{paddingTop: 20}}>
              <Grid item xs={3} />
              <Grid item xs={9}>
                <Typography style={{color: '#5e7b97', fontSize: 18, fontFamily: 'Arimo'}}>
                  {this.props.text}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(FeaturesCard);