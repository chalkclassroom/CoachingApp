import * as React from "react";
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import AppBar from "../../../components/AppBar";
import Notes from "../../../components/Notes";
import { connect } from "react-redux";
import { toggleNewGroupType } from "../../../state/actions/level-of-instruction";
import GroupTypeSel from "./GroupTypeSel";
import Dashboard from "../../../components/Dashboard";

const styles: object = {
  root: {
    flexGrow: 1,
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    overflowY: 'auto',
    overflowX: 'hidden'
  },
};

interface Props {
  classes: { root: string },
  location: { state: { teacher: { id: string }}}
};

interface State {
  auth: boolean,
  help: boolean,
  notes: boolean,
  recs: boolean,
  groupType: string,
  open: boolean};

/**
 * transition time observation tool
 * @class LevelOfInstructionPage
 */
class LevelOfInstructionPage extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      auth: true,
      help: false,
      notes: false,
      recs: true,
      groupType: null,
      open: false
    };

    // this.handleTransitionType = this.handleTransitionType.bind(this);
  }

  /**
   * @param {string} type
   */
  handleGroupType = (type: string): void => {

    this.setState({ groupType: type });
  };

  /**
   * @param {boolean} open
   */
  handleRecsModal = (open: boolean): void => {
    if (open) {
      this.setState({ recs: true });
    } else {
      this.setState({ recs: false });
    }
  };

  handleEndTransition = (): void => {
    this.setState({ groupType: null });
  };

  /**
   * @param {boolean} open
   */
  handleNotes = (open: boolean): void => {
    if (open) {
      this.setState({ notes: true });
    } else {
      this.setState({ notes: false });
    }
  };

  handleClickAwayHelp = (): void => {
    this.setState({ help: false });
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
          {(firebase: object) => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
       { this.state.notes ? (
          <FirebaseContext.Consumer>
            {(firebase: object) => (
              <Notes
                open={true}
                onClose={this.handleNotes}
                color="#009365"
                text="Level of Instruction Notes"
                firebase={firebase}
              />
            )}
          </FirebaseContext.Consumer> /* : this.state.recs ? (
          <FirebaseContext.Consumer>
            {firebase => (
              <Recs
                open={true}
                onClose={this.handleRecsModal}
                firebase={firebase}
              />
            )}
          </FirebaseContext.Consumer>
        )  */
        ) : (
          <div />
        )}
        <main style={{ flex: 1 }}>
          <Grid container spacing={16} alignItems="center">
            <Grid item xs={3}>
              <Grid
                container
                alignItems={"center"}
                justify={"center"}
                direction={"column"}
              >
                <Dashboard
				  magic8="Level Of Instruction"
                  color="#009365"
                  completeObservation={true}
                />
              </Grid>
            </Grid>
            <Grid item xs={9} justify="center">
              <Grid
                container
                alignItems={"center"}
                justify={"center"}
                direction={"column"}
              >
                <GroupTypeSel
                  handleGroupType={this.handleGroupType}
                  handleNotes={this.handleNotes}
                  groupType={this.state.groupType}
                />
              </Grid>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

export default connect(null,toggleNewGroupType)(
  withStyles(styles)(LevelOfInstructionPage)
);