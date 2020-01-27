import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import { withStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import EmailIcon from '@material-ui/icons/Email';
import * as Constants from '../../constants';

const styles: object = {
  name: {
    textAlign: 'left',
    paddingTop: 20,
    fontFamily: "Arimo"
  },
  role: {
    textAlign: 'left',
    paddingBottom: 10,
    fontFamily: "Arimo"
  },
  description: {
    textAlign: 'justify',
    paddingBottom: 20,
    fontFamily: "Arimo"
  },
  grid: {
    paddingTop: 10,
    paddingBottom: 10,
  }
}

interface Style {
  name: string,
  role: string,
  description: string,
  grid: string
}

interface Props {
  classes: Style,
  person: { email: string, name: string, role: string, initials: string, description: string, link: string }
}

/**
 * formatting for description of team member
 * @class TeamMemberExpansion
 */
class TeamMemberExpansion extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    person: PropTypes.exact({
      email: PropTypes.string,
      name: PropTypes.string,
      initials: PropTypes.string,
      role: PropTypes.string,
      description: PropTypes.string,
      link: PropTypes.string
    })
  }
  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;
    return(
      <Grid container direction="row" justify="center" alignItems="center" className={classes.grid}>
        <Grid item xs={2} />
          <Grid item xs={8}>
            {this.props.person.email ? (
              <Grid container direction="row" justify="flex-start" alignItems="flex-end">
                <Grid item>
                  <Typography variant="h5" className={classes.name}>
                    <strong>{this.props.person.name}</strong>
                  </Typography>
                </Grid>
                <div style={{paddingLeft: 15}} />
                <Grid item>
                  <a href={`mailto:${this.props.person.email}`}>
                    <EmailIcon style={{color: Constants.TransitionColor}} />
                  </a>
                </Grid>
              </Grid>
            ) : (
              <Typography variant="h5" className={classes.name}>
                <strong>{this.props.person.name}</strong>
              </Typography>
            )}
            <Typography variant="h6" className={classes.role}>
              {this.props.person.role}
            </Typography>
            <Typography variant="subtitle1" className={classes.description}>
              {this.props.person.description}
            </Typography>
            {this.props.person.link? (
              <a href={this.props.person.link} style={{textDecoration: 'none'}}>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                  <Grid item>
                    <Typography variant="subtitle1" className={classes.description} style={{color: Constants.TransitionColor}}>
                      <strong>LEARN MORE ABOUT HER WORK</strong>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <ArrowForwardIcon style={{paddingLeft: 10, color: '#094492'}} />
                  </Grid>
                </Grid>
              </a>
            ) : (
              null
            )}
          </Grid>
        <Grid item xs={2} />
      </Grid>
    );
  }
}

export default withStyles(styles)(TeamMemberExpansion);