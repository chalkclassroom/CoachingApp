import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../../../components/AppBar";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import { connect } from "react-redux";
import CenterMenuAssocCoop from "../../../components/AssociativeCooperativeComponents/CenterMenuAssocCoop";
import { deleteAllCenters } from "../../../state/actions/associative-cooperative";
import AssocCoopHelp from "../AssociativeCooperativeViews/AssocCoopHelp"
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import CenterMenu from '../../../components/CentersComponents/CenterMenu';
import {
  addNewCenter,
  incrementCenterCount
} from "../../../state/actions/associative-cooperative.js";
import * as Constants from '../../../constants';


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

interface Style {
  root: string,
  grow: string
}

interface Props {
  classes: Style,
  location: { state: { teacher: { id: string }}},
  addNewCenter(): void,
  incrementCenterCount(): void
}

interface State {
  auth: boolean,
  completeEnabled: boolean
}

/**
 * @class ACPage
 */
class ACPage extends React.Component<Props, State> {
  
  state = {
    auth: true,
     completeEnabled: false
  };

  /**
   * @param {boolean} enable
   */
  handleCompleteButton = (enable: boolean) => {
    this.setState({ completeEnabled: enable });
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.exact({ state: PropTypes.exact({ teacher: PropTypes.exact({ id: PropTypes.string})})}).isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {(firebase: object): React.ReactNode => (
            <AppBar
              firebase={firebase}
              className={classes.grow}
            />
          )}
        </FirebaseContext.Consumer>
        <main style={{ flex: 1 }}>
          <FirebaseContext.Consumer>
            {(firebase: object): React.ReactNode => (
              <CenterMenu
                teacherId={this.props.location.state.teacher.id}
                firebase={firebase}
                onStatusChange={this.handleCompleteButton}
                addNewCenter={this.props.addNewCenter}
                incrementCenterCount={this.props.incrementCenterCount}
                magic8="Associative and Cooperative"
                type="AC"
                color={Constants.ACColor}
                checklist={Constants.Checklist.AC}
              />
            )}
          </FirebaseContext.Consumer>
        </main>
      </div>
    );
  }
}

export default connect(null, { deleteAllCenters, addNewCenter, incrementCenterCount })(
  withStyles(styles)(ACPage)
);
