import * as React from 'react';
import * as PropTypes from 'prop-types';
import FirebaseContext from '../Firebase/FirebaseContext';
import QuestionBank from './QuestionBank';
import TrainingQuestion from './TrainingQuestion';
import { withStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { addUnlocked } from '../../state/actions/unlocked';
import { unlockLiteracyKnowledgeCheck } from '../../state/actions/training-literacy';
import { connect } from 'react-redux';
import * as Constants from '../../constants/Constants';


const styles: object = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  button: {
    margin: '1em'
  },
  nextButton: {
    justifySelf: 'flex-end'
  }
};

type Selection = 'transition' | 'climate' | 'math' | 'student' | 'level' | 'listening' | 'sequential' | 'literacy' | 'ac';

type QuestionBankKey = 'transition' | 'climate' | 'math' | 'student' | 'level' | 'listening' | 'sequential' | 'LIFoundational' | 'LIWriting' | 'LIReading' | 'LILanguage' | 'ac';

interface Props {
  section: Selection,
  literacyType?: Constants.LiteracyTypes
  classes: {
    root: string,
    button: string,
    nextButton: string
  },
  addUnlocked(unlocked: number): void,
  unlockLiteracyKnowledgeCheck(checklistType: Constants.LiteracyTypes): void
}

interface State {
  questions: Array<{
    text: string,
    options: Map<string, boolean>,
    feedback: string
  }>,
  batch: Array<{
    text: string,
    options: Map<string, boolean>,
    feedback: string
  }>,
  currentBatch: number,
  currentQuestion: number,
  numCorrect: number,
  selectedOption: number,
  feedback: string,
  recentlySubmitted: boolean,
  recentlyCorrect: boolean,
  answeredBatch: boolean,
  modalOpen: boolean,
  passed: boolean,
  // failed: false
}

/**
 * knowledge check questionnaire
 * @class TrainingQuestionnaire
 */
class TrainingQuestionnaire extends React.Component<Props, State> {
  BATCH_LENGTH: number;
  magic8Number: number;
  /**
   * @param {Props} props
   */
  constructor(props: Props) {  // section -> one of ('transition','climate','ac',etc...)
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

    this.BATCH_LENGTH = this.props.section === 'literacy' ? 10 : 5;

    if (this.props.section === 'transition'){
      this.magic8Number = 1
    } else if (this.props.section === 'climate'){
      this.magic8Number = 2
    } else if (this.props.section === 'math'){
      this.magic8Number = 3
    } else if (this.props.section === 'student'){
      this.magic8Number = 4
    } else if (this.props.section === 'level'){
      this.magic8Number = 5
    } else if (this.props.section === 'listening'){
      this.magic8Number = 6
    } else if (this.props.section === 'sequential'){
      this.magic8Number = 7
    } else if (this.props.section === 'ac'){
      this.magic8Number = 8
    } else {
      this.magic8Number = 9
    }
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    const questionBankSection = this.props.section === 'literacy' ? 'LI'+this.props.literacyType : this.props.section;
    const questions = QuestionBank[questionBankSection as QuestionBankKey];
    this.setState({
      questions: questions,
      batch: questions.slice(0, this.BATCH_LENGTH),
      currentBatch: 0
    });
  }

  /**
   * @param {number} selection
   * @return {void}
   */
  setSelection = (selection: number): void => this.setState({ selectedOption: selection })

  getStepLabels = (): Array<string> => {
    const { batch } = this.state;
    const stepLabels: Array<string> = [];
    if (batch !== undefined && batch.length !== 0) {
      batch.forEach((value, index) => {
        stepLabels.push("Q:" + (Number(index) + 1))
      })
    }
    return stepLabels;
  }

  /**
   * @param {number} step
   * @return {void}
   */
  getStepContent = (step: number): React.ReactNode | HTMLElement => {
    const { batch, selectedOption, feedback, recentlyCorrect } = this.state;
    if (batch === undefined || batch.length === 0) {
      return <div> Loading... </div>
    } else {
      const { text, options } = batch[step];
      return <TrainingQuestion selected={selectedOption} setSelection={this.setSelection}
        question={text} options={options} feedback={feedback} recentlyCorrect={recentlyCorrect}/>
    }
  }

  getSubmitButton = (): React.ReactElement => {
    return <Button
      variant="contained"
      color="primary"
      onClick={this.handleSubmit}
      className={this.props.classes.button}
      disabled={this.state.selectedOption === -1}
      style={{fontFamily: 'Arimo'}}
    >
      Submit
    </Button>
  }

