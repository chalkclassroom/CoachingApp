import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../../../components/AppBar";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import { connect } from "react-redux";
import {clearSequentialCount, deleteSACenters} from "../../../state/actions/sequential-activities";
import CenterMenu from '../../../components/CentersComponents/CenterMenu';
import TeacherModal from '../HomeViews/TeacherModal';
import {
  addNewCenter,
  incrementCenterCount,
  updateSequentialCount
} from "../../../state/actions/sequential-activities";
import * as Types from '../../../constants/Types';
import * as H from 'history';
import ReactRouterPropTypes from 'react-router-prop-types';
import Firebase from '../../../components/Firebase'
import withObservationWrapper from "../../../components/HOComponents/withObservationWrapper";

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

interface State {
  teacherModal: boolean
}

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
  preBack(): Promise<boolean>
  history: H.History,
  teacherSelected: Types.Teacher
  clearSequentialCount(): void
  deleteSACenters(): void
  forceComplete: boolean
}

/**
 * @class SequentialActivitiesPage
 */
class SequentialActivitiesPage extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      teacherModal: false
    }
  }

  handleCloseTeacherModal = (): void => {
    this.setState({ teacherModal: false })
  };

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    if (!this.props.teacherSelected) {
      this.setState({ teacherModal: true })
    }
  };
  componentWillUnmount() {
    this.props.clearSequentialCount()
    this.props.deleteSACenters()
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
    addNewCenter: PropTypes.func.isRequired,
    incrementCenterCount: PropTypes.func.isRequired,
    updateSequentialCount: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      this.props.teacherSelected ? (
        <div className={classes.root}>
          <FirebaseContext.Consumer>
            {(firebase: Firebase): React.ReactNode => (
              <AppBar confirmAction={this.props.preBack} firebase={firebase} />
            )}
          </FirebaseContext.Consumer>
          <main style={{ flexGrow: 1 }}>
            <FirebaseContext.Consumer>
              {(firebase: Firebase): React.ReactNode => (
                <CenterMenu
                  forceComplete={this.props.forceComplete}
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
      ) : (
        <FirebaseContext.Consumer>
          {(firebase: {
            getTeacherList(): Promise<Types.Teacher[]>
          }): React.ReactElement => (
            <TeacherModal
              handleClose={this.handleCloseTeacherModal}
              firebase={firebase}
              type={"Observe"}
            />
          )}
        </FirebaseContext.Consumer>
      )
    );
  }
}
const wrapperOptions = {

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

export default connect(mapStateToProps, { deleteSACenters, addNewCenter, incrementCenterCount, updateSequentialCount, clearSequentialCount, deleteSACenters })(
  withStyles(styles)(withObservationWrapper(wrapperOptions)(SequentialActivitiesPage))
);