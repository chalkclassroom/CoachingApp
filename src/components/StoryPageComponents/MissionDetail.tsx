import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


const styles: object = {
  button: {
    color: '#ffffff',
    backgroundColor: '#459aeb',
    fontSize: 14,
    fontFamily: 'Arimo',
    letterSpacing: '0.03em'
  },
  titleText: {
    fontSize: 30,
    color: '#000000',
    fontFamily: 'Arimo',
    fontWeight: 'bold'
  },
  rounded: {
    backgroundColor: '#86CCFF',
    height:200,
    width:200
  },
  vertical: {
    borderLeft: '15px solid #86CCFF',
    //backgroundColor: '#86CCFF',
    height: '5em',
    marginLeft: '2.1em'
  },
  
  bodyText: {
    fontSize: 24,
    color: 'red',
    display: 'flex',
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
/*   iconAlt: string,
  icon: string,
  title: string,
  iconAlt2: string,
  icon2: string,
  title2: string,
  text: string,
  text2: string,
  button: string,
  button2: string,
  onClick(): void,
  onClick2(): void, */
 /*  iconAlt: string,
  icon: string, */
  title: string,
 /*  text: string,
  button: string, */
/*   onClick(): void */
}

/**
 * formatting for details on landing page
 */
class MissionDetail extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props){
    super(props);
  }

  static propTypes = {
    classes: PropTypes.object,
    /* iconAlt: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string,
    iconAlt2: PropTypes.string,
    icon2: PropTypes.string,
    title2: PropTypes.string,
    text: PropTypes.string,
    text2: PropTypes.string,
    button: PropTypes.string,
    button2: PropTypes.string,
    onClick: PropTypes.func,
    onClick2: PropTypes.func, */
  /*   iconAlt: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string, */
    text: PropTypes.string,
/*     button: PropTypes.string,
    onClick: PropTypes.func */
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
        
        <Grid item style={{paddingTop: '1em'}}>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start">
            <Grid item xs={2} />
            <Grid item xs={10} style={{paddingLeft: '1em', paddingRight: '1em'}}>
              <Typography className={classes.bodyText}>
                {this.props.text}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
       
      </Grid>
      </div>
      <div className={classes.mobileRoot}>
      <Grid container direction="column">
        
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
      
      </Grid>
      </div>
      </div>
    );
  }
}

export default withStyles(styles)(MissionDetail);
