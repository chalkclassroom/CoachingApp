import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TrainingQuestion from './TrainingQuestion';
import FirebaseContext from '../Firebase/context';
import questionBank from './QuestionBank';
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
    border: '1px solid #0400FF',
    display: 'flex',
    flexDirection: 'column'
    // width: '90%',
  },
  button: {
    marginLeft: '1em'
  },
  instructions: {
    // marginTop: theme.spacing.unit,
    // marginBottom: theme.spacing.unit,
  },
  stepContentContainer: {
    border: '1px solid #DEFF00'
  },
  buttonContainer: {

  },
  nextButton: {
    justifySelf: 'flex-end'
  },
  correctFeedback: {

  },
  incorrectFeedback: {

  }
});

class TrainingQuestionnaire extends Component {

  constructor(props) {  // section -> one of ('transition','climate','ac',etc...)
    super(props);
    this.state = {
      questions: [],
      batch: [],
      curBatch: -1,
      currentQuestion: 0,
      numCorrect: 0,
      selectedOption: -1,
      feedback: "",
      recentlySubmitted: false,
      recentlyCorrect: false,
      answeredBatch: false,
      modalOpen: false,
      passed: false,
      failed: false
    };

    this.BATCH_LENGTH = 5;
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const questions = questionBank[this.props.section];
    this.setState({
      questions: questions,
      batch: questions.slice(0, this.BATCH_LENGTH),
      curBatch: 0
    });
  }

  setSelection = selection => {
    console.log(typeof(selection));
    this.setState({
      selectedOption: selection
    }, () => console.log(selection))
  }

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
    const { batch, selectedOption, feedback } = this.state;
    if (batch === undefined || batch.length === 0) {
      return <div> Loading ... </div>
    } else {
      const { text, options } = batch[step];
      return <TrainingQuestion selected={selectedOption} setSelection={this.setSelection}
                               question={text} options={options} feedback={feedback}/>
    }
  }

  isFinished = () => this.state.currentQuestion === this.BATCH_LENGTH

  getButtons = () => {
    const { currentQuestion, selectedOption, recentlySubmitted, answeredBatch } = this.state;
    const { classes } = this.props;
    if (recentlySubmitted && currentQuestion < this.BATCH_LENGTH - 1) {
      return <div style={{ display: 'inline' }} >
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleSubmit}
          className={classes.button}
          disabled={selectedOption === -1}
        >
          {this.isFinished() ? 'Finish' : 'Submit'}
        </Button>
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
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
            className={classes.button}
            disabled={selectedOption === -1}
          >
            {this.isFinished() ? 'Finish' : 'Submit'}
          </Button>
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
        return <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
            className={classes.button}
            disabled={selectedOption === -1}
          >
            {this.isFinished() ? 'Finish' : 'Submit'}
          </Button >
      }
    }
  }

  handleSubmit = () => {
    const { batch, currentQuestion, selectedOption, numCorrect } = this.state;
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
    const { numCorrect, curBatch } = this.state;
    if (numCorrect / this.BATCH_LENGTH >= 0.8) { // passed
      this.setState({
        modalOpen: true,
        passed: true
      })
    } else { // failed
      if (curBatch === 1) { // 2nd attempt
        this.setState({
          modalOpen: true,
          failed: true
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
    } else if (this.state.failed) {
      return <DialogContentText>
        They failed both batches of questions... Where do we send them from here?
      </DialogContentText>
    } else {
      return <DialogContentText>
        Uh oh! You didn't score high enough, we must ask you some more questions...
      </DialogContentText>
    }
  }

  getModalAction = () => {
    if (this.state.passed || this.state.failed) {
      return null
    } else {
      return <DialogActions>
        <Button onClick={this.loadNextBatch}>
            OK
        </Button>
      </DialogActions>
    }
  }

  loadNextBatch = () => {
    const { questions, curBatch } = this.state;
    this.setState({
      batch: questions.slice(5, 5 + this.BATCH_LENGTH),
      curBatch: curBatch + 1,
      currentQuestion: 0,
      numCorrect: 0,
      selectedOption: -1,
      feedback: "",
      recentlySubmitted: false,
      recentlyCorrect: false,
      answeredBatch: false
    }, () => this.setState({
      modalOpen: false
    }));
  }

  handleReset = () => {
    this.setState({
      currentQuestion: 0,
      numCorrect: 0,
      selectedOption: -1
    });
  }

  unlockBasedOnGrade() {
    console.log(this.state.numCorrect, this.BATCH_LENGTH);
    if (this.state.numCorrect / this.BATCH_LENGTH >= 0.8) {
      console.log("Passed");
      // let firebase = this.context;
      // firebase.handleUnlockSection(this.props.section);
    } else {
      console.log("Failed Try Again")
    }
  }

  render() {
    const { classes } = this.props;
    const {
      batch,
      currentQuestion,
      selectedOption,
      modalOpen,
      passed,
      failed
    } = this.state;
    const stepLabels = this.getStepLabels();
    return (
      <div className={classes.root}>
        <Stepper activeStep={currentQuestion}>
          {stepLabels.map((label, index) => 
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
    );
  }
}

TrainingQuestionnaire.propTypes = {
  classes: PropTypes.object,
  section: PropTypes.string.isRequired
};

TrainingQuestionnaire.contextType = FirebaseContext;
export default withStyles(styles)(TrainingQuestionnaire);