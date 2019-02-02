import React from "react";
import PropTypes from "prop-types";
import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import YesNoDialog from "../../components/Shared/YesNoDialog";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

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
        width: "60%",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        borderRadius: 8
    }
});

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#ffffff"
        },
        secondary: {
            main: "#5da7ff"
        }
    }
});

class RatingModal extends React.Component {
    state = {
        rating: 0,
        value: "undefined"
    };

    handleChange = event => {
        let ret = 0;
        const val = event.target.value;
        switch (val) {
            case "Extreme Negative":
                ret = 1;
                break;
            case "Negative":
                ret = 2;
                break;
            case "Flat":
                ret = 3;
                break;
            case "Pleasant":
                ret = 4;
                break;
            case "Vibrant":
                ret = 5;
                break;
            default:
                break;
        }
        this.setState({ value: event.target.value });
        this.setState({ rating: ret });
    };

    /*
        N.B. You must wrap this "modal" component in a modal of your own.
        This is for performance reasons, cf. https://material-ui.com/utils/modal/#performance
     */
    render() {
        const { classes } = this.props;

        return (
            <div style={getModalStyle()} className={classes.paper}>
                <Grid
                    container
                    alignItems="center"
                    direction="column"
                    justify="flex-start"
                >
                    <Typography variant="h6" gutterBottom>
                        Teacher Tone Rating
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        Please rate the teacher's current tone.
                    </Typography>
                    <Grid
                        container
                        alignItems={"center"}
                        justify={"center"}
                        direction={"row"}
                    >
                        <MuiThemeProvider theme={theme}>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="position"
                                    name="position"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    row
                                >
                                    <FormControlLabel
                                        value="Extreme Negative"
                                        control={<Radio color="secondary" />}
                                        label="Extreme Negative"
                                        labelPlacement="bottom"
                                    />
                                    <FormControlLabel
                                        value="Negative"
                                        control={<Radio color="secondary" />}
                                        label="Negative"
                                        labelPlacement="bottom"
                                    />
                                    <FormControlLabel
                                        value="Flat"
                                        control={<Radio color="secondary" />}
                                        label="Flat"
                                        labelPlacement="bottom"
                                    />
                                    <FormControlLabel
                                        value="Pleasant"
                                        control={<Radio color="secondary" />}
                                        label="Pleasant"
                                        labelPlacement="bottom"
                                    />
                                    <FormControlLabel
                                        value="Vibrant"
                                        control={<Radio color="secondary" />}
                                        label="Vibrant"
                                        labelPlacement="bottom"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </MuiThemeProvider>
                    </Grid>
                    <Grid
                        container
                        alignItems={"center"}
                        justify={"center"}
                        direction={"row"}
                    >
                        <YesNoDialog
                            buttonText={"Confirm Rating"}
                            buttonVariant={"contained"}
                            buttonColor={"secondary"}
                            buttonStyle={{ margin: 10 }}
                            dialogTitle={`Are you sure you want to submit a rating of ${
                                this.state.value
                            }?`}
                            onAccept={this.props.handleRatingConfirmation}
                            onAcceptParams={this.state.rating}
                            shouldOpen={true}
                        />
                        <YesNoDialog
                            buttonText={"Skip Rating"}
                            buttonVariant={"contained"}
                            buttonColor={"primary"}
                            buttonStyle={{ margin: 10 }}
                            dialogTitle={`Are you sure you want to skip this rating? This option should only be used in exceptional circumstances.`}
                            onAccept={this.props.handleRatingConfirmation}
                            onAcceptParams={0}
                            shouldOpen={true}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

RatingModal.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RatingModal);
