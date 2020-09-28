import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ReplySharpIcon from '@material-ui/icons/ReplySharp';
import { connect } from 'react-redux';
import { pushOntoLoiStack, popOffLoiStack } from '../../state/actions/level-of-instruction';
import * as Types from '../../constants/Types';

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
    width: 150,
    height: 150,
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
    handleSession(entry: {teacher: string, observedBy: string, type: string}): void,
    handlePushInstruction(insType: string): void,
  },
  totalVisitCount: number,
  classes: {
    category: string,
    button: string
  },
  pushOntoLoiStack(insType: string): void,
  popOffLoiStack(): void,
  teacherSelected: {
    email: string,
    firstName: string,
    lastName: string,
    notes: string,
    id: string,
    phone: string,
    role: string,
    school: string
  }
}

/**
 * @class InstructionCounter
 */
class InstructionCounter extends React.Component<Props, {}> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
    const mEntry = {
      teacher: this.props.teacherSelected.id,
      observedBy: this.props.firebase.auth.currentUser.uid,
      type: 'level'
    };
    this.props.firebase.handleSession(mEntry);
  }

  /**
   * @param {string} insType
   */
  handlePushFire = (insType: string): void => {
    this.props.firebase.handlePushInstruction(insType);
    this.props.pushOntoLoiStack(insType);
  };

  /**
   * @return {void}
   */
  handleUndo = (): void => {
    if (this.props.totalVisitCount > 0) {
      this.props.popOffLoiStack();
      this.props.firebase.handlePushInstruction('UNDO');
    }
  };

  static propTypes = {
    classes: PropTypes.exact({
      category: PropTypes.string,
      button: PropTypes.string
    }).isRequired,
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
    pushOntoLoiStack: PropTypes.func.isRequired,
    popOffLoiStack: PropTypes.func.isRequired,
    firebase: PropTypes.exact({
      auth: PropTypes.exact({
        currentUser: PropTypes.exact({
          uid: PropTypes.string
        })
      }),
      handleSession: PropTypes.func,
      handlePushInstruction: PropTypes.func
    }).isRequired,
    totalVisitCount: PropTypes.number.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div>
        <Grid justify="center" alignItems="stretch" direction="row" style={{ width: '100%', paddingLeft: '3em', paddingRight: '3em' }}>
          <Grid justify="flex-start" alignItems="center" direction="row">
            <Grid container spacing={0} direction="row" alignItems="center">
              <Grid container xs={12} direction={'row'}>
                <Grid
                  container
                  alignItems="center"
                  justify="flex-end"
                  xl={3}
                  md={3}
                  sm={3}
                  xs={3}
                  style={{ fontFamily: 'Arimo' }}
                >
                  <Fab
                    onClick={(): void => this.handlePushFire('highLevel')}
                    className={classes.button}
                    style={{
                      backgroundColor: '#38761dff',
                      width: 180,
                      height: 180
                    }}
                  >
                    Teacher Asks High-Level Question
                  </Fab>
                </Grid>
                <Grid container alignItems="center" md={5} style={{ fontFamily: 'Arimo' }}>
                  <Button
                    disabled
                    style={{ backgroundColor: '#6aa84fff', color: '#fff!important' }}
                    className={classes.category}
                  >
                    High-Level Instruction
                  </Button>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  xl={3}
                  md={3}
                  sm={3}
                  xs={3}
                  style={{ fontFamily: 'Arimo' }}
                >
                  <Fab
                    onClick={(): void => this.handlePushFire('followUp')}
                    classes={{ root: classes.button }}
                    style={{
                      backgroundColor: '#38761dff',
                      width: 180,
                      height: 180
                    }}
                  >
                    Child Answers High-Level Question
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container xs={12} direction={'row'}>
            <Grid
              container
              alignItems="flex-start"
              xl={3}
              md={3}
              sm={3}
              xs={3}
              style={{ fontFamily: 'Arimo' }}
            />
            <Grid
              container
              alignItems="center"
              justify="center"
              md={5}
              style={{ fontFamily: 'Arimo' }}
            >
              <div style={{ width: 100, height: 100, fontSize: '80px', textAlign: 'center' }}>
                {this.props.totalVisitCount}
              </div>
            </Grid>
            <Grid
              container
              alignItems="flex-start"
              xl={3}
              md={3}
              sm={3}
              xs={3}
              style={{ fontFamily: 'Arimo' }}
            />
          </Grid>
          <Grid container xs={12} direction={'row'}>
            <Grid
              container
              alignItems="flex-start"
              xl={3}
              md={3}
              sm={3}
              xs={3}
              style={{ fontFamily: 'Arimo' }}
            />
            <Grid
              container
              alignItems="center"
              justify="center"
              md={5}
              style={{ fontFamily: 'Arimo' }}
            >
              <Button onClick={(): void => this.handleUndo()}>
                <ReplySharpIcon style={{ fontSize: '80px' }} width={100} height={100} />
              </Button>
            </Grid>
            <Grid
              container
              alignItems="flex-start"
              xl={3}
              md={3}
              sm={3}
              xs={3}
              style={{ fontFamily: 'Arimo' }}
            />
          </Grid>
          <Grid justify="flex-start" alignItems="center" direction="row">
            <Grid container spacing={0} direction="row" alignItems="center">
              <Grid container xs={12} direction={'row'}>
                <Grid
                  container
                  alignItems="center"
                  justify="flex-end"
                  xl={3}
                  md={3}
                  sm={3}
                  xs={3}
                  style={{ fontFamily: 'Arimo' }}
                >
                  <Fab
                    onClick={(): void => this.handlePushFire('lowLevel')}
                    className={classes.button}
                    style={{
                      backgroundColor: '#1155ccff',
                      width: 180,
                      height: 180
                    }}
                  >
                    Teacher Asks Low-Level Question
                  </Fab>
                </Grid>
                <Grid container alignItems="center" md={5} style={{ fontFamily: 'Arimo' }}>
                  <Button
                    disabled
                    style={{ backgroundColor: '#6d9eebff', color: '#fff!important' }}
                    className={classes.category}
                  >
                    Low-Level Instruction
                  </Button>
                </Grid>
                <Grid
                  container
                  alignItems="flex-start"
                  xl={3}
                  md={3}
                  sm={3}
                  xs={3}
                  style={{ fontFamily: 'Arimo' }}
                >
                  <Fab
                    onClick={(): void => this.handlePushFire('specificSkill')}
                    classes={{ root: classes.button }}
                    style={{
                      backgroundColor: '#1155ccff',
                      width: 180,
                      height: 180
                    }}
                  >
                    Child Answers Low-Level Question
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state: Types.ReduxState): {totalVisitCount: number, teacherSelected: Types.Teacher} => {
  return {
    totalVisitCount: state.instructionStackState.instructionStack.length,
    teacherSelected: state.teacherSelectedState.teacher
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, { pushOntoLoiStack, popOffLoiStack })(InstructionCounter)
);