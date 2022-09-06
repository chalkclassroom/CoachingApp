import * as React from 'react';
import * as PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ChildPieSummary from './ResultsComponents/ChildPieSummary';
import {connect} from 'react-redux';
import { clearTeacher } from "../../state/actions/teacher";
import { deleteSACenters, clearSequentialCount } from "../../state/actions/sequential-activities";
import { MuiThemeProvider } from '@material-ui/core/styles';
import * as Constants from '../../constants/Constants';
import * as Types from '../../constants/Types';
import * as H from 'history';
import { PieWrapperDialog } from '../ResultsComponents/ChartWrappers';

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
          <Grid container direction="column" justify="center">
            <Typography
              align="center"
              variant="h5"
              style={{fontFamily: 'Arimo', paddingBottom: '0.5em'}}
            >
              Child Behaviors
            </Typography>
            <PieWrapperDialog>
              <ChildPieSummary sequential={sequentialCount} notSequential={noSequentialCount} />
            </PieWrapperDialog>
          </Grid>
        </DialogContent>
        <Grid container direction="row" justify="space-around" alignItems="center" style={{paddingBottom: '1em'}}>
          <Grid item>
            <MuiThemeProvider theme={Constants.SequentialTheme}>
              <Button
                id='returnHome'
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
            <MuiThemeProvider theme={Constants.SequentialTheme}>
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

SequentialResultsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  clearTeacher: PropTypes.func.isRequired,
  sequentialCount: PropTypes.number.isRequired,
  noSequentialCount: PropTypes.number.isRequired,
  clearSequentialCount: PropTypes.func.isRequired,
  deleteSACenters: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {clearTeacher, deleteSACenters, clearSequentialCount})(SequentialResultsDialog);