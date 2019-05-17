import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import Stepper from '@material-ui/core/Stepper/index';
import Step from '@material-ui/core/Step/index';
import StepLabel from '@material-ui/core/StepLabel/index';
import Button from '@material-ui/core/Button/index';
import Typography from '@material-ui/core/Typography/index';
import TrainingQuestion from "./TrainingQuestion";
import FirebaseContext from "../Firebase/context";
import MenuItem from "@material-ui/core/MenuItem";
import moment from "../../views/protected/ClassroomClimateViews/ClassroomClimateResults";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});

const questionArray = ['transition', 'climate', 'math', 'student', 'level', 'listening', 'sequential', 'ac'];

class TrainingQuestionnaire extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            skipped: new Set(),
            questions: [],
            correctResponses:0,
            passed: 0
        };
        this.incrementCorrectResponsesHandler = this.incrementCorrectResponsesHandler.bind(this)

    }

    incrementCorrectResponsesHandler() {
        this.setState((prevState, props) => ({
            correctResponses: prevState.correctResponses + 1
        }));
    }

    getSteps() {
        if (this.state.questions === undefined || this.state.questions.length == 0) {
            return []
        }
        else {
            let stringsArray=[];
            for(var i = 0; i < this.state.questions.length; i++){
                stringsArray.push('Q: ' + (i + 1));
            }
            return stringsArray;
        }
    }

    getStepContent(step) {
        if (this.state.questions === undefined || this.state.questions.length == 0) {
            return <div> Loading ... </div>
        }
        else {
            console.log('step', step, this.state.questions);
            console.log("<div><TrainingQuestion options=" + this.state.questions[step].options + "/></div>")
            return <TrainingQuestion selected={-1} incrementCorrectResponsesHandler={this.incrementCorrectResponsesHandler} question={this.state.questions[step].question} answer={this.state.questions[step].answer} options={this.state.questions[step].options}/>;
        }
    }

    handleNext = () => {
        const { activeStep } = this.state;
        let { skipped } = this.state;
        if (this.isStepSkipped(activeStep)) {
            skipped = new Set(skipped.values());
            skipped.delete(activeStep);
        }
        this.setState({
            activeStep: activeStep + 1,
            skipped,
        });
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    isStepSkipped(step) {
        return this.state.skipped.has(step);
    }


    componentDidMount() {
        let firebase = this.context;
        firebase.handleFetchQuestions(questionArray[this.props.section-1]).then((questions)=>{
            console.log(questions)
            this.setState({
                questions: questions
            });
        });
    }

    unlockBasedOnGrade(){
        console.log(this.state.correctResponses, this.state.questions.length)
       if(this.state.correctResponses / this.state.questions.length >= 0.8){
           console.log("Passed");
           let firebase = this.context;
           firebase.handleUnlockSection(this.props.section);
       }else{
           console.log("Failed Try Again")
       }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.state.correctResponses + 1 === nextState.correctResponses){
            return false;
        }else{
            return true;
        }
    }

    render() {
        const { classes } = this.props;
        const steps = this.getSteps();
        const { activeStep,questions } = this.state;
        if(activeStep === questions.length && questions !== 0){
                console.log("calling unlock firebase");
                this.unlockBasedOnGrade();
        }

        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const props = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...props}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>
                                Completed Training
                            </Typography>
                        </div>
                    ) : (
                        <div>
                            {console.log("active", activeStep)}
                            {this.getStepContent(activeStep)}
                            <div>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={this.handleBack}
                                    className={classes.button}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                    className={classes.button}
                                >
                                    {activeStep === this.state.questions.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

TrainingQuestionnaire.propTypes = {
    classes: PropTypes.object,
};


TrainingQuestionnaire.contextType = FirebaseContext;
export default withStyles(styles)(TrainingQuestionnaire);