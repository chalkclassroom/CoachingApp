import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Grid from "@material-ui/core/Grid";
import cyan from "@material-ui/core/colors/teal";

function getModalStyle () {

    return {
        position: 'fixed',
        top: `35%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        secondary: cyan,
    },
});

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '40%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        borderRadius: 8,
    },
});

class TransitionTimeHelp extends React.Component {
    state = {
        open: true,
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    // componentWillMount () {
    //     browser.runtime.sendMessage({
    //         "type": "login",
    //     });
    //
    //     browser.runtime.onMessage.addListener((result) => {
    //         console.log("Message Recieved From Background Service after Querying");
    //         console.log(result);
    //         if (result.loginData.email) {
    //             console.log(result.loginData.email)
    //
    //             this.handleClose()
    //         }
    //     });
    // }

    render () {
        const {classes} = this.props;

        return (
            <div>
                <Modal
                    open={this.state.open}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Grid xs={12} container alignItems="center" direction="column" justify="center">
                            <Typography variant="h6">
                            Transition Time
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                            Instructions
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                            </Typography>
                            <Typography variant="caption" gutterBottom>
                                By Signing In you are accepting T&C and Privacy Policy
                            </Typography>
                        </Grid>
                    </div>
                </Modal>
            </div>
        );
    }
}

TransitionTimeHelp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransitionTimeHelp);