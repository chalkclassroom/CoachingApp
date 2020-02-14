import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import AppBar from "../../../components/AppBar";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import { connect } from "react-redux";
import CenterMenuSequentialActivities from "../../../components/SequentialActivitiesComponents/CenterMenuSequentialActivities";
import { deleteAllCenters } from "../../../state/actions/sequential-activities";

const styles: object = {
  root: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column"
  },
  grow: {
    flexGrow: 0
  }
};

interface Props {
  classes: Style,
  location: { state: { teacher: { id: string }}}
}

interface Style {
  root: string,
  grow: string
}

interface State {

}

/**
 * sequential activities observation
 * @class SequentialActivitiesPage
 */
class SequentialActivitiesPage extends React.Component<Props, State> {
  state = {
    auth: true,
    help: false,
    completeEnabled: false
  };

  handleClickAway = () => {
    this.setState({ help: false });
  };

  /**
   * @param {boolean} open
   */
  handleNotes = (open: boolean) => {
    if (open) {
      this.setState({ notes: true });
    } else {
      this.setState({ notes: false });
    }
  };

  /**
   * @param {boolean} enable
   */
  handleCompleteButton = (enable: boolean) => {
    this.setState({ completeEnabled: enable });
  };

  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    return (
      <div className={this.props.classes.root}>
        <FirebaseContext.Consumer>
          {(firebase: object)=> (
            <AppBar
              firebase={firebase}
              classes={{ root: this.props.classes.grow }}
            />
          )}
        </FirebaseContext.Consumer>
{/*         {this.state.help ? (
          <ClickAwayListener onClickAway={this.handleClickAway}>
            {" "}
            <ClassroomClimateHelp />
          </ClickAwayListener>
        ) : (
          <div />
        )} */}
        <main style={{ flex: 1 }}>
          <FirebaseContext.Consumer>
            {(firebase: object) => (
              <CenterMenuSequentialActivities
                teacherId={this.props.location.state.teacher.id}
                firebase={firebase}
                onStatusChange={this.handleCompleteButton}
              />
            )}
          </FirebaseContext.Consumer>
        </main>
      </div>
    );
  }
}

export default connect(null, { deleteAllCenters })(
  withStyles(styles)(SequentialActivitiesPage)
);
