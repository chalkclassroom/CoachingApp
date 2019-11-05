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


const styles = theme => ({
  root: {
    border: '1px solid #0400FF',
    // width: '90%',
  },
  button: {
    // marginRight: theme.spacing.unit,
  },
  instructions: {
    // marginTop: theme.spacing.unit,
    // marginBottom: theme.spacing.unit,
  },
  stepContentContainer: {
    border: '1px solid #DEFF00'
  }
});

class TrainingQuestionnaire extends Component {

  constructor(props) {  // section -> one of ('transition','climate','ac',etc...)
    super(props);
    this.state = {
      questions: [],
      batch: [],
      currentQuestion: 0,
      numCorrect: 0,
      selectedOption: -1,
      feedback: "",
      recentlySubmitted: false
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const questions = questionBank[this.props.section];
    this.setState({
      questions: questions,
      batch: questions.slice(0,5)
    }, () => console.log(questions));
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

  handleSubmit = () => {
    const { batch, currentQuestion, selectedOption, numCorrect } = this.state;
    const { options } = batch[currentQuestion];
    if (options.get(Array.from(options.keys())[selectedOption])) { // correct answer
      // Show proper feedback, setTimeOut, make next button available
      this.setState({
        recentlySubmitted: true,
        feedback: "Correct!" + currentQuestion,
      }, () => setTimeout(
        () => this.setState({
          currentQuestion: currentQuestion + 1,
          feedback:"",
          selectedOption: -1,
          numCorrect: numCorrect + 1,
        }),
        1000
      ))
    } else {
      this.setState({
        feedback: "Oops, sorry!"
      }, () => setTimeout(
        () => this.setState({
          currentQuestion: currentQuestion + 1,
          feedback: "",
          selectedOption: -1,
        }),
        1000
      )); // Show proper feedback, setTimeOut, make next button available
    }
  }

  handleReset = () => {
    this.setState({
      currentQuestion: 0,
      numCorrect: 0,
      selectedOption: -1
    });
  }

  unlockBasedOnGrade() {
    console.log(this.state.numCorrect, this.state.batch.length);
    if (this.state.numCorrect / this.state.batch.length >= 0.8) {
      console.log("Passed");
      // let firebase = this.context;
      // firebase.handleUnlockSection(this.props.section);
    } else {
      console.log("Failed Try Again")
    }
  }

  render() {
    const { classes } = this.props;
    const stepLabels = this.getStepLabels();
    const { batch, currentQuestion, selectedOption } = this.state;
    if (currentQuestion === batch.length && batch !== 0) {
      console.log("calling unlock firebase");
      //this.unlockBasedOnGrade();
    }
    return (
      <div className={classes.root}>
        <Stepper activeStep={currentQuestion}>
          {stepLabels.map((label, index) => 
            <Step key={index} >
              <StepLabel>{label}</StepLabel>
            </Step>
          )}
        </Stepper>
        {currentQuestion === batch.length ? (
          <p className={classes.instructions}>
            Training Completed! You may now observe teachers using the Transition Time Tool.
          </p>
        ) : (
          <div className={classes.stepContentContainer}>
            {this.getStepContent(currentQuestion)}
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
              className={classes.button}
              disabled={selectedOption === -1}
            >
              {currentQuestion === batch.length - 1 ? 'Finish' : 'Submit'}
            </Button>
          </div>
        )}
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