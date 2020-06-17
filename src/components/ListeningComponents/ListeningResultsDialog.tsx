import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ListeningSummaryChart from './ResultsComponents/ListeningSummaryChart';
import {connect} from 'react-redux';
import { clearTeacher } from "../../state/actions/teacher.ts";
import { clearListeningCount } from "../../state/actions/listening-to-children.ts";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as Constants from '../../constants';

const ListeningTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.Colors.LC
    }
  }
});

interface Props {
  open: boolean,
  history: {
    push(pathname: string): void
  },
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
          <ListeningSummaryChart listening={listeningCount} notListening={noListeningCount} />
        </DialogContent>
        <Grid container direction="row" justify="space-around" alignItems="center" style={{paddingBottom: '1em'}}>
          <Grid item>
            <MuiThemeProvider theme={ListeningTheme}>
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
            <MuiThemeProvider theme={ListeningTheme}>
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

const mapStateToProps = state => {
  return {
    listeningCount: state.listeningCountState.listeningCount,
    noListeningCount: state.listeningCountState.noListeningCount
  };
};

export default connect(mapStateToProps, {clearTeacher, clearListeningCount})(ListeningResultsDialog);