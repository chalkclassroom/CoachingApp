import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../../../components/AppBar";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import { connect } from "react-redux";
import { deleteAllCenters } from "../../../state/actions/math-instruction";
import CenterMenu from '../../../components/CentersComponents/CenterMenu';
import {
  addNewCenter,
  incrementCenterCount
} from "../../../state/actions/math-instruction.js";
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
  incrementCenterCount(): void,
  centers: Array<{
    name: string,
    count: number
  }>,
}

interface State {
  auth: boolean,
  completeEnabled: boolean
}

/**
 * @class MathInstructionPage
 */
class MathInstructionPage extends React.Component<Props, State> {
  
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
                magic8="Math Instruction"
                type="math"
                color={Constants.MathColor}
                checklist={Constants.Checklist.Math}
                centers={this.props.centers}
              />
            )}
          </FirebaseContext.Consumer>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    centers: state.mathCentersState.mathCenters
  };
};

export default connect(mapStateToProps, { deleteAllCenters, addNewCenter, incrementCenterCount })(
  withStyles(styles)(MathInstructionPage)
);
