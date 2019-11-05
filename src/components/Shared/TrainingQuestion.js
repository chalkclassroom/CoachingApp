import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import Radio from '@material-ui/core/Radio/index';
import RadioGroup from '@material-ui/core/RadioGroup/index';
import FormControlLabel from '@material-ui/core/FormControlLabel/index';
import FormControl from '@material-ui/core/FormControl/index';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = theme => ({
  root: {
    border: '1px solid #FF0046',
    // display: 'flex',
    // flexGrow: 1,
  },
  formControl: {
    // margin: theme.spacing.unit * 3,
  },
  group: {
    // margin: `${theme.spacing.unit}px 0`,
  },
});


class TrainingQuestion extends Component {

  handleChange = event => {
    console.log(event.target.value);
    this.props.setSelection(Number(event.target.value));
  };

  render() {
    const { classes, question, options, selected, feedback } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <p>{question}</p>
          <RadioGroup
            aria-label="Multiple Choice Question"
            name="knowledge-check-question"
            className={classes.group}
            value={"" + selected}
            onChange={this.handleChange}
          >
            {Array.from(options.keys()).map( (option, index) =>
              <FormControlLabel checked={selected === index} value={"" + index}
                                label={option} key={index} control={<Radio />}
              />
            )}
          </RadioGroup>
          <FormHelperText>{feedback}</FormHelperText>
        </FormControl>
      </div>
    );
  }
}

TrainingQuestion.propTypes = {
  classes: PropTypes.object.isRequired,
  setSelection: PropTypes.func.isRequired,
};

export default withStyles(styles)(TrainingQuestion);