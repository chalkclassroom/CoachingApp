import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import Radio from '@material-ui/core/Radio/index';
import RadioGroup from '@material-ui/core/RadioGroup/index';
import FormControlLabel from '@material-ui/core/FormControlLabel/index';
import FormControl from '@material-ui/core/FormControl/index';
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class TrainingQuestion extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      selected: this.props.selected,
      question:this.props.question,
      options:this.props.options,
      answer:this.props.answer
    };
  }

  componentWillReceiveProps(nextProps){
    const {question, answer, options,selected} = nextProps;
    console.log(this.props);

    this.setState({
      answer,
      question,
      options,
      selected
    })
  }

  handleChange = event => {
    this.setState({ selected: event.target.value })
    console.log(event.target.value, this.state.answer)
    if (event.target.value == this.state.answer) {
      console.log("Correct Answer")
      this.props.incrementCorrectResponsesHandler();
    } else {
      console.log("Wrong Answer")
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <Typography component="h5" variant={"h5"}>{this.state.question}</Typography>
          <RadioGroup
            aria-label="Gender"
            name="gender1"
            className={classes.group}
            value={this.state.selected}
            onChange={this.handleChange}
          >
            {this.state.options.map((option, index) => {
              console.log(option, index, this.state.selected, this.state.selected == index)
              return (
                <FormControlLabel
                  key={index}
                  value={index}
                  control={<Radio checked={this.state.selected == index}/>}
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
};

export default withStyles(styles)(TrainingQuestion);