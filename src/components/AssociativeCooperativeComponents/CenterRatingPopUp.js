import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button/Button";
import YesNoDialog from "../../components/Shared/YesNoDialog";
import angryFace from "../../assets/icons/1-ex-negative-cqref.png";
import irritatedFace from "../../assets/icons/2-negative-cqref.png";
import neutralFace from "../../assets/icons/3-flat-cqref.png";
import positiveInterestFace from "../../assets/icons/4-pleasant-cqref.png";
import excitedFace from "../../assets/icons/5-vibrant-cqref.png";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";

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
        width: "80%",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        borderRadius: 8
    }
});

const TeacherChildEnum = {
    CHILD_1: 1,
    CHILD_2: 2,
    CHILD_1_TEACHER: 3,
    CHILD_2_TEACHER: 4
};

class CenterRatingPopUp extends React.Component {
    state = {
        people: undefined,
    };

    handleChild1Click = event => {
        if (this.state.people !== TeacherChildEnum.CHILD_1 ) {
            this.setState({ people: TeacherChildEnum.CHILD_1 });
        }
    };

    handleChild2Click = event => {
        if (this.state.people !== TeacherChildEnum.CHILD_2 ) {
            this.setState({ people: TeacherChildEnum.CHILD_2 });
        }
    };

    handleChild1TeacherClick = event => {
        if (this.state.people !== TeacherChildEnum.CHILD_1_TEACHER ) {
            this.setState({ people: TeacherChildEnum.CHILD_1_TEACHER });
        }
    };

    handleChild2TeacherClick = event => {
        if (this.state.people !== TeacherChildEnum.CHILD_2_TEACHER ) {
            this.setState({ people: TeacherChildEnum.CHILD_2_TEACHER });
        }
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
                    <Typography variant="h4" gutterBottom>
                        Writing
                    </Typography>
                    <div style={{ height: 20 }} />
                    <Grid container direction={"row"} justify={"space-between"}>
                        <Grid item>
                            <Button
                                onClick={this.handleChild1Click}
                                variant={this.state.people === TeacherChildEnum.CHILD_1 ? "contained" : "outlined"}
                            >
                                1 solitary child
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={this.handleChild2Click}
                                variant={this.state.people === TeacherChildEnum.CHILD_2 ? "contained" : "outlined"}

                            >
                                2+ children without teacher
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={this.handleChild1TeacherClick}
                                variant={this.state.people === TeacherChildEnum.CHILD_1_TEACHER ? "contained" : "outlined"}
                            >
                                1 child with teacher
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={this.handleChild2TeacherClick}
                                variant={this.state.people === TeacherChildEnum.CHILD_2_TEACHER ? "contained" : "outlined"}
                            >
                                2+ children with teacher
                            </Button>
                        </Grid>
                    </Grid>
                    <div style={{ height: 20 }} />
                    <Grid container direction={"row"}>
                        <Grid item xs={6}>
                            <Typography variant="h6">
                                Child Behaviors
                            </Typography>
                            <List>
                                <ListItem>
                                    <Checkbox
                                        checked/>
                                    <ListItemText primary={"Speaking or acting in character during a clear pretend play scenario"}/>
                                </ListItem>
                                <ListItem>
                                    <Checkbox
                                        checked/>
                                    <ListItemText primary={"Engaging in pretend play without clear roles or order"}/>
                                </ListItem>
                                <ListItem>
                                    <Checkbox
                                        checked/>
                                    <ListItemText primary={"Following formal rules and/or taking turns"}/>
                                </ListItem>
                                <ListItem>
                                    <Checkbox
                                        checked/>
                                    <ListItemText primary={"Talking to each other about current activity"}/>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6">
                                Teacher Behaviors
                            </Typography>
                            <List>
                                <ListItem>
                                    <Checkbox
                                        checked/>
                                    <ListItemText primary={"Participating and/or extends child play"}/>
                                </ListItem>
                                <ListItem>
                                    <Checkbox
                                        checked/>
                                    <ListItemText primary={"Supporting individual children’s engagement"}/>
                                </ListItem>
                                <ListItem>
                                    <Checkbox
                                        checked/>
                                    <ListItemText primary={"Modeling interpersonal skills"}/>
                                </ListItem>
                            </List>
                        </Grid>
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

CenterRatingPopUp.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CenterRatingPopUp);
