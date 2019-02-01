import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import PeopleIcon from "@material-ui/icons/People";
import Magic8Icon from "@material-ui/icons/Looks";
import ResultsIcon from "@material-ui/icons/PieChart";
import TutorialIcon from "@material-ui/icons/School";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import HelpIcon from "@material-ui/icons/ContactSupport";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { withRouter } from "react-router-dom";
// import Firebase from "./Firebase";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: "flex"
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36
    },
    menuButtonHidden: {
        display: "none"
    },
    title: {
        flexGrow: 1
    },
    leftTitle: {
        padding: "1em"
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing.unit * 9
        }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: "100vh",
        overflow: "auto"
    },
    chartContainer: {
        marginLeft: -22
    },
    tableContainer: {
        height: 320
    }
});

class BurgerMenu extends React.Component {
    state = {
        menu: 0,
        open: this.props.open
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <Drawer
                variant="temporary"
                classes={{
                    paper: classNames(
                        classes.drawerPaper,
                        !this.props.open && classes.drawerPaperClose
                    )
                }}
                open={this.props.open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton
                        onClick={event => this.props.handleClose(event)}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem
                        button
                        onClick={() => {
                            this.setState({ menu: 0 });
                        }}
                    >
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Home"
                            onClick={() => this.props.history.push("/Home")}
                        />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            this.setState({ menu: 1 });
                        }}
                    >
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="My Account"
                            onClick={() => this.props.history.push("/Account")}
                        />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            this.setState({ menu: 8 });
                        }}
                    >
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Invite Teachers"
                            onClick={() => this.props.history.push("/Invite")}
                        />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            this.setState({ menu: 2 });
                        }}
                    >
                        <ListItemIcon>
                            <Magic8Icon />
                        </ListItemIcon>
                        <ListItemText primary="Magic 8 Materials" />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            this.setState({ menu: 3 });
                        }}
                    >
                        <ListItemIcon>
                            <ResultsIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Coaching Results"
                            onClick={() => this.props.history.push("/Results")}
                        />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            this.setState({ menu: 4 });
                        }}
                    >
                        <ListItemIcon>
                            <CalendarIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Calendar"
                            onClick={() => this.props.history.push("/Calendar")}
                        />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            this.setState({ menu: 5 });
                        }}
                    >
                        <ListItemIcon>
                            <TutorialIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="App Trainings"
                            onClick={() =>
                                this.props.history.push("/Trainings")
                            }
                        />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            this.setState({ menu: 6 });
                        }}
                    >
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Logout"
                            onClick={() => {
                                this.props.firebase.firebaseSignOut();
                                this.props.history.push("/");
                            }}
                        />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            this.setState({ menu: 7 });
                        }}
                    >
                        <ListItemIcon>
                            <HelpIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Help"
                            onClick={() => this.props.history.push("/help")}
                        />
                    </ListItem>
                </List>
            </Drawer>
        );
    }
}

BurgerMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    handleClose: PropTypes.object.isRequired,
    open: PropTypes.object.isRequired
};

const BurgerMenuWithRouter = withRouter(BurgerMenu);
export default withStyles(styles)(BurgerMenuWithRouter);
