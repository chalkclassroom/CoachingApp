import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import Radio from '@material-ui/core/Radio/index';
import RadioGroup from '@material-ui/core/RadioGroup/index';
import FormControlLabel from '@material-ui/core/FormControlLabel/index';
import FormControl from '@material-ui/core/FormControl/index';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles: object = {
  formControl: {
    fontFamily: 'Arimo'
  },
  correctFeedback: {
    color: '#28B10C',
    lineSpacing: '0.4em',
    fontSize: '1em',
    fontFamily: 'Arimo'
  },
  incorrectFeedback: {
    color: '#B1150C',
    lineSpacing: '0.4em',
    fontSize: '1em',
    fontFamily: 'Arimo'
  }
};

interface Props {
  classes: {
    formControl: string,
    correctFeedback: string,
    incorrectFeedback: string
  },
  setSelection(selection: number): void,
  feedback: string,
  recentlyCorrect: boolean,
  question: string,
  options: Map<string, boolean>,
  selected: number
}

/**
 * @class TrainingQuestion
 */
class TrainingQuestion extends React.Component<Props, {}> {

  /**
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event
   */
  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    console.log(event.target.value);
    this.props.setSelection(Number(event.target.value));
  }

  getFeedback = (): React.ReactElement | null => {
    if (!!this.props.feedback) {
      if (this.props.recentlyCorrect) {
        return <FormHelperText className={this.props.classes.correctFeedback}>{this.props.feedback}</FormHelperText>
      } else {
        return <FormHelperText className={this.props.classes.incorrectFeedback}>{this.props.feedback}</FormHelperText>
      }
    } else {
      return null
    }
  }

  static propTypes = {
    classes: PropTypes.exact({
      formControl: PropTypes.string,
      correctFeedback: PropTypes.string,
      incorrectFeedback: PropTypes.string
    }).isRequired,
    setSelection: PropTypes.func.isRequired,
    feedback: PropTypes.string.isRequired,
    recentlyCorrect: PropTypes.bool.isRequired,
    question: PropTypes.string.isRequired,
    selected: PropTypes.number.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes, question, options, selected, feedback } = this.props;
    console.log(question, feedback);
    return (
      <div>
        <FormControl className={classes.formControl}>
          <p>{question}</p>
          <RadioGroup
            aria-label="Multiple Choice Question"
            name="knowledge-check-question"
            value={"" + selected}
            onChange={this.handleChange}
          >
            {Array.from(options.keys()).map( (option, index) =>
              <FormControlLabel checked={selected === index} value={"" + index}
                label={option} key={index} control={<Radio />}
                disabled={feedback !== ""}
                style={{fontFamily: 'Arimo'}}
              />
            )}
          </RadioGroup>

          {this.getFeedback()}
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(TrainingQuestion);
