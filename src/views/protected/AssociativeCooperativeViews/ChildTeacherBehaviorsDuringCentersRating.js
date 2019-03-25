import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import InfoIcon from "@material-ui/icons/Help";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/core/styles";
import YesNoDialog from "../../../components/Shared/YesNoDialog";
import Notes from "../../../components/Notes";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button/Button";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import FirebaseContext from "../../../components/Firebase/context";
import AppBar from "../../../components/AppBar";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import ClassroomClimateHelp from "../../../components/ClassroomClimateComponent/ClassroomClimateHelp";
import KeyboardArrowLeft from "@material-ui/core/es/internal/svg-icons/KeyboardArrowLeft";
import Card from "@material-ui/core/Card/Card";

const styles = ({
    root: {
        flexGrow: 1,
        backgroundColor: "#ffffff",
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column"
    },
    grow: {
        flexGrow: 1
    }
});

const TeacherChildEnum = {
    CHILD_1: 1,
    CHILD_2: 2,
    CHILD_1_TEACHER: 3,
    CHILD_2_TEACHER: 4
};

class ChildTeacherBehaviorsDuringCentersRating extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
        help: false,
        ratings: [],
        checked: [0],
        people: undefined
    };
    handleRatingModal = () => {
        this.setState({ ratingIsOpen: true });
    };
    handleHelpModal = () => {
        this.setState({ help: true });
    };
    handleClickAway = () => {
        this.setState({ help: false });
    };
    handleNotes = (open) => {
        if (open) {
            this.setState({ notes: true });
        } else {
            this.setState({ notes: false });
        }
    };
    handleRatingConfirmation = rating => {
        this.setState({ ratingIsOpen: false });

        /* from RatingModal for ClassroomClimate

        this.props.appendClimateRating(rating);

        let entry = {
            BehaviorResponse: rating,
            Type: "Rating",
            ratingInterval: RATING_INTERVAL
        };
        let firebase = this.context;
        firebase.handlePushFireStore(entry);
        */
    };

    handleBackButton = () => {
        this.props.history.push({
            pathname: "/AssociativeCooperativeInteractions",
            state: this.props.history.state
        });
    };

    handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });
    };

    handleChild1Click = () => {
        if (this.state.people !== TeacherChildEnum.CHILD_1) {
            this.setState({ people: TeacherChildEnum.CHILD_1});
        }
    };

    handleChild2Click = () => {
        if (this.state.people !== TeacherChildEnum.CHILD_2) {
            this.setState({ people: TeacherChildEnum.CHILD_2});
        }
    };

    handleChild1TeacherClick = () => {
        if (this.state.people !== TeacherChildEnum.CHILD_1_TEACHER) {
            this.setState({ people: TeacherChildEnum.CHILD_1_TEACHER});
        }
    };

    handleChild2TeacherClick = () => {
        if (this.state.people !== TeacherChildEnum.CHILD_2_TEACHER) {
            this.setState({ people: TeacherChildEnum.CHILD_2_TEACHER});
        }
    };

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={this.props.classes.root}>
                <FirebaseContext.Consumer>
                    {firebase => <AppBar firebase={firebase}/>}
                </FirebaseContext.Consumer>
                {this.state.help ? (
                    <ClickAwayListener onClickAway={this.handleClickAway}>
                        {" "}
                        <ClassroomClimateHelp/>
                    </ClickAwayListener>
                ) : (
                    this.state.notes ? (
                            <FirebaseContext.Consumer>
                                {firebase => <Notes open={true} onClose={this.handleNotes} color="#0988EC" text="Classroom Climate Notes" firebase={firebase}/>}
                            </FirebaseContext.Consumer>
                        ) :
                        <div/>
                )}
                <main >
                    <Grid alignItems={"center"} direction={"row"} justify={"center"}>
                        <Grid>
                            <Button size={"small"}
                                onClick={this.handleBackButton}>
                                <KeyboardArrowLeft/>
                                Back
                            </Button>
                        </Grid>
                        <Grid
                            container
                            alignItems="center"
                            direction="column"
                            xs={12}
                        >
                            <Typography variant="h4" gutterBottom>
                                Writing
                            </Typography>
                            <div style={{ height: 20 }} />
                            <Grid container direction={"row"} justify={"space-between"} xs={10}>
                                <Grid item>
                                    <Button
                                        onClick={this.handleChild1Click}
                                        variant={this.state.people === TeacherChildEnum.CHILD_1 ? "contained" : "outlined"}
                                    >
                                        1 child
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
                            <Grid container direction={"row"} spacing={16} xs={12}>
                                <Grid xs={1}/>
                                <Grid item xs={5}>
                                    <Card>
                                        <Typography variant="h6" align={"center"}>
                                            Child Behaviors
                                        </Typography>
                                        <List>
                                            <ListItem onClick={this.handleToggle(1)}>
                                                <Checkbox
                                                    checked={this.state.checked.indexOf(1) !== -1}/>
                                                <ListItemText>
                                                    <b>Talking</b> to adult or peer about <b>current activity</b>
                                                </ListItemText>
                                            </ListItem>
                                            <ListItem onClick={this.handleToggle(2)}>
                                                <Checkbox
                                                    checked={this.state.checked.indexOf(2) !== -1}/>
                                                <ListItemText>
                                                    Engaging <b>together</b> in an <b>open-ended activity</b> without clear roles or order
                                                </ListItemText>
                                            </ListItem>
                                            <ListItem onClick={this.handleToggle(3)}>
                                                <Checkbox
                                                    checked={this.state.checked.indexOf(3) !== -1}/>
                                                <ListItemText>
                                                    Following <b>formal rules of a game</b> and/or taking turns
                                                </ListItemText>
                                            </ListItem>
                                            <ListItem onClick={this.handleToggle(4)}>
                                                <Checkbox
                                                    checked={this.state.checked.indexOf(4) !== -1}/>
                                                <ListItemText>
                                                    Speaking or acting according to a <b>predetermined scenario</b> (e.g., restaurant, grocery store)
                                                </ListItemText>
                                            </ListItem>
                                        </List>
                                    </Card>
                                </Grid>
                                <Grid item xs={5}>
                                    <Card>
                                        <Typography variant="h6" align={"center"}>
                                            Teacher Behaviors
                                        </Typography>
                                        <List>
                                            <ListItem onClick={this.handleToggle(5)}>
                                                <Checkbox
                                                    checked={this.state.checked.indexOf(5) !== -1}/>
                                                <ListItemText>
                                                    <b>Participating</b> in children’s play
                                                </ListItemText>
                                            </ListItem>
                                            <ListItem onClick={this.handleToggle(6)}>
                                                <Checkbox
                                                    checked={this.state.checked.indexOf(6) !== -1}/>
                                                <ListItemText>
                                                    <b>Asking questions</b> to check for understanding or extend children’s thinking
                                                </ListItemText>
                                            </ListItem>
                                            <ListItem onClick={this.handleToggle(7)}>
                                                <Checkbox
                                                    checked={this.state.checked.indexOf(7) !== -1}/>
                                                <ListItemText>
                                                    <b>Encouraging</b> children to <b>share</b>,
                                                    <b>work</b>, or <b>interact</b> with each other
                                                </ListItemText>
                                            </ListItem>
                                            <ListItem onClick={this.handleToggle(8)}>
                                                <Checkbox
                                                    checked={this.state.checked.indexOf(8) !== -1}/>
                                                <ListItemText>
                                                    Helping children find the <b>words to communicate</b>
                                                </ListItemText>
                                            </ListItem>
                                        </List>
                                    </Card>
                                </Grid>
                                <Grid xs={1}/>
                            </Grid>
                            <Grid
                                container
                                alignItems={"center"}
                                justify={"center"}
                                direction={"row"}
                            >
                                <Button
                                    variant={"contained"}
                                    color={"secondary"}
                                    style={{ margin: 10 }}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </main>
                <footer>
                    <Grid
                        container
                        alignItems={"center"}
                        justify={"space-between"}
                        direction={"row"}
                    >
                        <Grid item xs={2}>
                            <IconButton
                                aria-owns={open ? "menu-appbar" : undefined}
                                aria-haspopup="true"
                                onClick={this.handleHelpModal}
                                color="inherit"
                            >
                                <InfoIcon
                                    color={"secondary"}
                                    fontSize={"large"}
                                />
                            </IconButton>
                            <IconButton
                                aria-owns={open ? "menu-appbar" : undefined}
                                aria-haspopup="true"
                                onClick={this.handleNotes}
                                color="inherit"
                            >
                                <EditIcon
                                    color={"secondary"}
                                    fontSize={"large"}
                                />
                            </IconButton>
                        </Grid>
                        <Grid container xs={8}/>
                        <Grid item xs={2}>
                            <Grid
                                container
                                alignItems={"center"}
                                justify={"space-between"}
                                direction={"column"}
                            >
                                Start Time:{" "}
                                {new Date().toLocaleString("en-US", {
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true
                                })}
                                <br/>
                            </Grid>
                        </Grid>
                    </Grid>
                </footer>
            </div>
        );
    }
}

ChildTeacherBehaviorsDuringCentersRating.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChildTeacherBehaviorsDuringCentersRating);
