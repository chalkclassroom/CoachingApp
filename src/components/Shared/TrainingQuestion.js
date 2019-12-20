import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import Radio from "@material-ui/core/Radio/index";
import RadioGroup from "@material-ui/core/RadioGroup/index";
import FormControlLabel from "@material-ui/core/FormControlLabel/index";
import FormControl from "@material-ui/core/FormControl/index";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

/**
 * formatting and functionality for knowledge check question
 * @class TrainingQuestion
 */
class TrainingQuestion extends React.Component {
  /**
   * @param {Props} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
      question: this.props.question,
      options: this.props.options,
      answer: this.props.answer
    };
  }

  /** 
   * lifecycle method invoked before mounted component receives new props
   * @param {Props} nextProps
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { question, answer, options, selected } = nextProps;
    console.log(this.props);

    this.setState({
      answer,
      question,
      options,
      selected
    });
  }

  /**
   * @param {event} event
   */
  handleChange = event => {
    this.setState({ selected: event.target.value });
    console.log(event.target.value, this.state.answer);
    if (event.target.value == this.state.answer) {
      console.log("Correct Answer");
      this.props.incrementCorrectResponsesHandler();
    } else {
      console.log("Wrong Answer");
    }
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <Typography component="h5" variant={"h5"}>
            {this.state.question}
          </Typography>
          <RadioGroup
            aria-label="Gender"
            name="gender1"
            className={classes.group}
            value={this.state.selected}
            onChange={this.handleChange}
          >
            {this.state.options.map((option, index) => {
              console.log(
                option,
                index,
                this.state.selected,
                this.state.selected == index
              );
              return (
                <FormControlLabel
                  key={index}
                  value={index}
                  control={<Radio checked={this.state.selected == index} />}
                  label={option}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

TrainingQuestion.propTypes = {
  classes: PropTypes.object.isRequired,
  incrementCorrectResponsesHandler: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.number.isRequired
};

export default withStyles(styles)(TrainingQuestion);
