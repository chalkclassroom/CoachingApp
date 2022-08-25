import * as React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import PieSummary from './ResultsComponents/PieSummary'
import { connect } from 'react-redux'
import { clearTeacher } from '../../state/actions/teacher'
import { clearEngagementCount } from '../../state/actions/student-engagement'
import { MuiThemeProvider } from '@material-ui/core/styles'
import * as Constants from '../../constants/Constants'
import * as Types from '../../constants/Types'
import * as H from 'history'
import { PieWrapperDialog } from '../ResultsComponents/ChartWrappers'

interface Props {
  open: boolean,
  history: H.History,
  clearTeacher(): void,
  engagedCount: number,
  notEngagedCount: number,
  clearEngagementCount(): void
}

/**
 * @param {Props} props
 * @return {ReactElement}
 */
function EngagementResultsDialog(props: Props): React.ReactElement {
  const {
    open,
    history,
    clearTeacher,
    engagedCount,
    notEngagedCount,
    clearEngagementCount
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
            <PieSummary offTask={notEngagedCount} engaged={engagedCount} />
          </PieWrapperDialog>
        </DialogContent>
        <Grid container direction="row" justify="space-around" alignItems="center" style={{paddingBottom: '1em'}}>
          <Grid item>
            <MuiThemeProvider theme={Constants.EngagementTheme}>
              <Button
                style={{fontFamily: 'Arimo'}}
                onClick={(): void => {
                  clearTeacher();
                  clearEngagementCount();
                  history.push('/Home');
                }}
              >
                Return Home
              </Button>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={Constants.EngagementTheme}>
              <Button
                color="primary"
                variant="contained"
                style={{fontFamily: 'Arimo'}}
                onClick={(): void => {
                  history.push("/StudentEngagementResults");
                  clearEngagementCount();
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

const mapStateToProps = (state: Types.ReduxState): {engagedCount: number, notEngagedCount: number} => {
  return {
    engagedCount: state.engagementCountState.engagedCount,
    notEngagedCount: state.engagementCountState.notEngagedCount
  };
};

export default connect(mapStateToProps, {clearTeacher, clearEngagementCount})(EngagementResultsDialog);