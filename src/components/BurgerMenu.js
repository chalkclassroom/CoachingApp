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
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import CoachingIcon from "@material-ui/icons/Tablet";
import MessagesIcon from "@material-ui/icons/MailOutline";
import ObserveIcon from "@material-ui/icons/Visibility";
import ResourcesIcon from "@material-ui/icons/Category";
import ResearchIcon from "@material-ui/icons/AccountBalance";
import ActionPlansIcon from "@material-ui/icons/CastForEducation";
import Magic8Icon from "@material-ui/icons/Stars";
import PeopleIcon from "@material-ui/icons/People";
import ResultsIcon from "@material-ui/icons/PieChart";
import TutorialIcon from "@material-ui/icons/School";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import HelpIcon from "@material-ui/icons/ContactSupport";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { withRouter } from "react-router-dom";
import TeacherModal from "../views/protected/HomeViews/TeacherModal.tsx";
import FirebaseContext from "./Firebase/FirebaseContext";
import { connect } from "react-redux";

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
  },
  nested: {
    paddingLeft: 75
  }
});

/**
 * Navigation Menu
 * @class BurgerMenu
 * @param {type} type
 * 
 */
class BurgerMenu extends React.Component {
  state = {
    menu: 0,
    open: this.props.open,
    coachingOpen: false,
    teacherModal: false,
    type: ""
  };
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  showTeacherModal = type => {
    this.setState({ teacherModal: true, type: type });
  };

  handleTeacherModalClose = () => {
    this.setState({
      teacherModal: false,
      type: ""
    });
  };

  handleOpenCoaching = () => {
    if (this.state.coachingOpen) {
      this.setState({ coachingOpen: false });
    } else {
      this.setState({ coachingOpen: true });
    }
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;
    return (
      <div>
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
            <IconButton onClick={event => this.props.handleClose(event)}>
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
                <HomeIcon style={{ fill: "#094492" }} />
              </ListItemIcon>
              <ListItemText
                primary="Home"
                onClick={() => this.props.history.push("/Home")}
              />
            </ListItem>
            <ListItem button onClick={this.handleOpenCoaching}>
              <ListItemIcon>
                <CoachingIcon style={{ fill: "#e99c2e" }} />
              </ListItemIcon>
              <ListItemText primary="Coaching" />
              {this.state.coachingOpen ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </ListItem>
            <Collapse in={this.state.coachingOpen} timeout="auto" unMountOnExit>
              <ListItem
                button
                onClick={() => {
                  this.setState({ menu: 1 });
                }}
                className={classes.nested}
              >
                <ListItemIcon>
                  <PeopleIcon style={{ fill: "#ffd300" }} />
                </ListItemIcon>
                <ListItemText
                  primary="My Teachers"
                  onClick={() => this.props.history.push("/MyTeachers")}
                />
              </ListItem>
              <ListItem
                button
                disabled
                onClick={() => {
                  this.setState({ menu: 2 });
                }}
                className={classes.nested}
              >
                <ListItemIcon>
                  <CalendarIcon style={{ fill: "#094492" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Calendar"
                  onClick={() => this.props.history.push("/Calendar")}
                />
              </ListItem>
              <ListItem
                button
                disabled
                onClick={() => {
                  this.setState({ menu: 3 });
                }}
                className={classes.nested}
              >
                <ListItemIcon>
                  <MessagesIcon style={{ fill: "#4fd9b3" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Messages"
                  onClick={() => this.props.history.push("/Messages")}
                />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  this.setState({ menu: 4 });
                }}
                className={classes.nested}
              >
                <ListItemIcon>
                  <TutorialIcon style={{ fill: "#6f39c4" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Training"
                  onClick={() =>
                    this.props.history.push({
                      pathname: "/Magic8Menu",
                      state: { type: "Training" }
                    })
                  }
                />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  this.setState({ menu: 5 });
                }}
                className={classes.nested}
              >
                <ListItemIcon>
                  <ObserveIcon style={{ fill: "#e99c2e" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Observe"
                  onClick={() => this.showTeacherModal("Observe")}
                />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  this.setState({ menu: 6 });
                }}
                className={classes.nested}
              >
                <ListItemIcon>
                  <ResultsIcon style={{ fill: "#099365" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Results"
                  onClick={() => this.showTeacherModal("Results")}
                />
              </ListItem>
              <ListItem
                button
                disabled
                onClick={() => {
                  this.setState({ menu: 7 });
                }}
                className={classes.nested}
              >
                <ListItemIcon>
                  <ActionPlansIcon style={{ fill: "#e55529" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Action Plans"
                  onClick={() => this.props.history.push("/ActionPlans")}
                />
              </ListItem>
            </Collapse>
            <ListItem
              button
              disabled
              onClick={() => {
                this.setState({ menu: 8 });
              }}
            >
              <ListItemIcon>
                <ResourcesIcon style={{ fill: "#4fd9b3" }} />
              </ListItemIcon>
              <ListItemText
                primary="Resources"
                onClick={() => this.props.history.push("/Resources")}
              />
            </ListItem>
            <ListItem
              button
              disabled
              onClick={() => {
                this.setState({ menu: 9 });
              }}
            >
              <ListItemIcon>
                <Magic8Icon style={{ fill: "#6f39c4" }} />
              </ListItemIcon>
              <ListItemText
                primary="Magic 8 Materials"
                onClick={() => this.props.history.push("/Messages")}
              />
            </ListItem>
            <ListItem
              button
              disabled
              onClick={() => {
                this.setState({ menu: 10 });
              }}
            >
              <ListItemIcon>
                <ResearchIcon style={{ fill: "#0988EC" }} />
              </ListItemIcon>
              <ListItemText
                primary="Research"
                onClick={() => this.props.history.push("/about")}
              />
            </ListItem>
            <ListItem
              button
              disabled
              onClick={() => {
                this.setState({ menu: 11 });
              }}
            >
              <ListItemIcon>
                <PersonIcon style={{ fill: "#099365" }} />
              </ListItemIcon>
              <ListItemText
                primary="My Account"
                onClick={() => this.props.history.push("/Account")}
              />
            </ListItem>
            <ListItem
              button
              disabled
              onClick={() => {
                this.setState({ menu: 12 });
              }}
            >
              <ListItemIcon>
                <HelpIcon style={{ fill: "#e55529" }} />
              </ListItemIcon>
              <ListItemText
                primary="Help"
                onClick={() => this.props.history.push("/help")}
              />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                this.setState({ menu: 13 });
              }}
            >
              <ListItemIcon>
                <LogoutIcon style={{ fill: "#ffd300" }} />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                onClick={() => {
                  this.props.firebase.firebaseSignOut();
                  this.props.history.push("/");
                }}
              />
            </ListItem>
          </List>
        </Drawer>
        {this.state.teacherModal ? (
          <FirebaseContext.Consumer>
            {firebase => (
              <TeacherModal
                handleClose={this.handleTeacherModalClose}
                firebase={firebase}
                type={this.state.type}
              />
            )}
          </FirebaseContext.Consumer>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

BurgerMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired
};

export default withRouter(connect()(withStyles(styles)(BurgerMenu)));
