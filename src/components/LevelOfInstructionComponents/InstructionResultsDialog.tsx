import * as React from 'react';
import * as PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LevelOfInstructionSummaryChart from './ResultsComponents/LevelOfInstructionSummaryChart';
import {connect} from 'react-redux';
import { clearTeacher } from "../../state/actions/teacher";
import { emptyLoiStack } from "../../state/actions/level-of-instruction";
import { MuiThemeProvider } from '@material-ui/core/styles';
import * as Constants from '../../constants/Constants';
import * as Types from '../../constants/Types';
import * as H from 'history';
import { PieWrapperDialog } from '../ResultsComponents/ChartWrappers';
import { Pie } from 'react-chartjs-2';

interface Props {
  open: boolean,
  history: H.History,
  clearTeacher(): void,
  instructionStack: Array<{timestamp: number, observation: string}>,
  emptyLoiStack(): void
}

/**
 * @param {Props} props
 * @return {ReactElement}
 */
function InstructionResultsDialog(props: Props): React.ReactElement {
  const {open, history, clearTeacher, instructionStack, emptyLoiStack} = props;
  let highLevel = 0;
  let lowLevel = 0;
  let i = 0;
  for (i; i<instructionStack.length; i++) {
    if (instructionStack[i].observation === 'hlq' || instructionStack[i].observation === 'hlqResponse'){
      highLevel++;
    } else {
      lowLevel++;
    }
  }
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
            <LevelOfInstructionSummaryChart
              lowLevel={lowLevel}
              highLevel={highLevel}
            />
          </PieWrapperDialog>
        </DialogContent>
        <Grid container direction="row" justify="space-around" alignItems="center" style={{paddingBottom: '1em'}}>
          <Grid item>
            <MuiThemeProvider theme={Constants.InstructionTheme}>
              <Button
                style={{fontFamily: 'Arimo'}}
                onClick={(): void => {
                  clearTeacher();
                  emptyLoiStack();
                  history.push('/Home');
                }}
              >
                Return Home
              </Button>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={Constants.InstructionTheme}>
              <Button
                color="primary"
                variant="contained"
                style={{fontFamily: 'Arimo'}}
                onClick={(): void => {
                  history.push("/LevelOfInstructionResults");
                  emptyLoiStack();
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

const mapStateToProps = (state: Types.ReduxState): {instructionStack: Array<{timestamp: number, observation: string}>} => {
  return {
    instructionStack: state.instructionStackState.instructionStack,
  };
};

InstructionResultsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  clearTeacher: PropTypes.func.isRequired,
  instructionStack: PropTypes.array.isRequired,
  emptyLoiStack: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {clearTeacher, emptyLoiStack})(InstructionResultsDialog);