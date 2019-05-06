import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import Radio from '@material-ui/core/Radio/index';
import RadioGroup from '@material-ui/core/RadioGroup/index';
import FormHelperText from '@material-ui/core/FormHelperText/index';
import FormControlLabel from '@material-ui/core/FormControlLabel/index';
import FormControl from '@material-ui/core/FormControl/index';
import FormLabel from '@material-ui/core/FormLabel/index';

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
    state = {
        value: 'female',
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">1. What are the potential benefits of reducing transition time?</FormLabel>
                    <RadioGroup
                        aria-label="Gender"
                        name="gender1"
                        className={classes.group}
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <FormControlLabel value="1" control={<Radio />} label="Female" />
                        <FormControlLabel value="2" control={<Radio />} label="Male" />
                        <FormControlLabel value="3" control={<Radio />} label="Other" />
                        <FormControlLabel value="4" control={<Radio />} label="Other" />
                        <FormControlLabel value="5" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}

TrainingQuestion.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TrainingQuestion);