import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ClimateSummarySlider from '../components/ClassroomClimateComponent/ResultsComponents/ClimateSummarySlider';
import {connect} from 'react-redux';

interface Props {
  open: boolean,
  climateStack: any
}

/**
 * @param {Props} props
 * @return {ReactElement}
 */
function ResultsDialog(props: Props): React.ReactElement {
  const {open, climateStack} = props;
  let positiveResponses = 0;
  let negativeResponses = 0;
  const avgToneRating = 0;
  let i=0;
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
          <ClimateSummarySlider
            positiveResponses={positiveResponses}
            negativeResponses={negativeResponses}
            averageToneRating={avgToneRating}
            noText={true}
          />
          {console.log(climateStack)}
        </DialogContent>
        <DialogActions>
                <Button color="secondary" variant="contained" style={{fontFamily: 'Arimo'}}>
                  Return Home
                </Button>
                <Button color="primary" variant="contained" style={{fontFamily: 'Arimo'}} autoFocus>
                  View Results
                </Button>
              </DialogActions>
      </Dialog>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    climateStack: state.climateStackState.climateStack,
  };
};

export default connect(mapStateToProps)(ResultsDialog);