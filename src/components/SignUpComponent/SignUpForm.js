import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    main: {
        maxWidth: '100%',
        display: 'block',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

function SignUpForm(props) {
    const { classes } = props;

    return (
        <main>
            <Paper className={classes.paper}>
                <form className={classes.form}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="firstname">First Name</InputLabel>
                        <Input id="firstname" name="firstname" autoComplete="firstname" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="lastname">Last Name</InputLabel>
                        <Input name="lastname" type="lastname" id="lastname" />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" name="email" autoComplete="email" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="accesscode">Access Code</InputLabel>
                        <Input name="accesscode" id="accesscode" />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="profilepic">Profile Picture</InputLabel>
                        <Button name="profilepic" label='Profile Picture' style={{padding:20}} variant={'outlined'}>
                            <input name="profilepic" type='file' style={{width: '50%'}} />
                        </Button>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                </form>
            </Paper>
        </main>
    );
}

SignUpForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUpForm);