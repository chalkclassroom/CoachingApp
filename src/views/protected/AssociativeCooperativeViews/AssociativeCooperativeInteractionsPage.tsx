import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../../../components/AppBar";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import { connect } from "react-redux";
import CenterMenuAssocCoop from "../../../components/AssociativeCooperativeComponents/CenterMenuAssocCoop";
import { deleteAllCenters } from "../../../state/actions/associative-cooperative";

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
  location: { state: { teacher: { id: string }}}
}

interface State {
  auth: boolean,
  completeEnabled: boolean,
}

class AssociativeCooperativeInteractionsPage extends React.Component<Props, State> {
  state = {
    auth: true,
    completeEnabled: false,
  };

  handleCompleteButton = (enable: boolean) => {
    this.setState({ completeEnabled: enable });
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.exact({ state: PropTypes.exact({ teacher: PropTypes.exact({ id: PropTypes.string})})}).isRequired
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {(firebase: object) => (
            <AppBar
              firebase={firebase}
              //classes={{ root: this.props.classes.grow }}
              className={classes.grow}
            />
          )}
        </FirebaseContext.Consumer>
        {/* this.state.recs ? (
          <FirebaseContext.Consumer>
            {firebase => (
              <Recs
                open={true}
                onClose={this.handleRecsModal}
                firebase={firebase}
              />
            )}
          </FirebaseContext.Consumer>
        ) : (
          <div />
        ) */}
        <main style={{ flex: 1 }}>
          <FirebaseContext.Consumer>
            {(firebase: object) => (
              <CenterMenuAssocCoop
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
  withStyles(styles)(AssociativeCooperativeInteractionsPage)
);
