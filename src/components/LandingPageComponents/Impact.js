import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";


const styles = {
  titleText: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Arimo'
  },
  bodyText: {
    fontSize: 20,
    color: '#2f4b65',
    fontFamily: 'Arimo'
  },
  "@media (max-width: 700px)": {
    root: {
      display: "none"
    },
  },
  "@media (min-width: 701px)": {
    mobileRoot: {
      display: "none"
    }
  }
};

class Impact extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const { classes } = this.props;
    return(
      <div>
        <div className={classes.root}>
          <Grid container direction="row" justify="flex-start" alignItems={this.props.position}>
            <Grid item xs={2} />
            <Grid item xs={3}>
              <Grid container direction="row" justify="flex-end" alignItems="center">
                <Grid container direction="column" justify="center" alignItems="center">
                  <Grid item>
                    <img alt="School" src={this.props.icon} style={{paddingTop:this.props.paddingTop}}/>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.titleText} style={{color: this.props.color}}>
                      <strong>{this.props.title}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid container direction="row" justify="flex-start" alignItems="center">
                <Typography className={classes.bodyText}>
                  {this.props.text}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </div>
        <div className={classes.mobileRoot}>
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
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Impact);