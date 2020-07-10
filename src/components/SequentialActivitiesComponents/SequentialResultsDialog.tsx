import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ChildPieSummary from './ResultsComponents/ChildPieSummary';
import {connect} from 'react-redux';
import { clearTeacher } from "../../state/actions/teacher";
import { deleteSACenters, clearSequentialCount } from "../../state/actions/sequential-activities";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as Constants from '../../constants/Constants';
import * as Types from '../../constants/Types';
import * as H from 'history';

const SequentialTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.Colors.SA
    }
  },
  typography: {
    useNextVariants: true
  }
});

interface Props {
  open: boolean,
  history: H.History,
  clearTeacher(): void,
  sequentialCount: number,
  noSequentialCount: number,
  clearSequentialCount(): void,
  deleteSACenters(): void
}

/**
 * @param {Props} props
 * @return {ReactElement}
 */
function SequentialResultsDialog(props: Props): React.ReactElement {
  const {
    open,
    history,
    clearTeacher,
    sequentialCount,
    noSequentialCount,
    clearSequentialCount,
    deleteSACenters
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
          <ChildPieSummary sequential={sequentialCount} notSequential={noSequentialCount} />
        </DialogContent>
        <Grid container direction="row" justify="space-around" alignItems="center" style={{paddingBottom: '1em'}}>
          <Grid item>
            <MuiThemeProvider theme={SequentialTheme}>
              <Button
                style={{fontFamily: 'Arimo'}}
                onClick={(): void => {
                  clearTeacher();
                  clearSequentialCount();
                  deleteSACenters();
                  history.push('/Home');
                }}
              >
                Return Home
              </Button>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={SequentialTheme}>
              <Button
                color="primary"
                variant="contained"
                style={{fontFamily: 'Arimo'}}
                onClick={(): void => {
                  history.push("/SequentialActivitiesResults");
                  clearSequentialCount();
                  deleteSACenters();
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

const mapStateToProps = (state: Types.ReduxState): {sequentialCount: number, noSequentialCount: number} => {
  return {
    sequentialCount: state.sequentialCountState.sequentialCount,
    noSequentialCount: state.sequentialCountState.noSequentialCount
  };
};

export default connect(mapStateToProps, {clearTeacher, deleteSACenters, clearSequentialCount})(SequentialResultsDialog);