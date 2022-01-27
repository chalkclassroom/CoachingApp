import * as React from 'react';
import * as PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import BehaviorResponsesSummaryChart from './ResultsComponents/BehaviorResponsesSummaryChart';
import {connect} from 'react-redux';
import { clearTeacher } from "../../state/actions/teacher";
import { emptyClimateStack, emptyClimateRating } from "../../state/actions/classroom-climate";
import { MuiThemeProvider } from '@material-ui/core/styles';
import * as Constants from '../../constants/Constants';
import * as Types from '../../constants/Types';
import * as H from 'history';
import ReactRouterPropTypes from 'react-router-prop-types';

interface Props {
  open: boolean,
  history: H.History,
  clearTeacher(): void,
  climateStack: Array<{timestamp: number, observation: string}>,
  emptyClimateStack(): void,
  emptyClimateRating(): void
}

/**
 * @param {Props} props
 * @return {ReactElement}
 */
function ClimateResultsDialog(props: Props): React.ReactElement {
  const {open, history, clearTeacher, climateStack, emptyClimateStack, emptyClimateRating} = props;
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
            <MuiThemeProvider theme={Constants.ClimateTheme}>
              <Button
                id="returnHome"
                style={{fontFamily: 'Arimo'}}
                onClick={(): void => {
                  clearTeacher();
                  emptyClimateStack();
                  emptyClimateRating();
                  history.push('/Home');
                }}
              >
                Return Home
              </Button>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={Constants.ClimateTheme}>
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

ClimateResultsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  clearTeacher: PropTypes.func.isRequired,
  climateStack: PropTypes.array.isRequired,
  emptyClimateStack: PropTypes.func.isRequired,
  emptyClimateRating: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {clearTeacher, emptyClimateStack, emptyClimateRating})(ClimateResultsDialog);