  getButtons = (): React.ReactElement => {
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
          style={{fontFamily: 'Arimo'}}
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
            style={{fontFamily: 'Arimo'}}
          >
            Finish
          </Button>
        </div>
      } else {
        return this.getSubmitButton()
      }
    }
  }

  handleSubmit = (): void => {
    const firebase = this.context;
    const { batch, currentQuestion, selectedOption, numCorrect } = this.state;
    const { options, feedback } = batch[currentQuestion];
    const isCorrect = options.get(Array.from(options.keys())[selectedOption]);
    firebase.pushKnowledgeCheck({
      type: this.props.section,
      questionIndex: currentQuestion,
      answerIndex: selectedOption,
      isCorrect: isCorrect
    })
      .catch((error: Error) => console.error("Was unable to record knowledge check in DB: ", error))

    if (isCorrect) { // correct answer
      this.setState({
        feedback: "Correct! " + feedback,
        selectedOption: -1,
        recentlySubmitted: true,
        recentlyCorrect: true,
        numCorrect: numCorrect + 1
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

  handleNext = (): void => {
    const { currentQuestion, recentlyCorrect } = this.state;
    if (recentlyCorrect) {
      this.setState({
        currentQuestion: currentQuestion + 1,
        feedback: "",
        // numCorrect: numCorrect + 1,
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

  handleFinish = (): void => {
    const { numCorrect } = this.state;
    console.log('num correct is: ', numCorrect);
    this.unlockBasedOnGrade();
    if (numCorrect / this.BATCH_LENGTH >= 0.8) { // passed
      this.setState({
        modalOpen: true,
        passed: true
      })
    } else { // failed
      // if (currentBatch === 1) { // 2nd attempt
        // this.setState({
          // modalOpen: true,
          // // failed: true // Change this for different re-try implementations
        // })
      // } else { // 1st attempt
        this.setState({
          modalOpen: true
        })
    }
  }

  unlockBasedOnGrade = (): void => {
    if (this.state.numCorrect / this.BATCH_LENGTH >= 0.8) {
      console.log("passed");
      const firebase = this.context;
      if (this.props.section === 'literacy' && this.props.literacyType !== undefined) {
        firebase.unlockLiteracyKnowledgeCheck(this.props.literacyType);
        this.props.unlockLiteracyKnowledgeCheck(this.props.literacyType)
      } else {
        firebase.handleUnlockSection(this.magic8Number);
        this.props.addUnlocked(this.magic8Number);
      }
    } else {
      console.log("failed try again");
    }
  }

  getModalContent = (): React.ReactElement => {
    if (this.state.passed) {
      return <DialogContentText style={{fontFamily: 'Arimo'}}>
        Congrats! You&apos;ve passed the knowledge check! Your observation tool has been unlocked.
      </DialogContentText>
    }
    // else if (this.state.failed) {
    //   return <DialogContentText>
    //     They failed both batches of questions... Where do we send them from here?
    //   </DialogContentText>
    // }
    else {
      return <DialogContentText style={{fontFamily: 'Arimo'}}>
        Uh oh! You didn&apos;t answer enough of the questions correctly. Please try again.
      </DialogContentText>
    }
  }

  getModalAction = (): React.ReactElement => {
    if (this.state.passed ) { // || this.state.failed) {
      return <DialogActions>
        <Button onClick={(): void => this.setState({ modalOpen: false })} style={{fontFamily: 'Arimo'}}>
          OK
        </Button>
      </DialogActions>
    }  else {
      return <DialogActions>
        <Button onClick={this.loadNextBatch} style={{fontFamily: 'Arimo'}}>
            OK
        </Button>
      </DialogActions>
    }
  }

  loadNextBatch = (): void => {
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

  static propTypes = {
    section: PropTypes.oneOf<Selection>(['transition', 'climate', 'math', 'student', 'level', 'listening', 'sequential', 'ac']).isRequired,
    classes: PropTypes.exact({
      root: PropTypes.string,
      button: PropTypes.string,
      nextButton: PropTypes.string
    }).isRequired,
    addUnlocked: PropTypes.func.isRequired,
    unlockLiteracyKnowledgeCheck: PropTypes.func.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    const { currentQuestion, modalOpen } = this.state;
    return (
      <div className={classes.root}>
        <Stepper activeStep={currentQuestion} style={{paddingLeft: 0, paddingRight: 0}}>
          {this.getStepLabels().map((label, index) =>
            <Step key={index} >
              <StepLabel>
                {this.props.section === 'literacy' ? '' : label}
              </StepLabel>
            </Step>
          )}
        </Stepper>
        <div>
          {this.getStepContent(currentQuestion)}
          <div>
            {this.getButtons()}
          </div>
        </div>
        <Dialog open={modalOpen} >
          <DialogTitle id="knowledge-check-modal-title" style={{fontFamily: 'Arimo'}}>
          Your Results
          </DialogTitle>
          {this.getModalContent()}
          {this.getModalAction()}
        </Dialog>
      </div>
    )
  }
}

TrainingQuestionnaire.contextType = FirebaseContext;
export default withStyles(styles)(connect(null, {addUnlocked, unlockLiteracyKnowledgeCheck})(TrainingQuestionnaire));
