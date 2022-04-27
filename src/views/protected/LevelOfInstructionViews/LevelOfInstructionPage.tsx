import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import FirebaseContext from '../../../components/Firebase/FirebaseContext';
import AppBar from '../../../components/AppBar';
import Dashboard from '../../../components/Dashboard';
import InstructionCounter from '../../../components/LevelOfInstructionComponents/InstructionCounter';
import TeacherModal from '../HomeViews/TeacherModal';
import * as Types from '../../../constants/Types';
import Firebase from '../../../components/Firebase'
import {emptyLoiStack} from "../../../state/actions/level-of-instruction";
import withObservationWrapper from "../../../components/HOComponents/withObservationWrapper";

const styles: object = {
  root: {
    flexGrow: 1,
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  backButton: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
    color: '#333333',
    borderRadius: 3,
    textTransform: 'none'
  },
  main: {
    height: '100%',
    paddingTop: '0.5em',
    paddingBottom: '0.5em'
  },
  grid: {
    direction: 'row'
  },
  dashboardGrid: {
    width: '25%'
  },
  contentGrid: {
    width: '75%'
  },
  // ipad landscape
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape)': {
    main: {
      height: '90vh',
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)': {
    main: {
      height: '90vh',
      paddingTop: 0,
      paddingBottom: 0
    },
    grid: {
      direction: 'column'
    },
    dashboardGrid: {
      width: '100%',
      height: '25%'
    },
    contentGrid: {
      width: '100%',
      height: '75%'
    }
  }
};

interface State {
  teacherModal: boolean
}

interface Props {
  classes: {
    root: string,
    backButton: string,
    main: string,
    grid: string,
    dashboardGrid: string,
    contentGrid: string
  },
  teacherSelected: Types.Teacher
  preBack(): Promise<boolean>
  emptyLoiStack(): void
}

/**
 * Level Of Instruction Tool
 * @class LevelOfInstructionPage
 */
class LevelOfInstructionPage extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
    
    this.state = {
      teacherModal: false
    }
  }

  handleCloseTeacherModal = (): void => {
    this.setState({ teacherModal: false })
  };

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    if (!this.props.teacherSelected) {
      this.setState({ teacherModal: true })
    }
  };

  componentWillUnmount() {
    console.log('clearing LOI')
    this.props.emptyLoiStack()
  }

  /**
   * @param {string} type
   */
  static propTypes = {
    classes: PropTypes.object.isRequired,
    teacherSelected: PropTypes.exact({
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      notes: PropTypes.string,
      id: PropTypes.string,
      phone: PropTypes.string,
      role: PropTypes.string,
      school: PropTypes.string
    }).isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      this.props.teacherSelected ? (
        <div className={classes.root}>
          <FirebaseContext.Consumer>
            {(firebase: Firebase): React.ReactNode => <AppBar confirmAction={this.props.preBack} firebase={firebase} />}
          </FirebaseContext.Consumer>
          <main className={classes.main}>
            <Grid
              container
              alignItems="center"
              justify="space-around"
              style={{height: '100%'}}
              className={classes.grid}
            >
              <Grid item className={classes.dashboardGrid}>
                <Grid container alignItems={'center'} justify={'center'} direction={'column'} style={{height: '100%'}}>
                  <Dashboard
                    type="IN"
                    completeObservation={true}
                  />
                </Grid>
              </Grid>
              <Grid item className={classes.contentGrid}>
                <Grid container alignItems={'center'} justify={'center'} direction={'column'} style={{height: '100%'}}>
                  <FirebaseContext.Consumer>
                    {(firebase: {
                      auth: {
                        currentUser: {
                          uid: string
                        }
                      },
                      handleSession(entry: {teacher: string, observedBy: string, type: string}): void,
                      handlePushInstruction(insType: string): void,
                    }): React.ReactNode => (
                      <InstructionCounter
                        firebase={firebase}
                      />
                    )}
                  </FirebaseContext.Consumer>
                </Grid>
              </Grid>
            </Grid>
          </main>
        </div>
      ) : (
        <FirebaseContext.Consumer>
          {(firebase: {
            getTeacherList(): Promise<Types.Teacher[]>
          }): React.ReactElement => (
            <TeacherModal
              handleClose={this.handleCloseTeacherModal}
              firebase={firebase}
              type={"Observe"}
            />
          )}
        </FirebaseContext.Consumer>
      )
    );
  }
}

const mapStateToProps = (state: Types.ReduxState): {
  teacherSelected: Types.Teacher
} => {
  return {
    teacherSelected: state.teacherSelectedState.teacher
  };
};

export default connect(mapStateToProps, {emptyLoiStack})(withStyles(styles)(withObservationWrapper(LevelOfInstructionPage)));
