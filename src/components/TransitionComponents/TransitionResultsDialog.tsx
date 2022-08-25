import * as React from 'react';
import * as PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TransitionTimePie from "./ResultsComponents/TransitionTimePie";
import {connect} from 'react-redux';
import { clearTeacher } from "../../state/actions/teacher";
import { resetTransitionTime, clearTransitionTime, clearSessionTime } from "../../state/actions/transition-time";
import { MuiThemeProvider } from '@material-ui/core/styles';
import * as Constants from '../../constants/Constants';
import * as Types from '../../constants/Types';
import * as H from 'history';
import { PieWrapperDialog } from '../ResultsComponents/ChartWrappers';

interface Props {
  open: boolean,
  history: H.History,
  clearTeacher(): void,
  transitionTime: number,
  startTime: number,
  endTime: number,
  resetTransitionTime(): void,
  clearTransitionTime(): void,
  clearSessionTime(): void
}

/**
 * @param {Props} props
 * @return {ReactElement}
 */
function TransitionResultsDialog(props: Props): React.ReactElement {
  const {
    open,
    history,
    clearTeacher,
    transitionTime,
    startTime,
    endTime,
    resetTransitionTime,
    clearTransitionTime,
    clearSessionTime
  } = props;

  return (
    <div>
      <Dialog
        open={open}
        disableBackdropClick
      >
        <DialogTitle style={{fontFamily: 'Arimo'}}>
          Results Preview
        </DialogTitle>
        <DialogContent>
          <PieWrapperDialog>
            <TransitionTimePie
              transitionTime={transitionTime}
              learningActivityTime={(endTime - startTime) - transitionTime}
            />
          </PieWrapperDialog>
        </DialogContent>
        <Grid container direction="row" justify="space-around" alignItems="center" style={{paddingBottom: '1em'}}>
          <Grid item>
            <MuiThemeProvider theme={Constants.TransitionTheme}>
              <Button
                style={{fontFamily: 'Arimo'}}
                onClick={(): void => {
                  clearTeacher();
                  resetTransitionTime();
                  clearTransitionTime();
                  clearSessionTime();
                  history.push('/Home');
                }}
              >
                Return Home
              </Button>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={Constants.TransitionTheme}>
              <Button
                color="primary"
                variant="contained"
                style={{fontFamily: 'Arimo'}}
                onClick={(): void => {
                  history.push("/TransitionTimeResults");
                  resetTransitionTime();
                  clearTransitionTime();
                  clearSessionTime();
                }}
              >
                View Results
              </Button>
            </MuiThemeProvider>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  )
}

const mapStateToProps = (state: Types.ReduxState): {
  transitionTime: number,
  startTime: number,
  endTime: number
} => {
  return {
    transitionTime: state.transitionTimeState.transitionTime,
    startTime: state.sessionTimeState.startTime,
    endTime: state.sessionTimeState.endTime
  };
};

TransitionResultsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  clearTeacher: PropTypes.func.isRequired,
  transitionTime: PropTypes.number.isRequired,
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  resetTransitionTime: PropTypes.func.isRequired,
  clearTransitionTime: PropTypes.func.isRequired,
  clearSessionTime: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {clearTeacher, resetTransitionTime, clearTransitionTime, clearSessionTime})(TransitionResultsDialog);