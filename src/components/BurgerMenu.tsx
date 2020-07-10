import * as React from "react";
import * as PropTypes from "prop-types";
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
import HelpIcon from "@material-ui/icons/ContactSupport";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { clearCoach } from '../state/actions/coach';
import TeacherModal from "../views/protected/HomeViews/TeacherModal";
import FirebaseContext from "./Firebase/FirebaseContext";
import DashboardIcon from '@material-ui/icons/Dashboard';
import * as Constants from '../constants/Constants';
import ReactRouterPropTypes from 'react-router-prop-types';
import * as Types from '../constants/Types';

const styles: object = {
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
  },
  nested: {
    paddingLeft: 14
  }
};

interface Style {
  toolbarIcon: string,
  nested: string
}

interface Props {
  open: boolean,
  classes: Style,
  handleClose(event: React.MouseEvent<HTMLElement, MouseEvent>): void,
  history: {
    push(
      param: (string | {
        pathname: string,
        state: {
          type: string
        }
      }),
    ): void
  },
  firebase: {
    firebaseSignOut(): Promise<void>,
    getTeacherList(): Promise<Types.Teacher[]>
  },
  clearCoach(): void
}

interface State {
  menu: number,
  open: boolean,
  coachingOpen: boolean,
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
    coachingOpen: false,
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

  handleOpenCoaching = (): void => {
    if (this.state.coachingOpen) {
      this.setState({ coachingOpen: false });
    } else {
      this.setState({ coachingOpen: true });
    }
  };

  static propTypes = {
    classes: PropTypes.exact({
      toolbarIcon: PropTypes.string,
      drawerPaper: PropTypes.string,
      drawerPaperClose: PropTypes.string,
      nested: PropTypes.string
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
              onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
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
              onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
                this.setState({ menu: 2 });
                this.showTeacherModal("Observe");
                this.props.handleClose(event);
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
              onClick={(): void => {
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
              onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
                this.setState({ menu: 4 });
                this.showTeacherModal("Results");
                this.props.handleClose(event);
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
              onClick={(): void => {
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
              onClick={(): void => {
                this.setState({ menu: 3 });
              }}
              className={classes.nested}
            >
              <ListItemIcon>
                <MessagesIcon style={{ fill: Constants.Colors.CC }} />
              </ListItemIcon>
              <ListItemText
                primary="Messages"
                onClick={(): void => this.props.history.push("/Messages")}
              />
            </ListItem>
            <ListItem
              button
              disabled
              onClick={(): void => {
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
              onClick={(): void => {
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
              onClick={(): void => {
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
              onClick={(): void => {
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
            {(firebase: object): React.ReactNode => (
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