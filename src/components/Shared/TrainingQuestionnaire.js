import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../Firebase/context';
import questionBank from './QuestionBank';
import TrainingQuestion from './TrainingQuestion';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';


const styles = theme => ({
  root: {
    // border: '1px solid #0400FF',
    display: 'flex',
    flexDirection: 'column'
    // width: '90%',
  },
  button: {
    margin: '1em'
  },
  stepContentContainer: {
    // border: '1px solid #DEFF00'
  },
  buttonContainer: {

  },
  nextButton: {
    justifySelf: 'flex-end'
  }
});


class TrainingQuestionnaire extends Component {

  constructor(props) {  // section -> one of ('transition','climate','ac',etc...)
    super(props);
    this.state = {
      questions: [],
      batch: [],
      currentBatch: -1,
      currentQuestion: 0,
      numCorrect: 0,
      selectedOption: -1,
      feedback: "",
      recentlySubmitted: false,
      recentlyCorrect: false,
      answeredBatch: false,
      modalOpen: false,
      passed: false,
      // failed: false
    };

    this.BATCH_LENGTH = 5;
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const questions = questionBank[this.props.section];
    this.setState({
      questions: questions,
      batch: questions.slice(0, this.BATCH_LENGTH),
      currentBatch: 0
    });
  }

  setSelection = selection => this.setState({ selectedOption: selection })

  getStepLabels = () => {
    const { batch } = this.state;
    const stepLabels = [];
    if (batch !== undefined && batch.length !== 0) {
      for (var i in batch) {
        stepLabels.push("Q:" + (Number(i) + 1));
      }
    }
    return stepLabels;
  }

  getStepContent = step => {
    const { batch, selectedOption, feedback, recentlyCorrect } = this.state;
    if (batch === undefined || batch.length === 0) {
      return <div> Loading... </div>
    } else {
      const { text, options } = batch[step];
      return <TrainingQuestion selected={selectedOption} setSelection={this.setSelection}
        question={text} options={options} feedback={feedback} recentlyCorrect={recentlyCorrect}/>
    }
  }

  getSubmitButton = () => {
    return <Button
      variant="contained"
      color="primary"
      onClick={this.handleSubmit}
      className={this.props.classes.button}
      disabled={this.state.selectedOption === -1}
    >
      Submit
    </Button>
  }

  getButtons = () => {
    const { currentQuestion, recentlySubmitted, answeredBatch } = this.state;
    const { classes } = this.props;
    if (recentlySubmitted && currentQuestion < this.BATCH_LENGTH - 1) {
    return <div>
        {this.getSubmitButton()}
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleNext}
          className={classes.button}
        >
          Next
        </Button>
      </div>
    } else {
      if (answeredBatch) {
        return <div>
          {this.getSubmitButton()}
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleFinish}
            className={classes.button}
          >
            Finish
          </Button>
        </div>
      } else {
        return this.getSubmitButton()
      }
    }
  }

  handleSubmit = () => {
    const { batch, currentQuestion, selectedOption } = this.state;
    const { options, feedback } = batch[currentQuestion];
    if (options.get(Array.from(options.keys())[selectedOption])) { // correct answer
      this.setState({
        feedback: "Correct! " + feedback,
        selectedOption: -1,
        recentlySubmitted: true,
        recentlyCorrect: true
      })
    } else {  // incorrect answer
      this.setState({
        feedback: "Oops, sorry! " + feedback,
        selectedOption: -1,
        recentlySubmitted: true,
        recentlyCorrect: false
      })
    }
    if (currentQuestion === this.BATCH_LENGTH - 1) {
      this.setState({
        answeredBatch: true
      })
    }
  }

  handleNext = () => {
    const { currentQuestion, numCorrect, recentlyCorrect } = this.state;
    if (recentlyCorrect) {
      this.setState({
        currentQuestion: currentQuestion + 1,
        feedback: "",
        numCorrect: numCorrect + 1,
        recentlySubmitted: false,
        recentlyCorrect: false
      })
    } else {
      this.setState({
        currentQuestion: currentQuestion + 1,
        feedback: "",
        recentlySubmitted: false
      })
    }
  }

  handleFinish = () => {
    const { numCorrect, currentBatch } = this.state;
    if (numCorrect / this.BATCH_LENGTH >= 0.8) { // passed
      this.setState({
        modalOpen: true,
        passed: true
      })
    } else { // failed
      if (currentBatch === 1) { // 2nd attempt
        this.setState({
          modalOpen: true,
          // failed: true
        })
      } else { // 1st attempt
        this.setState({
          modalOpen: true
        })
      }
    }
  }

  getModalContent = () => {
    if (this.state.passed) {
      return <DialogContentText>
        Congrats! You've passed the knowledge check! Here's where we need to put a call to firebase to unlock your Magic8 (firebase.handleUnlockSection())
      </DialogContentText>
    }
    // else if (this.state.failed) {
    //   return <DialogContentText>
    //     They failed both batches of questions... Where do we send them from here?
    //   </DialogContentText>
    // }
    else {
      return <DialogContentText>
        Uh oh! You didn't score high enough, we must ask you some more questions...
      </DialogContentText>
    }
  }

  getModalAction = () => {
    if (this.state.passed ) { //|| this.state.failed) {
      return <DialogActions>
        <Button onClick={() => this.setState({ modalOpen: false })}>
          OK
        </Button>
      </DialogActions>
    }  else {
      return <DialogActions>
        <Button onClick={this.loadNextBatch}>
            OK
        </Button>
      </DialogActions>
    }
  }

  loadNextBatch = () => {
    const { questions, currentBatch } = this.state;
    const batchToLoad = ((currentBatch + 1) % 2) * 5;
    this.setState({
      batch: questions.slice(batchToLoad, batchToLoad + this.BATCH_LENGTH),
      currentBatch: currentBatch + 1,
      currentQuestion: 0,
      numCorrect: 0,
      selectedOption: -1,
      feedback: "",
      recentlySubmitted: false,
      recentlyCorrect: false,
      answeredBatch: false,
      modalOpen: false
    });
  }

  render() {
    const { classes } = this.props;
    const { currentQuestion, modalOpen } = this.state;
    return (
      <div className={classes.root}>
        <Stepper activeStep={currentQuestion}>
          {this.getStepLabels().map((label, index) => 
            <Step key={index} >
              <StepLabel>{label}</StepLabel>
            </Step>
          )}
        </Stepper>
        <div className={classes.stepContentContainer}>
          {this.getStepContent(currentQuestion)}
          <div className={classes.buttonContainer}>
            {this.getButtons()}
          </div>
        </div>
        <Dialog open={modalOpen} onClose={null} >
          <DialogTitle id="knowledge-check-modal-title">
          Your Results
          </DialogTitle>
          {this.getModalContent()}
          {this.getModalAction()}
        </Dialog>
      </div>
    )
  }
}

TrainingQuestionnaire.propTypes = {
  classes: PropTypes.object,
  section: PropTypes.string.isRequired
};

TrainingQuestionnaire.contextType = FirebaseContext;
export default withStyles(styles)(TrainingQuestionnaire);