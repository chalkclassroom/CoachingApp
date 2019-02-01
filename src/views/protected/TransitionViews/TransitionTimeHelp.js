import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";

function getModalStyle() {
    return {
        position: "fixed",
        top: `35%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`
    };
}

const styles = theme => ({
    paper: {
        position: "absolute",
        width: "40%",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        borderRadius: 8
    }
});

class TransitionTimeHelp extends React.Component {
    state = {
        open: true
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
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

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Modal open={this.state.open}>
                    <div style={getModalStyle()} className={classes.paper}>
                        <Grid
                            xs={12}
                            container
                            alignItems="center"
                            direction="column"
                            justify="flex-start"
                        >
                            <Typography variant="subtitle2" gutterBottom>
                                A positive classroom climate leads to long-term
                                benefits for children’s academic achievement,
                                social competence, and self-regulation. It
                                allows children to:
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Components
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                <br />
                                - More behavior-approving language
                                <br />
                                - Less behavior-disapproving language
                                <br />
                                - Concrete and specific praise
                                <br />
                                -Absense of threats and sarcasm
                            </Typography>
                            <br />
                            <Typography variant="h6" gutterBottom>
                                Benefits
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                - feel valued and safe
                                <br />
                                - interact more with teachers and peers
                                <br />
                                -take academic risks
                                <br />
                                -deeply engage in learning
                            </Typography>
                        </Grid>
                    </div>
                </Modal>
            </div>
        );
    }
}

TransitionTimeHelp.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TransitionTimeHelp);
