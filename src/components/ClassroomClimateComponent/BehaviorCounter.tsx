import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  popOffClimateStack,
  pushOntoClimateStack
} from "../../state/actions/classroom-climate";
import {
  Grid,
  Button,
  Fab,
  Typography
} from '@material-ui/core';
import ReplySharpIcon from '@material-ui/icons/ReplySharp';
import * as Types from '../../constants/Types';
import * as Constants from '../../constants/Constants';

const styles: object = {
  category: {
    borderWidth: 1,
    borderColor: '#000',
    border: 0,
    color: '#fff !important',
    height: 48,
    width: '100%',
    borderRadius: '3px',
    textTransform: 'Capitalize',
    fontWeight: 'normal',
    fontSize: '1.2em',
    fontFamily: 'Arimo'
  },
  button: {
    margin: '-10px',
    width: 180,
    height: 180,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Arimo',
    color: '#fff !important',
    zIndex: '99',
    textTransform: 'Capitalize',
    fontWeight: 'bold',
    fontSize: '1.2em',
    paddingRight: '0.5em',
    paddingLeft: '0.5em'
  }
};

interface Props {
  firebase: {
    auth: {
      currentUser: {
        uid: string
      }
    },
    handleSession(entry: object): void,
    handlePushClimate(entry: object): void
  },
  pushOntoClimateStack(entry: object): void,
  popOffClimateStack(): void,
  climateStackSize: number,
  teacherSelected: {
    email: string,
    firstName: string,
    lastName: string,
    notes: string,
    id: string,
    phone: string,
    role: string,
    school: string
  },
  classes: {
    category: string,
    button: string
  }
}

/**
 * Behavior Type Buttons for Climate Observation
 * @class BehaviorCounter
 * @param {Props} props
 */
class BehaviorCounter extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
    const mEntry = {
      teacher: this.props.teacherSelected.id,
      observedBy: this.props.firebase.auth.currentUser.uid,
      type: "climate"
    };
    this.props.firebase.handleSession(mEntry);
  }

  /**
   * @param {string} type
   */
  handlePushFire = (type: string): void => {
    const mEntry = {
      BehaviorResponse: type,
      Type: "climate"
    };
    this.props.firebase.handlePushClimate(mEntry);
    this.props.pushOntoClimateStack(mEntry);
  };

  handleUndo = (): void => {
    if (this.props.climateStackSize > 0) {
      this.props.popOffClimateStack();
      const mEntry = {
        BehaviorResponse: "UNDO",
        Type: "UNDO"
      };
      this.props.firebase.handlePushClimate(mEntry);
    }
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div>
        <Grid container direction="row" justify="center" alignItems="stretch">
          <Grid item xs={3} style={{height: '100%'}}>
            <Grid container direction="row" justify="flex-end" alignItems="center" style={{height: '100%'}}>
              <Grid item style={{height: '100%'}}>
                <Grid container direction="column" justify="center" alignItems="center" style={{height: '100%'}}>
                  <Grid item style={{height: '25%'}}>
                    <Fab
                      onClick={(): void => this.handlePushFire("nonspecificapproval")}
                      className={classes.button}
                      style={{ backgroundColor: Constants.ClimateTypeColors.nonSpecificApproval }}
                    >
                      <Typography variant="h5" style={{fontFamily: 'Arimo', fontWeight: 'bold'}}>
                        Non-Specific Approval
                      </Typography>
                    </Fab>
                  </Grid>
                  <Grid item style={{height: 120}} />
                  <Grid item style={{height: '25%'}}>
                    <Fab
                      onClick={(): void => this.handlePushFire("disapproval")}
                      className={classes.button}
                      style={{ backgroundColor: Constants.ClimateTypeColors.disapproval }}
                    >
                      <Typography variant="h5" style={{fontFamily: 'Arimo', fontWeight: 'bold'}}>
                        Disapproval
                      </Typography>
                    </Fab>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container direction="column" justify="center" alignItems="center" style={{height: '100%'}}>
              <Grid item style={{width: '100%', height: '25%'}}>
                <Grid container direction="column" justify="center" style={{height: '100%'}}>
                  <Button
                    disabled
                    style={{
                      backgroundColor: Constants.ClimateTypeColors.positiveBar,
                      color: '#fff!important',
                      height: '52%',
                      width: '100%',
                      padding: 0
                    }}
                    className={classes.category}
                  />
                </Grid>
              </Grid>
              <Grid item style={{height: '20%'}}>
                <Grid container direction="column" justify="flex-end" style={{height: '100%'}}>
                  <Typography variant="h2" align="center" style={{fontFamily: 'Arimo'}}>
                    {this.props.climateStackSize}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item style={{height: '20%'}}>
                <Button onClick={(): void => this.handleUndo()} id="undo">
                  <ReplySharpIcon style={{ fontSize: '80px' }} width={100} height={100} />
                </Button>
              </Grid>
              <Grid item style={{width: '100%', height: '25%'}}>
                <Grid container direction="column" justify="center" style={{height: '100%'}}>
                  <Button
                    disabled
                    style={{
                      backgroundColor: Constants.ClimateTypeColors.negativeBar,
                      color: '#fff!important',
                      height: '52%',
                      width: '100',
                      padding: 0
                    }}
                    className={classes.category}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3} style={{height: '100%'}}>
            <Grid container direction="row" justify="flex-start" alignItems="center" style={{height: '100%'}}>
              <Grid item style={{height: '100%'}}>
                <Grid container direction="column" justify="center" alignItems="center" style={{height: '100%'}}>
                  <Grid item style={{height: '25%'}}>
                    <Fab
                      onClick={(): void => this.handlePushFire("specificapproval")}
                      className={classes.button}
                      style={{ backgroundColor: Constants.ClimateTypeColors.specificApproval }}
                    >
                      <Typography variant="h5" style={{fontFamily: 'Arimo', fontWeight: 'bold'}}>
                        Specific Approval
                      </Typography>
                    </Fab>
                  </Grid>
                  <Grid item style={{height: 120}} />
                  <Grid item style={{height: '25%'}}>
                    <Fab
                      onClick={(): void => this.handlePushFire("redirection")}
                      className={classes.button}
                      style={{ backgroundColor: Constants.ClimateTypeColors.redirection }}
                    >
                      <Typography variant="h5" style={{fontFamily: 'Arimo', fontWeight: 'bold'}}>
                        Redirection
                      </Typography>
                    </Fab>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  };

  static propTypes = {
    teacherSelected: PropTypes.exact({
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      notes: PropTypes.string,
      id: PropTypes.string,
      phone: PropTypes.string,
      role: PropTypes.string,
      school: PropTypes.string
    }).isRequired,
    climateStackSize: PropTypes.number.isRequired,
    firebase: PropTypes.exact({
      auth: PropTypes.exact({
        currentUser: PropTypes.exact({
          uid: PropTypes.string
        })
      }).isRequired,
      handleSession: PropTypes.func,
      handlePushClimate: PropTypes.func
    }).isRequired,
    pushOntoClimateStack: PropTypes.func.isRequired,
    popOffClimateStack: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  }
}

const mapStateToProps = (state: Types.ReduxState): {climateStackSize: number, teacherSelected: Types.Teacher} => {
  return {
    climateStackSize: state.climateStackState.climateStack.length,
    teacherSelected: state.teacherSelectedState.teacher
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, { pushOntoClimateStack, popOffClimateStack })(
    BehaviorCounter
  )
);
