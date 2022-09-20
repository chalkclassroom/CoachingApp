import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../../../components/AppBar";
import Grid from "@material-ui/core/Grid";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import { coachLoaded, Role } from '../../../state/actions/coach'
import { connect } from 'react-redux';
import * as Types from '../../../constants/Types';
import ReactRouterPropTypes from 'react-router-prop-types';
import * as H from 'history';
import Firebase from '../../../components/Firebase'
import { Route, Switch } from "react-router-dom";
import TrainingIcon from "@material-ui/icons/School";
import Typography from "@material-ui/core/Typography";
import Practices from "./Practices";
import ToolIcons from "../../../components/ToolIcons";


const styles: object = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  pictureBar: {
    position: 'static',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    minHeight: '4em',
    maxHeight: '200px',
  },
};

const Styles = {
    navItems: {
        background: 'rgb(234, 234, 234)',
        border: '1px',
        borderColor: 'gray',
        height: '50px',
        display: 'flex',
        /* justify-content: center; */
        alignItems: 'center',
        fontSize: '1.2rem',
    },


    navMenu: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, auto)',
        gridColumnGap: '50px',
        listStyle: 'none',
        textAlign: 'center',
        width: '70vw',
        justifyContent: 'start'
    }
}

interface Style {
  root: string,
  pictureBar: string
}

interface Props {
  classes: Style,
  coachName: string,
  getCoach(name: string): void,
  history: H.History
}

interface State {
  teacherModal: boolean,
  type: string,
  coachName: string
}

/**
 * reports page
 * @class ReportsPage
 */
class ChalkPracticePage extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      teacherModal: false,
      type: "",
      coachName: "",
      currentPage: "",
    }
  }

  handleClose = (): void => {
    this.setState({
      teacherModal: false,
      type: ""
    });
  };

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    const firebase = this.context;
    if (!this.props.coachName) {
      firebase.getCoachFirstName().then((name: string): void => {
        this.props.getCoach(name);
      })
    }
    // firebase.handleFetchTrainingStatus();
    // firebase.handleFetchQuestions("transition");
  }

  static propTypes = {
    classes: PropTypes.exact({
      root: PropTypes.string,
      pictureBar: PropTypes.string,
    }).isRequired,
    coachName: PropTypes.string.isRequired,
    getCoach: PropTypes.func.isRequired,
    userRole: PropTypes.string,
    history: ReactRouterPropTypes.history
  }


  changePage = (pageName) => {
    this.setState({currentPage: pageName});
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes, userRole, coachName } = this.props;

    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {(firebase: Firebase): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <Grid container className={classes.pictureBar}>
            <Grid item xs={1} style={{padding: '1em 0 1em 0'}}>
                <TrainingIcon style={{fill: '#6f39c4', height: '100px', width: '100px', minHeight: '2em', maxHeight: '100px', minWidth: '2em', paddingLeft: '1.8em'}} />            
            </Grid>
        </Grid>
        <nav style={Styles.navItems}>
                <ul style={Styles.navMenu}>
                <Typography
                    variant="h6"
                    style={{
                        fontFamily:
                        'Arimo',
                    }}
                    ><b><u>Select a CHALK Practice you would like to explore:</u></b></Typography>
                </ul>
            </nav>
        <div style={{display: "flex"}}>
          {/* <Switch location={location} key={location.pathname}>
            <Route path="/LeadersClassroomPractices" component={Practices} />
          </Switch> */}
          <Grid container>
            <Grid container>
              {/* <Grid container justify={'center'} direction={'column'} alignItems={'center'} style={{width:"75%", height:"100%"}}> */}
                <Grid item xs={12} style={{paddingTop:"1em"}}>
                  <ToolIcons type={'Practice'} training={true} history={this.props.history} practice={true}/>
                  </Grid>
                {/* </Grid> */}
            </Grid>
        </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Types.ReduxState): {coachName: string, userRole: Role} => {
  return {
    coachName: state.coachState.coachName,
    userRole: state.coachState.role
  };
};

ChalkPracticePage.contextType = FirebaseContext;
export default withStyles(styles)(connect(mapStateToProps, {getCoach: coachLoaded})(ChalkPracticePage));
