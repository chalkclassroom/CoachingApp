import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../../../components/AppBar";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import { connect } from "react-redux";
import { deleteSACenters } from "../../../state/actions/sequential-activities";
import CenterMenu from '../../../components/CentersComponents/CenterMenu';
import {
  addNewCenter,
  incrementCenterCount,
  updateSequentialCount
} from "../../../state/actions/sequential-activities";
import * as Types from '../../../constants/Types';

const styles: object = {
  root: {
    backgroundColor: "#ffffff",
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    overflowY: 'auto'
  },
  grow: {
    flexGrow: 0
  },
  backButton: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
    color: '#333333',
    borderRadius: 3,
    textTransform: 'none'
  }
};

interface Style {
  root: string,
  grow: string,
  backButton: string
}

interface Props {
  classes: Style,
  addNewCenter(centerName: string): void,
  incrementCenterCount(centerName: string): void,
  updateSequentialCount(behavior: string): void,
  centers: Array<{
    name: string,
    count: number
  }>,
  history: {
    replace(
      param: {
        pathname: string,
        state: {
          type: string
        }
      }
    ): void
  },
  teacherSelected: Types.Teacher
}

/**
 * @class SequentialActivitiesPage
 */
class SequentialActivitiesPage extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    classes: PropTypes.exact({
      root: PropTypes.string,
      grow: PropTypes.string,
      backButton: PropTypes.string
    }).isRequired,
    teacherSelected: PropTypes.exact({
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      notes: PropTypes.string,
      id: PropTypes.string,
      phone: PropTypes.string,
      role: PropTypes.string,
      school: PropTypes.string
    }).isRequired,
    updateSequentialCount: PropTypes.func.isRequired
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
        <main style={{ flexGrow: 1 }}>
          <FirebaseContext.Consumer>
            {(firebase: {
              auth: {
                currentUser: {
                  uid: string
                }
              },
              handleSession(mEntry: {teacher: string, observedBy: string, type: string}): void,
              handlePushCentersData(mEntry: {checked: Array<number>, people: number}): void
            }): React.ReactNode => (
              <CenterMenu
                teacher={this.props.teacherSelected}
                history={this.props.history}
                firebase={firebase}
                addNewCenter={this.props.addNewCenter}
                incrementCenterCount={this.props.incrementCenterCount}
                updateCount={this.props.updateSequentialCount}
                type="SA"
                centers={this.props.centers}
              />
            )}
          </FirebaseContext.Consumer>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state: Types.ReduxState): {
  centers: Array<{
    name: string,
    count: number
  }>,
  teacherSelected: Types.Teacher
} => {
  return {
    centers: state.sequentialCenterState.sequentialCenters,
    teacherSelected: state.teacherSelectedState.teacher
  };
};

export default connect(mapStateToProps, { deleteSACenters, addNewCenter, incrementCenterCount, updateSequentialCount })(
  withStyles(styles)(SequentialActivitiesPage)
);