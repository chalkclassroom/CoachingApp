import * as React from 'react';
import * as PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ChildBehaviorsPie from './ResultsComponents/ChildBehaviorsPie';
import {connect} from 'react-redux';
import { clearTeacher } from "../../state/actions/teacher";
import { deleteACCenters, clearACCount } from "../../state/actions/associative-cooperative";
import { MuiThemeProvider } from '@material-ui/core/styles';
import * as Constants from '../../constants/Constants';
import * as Types from '../../constants/Types';
import * as H from 'history';
import ReactRouterPropTypes from 'react-router-prop-types';

interface Props {
  open: boolean,
  history: H.History,
  clearTeacher(): void,
  acCount: number,
  noACCount: number,
  noOppCount: number,
  clearACCount(): void,
  deleteACCenters(): void
}

/**
 * @param {Props} props
 * @return {ReactElement}
 */
function ACResultsDialog(props: Props): React.ReactElement {
  const {
    open,
    history,
    clearTeacher,
    acCount,
    noACCount,
    noOppCount,
    clearACCount,
    deleteACCenters
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
            <ChildBehaviorsPie
              ac={acCount}
              noAc={noACCount}
              noChildOpp={noOppCount}
            />
          </Grid>
        </DialogContent>
        <Grid container direction="row" justify="space-around" alignItems="center" style={{paddingBottom: '1em'}}>
          <Grid item>
            <MuiThemeProvider theme={Constants.ACTheme}>
              <Button
                id='returnHome'
                style={{fontFamily: 'Arimo'}}
                onClick={(): void => {
                  clearTeacher();
                  clearACCount();
                  deleteACCenters();
                  history.push('/Home');
                }}
              >
                Return Home
              </Button>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={Constants.ACTheme}>
              <Button
                color="primary"
                variant="contained"
                style={{fontFamily: 'Arimo'}}
                onClick={(): void => {
                  history.push("/AssociativeCooperativeInteractionsResults");
                  clearACCount();
                  deleteACCenters();
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
  acCount: number,
  noACCount: number,
  noOppCount: number
} => {
  return {
    acCount: state.associativeCountState.acCount,
    noACCount: state.associativeCountState.noACCount,
    noOppCount: state.associativeCountState.noOppCount
  };
};

ACResultsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  clearTeacher: PropTypes.func.isRequired,
  acCount: PropTypes.number.isRequired,
  noACCount: PropTypes.number.isRequired,
  noOppCount: PropTypes.number.isRequired,
  clearACCount: PropTypes.func.isRequired,
  deleteACCenters: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {clearTeacher, deleteACCenters, clearACCount})(ACResultsDialog);