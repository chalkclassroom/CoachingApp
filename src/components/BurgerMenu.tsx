import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Collapse from '@material-ui/core/Collapse';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from "@material-ui/icons/Person";
import MessagesIcon from "@material-ui/icons/MailOutline";
import ObserveIcon from "@material-ui/icons/Visibility";
import ActionPlansIcon from "@material-ui/icons/CastForEducation";
import ConferencePlansIcon from "@material-ui/icons/ListAlt";
import Magic8Icon from "@material-ui/icons/Stars";
import PeopleIcon from "@material-ui/icons/People";
import ResultsIcon from "@material-ui/icons/PieChart";
import TutorialIcon from "@material-ui/icons/School";
import ChalkIcon from '@material-ui/icons/Dashboard';
import AboutIcon from '@material-ui/icons/Info';
import TeamIcon from '@material-ui/icons/GroupWork';
import ResearchIcon from '@material-ui/icons/AccountBalance';
import HelpIcon from "@material-ui/icons/ContactSupport";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from 'react-redux';
import { clearCoach } from '../state/actions/coach';
import TeacherModal from "../views/protected/HomeViews/TeacherModal";
import FirebaseContext from "./Firebase/FirebaseContext";
import * as Constants from '../constants/Constants';
import ReactRouterPropTypes from 'react-router-prop-types';
import * as Types from '../constants/Types';
import * as H from 'history';

const styles: object = {
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
  },
  regular: {
    paddingLeft: '1em'
  },
  nested: {
    paddingLeft: '4em'
  }
};

interface Style {
  toolbarIcon: string,
  nested: string,
  regular: string
}

type Props = RouteComponentProps & {
  open: boolean,
  classes: Style,
  handleClose(event: React.MouseEvent<HTMLElement, MouseEvent>): void,
  history: H.History,
  firebase: {
    firebaseSignOut(): Promise<void>,
    getTeacherList(): Promise<Types.Teacher[]>
  },
  clearCoach(): void
}

interface State {
  menu: number,
  open: boolean,
  chalkOpen: boolean,
  teacherModal: boolean,
  type: string
}

/**
 * Navigation Menu
 * @class BurgerMenu
 * @param {type} type
 *
 */
class BurgerMenu extends React.Component<Props, State>{
  state = {
    menu: 0,
    open: this.props.open,
    chalkOpen: false,
    teacherModal: false,
    type: ""
  };
  handleDrawerOpen = (): void => {
    this.setState({ open: true });
  };

  handleDrawerClose = (): void => {
    this.setState({ open: false });
  };

  showTeacherModal = (type: string): void => {
    this.setState({ teacherModal: true, type: type });
  };

  handleTeacherModalClose = (): void => {
    this.setState({
      teacherModal: false,
      type: ""
    });
  };

  handleOpenChalk = (): void => {
    if (this.state.chalkOpen) {
      this.setState({ chalkOpen: false });
    } else {
      this.setState({ chalkOpen: true });
    }
  };

