import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import AppBar from "../../../components/AppBar";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import { connect } from "react-redux";
import { deleteMICenters } from "../../../state/actions/math-instruction";
import CenterMenu from '../../../components/CentersComponents/CenterMenu';
import {
  addNewCenter,
  incrementCenterCount
} from "../../../state/actions/math-instruction.js";


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

interface Teacher {
  email: string,
  firstName: string,
  lastName: string,
  notes: string,
  id: string,
  phone: string,
  role: string,
  school: string
};

interface Style {
  root: string,
  grow: string,
  backButton: string
}

interface Props {
  classes: Style,
  location: { state: { teacher: Teacher, teachers: Array<Teacher>}},
  addNewCenter(): void,
  incrementCenterCount(): void,
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
  teacherSelected: Teacher
}

/**
 * @class MathInstructionPage
 */
class MathInstructionPage extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.exact({
      state: PropTypes.exact({
        teacher: PropTypes.exact({
          email: PropTypes.string,
          firstName: PropTypes.string,
          lastName: PropTypes.string,
          notes: PropTypes.string,
          id: PropTypes.string,
          phone: PropTypes.string,
          role: PropTypes.string,
          school: PropTypes.string
        }).isRequired,
        teachers: PropTypes.array.isRequired
      })
    }).isRequired
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
        <header>
          <Grid container direction="row" alignItems="center" justify="flex-start">
            <Grid item xs={3}>
              <Grid container alignItems="center" justify="center">
                <Grid item>
                  <Button variant="contained" size="medium" className={classes.backButton}
                    onClick={(): void => {
                      this.props.history.replace({
                        pathname: "/Magic8Menu",
                        state: {
                          type: "Observe"
                        }
                      })
                    }}>
                    <ChevronLeftRoundedIcon />
                    <b>Back</b>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </header>
        <main style={{ flexGrow: 1 }}>
          <FirebaseContext.Consumer>
            {(firebase: object): React.ReactNode => (
              <CenterMenu
                teacher={this.props.teacherSelected}
                firebase={firebase}
                addNewCenter={this.props.addNewCenter}
                incrementCenterCount={this.props.incrementCenterCount}
                type="MI"
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
    centers: state.mathCentersState.mathCenters,
    teacherSelected: state.teacherSelectedState.teacher
  };
};

export default connect(mapStateToProps, { deleteMICenters, addNewCenter, incrementCenterCount })(
  withStyles(styles)(MathInstructionPage)
);
