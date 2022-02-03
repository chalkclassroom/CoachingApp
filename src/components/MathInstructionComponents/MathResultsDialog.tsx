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
import { deleteMICenters, clearMathCount } from "../../state/actions/math-instruction";
import { MuiThemeProvider } from '@material-ui/core/styles';
import * as Constants from '../../constants/Constants';
import * as Types from '../../constants/Types';
import * as H from 'history';


interface Props {
  open: boolean,
  history: H.History,
  clearTeacher(): void,
  mathCount: number,
  noMathCount: number,
  clearMathCount(): void,
  deleteMICenters(): void
}

/**
 * @param {Props} props
 * @return {ReactElement}
 */
function MathResultsDialog(props: Props): React.ReactElement {
  const {
    open,
    history,
    clearTeacher,
    mathCount,
    noMathCount,
    clearMathCount,
    deleteMICenters
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
            <ChildPieSummary math={mathCount} notMath={noMathCount} />
          </Grid>
        </DialogContent>
        <Grid container direction="row" justify="space-around" alignItems="center" style={{paddingBottom: '1em'}}>
          <Grid item>
            <MuiThemeProvider theme={Constants.MathTheme}>
              <Button
                style={{fontFamily: 'Arimo'}}
                onClick={(): void => {
                  clearTeacher();
                  clearMathCount();
                  deleteMICenters();
                  history.push('/Home');
                }}
                id='returnHome'
              >
                Return Home
              </Button>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={Constants.MathTheme}>
              <Button
                color="primary"
                variant="contained"
                style={{fontFamily: 'Arimo'}}
                onClick={(): void => {
                  history.push("/MathInstructionResults");
                  clearMathCount();
                  deleteMICenters();
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

const mapStateToProps = (state: Types.ReduxState): {mathCount: number, noMathCount: number} => {
  return {
    mathCount: state.mathCountState.mathCount,
    noMathCount: state.mathCountState.noMathCount
  };
};

MathResultsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  clearTeacher: PropTypes.func.isRequired,
  mathCount: PropTypes.number.isRequired,
  noMathCount: PropTypes.number.isRequired,
  clearMathCount: PropTypes.func.isRequired,
  deleteMICenters: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {clearTeacher, deleteMICenters, clearMathCount})(MathResultsDialog);