  static propTypes = {
    classes: PropTypes.exact({
      toolbarIcon: PropTypes.string,
      drawerPaper: PropTypes.string,
      drawerPaperClose: PropTypes.string,
      nested: PropTypes.string,
      regular: PropTypes.string
    }).isRequired,
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    firebase: PropTypes.exact({
      getTeacherList: PropTypes.func,
      firebaseSignOut: PropTypes.func
    }).isRequired,
    clearCoach: PropTypes.func.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div>
        <Drawer
          variant="temporary"
          open={this.props.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>): void => this.props.handleClose(event)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem
              button
              onClick={(): void => {
                this.setState({ menu: 0, chalkOpen: false });
                this.props.history.push("/Home");
              }}
              className={classes.regular}
            >
              <ListItemIcon>
                <HomeIcon style={{ fill: Constants.Colors.CC}} />
              </ListItemIcon>
              <ListItemText
                primary="Home"
              />
            </ListItem>
            <ListItem
              button
              onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
                this.setState({ menu: 1, chalkOpen: false });
                this.props.history.push({
                  pathname: "/Training",
                  // state: { type: "Training" }
                });
                this.props.handleClose(event);
              }}
              className={classes.regular}
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
              onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
                this.setState({ menu: 2, chalkOpen: false });
                this.showTeacherModal("Observe");
                this.props.handleClose(event);
              }}
              className={classes.regular}
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
              onClick={(): void => {
                this.setState({ menu: 3, chalkOpen: false });
                this.props.history.push("/MyTeachers");
              }}
              className={classes.regular}
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
              onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
                this.setState({ menu: 4, chalkOpen: false });
                this.showTeacherModal("Results");
                this.props.handleClose(event);
              }}
              className={classes.regular}
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
              onClick={(): void => {
                this.setState({ menu: 5, chalkOpen: false });
                this.props.history.push("/ActionPlans")
              }}
              className={classes.regular}
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
              onClick={(): void => {
                this.setState({ menu: 6, chalkOpen: false });
                this.props.history.push("/ConferencePlans")
              }}
              className={classes.regular}
            >
              <ListItemIcon>
                <ConferencePlansIcon style={{ fill: Constants.Colors.CC }} />
              </ListItemIcon>
              <ListItemText
                primary="Conference Plans"
              />
            </ListItem>
            <ListItem
              button
              onClick={(): void => {
                this.setState({ menu: 7, chalkOpen: false });
              }}
              className={classes.regular}
            >
              <ListItemIcon>
                <MessagesIcon style={{ fill: Constants.Colors.SE }} />
              </ListItemIcon>
              <ListItemText
                primary="Messages"
                onClick={(): void => this.props.history.push("/Messaging")}
              />
            </ListItem>
            <ListItem
              button
              onClick={(): void => {
                this.setState({ menu: 8, chalkOpen: false });
                this.props.history.push("/CoachingResources")
              }}
              className={classes.regular}
            >
              <ListItemIcon>
                <Magic8Icon style={{ fill: Constants.Colors.AC }} />
              </ListItemIcon>
              <ListItemText
                primary="Coaching Resources"
              />
            </ListItem>
            <ListItem button onClick={this.handleOpenChalk}>
              <ListItemIcon>
                <ChalkIcon style={{ fill: Constants.Colors.MI }} />
              </ListItemIcon>
              <ListItemText primary="About" />
              {this.state.chalkOpen ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </ListItem>
            <Collapse in={this.state.chalkOpen} timeout="auto">
              <ListItem
                button
                onClick={(): void => {
                  this.setState({ menu: 9, chalkOpen: false });
                  this.props.history.push("/Landing");
                }}
                className={classes.nested}
              >
                <ListItemIcon>
                  <AboutIcon style={{ fill: Constants.Colors.LC }} />
                </ListItemIcon>
                <ListItemText
                  primary="How It Works"
                />
              </ListItem>
              <ListItem
                button
                onClick={(): void => {
                  this.setState({ menu: 10, chalkOpen: false });
                  this.props.history.push("/Team");
                }}
                className={classes.nested}
              >
                <ListItemIcon>
                  <TeamIcon style={{ fill: Constants.Colors.CC }} />
                </ListItemIcon>
                <ListItemText
                  primary="Team"
                />
              </ListItem>
              <ListItem
                button
                onClick={(): void => {
                  this.setState({ menu: 11, chalkOpen: false });
                  this.props.history.push("/About");
                }}
                disabled
                className={classes.nested}
              >
                <ListItemIcon>
                  <ResearchIcon style={{ fill: Constants.Colors.SE }} />
                </ListItemIcon>
                <ListItemText
                  primary="Research"
                />
              </ListItem>
            </Collapse>
            <ListItem
              button
              onClick={(): void => {
                this.setState({ menu: 12, chalkOpen: false });
                this.props.history.push("/MyAccount");
              }}
              className={classes.regular}
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
              onClick={(): void => {
                this.setState({ menu: 13, chalkOpen: false });
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
              onClick={(): void => {
                this.setState({ menu: 14, chalkOpen: false });
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
            {(firebase: {
              getTeacherList(): Promise<Types.Teacher[]>
            }): React.ReactNode => (
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


export default withRouter(withStyles(styles)(connect(null, {clearCoach})(BurgerMenu)));
