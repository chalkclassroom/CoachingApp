import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ChildBehaviorsPie from './ResultsComponents/ChildBehaviorsPie';
import {connect} from 'react-redux';
import { clearTeacher } from "../../state/actions/teacher";
import { deleteACCenters, clearACCount } from "../../state/actions/associative-cooperative";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as Constants from '../../constants/Constants';
import * as Types from '../../constants/Types';
import * as H from 'history';

const ACTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.Colors.AC
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
          <ChildBehaviorsPie
            ac={acCount}
            noAc={noACCount}
            noChildOpp={noOppCount}
          />
        </DialogContent>
        <Grid container direction="row" justify="space-around" alignItems="center" style={{paddingBottom: '1em'}}>
          <Grid item>
            <MuiThemeProvider theme={ACTheme}>
              <Button
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
            <MuiThemeProvider theme={ACTheme}>
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

export default connect(mapStateToProps, {clearTeacher, deleteACCenters, clearACCount})(ACResultsDialog);