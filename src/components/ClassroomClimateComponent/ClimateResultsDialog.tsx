import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import BehaviorResponsesSummaryChart from './ResultsComponents/BehaviorResponsesSummaryChart';
import {connect} from 'react-redux';
import { clearTeacher } from "../../state/actions/teacher";
import { emptyClimateStack } from "../../state/actions/classroom-climate";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as Constants from '../../constants/Constants';
import * as Types from '../../constants/Types';

const ClimateTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.Colors.CC
    }
  },
  typography: {
    useNextVariants: true
  }
});

interface Props {
  open: boolean,
  history: {
    push(pathname: string): void
  },
  clearTeacher(): void,
  climateStack: Array<{timestamp: number, observation: string}>,
  emptyClimateStack(): void
}

/**
 * @param {Props} props
 * @return {ReactElement}
 */
function ClimateResultsDialog(props: Props): React.ReactElement {
  const {open, history, clearTeacher, climateStack, emptyClimateStack} = props;
  let positiveResponses = 0;
  let negativeResponses = 0;
  let i = 0;
  for (i; i<climateStack.length; i++) {
    if (climateStack[i].observation === 'redirection' || climateStack[i].observation === 'disapproval'){
      negativeResponses++;
    } else {
      positiveResponses++;
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
          <BehaviorResponsesSummaryChart
            positiveResponses={positiveResponses}
            negativeResponses={negativeResponses}
          />
        </DialogContent>
        <Grid container direction="row" justify="space-around" alignItems="center" style={{paddingBottom: '1em'}}>
          <Grid item>
            <MuiThemeProvider theme={ClimateTheme}>
              <Button
                style={{fontFamily: 'Arimo'}}
                onClick={(): void => {
                  clearTeacher();
                  emptyClimateStack();
                  history.push('/Home');
                }}
              >
                Return Home
              </Button>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={ClimateTheme}>
              <Button
                color="primary"
                variant="contained"
                style={{fontFamily: 'Arimo'}}
                onClick={(): void => {
                  history.push("/ClassroomClimateResults");
                  emptyClimateStack();
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

const mapStateToProps = (state: Types.ReduxState): {climateStack: Array<{timestamp: number, observation: string}>} => {
  return {
    climateStack: state.climateStackState.climateStack,
  };
};

export default connect(mapStateToProps, {clearTeacher, emptyClimateStack})(ClimateResultsDialog);