import * as React from 'react';
import * as PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ListeningSummaryChart from './ResultsComponents/ListeningSummaryChart';
import {connect} from 'react-redux';
import { clearTeacher } from "../../state/actions/teacher";
import { clearListeningCount } from "../../state/actions/listening-to-children";
import { MuiThemeProvider } from '@material-ui/core/styles';
import * as Constants from '../../constants/Constants';
import * as Types from '../../constants/Types';
import * as H from 'history';
import { PieWrapperDialog } from '../ResultsComponents/ChartWrappers';

interface Props {
  open: boolean,
  history: H.History,
  clearTeacher(): void,
  listeningCount: number,
  noListeningCount: number,
  clearListeningCount(): void
}

/**
 * @param {Props} props
 * @return {ReactElement}
 */
function ListeningResultsDialog(props: Props): React.ReactElement {
  const {
    open,
    history,
    clearTeacher,
    listeningCount,
    noListeningCount,
    clearListeningCount
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
            <ListeningSummaryChart listening={listeningCount} notListening={noListeningCount} />
          </PieWrapperDialog>
        </DialogContent>
        <Grid container direction="row" justify="space-around" alignItems="center" style={{paddingBottom: '1em'}}>
          <Grid item>
            <MuiThemeProvider theme={Constants.ListeningTheme}>
              <Button
                style={{fontFamily: 'Arimo'}}
                onClick={(): void => {
                  clearTeacher();
                  clearListeningCount();
                  history.push('/Home');
                }}
              >
                Return Home
              </Button>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={Constants.ListeningTheme}>
              <Button
                color="primary"
                variant="contained"
                style={{fontFamily: 'Arimo'}}
                onClick={(): void => {
                  history.push("/ListeningToChildrenResults");
                  clearListeningCount();
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
  listeningCount: number,
  noListeningCount: number
} => {
  return {
    listeningCount: state.listeningCountState.listeningCount,
    noListeningCount: state.listeningCountState.noListeningCount
  };
};

ListeningResultsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  clearTeacher: PropTypes.func.isRequired,
  listeningCount: PropTypes.number.isRequired,
  noListeningCount: PropTypes.number.isRequired,
  clearListeningCount: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {clearTeacher, clearListeningCount})(ListeningResultsDialog);