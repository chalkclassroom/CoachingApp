import * as React from 'react';
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AdminSchoolImage from '../../assets/images/AdminSchoolImage.svg';
import * as Constants from '../../constants';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.MathColor
    }
  }
});

const styles: object = {
  overlayImage: {
    color: "white",
    fontSize: 100,
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center"
  },
  card: {
    height: "160px;",
    boxShadow: "none"
  },
  cardAction: {
    height: "160px",
    width: "160px"
  }
};

interface Props {
  classes: Style
}

interface Style {
  overlayImage: string,
  card: string,
  cardAction: string
}

/**
 * reminders for transition time observation
 * @param {Props} props 
 * @return {ReactElement}
 */
function TransitionObservationPopUp(props: Props): React.ReactElement {
  const { classes } = props;
  return (
    <div>
      <MuiThemeProvider theme={Theme}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Typography variant="h4">
              Transition Time Observation
            </Typography>
          </Grid>
          <Grid item style={{paddingTop: '2em'}}>
            <Typography variant="h6" align="center">
              When you observe a transtion in the classroom, choose a reason
              for the transition and start the timer until the transition ends.
            </Typography>
          </Grid>
          <Grid item style={{paddingTop: '2em'}}>
            <Grid container direction="column" justify="center" alignItems="center">
              <Grid item>
                <Typography variant="h6">
                  ACTIVITY SETTING: Any time of the day!
                </Typography>
                {/* <img src={AdminSchoolImage} alt="school" />
                <Typography variant="h6">
                  Any time of the day!
                </Typography> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </div>
  )
}

TransitionObservationPopUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TransitionObservationPopUp);