import React from "react";
import PropTypes from "prop-types";
import { /*createMuiTheme,*/ withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
// import cyan from "@material-ui/core/colors/teal";
import SignUpForm from "./SignUpForm";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Card from "@material-ui/core/Card";
import {ReactComponent as CoachSvg} from "../../assets/icons/coach.svg";
// import Coach from "../../assets/icons/coach.svg";
import { ReactComponent as TeacherSvg } from "../../assets/icons/teacher.svg";
import { ReactComponent as TeacherComingSoon } from "../../assets/icons/teacherComingSoon.svg";
import {ReactComponent as newManager} from "../../assets/icons/NewManager.svg";
import { ReactComponent as ManagerComingSoon } from "../../assets/icons/managerComingSoon.svg";
import { ReactComponent as NewCoach } from "../../assets/icons/newCoach.svg";
import { ReactComponent as NewTeacher } from "../../assets/icons/newTeacher.svg";
import { ReactComponent as NewAdmin } from "../../assets/icons/newAdministrator.svg";
import { ReactComponent as GrayedAdmin } from "../../assets/icons/newAdminGrayed.svg";
import { ReactComponent as GrayedTeacher } from "../../assets/icons/newTeacherGrayed.svg";
import CardContent from "@material-ui/core/CardContent";
function getModalStyle() {
    return {
        position: "fixed",
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`
    };
}

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 4 * 1 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired
};
/*
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#ffffff"
        },
        secondary: cyan
    }
});
*/
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

class SignUpModal extends React.Component {
    state = {
        open: true,
        role: 0
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeRole = role => {
        this.setState({ role: role });
    };

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
                            direction="row"
                            justify="space-between"
                        >
                            <Typography component={"h6"} variant={"h6"}>
                                Sign Up
                            </Typography>
                            <IconButton style={{ padding: 10 }}>
                                <Tooltip title={"Close"} placement={"right"}>
                                    <CloseIcon
                                        onClick={this.props.handleClose}
                                    />
                                </Tooltip>
                            </IconButton>
                        </Grid>
                        <Grid
                            xs={12}
                            container
                            alignItems="center"
                            direction="column"
                            justify="flex-start"
                        >
                            {this.state.role === 0 ? (
                                <Grid
                                    xs={12}
                                    container
                                    alignItems="center"
                                    direction="row"
                                    justify="space-around"
                                    style={{ padding: 40 }}
                                >
                                    <NewAdmin />
                                    <Card
                                        className={classes.card}
                                        onClick={() => this.handleChangeRole(1)}
                                    >
                                        <CardContent>
                                            <Grid
                                                xs={12}
                                                container
                                                alignItems="center"
                                                direction="column"
                                                justify="flex-start"
                                            >
                                                <Grid item>
                                                    <NewCoach
                                                        style={{
                                                            height: "100",
                                                            width: "100"
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Typography
                                                        variant="h5"
                                                        component="h2"
                                                    >
                                                        Coach
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                    <Card
                                        className={classes.card}
                                        // onClick={() => this.handleChangeRole(2)}
                                    >
                                        <CardContent>
                                            <Grid
                                                xs={12}
                                                container
                                                alignItems="center"
                                                direction="column"
                                                justify="flex-start"
                                            >
                                                <Grid item>
                                                    {/* <TeacherSvg
                                                        style={{
                                                            height: "100",
                                                            width: "100"
                                                        }}
                                                    /> */}
                                                    <GrayedTeacher
                                                         style={{
                                                            height: "100",
                                                            width: "100"
                                                        }} /> 

                                                </Grid>
                                                <Grid item>
                                                    <Typography
                                                        variant="h5"
                                                        component="h2"
                                                    >
                                                        Teacher
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                    <Card
                                        className={classes.card}
                                        // onClick={() => this.handleChangeRole(3)}
                                    >
                                        <CardContent>
                                            <Grid
                                                xs={12}
                                                container
                                                alignItems="center"
                                                direction="column"
                                                justify="flex-start"
                                            >
                                                <Grid item>
                                                    {/* <ManagerSvg
                                                        style={{
                                                            height: "100",
                                                            width: "100"
                                                        }}
                                                    /> */}
                                                    <GrayedAdmin
                                                        style={{
                                                            height: "100",
                                                            width: "auto",
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Typography
                                                        variant="h5"
                                                        component="h2"
                                                    >
                                                        Admin
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ) : this.state.role === 1 ? (
                                <SignUpForm
                                    mRole={"coach"}
                                    fullWidth
                                    firebase={this.props.firebase}
                                />
                            ) : this.state.role === 2 ? (
                                <SignUpForm
                                    mRole={"teacher"}
                                    firebase={this.props.firebase}
                                />
                            ) : (
                                <SignUpForm
                                    mRole={"administrator"}
                                    firebase={this.props.firebase}
                                />
                            )}
                        </Grid>
                    </div>
                </Modal>
            </div>
        );
    }
}

SignUpModal.propTypes = {
    classes: PropTypes.object.isRequired,
    handleClose: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUpModal);
