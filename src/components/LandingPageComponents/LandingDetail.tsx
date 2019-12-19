import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import { withStyles } from "@material-ui/core/styles";

const styles: object = {
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
    paddingRight: '20%',
    fontFamily: 'Arimo'
  },
  bodyText: {
    fontSize: 18,
    color: '#2f4b65',
    paddingRight: '20%',
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

interface Style {
  root: string,
  mobileRoot: string,
  button: string,
  titleText: string,
  bodyText: string,
  '@media (max-width: 700px)': string,
  '@media (min-width: 701px)': string
}

interface Props {
  classes: Style,
  iconAlt1: string,
  icon1: string,
  title1: string,
  iconAlt2: string,
  icon2: string,
  title2: string,
  text1: string,
  text2: string,
  button1: string,
  button2: string,
  onClick1(): void,
  onClick2(): void,
  iconAlt: string,
  icon: string,
  title: string,
  text: string,
  button: string,
  onClick(): void
}

/**
 * formatting for details on landing page
 */
class LandingDetail extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props){
    super(props);
  }

  static propTypes = {
    classes: PropTypes.object,
    iconAlt1: PropTypes.string,
    icon1: PropTypes.string,
    title1: PropTypes.string,
    iconAlt2: PropTypes.string,
    icon2: PropTypes.string,
    title2: PropTypes.string,
    text1: PropTypes.string,
    text2: PropTypes.string,
    button1: PropTypes.string,
    button2: PropTypes.string,
    onClick1: PropTypes.func,
    onClick2: PropTypes.func,
    iconAlt: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    button: PropTypes.string,
    onClick: PropTypes.func
  }

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;
    return(
      <div>
      <div className={classes.root}>
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
                <Typography className={classes.titleText}>
                  {this.props.title1}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Grid container direction="row" justify="flex-end" alignContent="center" style={{height: '100%'}}>
                  <img alt={this.props.iconAlt2} src={this.props.icon2} height={100} width={100} style={{paddingRight: 10}}/>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.titleText}>
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
                <Typography className={classes.bodyText}>
                  {this.props.text1}
                </Typography>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={4}>
                <Typography className={classes.bodyText}>
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
      </div>
      <div className={classes.mobileRoot}>
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
      </div>
      </div>
    );
  }
}

export default withStyles(styles)(LandingDetail);
