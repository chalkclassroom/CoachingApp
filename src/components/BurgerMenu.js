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
import PersonIcon from "@material-ui/icons/Person";
import MessagesIcon from "@material-ui/icons/MailOutline";
import ObserveIcon from "@material-ui/icons/Visibility";
import ActionPlansIcon from "@material-ui/icons/CastForEducation";
import Magic8Icon from "@material-ui/icons/Stars";
import PeopleIcon from "@material-ui/icons/People";
import ResultsIcon from "@material-ui/icons/PieChart";
import TutorialIcon from "@material-ui/icons/School";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import HelpIcon from "@material-ui/icons/ContactSupport";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { clearCoach } from '../state/actions/coach';
import TeacherModal from "../views/protected/HomeViews/TeacherModal.tsx";
import FirebaseContext from "./Firebase/FirebaseContext";
import DashboardIcon from '@material-ui/icons/Dashboard';
import * as Constants from '../constants';

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
    paddingLeft: 14
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
                this.props.history.push("/Home");
              }}
              className={classes.nested}
            >
              <ListItemIcon>
                <DashboardIcon style={{ fill: Constants.Colors.CC}} />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
              />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                this.setState({ menu: 1 });
                this.props.history.push({
                    pathname: "/Magic8Menu",
                    state: { type: "Training" }
                });
                this.props.handleClose(event);
              }}
              className={classes.nested}
            >
              <ListItemIcon>
                <TutorialIcon style={{ fill: Constants.Colors.AC }} />
              </ListItemIcon>
              <ListItemText
                primary="Training"
              />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                this.setState({ menu: 2 });
                this.showTeacherModal("Observe");
                this.props.handleClose();
              }}
              className={classes.nested}
            >
              <ListItemIcon>
                <ObserveIcon style={{ fill: Constants.Colors.MI }} />
              </ListItemIcon>
              <ListItemText
                primary="Observe"
              />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                this.setState({ menu: 3 });
                this.props.history.push("/MyTeachers");
              }}
              className={classes.nested}
            >
              <ListItemIcon>
                <PeopleIcon style={{ fill: Constants.Colors.SA }} />
              </ListItemIcon>
              <ListItemText
                primary="My Teachers"
              />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                this.setState({ menu: 4 });
                this.showTeacherModal("Results");
                this.props.handleClose();
              }}
              className={classes.nested}
            >
              <ListItemIcon>
                <ResultsIcon style={{ fill: Constants.Colors.LC }} />
              </ListItemIcon>
              <ListItemText
                primary="Results"

              />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                this.setState({ menu: 5 });
                this.props.history.push("/ActionPlans")
              }}
              className={classes.nested}
            >
              <ListItemIcon>
                <ActionPlansIcon style={{ fill: Constants.Colors.TT }} />
              </ListItemIcon>
              <ListItemText
                primary="Action Plans"
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
                <MessagesIcon style={{ fill: Constants.Colors.CC }} />
              </ListItemIcon>
              <ListItemText
                primary="Messages"
                onClick={() => this.props.history.push("/Messages")}
              />
            </ListItem>
            {/* <ListItem
              button
              disabled
              onClick={() => {
                this.setState({ menu: 2 });
              }}
              className={classes.nested}
            >
              <ListItemIcon>
                <CalendarIcon style={{ fill: Constants.Colors.MI }} />
              </ListItemIcon>
              <ListItemText
                primary="Calendar"
                onClick={() => this.props.history.push("/Calendar")}
              />
            </ListItem> */}
            <ListItem
              button
              disabled
              onClick={() => {
                this.setState({ menu: 6 });
                this.props.history.push("/Messages")
              }}
              className={classes.nested}
            >
              <ListItemIcon>
                <Magic8Icon style={{ fill: Constants.Colors.AC }} />
              </ListItemIcon>
              <ListItemText
                primary="Coaching Resources"
              />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                this.setState({ menu: 7 });
                this.props.history.push("/Account");
              }}
              className={classes.nested}
            >
              <ListItemIcon>
                <PersonIcon style={{ fill: Constants.Colors.LI }} />
              </ListItemIcon>
              <ListItemText
                primary="My Account"
              />
            </ListItem>
            <ListItem
              button
              disabled
              onClick={() => {
                this.setState({ menu: 8 });
                this.props.history.push("/help");
              }}
            >
              <ListItemIcon>
                <HelpIcon style={{ fill: Constants.Colors.TT }} />
              </ListItemIcon>
              <ListItemText
                primary="Help"
              />
            </ListItem>
            <ListItem
              button
              disabled
              onClick={() => {
                this.setState({ menu: 9 });
                this.props.firebase.firebaseSignOut().then(() => {
                  this.props.history.push("/");
                  this.props.clearCoach();
                });
              }}
            >
              <ListItemIcon>
                <LogoutIcon style={{ fill: Constants.Colors.SA }} />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
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
  firebase: PropTypes.object.isRequired,
  clearCoach: PropTypes.func.isRequired
};

export default withRouter(withStyles(styles)(connect(null, {clearCoach})(BurgerMenu)));